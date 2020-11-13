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
})({"js/db.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDBdata = getDBdata;
exports.setDBdata = setDBdata;
exports.removeDBdata = removeDBdata;

//  localStorage 
function getDBdata(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setDBdata(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function removeDBdata(key) {
  localStorage.removeItem(key);
}
},{}],"js/renders/renderFavorites.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderFavorites = void 0;

var _db = require("../db");

//  renderFavorites  ===============================
const favoriteUl = document.querySelector('.favorite-ul');

const renderFavorites = ids => {
  let allCards = "<p>You don't have favorite movies</p>";

  if ((ids === null || ids === void 0 ? void 0 : ids.length) > 0) {
    const movies = (0, _db.getDBdata)('movies');
    const favoriteMovies = ids.map(id => movies[id]);
    (0, _db.removeDBdata)('favoriteMovies');
    (0, _db.setDBdata)('favoriteMovies', favoriteMovies);
    allCards = favoriteMovies.map((_ref) => {
      let {
        id,
        name
      } = _ref;
      return "\n      <li class=\"favorite-text\" data-id=\"".concat(id, "\">\n      <span class=\"favorite-name\">&rarr;&nbsp;&nbsp;").concat(name, "</span>\n      <span class=\"delete-mark\" data-id=\"").concat(id, "\">&times;</span>\n      \n      </li>\n      ");
    }).join('');
  }

  favoriteUl.innerHTML = "";
  favoriteUl.innerHTML = allCards;
};

exports.renderFavorites = renderFavorites;
},{"../db":"js/db.js"}],"js/renders/renderAllMoviesGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAllMoviesGrid = renderAllMoviesGrid;

var _db = require("../db");

//  renderAllMovies ==================
const moviesWrapper = document.querySelector('.movies-wrapper');

function renderAllMoviesGrid(movies) {
  if (!movies) {
    moviesWrapper.innerHTML = '';
    moviesWrapper.innerHTML = "\n      <div class=\"allert-warning text-center \" > localStorage empty</ >\n        <div class=\"allert-warning text-center \">Reload the app to get movies from the server</div>\n      ";
    return;
  }

  const allCards = Object.values(movies).map((_ref) => {
    let {
      id,
      img,
      name,
      year
    } = _ref;
    // get favorite movies from localStorage
    let favoriteMoviesId = (0, _db.getDBdata)('favoriteMoviesId');
    const dataAtributes = (favoriteMoviesId === null || favoriteMoviesId === void 0 ? void 0 : favoriteMoviesId.includes(id.toString())) ? "data-id=\"".concat(id, "\" data-star=\"favorite\"") : "data-id=\"".concat(id, "\" data-star=\"white\" ");
    const starColor = (favoriteMoviesId === null || favoriteMoviesId === void 0 ? void 0 : favoriteMoviesId.includes(id.toString())) ? 'star-gold' : 'star-white';
    return "\n        <div class=\"card\" ".concat(dataAtributes, "\" >\n        <div class=\"star ").concat(starColor, "\" ></div>\n        <img src=\"").concat(img, "\" class=\"movie-img\" alt=\"").concat(name, "\">\n        <div class=\"movie-body\">\n          <p class=\"movie-text text-center\">").concat(name, "</p>\n          <p class=\"movie-text text-center\">").concat(year, "</p>\n        </div>\n      </div>\n      ");
  }).join('');
  moviesWrapper.innerHTML = '';
  moviesWrapper.innerHTML = allCards;
}
},{"../db":"js/db.js"}],"js/renders/renderAllMoviesList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAllMoviesList = renderAllMoviesList;

var _db = require("../db");

var _helpers = require("../helpers");

//  renderAllMovies ==================
const moviesWrapper = document.querySelector('.movies-wrapper');

function renderAllMoviesList(movies) {
  if (!movies) {
    moviesWrapper.innerHTML = '';
    moviesWrapper.innerHTML = "\n      <div class=\"allert-warning text-center \" > localStorage empty</ >\n        <div class=\"allert-warning text-center \">Reload the app to get movies from the server</div>\n      ";
    return;
  }

  const allCards = Object.values(movies).map((_ref) => {
    let {
      id,
      img,
      name,
      year,
      description,
      genres
    } = _ref;
    // get favorite movies from localStorage
    let favoriteMoviesId = (0, _db.getDBdata)('favoriteMoviesId');
    const dataAtributes = (favoriteMoviesId === null || favoriteMoviesId === void 0 ? void 0 : favoriteMoviesId.includes(id.toString())) ? "data-id=\"".concat(id, "\" data-star=\"favorite\"") : "data-id=\"".concat(id, "\" data-star=\"white\" ");
    const starColor = (favoriteMoviesId === null || favoriteMoviesId === void 0 ? void 0 : favoriteMoviesId.includes(id.toString())) ? 'star-gold' : 'star-white';
    const genresList = genres.map(genre => "<span>".concat(genre, "</span>")).join('');
    return "\n        <div class=\"card list\" ".concat(dataAtributes, "\" >\n          <div class=\"star ").concat(starColor, "\" ></div>\n          <div class=\"movie-content-left\">\n \n           <img src=\"").concat(img, "\" class=\"movie-img\" alt=\"").concat(name, "\">\n          </div>\n\n          <div class=\"movie-content-rigth\">\n\n            <div class=\"movie-title\">\n              <span class=\"movie-text text-center\">").concat(name, "</span>\n              <span class=\"movie-text text-center\">").concat(year, "</span>\n            </div>\n\n            <div class=\"movie-description\">\n              ").concat((0, _helpers.truncate)(description, 120), "\n            </div>\n\n            <div class=\"movie-geners\">\n             ").concat(genresList, "\n            </div>\n\n          </div>\n\n        </div>\n      ");
  }).join('');
  moviesWrapper.innerHTML = '';
  moviesWrapper.innerHTML = allCards;
}
},{"../db":"js/db.js","../helpers":"js/helpers.js"}],"js/handlers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openNodal = openNodal;
exports.clickFavoriteUl = clickFavoriteUl;
exports.changeMoviesLayout = changeMoviesLayout;
exports.changeSelectedGener = changeSelectedGener;

var _helpers = require("./helpers");

var _db = require("./db");

var _renderFavorites = require("./renders/renderFavorites");

var _renderAllMoviesGrid = require("./renders/renderAllMoviesGrid");

var _renderAllMoviesList = require("./renders/renderAllMoviesList");

//  markFavoriteMovies
function markFavoriteMovies(e) {
  const star = e.target.closest('.star');

  if (star.classList.contains('star-gold')) {
    star.classList.remove('star-gold');
    star.classList.add('star-white');
  } else {
    star.classList.remove('star-white');
    star.classList.add('star-gold');
  }

  const card = e.target.closest('.card');
  card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white";
  const favoriteMoviesId = (0, _helpers.getFavorites)();
  (0, _db.removeDBdata)('favoriteMoviesId');
  (0, _db.setDBdata)('favoriteMoviesId', favoriteMoviesId);
  return favoriteMoviesId;
} //  openNodal callback


function openNodal(e) {
  if (e.target.closest('.star')) {
    const favoriteMoviesId = markFavoriteMovies(e);
    (0, _renderFavorites.renderFavorites)(favoriteMoviesId);
  }

  if (e.target.closest('.movie-img')) {
    (0, _helpers.openModalMovie)(e);
  }

  if (e.target.closest('.favorite-name')) {
    (0, _helpers.openModalMovie)(e);
  }
} //  clickFavoriteUl callback 


const moviesWrapper = document.querySelector('.movies-wrapper');

// import { getDBdata, setDBdata, removeDBdata } from './db'
function clickFavoriteUl(e) {
  const item = e.target.closest('.delete-mark');

  if (item) {
    const idRemove = item.dataset.id; // Reset favorite for Movie Galary (data-atribute & class)

    let card = [...moviesWrapper.querySelectorAll('.card')].filter(elem => +elem.dataset.id === +idRemove)[0];
    card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white";
    card.querySelector('.star').classList.remove('star-gold');
    card.querySelector('.star').classList.add('star-white'); // Reset favorite movies' 

    let favoriteMovies = (0, _db.getDBdata)('favoriteMovies');
    let newFavoriteMovies = favoriteMovies.filter(movie => +movie.id !== +idRemove);
    (0, _db.removeDBdata)('favoriteMovies');
    (0, _db.setDBdata)('favoriteMovies', newFavoriteMovies); // Reset favorite movies' id

    let favoriteMoviesId = (0, _db.getDBdata)('favoriteMoviesId');
    let newFavoriteMoviesId = favoriteMoviesId.filter(id => id !== idRemove);
    (0, _db.removeDBdata)('favoriteMoviesId');
    (0, _db.setDBdata)('favoriteMoviesId', newFavoriteMoviesId);
    (0, _renderFavorites.renderFavorites)(newFavoriteMoviesId);
  }
}

function changeMoviesLayout(e) {
  const target = e.target;
  const layout = target.dataset.layout; // if (!!layout) {
  //   removeDBdata('currentView')
  //   setDBdata('currentView', layout)
  //   console.log('if layout: ', layout);
  // }

  if (!!layout && layout == 'grid') {
    var _getDBdata;

    (0, _db.removeDBdata)('currentView');
    (0, _db.setDBdata)('currentView', layout);
    const movies = (0, _db.getDBdata)('moviesByGenres');
    const selectedGenre = (_getDBdata = (0, _db.getDBdata)('selectedGenre')) !== null && _getDBdata !== void 0 ? _getDBdata : 'all';
    (0, _renderAllMoviesGrid.renderAllMoviesGrid)(movies[selectedGenre]);
    target.classList.toggle('grid-gray');
    target.classList.toggle('grid-dark');
    const newTarget = target.parentElement.querySelector('[data-layout =\'list\']');
    newTarget.classList.toggle('list-dark');
    newTarget.classList.toggle('list-gray');
  }

  if (!!layout && layout == 'list') {
    var _getDBdata2;

    (0, _db.removeDBdata)('currentView');
    (0, _db.setDBdata)('currentView', layout);
    const movies = (0, _db.getDBdata)('moviesByGenres');
    const selectedGenre = (_getDBdata2 = (0, _db.getDBdata)('selectedGenre')) !== null && _getDBdata2 !== void 0 ? _getDBdata2 : 'all';
    (0, _renderAllMoviesList.renderAllMoviesList)(movies[selectedGenre]);
    target.classList.toggle('list-gray');
    target.classList.toggle('list-dark');
    const newTarget = target.parentElement.querySelector('[data-layout =\'grid\']');
    newTarget.classList.toggle('grid-dark');
    newTarget.classList.toggle('grid-gray');
  }
} //  Change selected gener


function changeSelectedGener(e) {
  var _getDBdata3;

  const selectedGenre = e.target.value;
  (0, _db.removeDBdata)(selectedGenre);
  (0, _db.setDBdata)('selectedGenre', selectedGenre);
  const movies = (0, _db.getDBdata)('moviesByGenres');
  const currentView = (_getDBdata3 = (0, _db.getDBdata)('currentView')) !== null && _getDBdata3 !== void 0 ? _getDBdata3 : 'list';
  currentView === 'grid' ? (0, _renderAllMoviesGrid.renderAllMoviesGrid)(movies[selectedGenre]) : (0, _renderAllMoviesList.renderAllMoviesList)(movies[selectedGenre]);
}
},{"./helpers":"js/helpers.js","./db":"js/db.js","./renders/renderFavorites":"js/renders/renderFavorites.js","./renders/renderAllMoviesGrid":"js/renders/renderAllMoviesGrid.js","./renders/renderAllMoviesList":"js/renders/renderAllMoviesList.js"}],"js/listeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addModalMovieListener = addModalMovieListener;
exports.addDashboardListener = addDashboardListener;

var _handlers = require("./handlers");

//  addModalMovieListener 
function addModalMovieListener() {
  const modal = document.querySelector('.modal');

  const closeModalHandler = e => {
    e.preventDefault();
    const target = e.target;

    if (target.classList.contains('modal') || target.classList.contains('modal-close')) {
      modal.classList.add('modal-hide');
      modal.removeEventListener('click', closeModalHandler);
    }
  };

  modal.addEventListener('click', closeModalHandler);
} //  addDashboardListener


function addDashboardListener() {
  const customSelect = document.querySelector('.custom-select');
  customSelect.addEventListener('click', _handlers.changeSelectedGener); //  @ Movies view (grid/list) selector

  const dashboardView = document.querySelector('.dashboard-view');
  dashboardView.addEventListener('click', _handlers.changeMoviesLayout);
}
},{"./handlers":"js/handlers.js"}],"js/renders/renderModalMovie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderModalMovie = void 0;

var _listeners = require("../listeners");

var _db = require("../db");

//  renderModalMovie   =====================
const movieContent = document.querySelector('.modal > .movie-content');

const renderModalMovie = id => {
  const modalMovie = (0, _db.getDBdata)('movies')[id];

  if (!modalMovie) {
    movieContent.innerHTML = '';
    movieContent.innerHTML = "\n      <div class=\"allert-warning text-center\">localStorage empty. &nbsp;</div>\n      <div class=\"allert-warning text-center \">Reload app to get movies from the server</div>\n      ";
    return;
  }

  const {
    name,
    img,
    description,
    year,
    genres,
    director,
    starring
  } = modalMovie;
  const genresList = genres.map(genre => "<span>".concat(genre, "</span>")).join('');
  const starringList = starring.map(star => "&nbsp;<span>".concat(star, "</span>")).join(',');
  const content = "\n      <div class=\"modal-close\">&times;</div>\n      <div class=\"movie-content-left\">\n        <img src=".concat(img, " class=\"movie-img\"\n          alt=\"").concat(name, "\">\n        <div class=\"movie-star-year\">\n          <div class=\"movie-star\">&star;</div>\n          <div class=\"movie-year\">").concat(year, "</div>\n        </div>\n        <div class=\"movie-geners\">").concat(genresList, "\n        </div>\n      </div>\n     \n      <div class=\"movie-content-right\">\n        <div class=\"movie-title\">").concat(name, "</div>\n        <div class=\"movie-description\">\n         ").concat(description, "\n        </div>\n        <div class=\"movie-director\">\n          <span class=\"movie-text-bold\">Director:</span>\n          ").concat(director, "\n        </div>\n        <div class=\"movie-starting\">\n          <span class=\"movie-text-bold\">Starting 2:&nbsp;</span>\n          ").concat(starringList, "\n          <span>Tony Goldwyn&nbsp;</span>\n        </div>\n       </div>\n\n      </div>\n    ");
  movieContent.innerHTML = '';
  movieContent.innerHTML = content;
  (0, _listeners.addModalMovieListener)();
};

exports.renderModalMovie = renderModalMovie;
},{"../listeners":"js/listeners.js","../db":"js/db.js"}],"js/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openModalMovie = openModalMovie;
exports.getFavorites = getFavorites;
exports.groupMoviesByGenres = groupMoviesByGenres;
exports.truncate = truncate;

var _renderModalMovie = require("./renders/renderModalMovie");

// openModalMovieHandler
function openModalMovie(e) {
  var _e$target$closest;

  const id = (_e$target$closest = e.target.closest('[data-id]')) === null || _e$target$closest === void 0 ? void 0 : _e$target$closest.dataset.id;

  if (!id) {
    return;
  }

  (0, _renderModalMovie.renderModalMovie)(id);
  const modal = document.querySelector('.modal');
  modal.classList.remove('modal-hide');
} // getFavorites 


const moviesWrapper = document.querySelector('.movies-wrapper');

function getFavorites() {
  return [...moviesWrapper.querySelectorAll('.card')].filter(card => card.dataset.star === 'favorite').map(card => card.dataset.id);
} // Grouping movies by genres 


function groupMoviesByGenres(movies, genres) {
  //  All geners 
  const allGeners = [...new Set(movies.map(movie => movie[genres]).flat())]; // Grouping movies by genres

  const moviesByGeners = {
    'all': movies
  };

  for (let value of allGeners) {
    moviesByGeners[value] = movies.filter(movie => movie[genres].includes(value));
  }

  allGeners.unshift('all');
  return [allGeners, moviesByGeners];
} //  Truncate paragraph length


function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' ';
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(' '));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + '...';
  }

  return str;
}
},{"./renders/renderModalMovie":"js/renders/renderModalMovie.js"}],"js/renders/renderDashboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDashboard = void 0;

var _db = require("../db");

var _listeners = require("../listeners");

const renderDashboard = () => {
  var _getDBdata;

  const dashboard = document.querySelector('.dashboard');
  const genres = (_getDBdata = (0, _db.getDBdata)('genres')) !== null && _getDBdata !== void 0 ? _getDBdata : [];
  const genresOptionsList = genres.map(genre => {
    return "<option value=\"".concat(genre, "\">").concat(genre, "</option>");
  }).join('');
  const dashboardContent = "\n        <div class=\"dashboard-select\">\n        <select class=\"custom-select\">\n          <option selected>select genre</option>\n          ".concat(genresOptionsList, "\n        </select>\n      </div>\n\n      <div class=\"dashboard-view\">\n        <div class=\"view-text\">view as:</div>\n        <div class=\"svg-icon grid-dark\" data-layout=\"grid\"></div>\n        <div class=\"svg-icon list-gray\" data-layout=\"list\"></div>\n      </div>\n  ");
  dashboard.innerHTML = '';
  dashboard.innerHTML = dashboardContent;
  (0, _listeners.addDashboardListener)();
};

exports.renderDashboard = renderDashboard;
},{"../db":"js/db.js","../listeners":"js/listeners.js"}],"js/fetchData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;

var _db = require("./db");

var _helpers = require("./helpers");

var _renderAllMoviesGrid = require("./renders/renderAllMoviesGrid");

var _renderDashboard = require("./renders/renderDashboard");

// @ Get all movies from remote server 
//  and save them to localStorage
// Fetch movies from remote server
async function fetchData(url) {
  try {
    var _getDBdata;

    const response = await fetch(url);
    const movies = await response.json();
    movies.map(item => {
      if (item.name === 'The Matrix') {
        item.img = "https://image.tmdb.org/t/p/w500/zE3dfBIYNMBXQrhQaCyZl99wwS0.jpg";
      }
    });
    const idSet = new Set(movies.map(movie => movie.id));
    const moviesById = {};

    for (let value of idSet) {
      moviesById[value] = movies.filter(item => item.id === value)[0];
    }

    (0, _db.removeDBdata)('movies');
    (0, _db.setDBdata)('movies', moviesById); // Grouping movies by genres 

    const [allGeners, moviesByGeners] = (0, _helpers.groupMoviesByGenres)(movies, 'genres');
    (0, _db.removeDBdata)('genres');
    (0, _db.setDBdata)('genres', allGeners);
    (0, _db.removeDBdata)('moviesByGenres');
    (0, _db.setDBdata)('moviesByGenres', moviesByGeners);
    (0, _renderDashboard.renderDashboard)();
    const selectedGenre = (_getDBdata = (0, _db.getDBdata)('selectedGenre')) !== null && _getDBdata !== void 0 ? _getDBdata : 'all';
    (0, _renderAllMoviesGrid.renderAllMoviesGrid)(moviesByGeners[selectedGenre]);
  } catch (err) {
    console.log("Problem with fetching data: ".concat(err.message));
  }
}
},{"./db":"js/db.js","./helpers":"js/helpers.js","./renders/renderAllMoviesGrid":"js/renders/renderAllMoviesGrid.js","./renders/renderDashboard":"js/renders/renderDashboard.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _db = require("./js/db");

var _fetchData = require("./js/fetchData");

var _renderFavorites = require("./js/renders/renderFavorites");

var _handlers = require("./js/handlers");

// import { renderDashboard } from './js/renders/renderDashboard'
// Constants 
const FullList = "http://my-json-server.typicode.com/moviedb-tech/movies/list"; //  Fetch data from server 

(0, _fetchData.fetchData)(FullList); // @ Render favorite movies list

(0, _renderFavorites.renderFavorites)((0, _db.getDBdata)('favoriteMoviesId')); // EventListeners
// @ Movies gallery wrapper

const moviesGallery = document.querySelector('.movie-gallery');
moviesGallery.addEventListener('click', _handlers.openNodal); // @ Favorite list

const favoriteUl = document.querySelector('.favorite-ul');
favoriteUl.addEventListener('click', _handlers.clickFavoriteUl);
},{"./js/db":"js/db.js","./js/fetchData":"js/fetchData.js","./js/renders/renderFavorites":"js/renders/renderFavorites.js","./js/handlers":"js/handlers.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49303" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map