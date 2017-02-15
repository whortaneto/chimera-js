/*
  Module responsible for encapsulate the specifed file scripts in a web worker
*/
const Pitou = (() => {
  const _buildChimeraWorker = () => {
    let chimeraWorker = {};

    for (let method in WorkerGlobalScope.chimeraWorker) { // eslint-disable-line
      chimeraWorker[method] = method;
    }

    return chimeraWorker;
  };

  return {
    importWorker: (workerName) => {
      importScripts(workerName); // eslint-disable-line
    },
    buildChimeraWorker: _buildChimeraWorker
  };
})();

onmessage = meruemMessage => { // eslint-disable-line
  if (WorkerGlobalScope.chimeraWorker) { // eslint-disable-line
    let functionCall = JSON.parse(meruemMessage.data);
    let functionResult;

    if (WorkerGlobalScope.chimeraWorker.hasOwnProperty(functionCall.methodName) > -1) { // eslint-disable-line
      functionResult = WorkerGlobalScope.chimeraWorker[functionCall.methodName](...functionCall.arguments); // eslint-disable-line
    }

    if (functionResult) {
      let resultObject = {};

      resultObject = {
        result: functionResult
      };
      postMessage(JSON.stringify(resultObject));
    }
  } else {
    Pitou.importWorker(meruemMessage.data);
    let chimeraWorker = Pitou.buildChimeraWorker();

    postMessage(JSON.stringify(chimeraWorker));
  }
};
