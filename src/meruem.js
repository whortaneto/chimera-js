import PitouDefaultWorker from 'worker-loader!./neferpitou.worker';
/*
    Module responsible for managing the chimera workers running in a web worker.
*/
const Meruem = () => {
  const _methodBuilder = (chimeraWorker, pitouDefaultWorker) => {
    let chimeraWorkerWithMethods = {};

    for (let method in chimeraWorker) {
      let methodRefence = method;

      chimeraWorkerWithMethods[methodRefence] = function () {
        return new Promise(
            (resolve, reject) => {
              let functionCall = {
                methodName: methodRefence,
                arguments: [].slice.call(arguments)
              };

              pitouDefaultWorker.postMessage(JSON.stringify(functionCall));
              pitouDefaultWorker.onmessage = pitouMessage => {
                let functionReturn = JSON.parse(pitouMessage.data);

                if (functionReturn.hasOwnProperty('result')) {
                  resolve(functionReturn.result);
                }
              };
            }
        );
      };
    }

    return chimeraWorkerWithMethods;
  };

  const _buildChimeraWorkerPromise = (meruemMessage) => (resolve, reject) => {
    let pitouDefaultWorker = new PitouDefaultWorker();

    pitouDefaultWorker.postMessage(meruemMessage);

    pitouDefaultWorker.onmessage = pitouResponse => {
      let chimeraWorker = JSON.parse(pitouResponse.data);

      resolve(_methodBuilder(chimeraWorker, pitouDefaultWorker));
    };
  };

  const _createChimeraWorker = workerName => new Promise(_buildChimeraWorkerPromise(workerName));

  const _setChimeraWorker = workerName => _createChimeraWorker(workerName);

  const _exportToWorker = (functionsToExport) => {
    for (let key in functionsToExport) {
      functionsToExport[key] = functionsToExport[key].toString();
    }
    return new Promise(_buildChimeraWorkerPromise(JSON.stringify(functionsToExport)));
  };

  return {
    setChimeraWorker: _setChimeraWorker,
    exportToWorker: _exportToWorker
  };
};

export default Meruem();
