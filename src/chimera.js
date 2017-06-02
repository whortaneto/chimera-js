import workerManager from './meruem.js';

const Chimera = (() => {
  const _setWorker = workerName =>
    workerManager.setChimeraWorker(workerName);

  const _exportToWorker = functionsToExport =>
    workerManager.exportToWorker(functionsToExport);

  const _executeInWorker = (...paramsAndFunction) =>
    workerManager.executeInWorker(paramsAndFunction);

  return {
    setWorker: _setWorker,
    exportToWorker: _exportToWorker,
    executeInWorker: _executeInWorker
  };
})();

export default Chimera;
