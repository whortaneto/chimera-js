import workerManager from './meruem.js';

const Chimera = (() => {
  const _setWorker = (workerName) =>
    workerManager.setChimeraWorker(workerName);

  const _exportToWorker = (functionsToExport) =>
    workerManager.exportToWorker(functionsToExport);

  return {
    setWorker: _setWorker,
    exportToWorker: _exportToWorker
  };
})();

export default Chimera;
