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

  const _createChimeraWorker = workerName => {
    return new Promise(
        (resolve, reject) => {
          let pitouDefaultWorker = new PitouDefaultWorker();

          pitouDefaultWorker.postMessage(workerName);

          pitouDefaultWorker.onmessage = e => {
            let chimeraWorker = JSON.parse(e.data);

            resolve(_methodBuilder(chimeraWorker, pitouDefaultWorker));
          };
        }
    );
  };

  const _setChimeraWorker = workerName =>
     _createChimeraWorker(workerName);

  return {
    setChimeraWorker: _setChimeraWorker
  };
};

export default Meruem();
