// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"taskManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _task = _interopRequireDefault(require("./task.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TaskManager = /*#__PURE__*/function () {
  function TaskManager(task) {
    _classCallCheck(this, TaskManager);

    //   this.taskList = JSON.parse(localStorage.getItem("Banana")) || [];   
    this.currentId = parseInt(localStorage.getItem('CurrentID')) || 1;
    localStorage.setItem('CurrentID', this.currentId);
  }

  _createClass(TaskManager, [{
    key: "addTask",
    value: function addTask(name, descrip, assign, stat, date) {
      var task = new _task.default("task".concat(this.currentId++), name, descrip, assign, stat, date);
      localStorage.setItem('CurrentID', this.currentId);
      var myNewTasks = JSON.parse(localStorage.getItem("Banana")) || [];
      myNewTasks.push(task);
      localStorage.setItem('Banana', JSON.stringify(myNewTasks));
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(id) {
      var myTaskList = JSON.parse(localStorage.getItem("Banana"));
      myTaskList = myTaskList.filter(function (m) {
        return m.taskId !== id;
      });
      localStorage.setItem("Banana", JSON.stringify(myTaskList));
    }
  }, {
    key: "updateTask",
    value: function updateTask(taskId, name, descrip, assign, stat, date) {
      var myTaskList = JSON.parse(localStorage.getItem("Banana"));
      console.log(myTaskList.length);

      for (var i = 0; i < myTaskList.length; i++) {
        if (myTaskList[i].taskId === taskId) {
          myTaskList[i].name = name, myTaskList[i].descrip = descrip, myTaskList[i].assign = assign, myTaskList[i].stat = stat, myTaskList[i].date = date;
          localStorage.setItem("Banana", JSON.stringify(myTaskList));
          break;
        }
      }
    }
  }, {
    key: "assignTask",
    value: function assignTask(taskId, assign) {}
  }]);

  return TaskManager;
}();

exports.default = TaskManager;
},{"./task.js":"task.js"}],"task.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskManager = _interopRequireDefault(require("./taskManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Task = /*#__PURE__*/function () {
  function Task(taskId, name, descrip, assign, stat, date) {
    _classCallCheck(this, Task);

    this.taskId = taskId, this.name = name, this.descrip = descrip, this.assign = assign, this.stat = stat, this.date = date;
  }

  _createClass(Task, [{
    key: "addToHTML",
    value: function addToHTML() {
      var addHtml = "\n        <div  class=\"itemBox\"  class=\"list-group\" >\n            <a id=\"".concat(this.taskId, "\" id= \"anchor\" href=\"#\" class=\"list-group-item list-group-item-action \"  >\n                <div id = \"taskNameTag\" class=\"d-flex w-100 justify-content-between\" style=\"display: flex-end background-color: rgb(159, 133, 159)\">\n                    <h5 id=\"h5\" class=\"mb-1\">").concat(this.name, "</h5>\n                    <button class=\"edit btn btn-danger btn-sm\"  value=\"").concat(this.taskId, "\" style = \"background-color: gainsboro;color: blue;display:flex; border-color:gainsboro;\">           \n                    Edit</button>\n                    <button class=\"delete btn btn-danger btn-sm\" value=\"").concat(this.taskId, "\" style = \"background-color: gainsboro;color: red; border-color:gainsboro;\">\n                    X</button>\n                </div>\n                <div>\n                    <p class=\"mb-1\"><small>").concat(this.descrip, "</small></p>\n                </div>\n                <div class=\"d-flex\">\n                    <small class= \"text-muted\">\n                        Due by ").concat(this.date, "    ").concat(this.assign, "   <span style=\"").concat(this.stat === "Done" ? "color: green" : "color:black", "\"> ").concat(this.stat, " </span>   \n                    </small>\n                </div>\n            </a>  \n            \n        </div>\n    ");
      return addHtml;
    }
  }]);

  return Task;
}();

exports.default = Task;
},{"./taskManager.js":"taskManager.js"}],"FinalPLana.js":[function(require,module,exports) {
"use strict";

var _task3 = _interopRequireDefault(require("./task.js"));

var _taskManager = _interopRequireDefault(require("./taskManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//MODAL Form Elements Initialising
var taskName = document.querySelector("#taskName");
var description = document.querySelector("#description");
var assignee = document.querySelector("#assignee");
var taskDate = document.querySelector("#taskDate");
var statusSelect = document.querySelector("#statusSelect");
var hiddenTaskId = document.querySelector("#hiddenTaskId");
var taskNameEdit = document.querySelector("#taskNameEdit");
var descriptionEdit = document.querySelector("#descriptionEdit");
var assigneeEdit = document.querySelector("#assigneeEdit");
var taskDateEdit = document.querySelector("#taskDateEdit");
var statusSelectEdit = document.querySelector("#statusSelectEdit"); //Task Card

var tsk = document.querySelector("#tsk");
var asn = document.querySelector("#asn");
var due = document.querySelector("#due");
var st = document.querySelector("#st"); // const itemBox = document.querySelector(".itemBox");
// itemBox.addEventListener("onmouseover", cardDisplay);
//Modal and Form Buttons 

var btnSave = document.querySelector("#btnSave");
btnSave.addEventListener("click", saveButtonClicked);
var btnEditSave = document.querySelector("#btnEditSave");
btnEditSave.addEventListener("click", editSaveButtonClicked);
var btnDisplay = document.querySelector("#btnDisplay");
btnDisplay.addEventListener("click", displayTask);
var btnFilter = document.querySelector("#btnFilter");
btnFilter.addEventListener("click", filterSelection);
var toDo = document.querySelector("#toDo");
var inProgress = document.querySelector("#inProgress");
var review = document.querySelector("#review");
var done = document.querySelector("#done");
var listGroupContainer = document.querySelector("#listGroupContainer");
var taskNameEvent = new Boolean(true);
var assigneeEvent = new Boolean(true);
var descriptionEvent = new Boolean(true);
var statusEvent = new Boolean(true);
var dateEvent = new Boolean(true); // Initialising(creating instances) classes

var task = new _task3.default();
var taskManager = new _taskManager.default(); // displayTask();

function saveButtonClicked(event) {
  if (taskNameEvent && assigneeEvent && descriptionEvent && statusEvent) {
    taskManager.addTask(taskName.value, description.value, assignee.value, statusSelect.value, taskDate.value);
    displayTask();
    clearAll();
    $('#staticBackdrop').modal("hide");
    return true;
  } else {
    return false;
  }
}

function editSaveButtonClicked(event) {
  alert("I am Mr. Edit, I am clicked"); // if(taskName.value && assignee.value && description.value !== ""){
  //     alert("I am checking values");
  //     if(taskNameEvent || assigneeEvent || descriptionEvent){

  alert("I am calling Update");
  alert();
  taskManager.updateTask(hiddenTaskId.value, taskNameEdit.value, descriptionEdit.value, assigneeEdit.value, statusSelectEdit.value, taskDateEdit.value);
  displayTask(); // clearEdit();

  $('#staticBackdropEdit').modal("hide"); //         return true;        
  //         }
  //     }
  //     else{
  //         return false;
  //     }
}

function displayTask() {
  listGroupContainer.innerHTML = "";
  var myTaskList = JSON.parse(localStorage.getItem('Banana'));

  for (var i = 0; i < myTaskList.length; i++) {
    var _task = new _task3.default(myTaskList[i].taskId, myTaskList[i].name, myTaskList[i].descrip, myTaskList[i].assign, myTaskList[i].stat, myTaskList[i].date);

    var addHtml = _task.addToHTML();

    var element = document.createRange().createContextualFragment(addHtml);
    var btnDelete = element.querySelector("button.delete");
    var btnEdit = element.querySelector("button.edit");
    btnDelete.addEventListener("click", deleteButtonClicked);
    btnEdit.addEventListener("click", editButtonClicked);
    var itemBox = element.querySelector("a.list-group-item");
    itemBox.addEventListener("mouseover", cardDisplay);
    listGroupContainer.append(element);
  }
}

function displayFilter(taski) {
  listGroupContainer.innerHTML = "";

  for (var i = 0; i < taski.length; i++) {
    var _task2 = new _task3.default(taski[i].taskId, taski[i].name, taski[i].descrip, taski[i].assign, taski[i].stat, taski[i].date);

    var addHtml = _task2.addToHTML();

    var element = document.createRange().createContextualFragment(addHtml);
    var btnDelete = element.querySelector("button.delete");
    var btnEdit = element.querySelector("button.edit");
    btnDelete.addEventListener("click", deleteButtonClicked);
    btnEdit.addEventListener("click", editButtonClicked);
    var itemBox = element.querySelector("a.list-group-item");
    itemBox.addEventListener("mouseover", cardDisplay);
    listGroupContainer.append(element);
  }
}

function cardDisplay(event) {
  var id = event.target.id;
  var myTask = JSON.parse(localStorage.getItem('Banana'));
  var task = myTask.find(function (m) {
    return m.taskId === id;
  }); //   console.log(task);

  tsk.textContent = task.name;
  asn.textContent = task.assign;
  due.textContent = task.date;
  st.textContent = task.stat; //   console.log(tsk.value);
}

function filterSelection(event) {
  var myTask = JSON.parse(localStorage.getItem('Banana'));

  if (myTask != []) {
    toDo.addEventListener("click", function (event) {
      var toDoList = myTask.filter(function (m) {
        return m.stat === "To Do";
      });
      displayFilter(toDoList);
    });
    inProgress.addEventListener("click", function (event) {
      var toDoList = myTask.filter(function (m) {
        return m.stat === "In Progress";
      });
      displayFilter(toDoList);
    });
    done.addEventListener("click", function (event) {
      var toDoList = myTask.filter(function (m) {
        return m.stat === "Done";
      });
      displayFilter(toDoList);
    });
    review.addEventListener("click", function (event) {
      var toDoList = myTask.filter(function (m) {
        return m.stat === "Review";
      });
      displayFilter(toDoList);
    });
  }
}

function deleteButtonClicked(event) {
  var id = event.target.value;
  taskManager.deleteTask(id);
  displayTask();
}

function editButtonClicked(event) {
  $('#staticBackdropEdit').modal("show");
  var id = event.target.value; // console.log(event.target);

  var myTaskList = JSON.parse(localStorage.getItem("Banana"));
  var task = myTaskList.find(function (m) {
    return m.taskId === id;
  });
  hiddenTaskId.value = task.taskId;
  taskNameEdit.value = task.name;
  descriptionEdit.value = task.descrip;
  assigneeEdit.value = task.assign;
  taskDateEdit.value = task.taskDate;
  statusSelectEdit.value = task.stat;
}

function clearAll() {
  taskName.value = null;
  description.value = null;
  assignee.value = null;
  taskDate.value = null;
  statusSelect.value = null;
  taskName.classList.remove("is-valid", "is-valid");
  description.classList.remove("is-valid", "is-valid");
  assignee.classList.remove("is-valid", "is-valid");
  statusSelect.classList.remove("is-valid", "is-valid");
  taskDate.classList.remove("is-valid", "is-valid");
} //Task form validation  Begins here


taskName.addEventListener("input", function (event) {
  if (event.target.value && event.target.value.length >= 3) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    taskNameEvent = true;
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    taskNameEvent = false;
  }
});
assignee.addEventListener("input", function (event) {
  if (event.target.value && event.target.value.length >= 3) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    assigneeEvent = true;
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    assigneeEvent = false;
  }
});
description.addEventListener("input", function (event) {
  if (event.target.value && event.target.value.length >= 3) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    descriptionEvent = true;
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    descriptionEvent = false;
  }
});
statusSelect.addEventListener("input", function (event) {
  if (event.target.value) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    statusEvent = true;
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    statusEvent = false;
  }
});
taskDate.addEventListener("input", function (event) {
  if (event.target.value) {
    event.target.classList.remove("is-invalid");
    event.target.classList.add("is-valid");
    statusEvent = true;
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    statusEvent = false;
  }
}); // Task Form Validation Ends here
},{"./task.js":"task.js","./taskManager.js":"taskManager.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50210" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","FinalPLana.js"], null)
//# sourceMappingURL=/FinalPLana.5cc80c9a.js.map