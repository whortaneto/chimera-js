import workerManager from './meruem.js';

const Chimera = (() => {
  const _setWorker = (workerName) =>
    workerManager.setChimeraWorker(workerName);

  return {
    setWorker: _setWorker
  };
})();

export default Chimera;
