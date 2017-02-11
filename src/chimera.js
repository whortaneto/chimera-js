import ctrlManager from './meruem.js';

const Chimera = (() => {
  const _setController = (controllerName) =>
    ctrlManager.setController(controllerName);

  return {
    setController: _setController
  };
})();

export default Chimera;
