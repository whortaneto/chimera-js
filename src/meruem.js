import Worker from 'worker-loader!./neferpitou.worker';

/*
    Module responsible for managing the controllers running in a web worker.
*/
const Meruem = () => {
  const _methodBuilder = (controller, worker) => {
    let controllerWithMethods = {};

    for (let method in controller) {
      let methodRefence = method;

      controllerWithMethods[methodRefence] = function () {
        return new Promise(
            (resolve, reject) => {
              let functionCall = {
                methodName: methodRefence,
                arguments: [].slice.call(arguments)
              };

              worker.postMessage(JSON.stringify(functionCall));
              worker.onmessage = e => {
                let functionReturn = JSON.parse(e.data);

                if (functionReturn.hasOwnProperty('result')) {
                  resolve(functionReturn.result);
                }
              };
            }
        );
      };
    }

    return controllerWithMethods;
  };

  const _createControllerObject = controllerName => {
    return new Promise(
        (resolve, reject) => {
          let worker = new Worker();

          worker.postMessage(controllerName);

          worker.onmessage = e => {
            let controller = JSON.parse(e.data);

            resolve(_methodBuilder(controller, worker));
          };
        }
    );
  };

  const _setController = controllerName =>
     _createControllerObject(controllerName);

  return {
    setController: _setController
  };
};

export default Meruem();
