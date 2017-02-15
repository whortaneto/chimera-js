# chimera-js
[![Build Status](https://travis-ci.org/whortaneto/chimera-js.svg?branch=master)](https://travis-ci.org/whortaneto/chimera-js)
[![Coverage Status](https://coveralls.io/repos/github/whortaneto/chimera-js/badge.svg?branch=master)](https://coveralls.io/github/whortaneto/chimera-js?branch=master)

What Is This?
-------------
(In development)

This is a open source JavaScript library that seeks to help developers by simplifying the use of Web Workers API.

## Examples

We have a example project on github [ChimeraJSPOC](https://github.com/whortaneto/ChimeraJsPOC).

But basically, here is where you can get started:

- First you will need to add the library `chimera-js` into your JavaScript code:

```js
  import Chimera from 'chimera-js';
```

  We have two ways to use a parallel web worker using `chimera-js`;

- The first one is to use the `Chimera` object to specify a object with all the functions that you want to run in parallel through the method `exportToWorker`.
  OBS: In version `0.1.17` you can't export arrow functions in a single line. You need to use the parentheses and the braces when using the method `exportToWorker`.

```js
  const _fibonacci = (n) => {
    (n < 2) ? 1 : _fibonacci(n-2) + _fibonacci(n-1);
  };

  Chimera.exportToWorker({ fibonacci: _fibonacci }).then((worker) => {
    // Do your code here
  });
```

- The other one is that you can use the `Chimera` object to specify another JavaScript file to run in parallel (Inside a web worker) through the method `setWorker`.

```js
  Chimera.setWorker('./parallelExample.js').then((worker) => {
    // Do your code here
  });
```

- Either way the executed method will return a Promise and the callback function executed by that promise will receive a object (`worker`) that you can use to call a function defined in the file `parallelExample.js` or a function defined in the object exported.

```js
  Chimera.exportToWorker({ fibonacci: _fibonacci }).then((worker) => {
    // Do your code here
  });
  -------------------------------------------------------------
  Chimera.setWorker('./parallelExample.js').then((worker) => {
    worker.executeFibonacci(42);
  });
```

- All functions of the code executed in parallel that have a `return` will return a Promise and the callback function executed by that promise will receive a parameter `result` that is the result returned by the executed function.

```js
  Chimera.setWorker('./parallelExample.js').then((worker) => {
    worker.executeFibonacci(42).then(result => {
        console.log(result);
    });
  });
```

- To specify what functions will be available in your main thread you need to specify in the JavaScript code executed in parallel (in that case in the `parallelExample.js` file) by adding the public functions of your JavaScript code in the object `worker` inside the object `WorkerGlobalScope`.

```js
  const _fibonacci = n => (n < 2) ? 1 : _fibonacci(n-2) + _fibonacci(n-1);

  WorkerGlobalScope.chimeraWorker = {
    executeFibonacci: _fibonacci
  }
```

This example will calculate the fibonacci of 42, process which normally blocks the JavaScript main thread and all it [DOM](https://en.wikipedia.org/wiki/Document_Object_Model), but thanks to the power of [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) that will not happen and thanks to the API of the library `chimera-js` we developers can do that in a much easier way.

# Project structure

## The files of the project

When you clone or download the project you will see the following files:

```
src/
test/
package.json
webpack.config.js
.eslintrc.json
.travis.yml
```

* `src`: Source code of the library, with its main modules (Chimera, Meruem, Neferpitou)
* `test`: The unit tests utils
* `package.json`: The project dependecies and scripts
* `webpack.prod.config`: The webpack configuration for transpile the source code
* `.eslintrc.json`: The rulos of linting
* `.travis.yml`: The configuration of [Travis](https://travis-ci.org/whortaneto/chimera-js) our CI tool

#### Inside the SRC folder

The files inside the src folder are structured in that way:

* `index.js`: End-point and modules export
* `chimera.js`: Main module to expose `chimera-js` API methods
* `meruem.js`: Module responsible for create and manage the worker object that is created by chimera-js and runned in the web worker
* `neferpitou.worker.js`: Default web worker that runs the parallel code and expose public functions to be used in the main thread. That one talks with `meruem.js` through the `chimeraWorker` object.
