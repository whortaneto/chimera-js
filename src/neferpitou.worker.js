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

  const _importFunctions = (functionsToImport) => {
    let functionArguments, functionBody;

    for (let key in functionsToImport) {
      functionArguments = functionsToImport[key]
                            .substring(functionsToImport[key].indexOf('(') + 1, functionsToImport[key].indexOf(')'))
                            .replace(/\s/g, '')
                            .split(',');

      functionBody = functionsToImport[key]
                        .substring(functionsToImport[key].indexOf('{'), functionsToImport[key].length);

      functionsToImport[key] = new Function(...functionArguments, functionBody); // eslint-disable-line
    }

    WorkerGlobalScope.chimeraWorker = functionsToImport; // eslint-disable-line
  };

  return {
    importWorker: (workerName) => {
      importScripts(workerName); // eslint-disable-line
    },
    buildChimeraWorker: _buildChimeraWorker,
    importFunctions: _importFunctions
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
    let isJSON = (str) => {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    };

    isJSON(meruemMessage.data) ? Pitou.importFunctions(JSON.parse(meruemMessage.data)) :
      Pitou.importWorker(meruemMessage.data);

    let chimeraWorker = Pitou.buildChimeraWorker();

    postMessage(JSON.stringify(chimeraWorker));
  }
};
