/*
  Module responsible for encapsulate the back-end scripts in a web worker
*/
const Pitou = (() => {
  const _buildControllerObject = () => {
    let controllerObject = {};

    for (let method in WorkerGlobalScope.controller) { // eslint-disable-line
      controllerObject[method] = method;
    }

    return controllerObject;
  };

  return {
    importController: (controllerName) => {
      importScripts(controllerName); // eslint-disable-line
    },
    buildControllerObject: _buildControllerObject
  };
})();

onmessage = e => { // eslint-disable-line
  if (WorkerGlobalScope.controller) { // eslint-disable-line
    let functionCall = JSON.parse(e.data);
    let resultado;

    if (WorkerGlobalScope.controller.hasOwnProperty(functionCall.methodName) > -1) { // eslint-disable-line
      resultado = WorkerGlobalScope.controller[functionCall.methodName](...functionCall.arguments); // eslint-disable-line
    }

    if (resultado) {
      let resultObject = {};

      resultObject = {
        result: resultado
      };
      postMessage(JSON.stringify(resultObject));
    }
  } else {
    Pitou.importController(e.data);
    let controllerObject = Pitou.buildControllerObject();

    postMessage(JSON.stringify(controllerObject));
  }
};
