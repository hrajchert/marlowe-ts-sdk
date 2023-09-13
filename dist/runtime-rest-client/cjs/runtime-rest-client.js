'use strict';

var index = require('./index-040eb70b.js');
var codec = require('@marlowe.io/adapter/codec');
var HTTP = require('@marlowe.io/adapter/http');
var withdrawal = require('./index-8e88b58e.js');
var transaction = require('./index-013e987d.js');
var runtimeCore = require('@marlowe.io/runtime-core');
var languageCoreV1 = require('@marlowe.io/language-core-v1');
var state = require('@marlowe.io/language-core-v1/state');
var version = require('@marlowe.io/language-core-v1/version');
var time = require('@marlowe.io/adapter/time');
var next = require('@marlowe.io/language-core-v1/next');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var HTTP__namespace = /*#__PURE__*/_interopNamespaceDefault(HTTP);

function bind$2(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray: isArray$4} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer$1(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString$1 = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber$1 = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean$1 = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate$1 = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray$4(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge$1(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge$1(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge$1({}, val);
    } else if (isArray$4(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind$2(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray$1 = (thing) => {
  if (!thing) return null;
  if (isArray$4(thing)) return thing;
  let i = thing.length;
  if (!isNumber$1(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty$1 = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp$2 = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray$4(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray$4(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

var utils$4 = {
  isArray: isArray$4,
  isArrayBuffer,
  isBuffer: isBuffer$1,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isBoolean: isBoolean$1,
  isObject,
  isPlainObject,
  isUndefined,
  isDate: isDate$1,
  isFile,
  isBlob,
  isRegExp: isRegExp$2,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge: merge$1,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray: toArray$1,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: hasOwnProperty$1,
  hasOwnProp: hasOwnProperty$1, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils$4.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$4.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$4.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$4.isPlainObject(thing) || utils$4.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$4.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$4.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$4.toFlatObject(utils$4, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$4.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$4.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$4.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$4.isSpecCompliantForm(formData);

  if (!utils$4.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$4.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$4.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$4.isArrayBuffer(value) || utils$4.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$4.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$4.isArray(value) && isFlatArray(value)) ||
        ((utils$4.isFileList(value) || utils$4.endsWith(key, '[]')) && (arr = utils$4.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$4.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$4.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$4.forEach(value, function each(el, key) {
      const result = !(utils$4.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$4.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$4.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$2(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$2);
  } : encode$2;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode$1(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode$1;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$4.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$4.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$4.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$4.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject$1(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$4.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$4.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$4.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$4.isArray(target[name])) {
      target[name] = arrayToObject$1(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$4.isFormData(formData) && utils$4.isFunction(formData.entries)) {
    const obj = {};

    utils$4.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$4.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$4.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults$2 = {

  transitional: transitionalDefaults,

  adapter: platform.isNode ? 'http' : 'xhr',

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$4.isObject(data);

    if (isObjectPayload && utils$4.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$4.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$4.isArrayBuffer(data) ||
      utils$4.isBuffer(data) ||
      utils$4.isStream(data) ||
      utils$4.isFile(data) ||
      utils$4.isBlob(data)
    ) {
      return data;
    }
    if (utils$4.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$4.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$4.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults$2.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils$4.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$4.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults$2.headers[method] = {};
});

var defaults$3 = defaults$2;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$4.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$4.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$4.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$4.isString(value)) return;

  if (utils$4.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$4.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$4.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$4.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$4.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$4.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$4.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$4.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$4.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$4.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$4.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$4.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$4.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$4.forEach(this, (value, header) => {
      const key = utils$4.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$4.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$4.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$4.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$4.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$4.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$3;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$4.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$4.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils$4.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils$4.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils$4.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils$4.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils$4.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else {
        requestHeaders.setContentType('multipart/form-data;', false); // mobile/desktop app frameworks
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$4.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$4.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils$4.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils$4.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils$4.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils$4.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils$4.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$3.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils$4.isPlainObject(target) && utils$4.isPlainObject(source)) {
      return utils$4.merge.call({caseless}, target, source);
    } else if (utils$4.isPlainObject(source)) {
      return utils$4.merge({}, source);
    } else if (utils$4.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$4.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$4.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$4.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils$4.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$4.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.5.0";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$4.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$4.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$4.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$4.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$4.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$4.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind$2(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$4.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$4.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$3);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$4.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

// this module should only have a default export
var axios$1 = axios;

var TaskEither = {};

var Compactable$1 = {};

var __createBinding$1 = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(Compactable$1, "__esModule", { value: true });
Compactable$1.getCompactableComposition = Compactable$1.separate = Compactable$1.compact = void 0;
var function_1$4 = index._function;
var Functor_1$2 = index.Functor;
var Option_1$1 = withdrawal.Option;
var S = __importStar$1(index.Separated);
function compact$2(F, G) {
    return function (fga) { return F.map(fga, G.compact); };
}
Compactable$1.compact = compact$2;
function separate$1(F, C, G) {
    var _compact = compact$2(F, C);
    var _map = (0, Functor_1$2.map)(F, G);
    return function (fge) { return S.separated(_compact((0, function_1$4.pipe)(fge, _map(Option_1$1.getLeft))), _compact((0, function_1$4.pipe)(fge, _map(Option_1$1.getRight)))); };
}
Compactable$1.separate = separate$1;
/** @deprecated */
function getCompactableComposition(F, G) {
    var map = (0, Functor_1$2.getFunctorComposition)(F, G).map;
    return {
        map: map,
        compact: compact$2(F, G),
        separate: separate$1(F, G, G)
    };
}
Compactable$1.getCompactableComposition = getCompactableComposition;

var EitherT = {};

var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(EitherT, "__esModule", { value: true });
EitherT.getEitherM = EitherT.toUnion = EitherT.swap = EitherT.orLeft = EitherT.tapError = EitherT.orElseFirst = EitherT.orElse = EitherT.getOrElse = EitherT.matchE = EitherT.match = EitherT.altValidation = EitherT.mapError = EitherT.mapLeft = EitherT.mapBoth = EitherT.bimap = EitherT.alt = EitherT.flatMap = EitherT.chain = EitherT.ap = EitherT.map = EitherT.chainNullableK = EitherT.fromNullableK = EitherT.fromNullable = EitherT.leftF = EitherT.rightF = EitherT.left = EitherT.right = void 0;
var Apply_1 = index.Apply;
var E = __importStar(index.Either);
var function_1$3 = index._function;
var Functor_1$1 = index.Functor;
function right(F) {
    return (0, function_1$3.flow)(E.right, F.of);
}
EitherT.right = right;
function left(F) {
    return (0, function_1$3.flow)(E.left, F.of);
}
EitherT.left = left;
function rightF(F) {
    return function (fa) { return F.map(fa, E.right); };
}
EitherT.rightF = rightF;
function leftF(F) {
    return function (fe) { return F.map(fe, E.left); };
}
EitherT.leftF = leftF;
function fromNullable(F) {
    return function (e) { return (0, function_1$3.flow)(E.fromNullable(e), F.of); };
}
EitherT.fromNullable = fromNullable;
function fromNullableK(F) {
    var fromNullableF = fromNullable(F);
    return function (e) {
        var fromNullableFE = fromNullableF(e);
        return function (f) { return (0, function_1$3.flow)(f, fromNullableFE); };
    };
}
EitherT.fromNullableK = fromNullableK;
function chainNullableK(M) {
    var chainM = chain(M);
    var fromNullableKM = fromNullableK(M);
    return function (e) {
        var fromNullableKMe = fromNullableKM(e);
        return function (f) { return chainM(fromNullableKMe(f)); };
    };
}
EitherT.chainNullableK = chainNullableK;
function map$1(F) {
    return (0, Functor_1$1.map)(F, E.Functor);
}
EitherT.map = map$1;
function ap(F) {
    return (0, Apply_1.ap)(F, E.Apply);
}
EitherT.ap = ap;
function chain(M) {
    var flatMapM = flatMap(M);
    return function (f) { return function (ma) { return flatMapM(ma, f); }; };
}
EitherT.chain = chain;
/** @internal */
function flatMap(M) {
    return function (ma, f) { return M.chain(ma, function (e) { return (E.isLeft(e) ? M.of(e) : f(e.right)); }); };
}
EitherT.flatMap = flatMap;
function alt(M) {
    return function (second) { return function (first) { return M.chain(first, function (e) { return (E.isLeft(e) ? second() : M.of(e)); }); }; };
}
EitherT.alt = alt;
function bimap(F) {
    var mapBothF = mapBoth(F);
    return function (f, g) { return function (self) { return mapBothF(self, f, g); }; };
}
EitherT.bimap = bimap;
/** @internal */
function mapBoth(F) {
    return function (self, f, g) { return F.map(self, E.bimap(f, g)); };
}
EitherT.mapBoth = mapBoth;
function mapLeft(F) {
    var mapErrorF = mapError(F);
    return function (f) { return function (self) { return mapErrorF(self, f); }; };
}
EitherT.mapLeft = mapLeft;
/** @internal */
function mapError(F) {
    return function (self, f) { return F.map(self, E.mapLeft(f)); };
}
EitherT.mapError = mapError;
function altValidation(M, S) {
    return function (second) { return function (first) {
        return M.chain(first, E.match(function (e1) {
            return M.map(second(), E.mapLeft(function (e2) { return S.concat(e1, e2); }));
        }, right(M)));
    }; };
}
EitherT.altValidation = altValidation;
function match(F) {
    return function (onLeft, onRight) { return function (ma) { return F.map(ma, E.match(onLeft, onRight)); }; };
}
EitherT.match = match;
function matchE(M) {
    return function (onLeft, onRight) { return function (ma) { return M.chain(ma, E.match(onLeft, onRight)); }; };
}
EitherT.matchE = matchE;
function getOrElse(M) {
    return function (onLeft) { return function (ma) { return M.chain(ma, E.match(onLeft, M.of)); }; };
}
EitherT.getOrElse = getOrElse;
function orElse(M) {
    return function (onLeft) { return function (ma) { return M.chain(ma, function (e) { return (E.isLeft(e) ? onLeft(e.left) : M.of(e)); }); }; };
}
EitherT.orElse = orElse;
function orElseFirst(M) {
    var tapErrorM = tapError(M);
    return function (onLeft) { return function (ma) { return tapErrorM(ma, onLeft); }; };
}
EitherT.orElseFirst = orElseFirst;
/** @internal */
function tapError(M) {
    var orElseM = orElse(M);
    return function (ma, onLeft) {
        return (0, function_1$3.pipe)(ma, orElseM(function (e) { return M.map(onLeft(e), function (eb) { return (E.isLeft(eb) ? eb : E.left(e)); }); }));
    };
}
EitherT.tapError = tapError;
function orLeft(M) {
    return function (onLeft) { return function (ma) {
        return M.chain(ma, E.match(function (e) { return M.map(onLeft(e), E.left); }, function (a) { return M.of(E.right(a)); }));
    }; };
}
EitherT.orLeft = orLeft;
function swap(F) {
    return function (ma) { return F.map(ma, E.swap); };
}
EitherT.swap = swap;
function toUnion(F) {
    return function (fa) { return F.map(fa, E.toUnion); };
}
EitherT.toUnion = toUnion;
/** @deprecated  */
/* istanbul ignore next */
function getEitherM(M) {
    var _ap = ap(M);
    var _map = map$1(M);
    var _chain = chain(M);
    var _alt = alt(M);
    var _bimap = bimap(M);
    var _mapLeft = mapLeft(M);
    var _fold = matchE(M);
    var _getOrElse = getOrElse(M);
    var _orElse = orElse(M);
    return {
        map: function (fa, f) { return (0, function_1$3.pipe)(fa, _map(f)); },
        ap: function (fab, fa) { return (0, function_1$3.pipe)(fab, _ap(fa)); },
        of: right(M),
        chain: function (ma, f) { return (0, function_1$3.pipe)(ma, _chain(f)); },
        alt: function (fa, that) { return (0, function_1$3.pipe)(fa, _alt(that)); },
        bimap: function (fea, f, g) { return (0, function_1$3.pipe)(fea, _bimap(f, g)); },
        mapLeft: function (fea, f) { return (0, function_1$3.pipe)(fea, _mapLeft(f)); },
        fold: function (fa, onLeft, onRight) { return (0, function_1$3.pipe)(fa, _fold(onLeft, onRight)); },
        getOrElse: function (fa, onLeft) { return (0, function_1$3.pipe)(fa, _getOrElse(onLeft)); },
        orElse: function (fa, f) { return (0, function_1$3.pipe)(fa, _orElse(f)); },
        swap: swap(M),
        rightM: rightF(M),
        leftM: leftF(M),
        left: left(M)
    };
}
EitherT.getEitherM = getEitherM;

var Filterable$1 = {};

Object.defineProperty(Filterable$1, "__esModule", { value: true });
Filterable$1.getFilterableComposition = Filterable$1.partitionMap = Filterable$1.partition = Filterable$1.filterMap = Filterable$1.filter = void 0;
/**
 * `Filterable` represents data structures which can be _partitioned_/_filtered_.
 *
 * Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Filterable.purs
 *
 * @since 2.0.0
 */
var Compactable_1 = Compactable$1;
var function_1$2 = index._function;
var Functor_1 = index.Functor;
var Option_1 = withdrawal.Option;
var Predicate_1 = withdrawal.Predicate;
var Separated_1 = index.Separated;
function filter$1(F, G) {
    return function (predicate) { return function (fga) { return F.map(fga, function (ga) { return G.filter(ga, predicate); }); }; };
}
Filterable$1.filter = filter$1;
function filterMap$1(F, G) {
    return function (f) { return function (fga) { return F.map(fga, function (ga) { return G.filterMap(ga, f); }); }; };
}
Filterable$1.filterMap = filterMap$1;
function partition$1(F, G) {
    var _filter = filter$1(F, G);
    return function (predicate) {
        var left = _filter((0, Predicate_1.not)(predicate));
        var right = _filter(predicate);
        return function (fgb) { return (0, Separated_1.separated)(left(fgb), right(fgb)); };
    };
}
Filterable$1.partition = partition$1;
function partitionMap$1(F, G) {
    var _filterMap = filterMap$1(F, G);
    return function (f) { return function (fga) {
        return (0, Separated_1.separated)((0, function_1$2.pipe)(fga, _filterMap(function (a) { return (0, Option_1.getLeft)(f(a)); })), (0, function_1$2.pipe)(fga, _filterMap(function (a) { return (0, Option_1.getRight)(f(a)); })));
    }; };
}
Filterable$1.partitionMap = partitionMap$1;
/** @deprecated */
function getFilterableComposition(F, G) {
    var map = (0, Functor_1.getFunctorComposition)(F, G).map;
    var _compact = (0, Compactable_1.compact)(F, G);
    var _separate = (0, Compactable_1.separate)(F, G, G);
    var _filter = filter$1(F, G);
    var _filterMap = filterMap$1(F, G);
    var _partition = partition$1(F, G);
    var _partitionMap = partitionMap$1(F, G);
    return {
        map: map,
        compact: _compact,
        separate: _separate,
        filter: function (fga, f) { return (0, function_1$2.pipe)(fga, _filter(f)); },
        filterMap: function (fga, f) { return (0, function_1$2.pipe)(fga, _filterMap(f)); },
        partition: function (fga, p) { return (0, function_1$2.pipe)(fga, _partition(p)); },
        partitionMap: function (fga, f) { return (0, function_1$2.pipe)(fga, _partitionMap(f)); }
    };
}
Filterable$1.getFilterableComposition = getFilterableComposition;

var FromIO = {};

Object.defineProperty(FromIO, "__esModule", { value: true });
FromIO.tapIO = FromIO.chainFirstIOK = FromIO.chainIOK = FromIO.fromIOK = void 0;
/**
 * Lift a computation from the `IO` monad
 *
 * @since 2.10.0
 */
var Chain_1$1 = index.Chain;
var function_1$1 = index._function;
function fromIOK(F) {
    return function (f) { return (0, function_1$1.flow)(f, F.fromIO); };
}
FromIO.fromIOK = fromIOK;
function chainIOK(F, M) {
    return function (f) {
        var g = (0, function_1$1.flow)(f, F.fromIO);
        return function (first) { return M.chain(first, g); };
    };
}
FromIO.chainIOK = chainIOK;
function chainFirstIOK(F, M) {
    var tapIOM = tapIO(F, M);
    return function (f) { return function (first) { return tapIOM(first, f); }; };
}
FromIO.chainFirstIOK = chainFirstIOK;
/** @internal */
function tapIO(F, M) {
    var chainFirstM = (0, Chain_1$1.tap)(M);
    return function (self, f) { return chainFirstM(self, (0, function_1$1.flow)(f, F.fromIO)); };
}
FromIO.tapIO = tapIO;

var FromTask = {};

Object.defineProperty(FromTask, "__esModule", { value: true });
FromTask.tapTask = FromTask.chainFirstTaskK = FromTask.chainTaskK = FromTask.fromTaskK = void 0;
/**
 * Lift a computation from the `Task` monad
 *
 * @since 2.10.0
 */
var Chain_1 = index.Chain;
var function_1 = index._function;
function fromTaskK(F) {
    return function (f) { return (0, function_1.flow)(f, F.fromTask); };
}
FromTask.fromTaskK = fromTaskK;
function chainTaskK(F, M) {
    return function (f) {
        var g = (0, function_1.flow)(f, F.fromTask);
        return function (first) { return M.chain(first, g); };
    };
}
FromTask.chainTaskK = chainTaskK;
function chainFirstTaskK(F, M) {
    var tapTaskM = tapTask(F, M);
    return function (f) { return function (first) { return tapTaskM(first, f); }; };
}
FromTask.chainFirstTaskK = chainFirstTaskK;
/** @internal */
function tapTask(F, M) {
    var tapM = (0, Chain_1.tap)(M);
    return function (self, f) { return tapM(self, (0, function_1.flow)(f, F.fromTask)); };
}
FromTask.tapTask = tapTask;

var Task = {};

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.never = exports.FromTask = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.tapIO = exports.tap = exports.flatMapIO = exports.FromIO = exports.MonadTask = exports.fromTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecond = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.getRaceMonoid = exports.URI = exports.flatten = exports.flatMap = exports.of = exports.ap = exports.map = exports.delay = exports.fromIO = void 0;
	exports.getMonoid = exports.getSemigroup = exports.taskSeq = exports.task = exports.chainFirst = exports.chain = void 0;
	/**
	 * ```ts
	 * interface Task<A> {
	 *   (): Promise<A>
	 * }
	 * ```
	 *
	 * `Task<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.
	 * If you want to represent an asynchronous computation that may fail, please see `TaskEither`.
	 *
	 * @since 2.0.0
	 */
	var Applicative_1 = index.Applicative;
	var Apply_1 = index.Apply;
	var chainable = __importStar(index.Chain);
	var FromIO_1 = FromIO;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromIO = function (ma) { return function () { return Promise.resolve().then(ma); }; };
	exports.fromIO = fromIO;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Creates a task that will complete after a time delay
	 *
	 * @example
	 * import { sequenceT } from 'fp-ts/Apply'
	 * import * as T from 'fp-ts/Task'
	 * import { takeRight } from 'fp-ts/Array'
	 *
	 * async function test() {
	 *   const log: Array<string> = []
	 *   const append = (message: string): T.Task<void> =>
	 *     T.fromIO(() => {
	 *       log.push(message)
	 *     })
	 *   const fa = append('a')
	 *   const fb = T.delay(20)(append('b'))
	 *   const fc = T.delay(10)(append('c'))
	 *   const fd = append('d')
	 *   await sequenceT(T.ApplyPar)(fa, fb, fc, fd)()
	 *   assert.deepStrictEqual(takeRight(2)(log), ['c', 'b'])
	 * }
	 *
	 * test()
	 *
	 * @since 2.0.0
	 */
	function delay(millis) {
	    return function (ma) { return function () {
	        return new Promise(function (resolve) {
	            setTimeout(function () {
	                Promise.resolve().then(ma).then(resolve);
	            }, millis);
	        });
	    }; };
	}
	exports.delay = delay;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) { return function () {
	    return Promise.resolve().then(fa).then(f);
	}; }; };
	exports.map = map;
	/**
	 * @since 2.0.0
	 */
	var ap = function (fa) { return function (fab) { return function () {
	    return Promise.all([Promise.resolve().then(fab), Promise.resolve().then(fa)]).then(function (_a) {
	        var f = _a[0], a = _a[1];
	        return f(a);
	    });
	}; }; };
	exports.ap = ap;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var of = function (a) { return function () { return Promise.resolve(a); }; };
	exports.of = of;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return function () {
	        return Promise.resolve()
	            .then(ma)
	            .then(function (a) { return f(a)(); });
	    };
	});
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Task';
	/**
	 * Monoid returning the first completed task.
	 *
	 * Note: uses `Promise.race` internally.
	 *
	 * @example
	 * import * as T from 'fp-ts/Task'
	 *
	 * async function test() {
	 *   const S = T.getRaceMonoid<string>()
	 *   const fa = T.delay(20)(T.of('a'))
	 *   const fb = T.delay(10)(T.of('b'))
	 *   assert.deepStrictEqual(await S.concat(fa, fb)(), 'b')
	 * }
	 *
	 * test()
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	function getRaceMonoid() {
	    return {
	        concat: function (x, y) { return function () { return Promise.race([Promise.resolve().then(x), Promise.resolve().then(y)]); }; },
	        empty: exports.never
	    };
	}
	exports.getRaceMonoid = getRaceMonoid;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the value to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the value to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO
	};
	/**
	 * @category zone of death
	 * @since 2.7.0
	 * @deprecated
	 */
	exports.fromTask = function_1.identity;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as T from 'fp-ts/Task'
	 * import * as Console from 'fp-ts/Console'
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effect = pipe(
	 *   T.of('fp-ts'),
	 *   T.tapIO((value) => Console.log(`Hello, ${value}`)),
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), 'fp-ts')
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromIOK = 
	/*#__PURE__*/ (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * A `Task` that never completes.
	 *
	 * @since 2.0.0
	 */
	var never = function () { return new Promise(function (_) { return undefined; }); };
	exports.never = never;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return function (as) {
	        return function () {
	            return Promise.all(as.map(function (a, i) { return Promise.resolve().then(function () { return f(i, a)(); }); }));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (bs) {
	                    return Promise.resolve()
	                        .then(f(i + 1, a))
	                        .then(function (b) {
	                        bs.push(b);
	                        return bs;
	                    });
	                });
	            }, Promise.resolve()
	                .then(f(0, _.head(as)))
	                .then(_.singleton));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); });
	};
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) {
	    return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); });
	};
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.task`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.task = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `T.Functor` instead of `T.taskSeq`
	 * (where `T` is from `import T from 'fp-ts/Task'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskSeq = {
	    URI: exports.URI,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getSemigroup = (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * Lift a monoid into 'Task', the inner values are concatenated using the provided `Monoid`.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getMonoid = (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq); 
} (Task));

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __awaiter = (index.commonjsGlobal && index.commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (index.commonjsGlobal && index.commonjsGlobal.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (g && (g = 0, op[0] && (_ = 0)), _) try {
	            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [op[0] & 2, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.throwError = exports.of = exports.altW = exports.alt = exports.flatten = exports.flattenW = exports.flatMap = exports.apW = exports.ap = exports.mapLeft = exports.mapError = exports.bimap = exports.mapBoth = exports.map = exports.fromIOEitherK = exports.chainTaskOptionK = exports.chainTaskOptionKW = exports.fromTaskOptionK = exports.swap = exports.orLeft = exports.orElseFirstTaskK = exports.orElseFirstIOK = exports.tapError = exports.orElseW = exports.orElse = exports.chainNullableK = exports.fromNullableK = exports.fromNullable = exports.toUnion = exports.tryCatchK = exports.tryCatch = exports.getOrElseW = exports.getOrElse = exports.foldW = exports.matchEW = exports.fold = exports.matchE = exports.matchW = exports.match = exports.fromTaskOption = exports.fromIOEither = exports.fromEither = exports.fromTask = exports.fromIO = exports.leftIO = exports.rightIO = exports.leftTask = exports.rightTask = exports.right = exports.left = void 0;
	exports.fromPredicate = exports.chainFirstEitherKW = exports.chainFirstEitherK = exports.chainEitherKW = exports.chainEitherK = exports.flatMapTaskOption = exports.flatMapIOEither = exports.flatMapTask = exports.flatMapIO = exports.flatMapEither = exports.flatMapOption = exports.flatMapNullable = exports.liftOption = exports.liftNullable = exports.chainOptionKW = exports.chainOptionK = exports.fromOptionK = exports.fromOption = exports.Alt = exports.Bifunctor = exports.tapTask = exports.tapIO = exports.tapEither = exports.tap = exports.FromTask = exports.FromIO = exports.FromEither = exports.MonadThrow = exports.MonadTask = exports.MonadIO = exports.Monad = exports.Chain = exports.ApplicativeSeq = exports.ApplySeq = exports.ApplicativePar = exports.apSecondW = exports.apSecond = exports.apFirstW = exports.apFirst = exports.ApplyPar = exports.Pointed = exports.flap = exports.asUnit = exports.as = exports.Functor = exports.getFilterable = exports.getCompactable = exports.getAltTaskValidation = exports.getApplicativeTaskValidation = exports.URI = void 0;
	exports.getTaskValidation = exports.getSemigroup = exports.getApplyMonoid = exports.getApplySemigroup = exports.taskEitherSeq = exports.taskEither = exports.orElseFirstW = exports.orElseFirst = exports.chainFirstW = exports.chainFirst = exports.chainW = exports.chain = exports.sequenceSeqArray = exports.traverseSeqArray = exports.traverseSeqArrayWithIndex = exports.sequenceArray = exports.traverseArray = exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq = exports.traverseReadonlyNonEmptyArrayWithIndexSeq = exports.traverseReadonlyArrayWithIndex = exports.traverseReadonlyNonEmptyArrayWithIndex = exports.ApT = exports.apSW = exports.apS = exports.bindW = exports.bind = exports.let = exports.bindTo = exports.Do = exports.bracketW = exports.bracket = exports.taskify = exports.chainIOEitherK = exports.chainIOEitherKW = exports.chainFirstTaskK = exports.chainTaskK = exports.fromTaskK = exports.chainFirstIOK = exports.chainIOK = exports.fromIOK = exports.fromEitherK = exports.filterOrElseW = exports.filterOrElse = void 0;
	var Applicative_1 = index.Applicative;
	var Apply_1 = index.Apply;
	var chainable = __importStar(index.Chain);
	var Compactable_1 = Compactable$1;
	var E = __importStar(index.Either);
	var ET = __importStar(EitherT);
	var Filterable_1 = Filterable$1;
	var FromEither_1 = index.FromEither;
	var FromIO_1 = FromIO;
	var FromTask_1 = FromTask;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var T = __importStar(Task);
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.left = ET.left(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.right = ET.right(T.Pointed);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightTask = ET.rightF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftTask = ET.leftF(T.Functor);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.rightIO = (0, function_1.flow)(T.fromIO, exports.rightTask);
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.leftIO = (0, function_1.flow)(T.fromIO, exports.leftTask);
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromIO = exports.rightIO;
	/**
	 * @category conversions
	 * @since 2.7.0
	 */
	exports.fromTask = exports.rightTask;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromEither = T.of;
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromIOEither = T.fromIO;
	/**
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromTaskOption = function (onNone) {
	    return T.map(E.fromOption(onNone));
	};
	exports.fromTaskOption = fromTaskOption;
	/**
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.match = 
	/*#__PURE__*/ ET.match(T.Functor);
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchW = exports.match;
	/**
	 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`Task`).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchE = ET.matchE(T.Monad);
	/**
	 * Alias of [`matchE`](#matche).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.fold = exports.matchE;
	/**
	 * Less strict version of [`matchE`](#matche).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchEW = exports.matchE;
	/**
	 * Alias of [`matchEW`](#matchew).
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.foldW = exports.matchEW;
	/**
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.getOrElse = 
	/*#__PURE__*/ ET.getOrElse(T.Monad);
	/**
	 * Less strict version of [`getOrElse`](#getorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
	 *
	 * @category error handling
	 * @since 2.6.0
	 */
	exports.getOrElseW = exports.getOrElse;
	/**
	 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Either` instead.
	 *
	 * See also [`tryCatchK`](#trycatchk).
	 *
	 * @example
	 * import { left, right } from 'fp-ts/Either'
	 * import { tryCatch } from 'fp-ts/TaskEither'
	 *
	 * tryCatch(() => Promise.resolve(1), String)().then(result => {
	 *   assert.deepStrictEqual(result, right(1))
	 * })
	 * tryCatch(() => Promise.reject('error'), String)().then(result => {
	 *   assert.deepStrictEqual(result, left('error'))
	 * })
	 *
	 * @category interop
	 * @since 2.0.0
	 */
	var tryCatch = function (f, onRejected) {
	    return function () { return __awaiter(void 0, void 0, void 0, function () {
	        var reason_1;
	        return __generator(this, function (_a) {
	            switch (_a.label) {
	                case 0:
	                    _a.trys.push([0, 2, , 3]);
	                    return [4 /*yield*/, f().then(_.right)];
	                case 1: return [2 /*return*/, _a.sent()];
	                case 2:
	                    reason_1 = _a.sent();
	                    return [2 /*return*/, _.left(onRejected(reason_1))];
	                case 3: return [2 /*return*/];
	            }
	        });
	    }); };
	};
	exports.tryCatch = tryCatch;
	/**
	 * Converts a function returning a `Promise` to one returning a `TaskEither`.
	 *
	 * @category interop
	 * @since 2.5.0
	 */
	var tryCatchK = function (f, onRejected) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.tryCatch)(function () { return f.apply(void 0, a); }, onRejected);
	    };
	};
	exports.tryCatchK = tryCatchK;
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.toUnion = ET.toUnion(T.Functor);
	/**
	 * @category conversions
	 * @since 2.12.0
	 */
	exports.fromNullable = ET.fromNullable(T.Pointed);
	/**
	 * Use `liftNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.fromNullableK = ET.fromNullableK(T.Pointed);
	/**
	 * Use `flatMapNullable`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainNullableK = 
	/*#__PURE__*/ ET.chainNullableK(T.Monad);
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Returns `ma` if is a `Right` or the value returned by `onLeft` otherwise.
	 *
	 * See also [alt](#alt).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   const errorHandler = TE.orElse((error: string) => TE.right(`recovering from ${error}...`))
	 *   assert.deepStrictEqual(await pipe(TE.right('ok'), errorHandler)(), E.right('ok'))
	 *   assert.deepStrictEqual(await pipe(TE.left('ko'), errorHandler)(), E.right('recovering from ko...'))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.orElse = 
	/*#__PURE__*/ ET.orElse(T.Monad);
	/**
	 * Less strict version of [`orElse`](#orelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.10.0
	 */
	exports.orElseW = exports.orElse;
	/**
	 * Returns an effect that effectfully "peeks" at the failure of this effect.
	 *
	 * @category error handling
	 * @since 2.15.0
	 */
	exports.tapError = (0, function_1.dual)(2, ET.tapError(T.Monad));
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstIOK = function (onLeft) { return (0, exports.tapError)((0, exports.fromIOK)(onLeft)); };
	exports.orElseFirstIOK = orElseFirstIOK;
	/**
	 * @category error handling
	 * @since 2.12.0
	 */
	var orElseFirstTaskK = function (onLeft) { return (0, exports.tapError)((0, exports.fromTaskK)(onLeft)); };
	exports.orElseFirstTaskK = orElseFirstTaskK;
	/**
	 * @category error handling
	 * @since 2.11.0
	 */
	exports.orLeft = 
	/*#__PURE__*/ ET.orLeft(T.Monad);
	/**
	 * @since 2.0.0
	 */
	exports.swap = ET.swap(T.Functor);
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	var fromTaskOptionK = function (onNone) {
	    var from = (0, exports.fromTaskOption)(onNone);
	    return function (f) { return (0, function_1.flow)(f, from); };
	};
	exports.fromTaskOptionK = fromTaskOptionK;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.3
	 */
	var chainTaskOptionKW = function (onNone) {
	    return function (f) {
	        return function (ma) {
	            return (0, exports.flatMap)(ma, (0, exports.fromTaskOptionK)(onNone)(f));
	        };
	    };
	};
	exports.chainTaskOptionKW = chainTaskOptionKW;
	/**
	 * Use `flatMapTaskOption`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.chainTaskOptionK = exports.chainTaskOptionKW;
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	var fromIOEitherK = function (f) { return (0, function_1.flow)(f, exports.fromIOEither); };
	exports.fromIOEitherK = fromIOEitherK;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _apPar = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _apSeq = function (fab, fa) { return (0, exports.flatMap)(fab, function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); }); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	exports.map = ET.map(T.Functor);
	/**
	 * Returns a `TaskEither` whose failure and success channels have been mapped by the specified pair of functions, `f` and `g`.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 * const g = (n: number) => n * 2
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.right(1), f, g)(), Either.right(2))
	 *   assert.deepStrictEqual(await TaskEither.mapBoth(TaskEither.left('err'), f, g)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapBoth = (0, function_1.dual)(3, ET.mapBoth(T.Functor));
	/**
	 * Alias of `mapBoth`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.bimap = exports.mapBoth;
	/**
	 * Returns a `TaskEither` with its error channel mapped using the specified function.
	 *
	 * @example
	 * import * as TaskEither from 'fp-ts/TaskEither'
	 * import * as Either from 'fp-ts/Either'
	 *
	 * const f = (s: string) => new Error(s)
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.right(1), f)(), Either.right(1))
	 *   assert.deepStrictEqual(await TaskEither.mapError(TaskEither.left('err'), f)(), Either.left(new Error('err')))
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.16.0
	 */
	exports.mapError = (0, function_1.dual)(2, ET.mapError(T.Functor));
	/**
	 * Alias of `mapError`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.mapLeft = exports.mapError;
	/**
	 * @since 2.0.0
	 */
	exports.ap = 
	/*#__PURE__*/ ET.ap(T.ApplyPar);
	/**
	 * Less strict version of [`ap`](#ap).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.8.0
	 */
	exports.apW = exports.ap;
	/**
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, ET.flatMap(T.Monad));
	/**
	 * Less strict version of [`flatten`](#flatten).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.flattenW = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.flatten = exports.flattenW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `TaskEither` returns `fa` if is a `Right` or the value returned by `that` otherwise.
	 *
	 * See also [orElse](#orelse).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.right(1),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(1)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.right(2))
	 *     )(),
	 *     E.right(2)
	 *   )
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       TE.left('a'),
	 *       TE.alt(() => TE.left('b'))
	 *     )(),
	 *     E.left('b')
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = 
	/*#__PURE__*/ ET.alt(T.Monad);
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the error and the return types will be merged.
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	exports.altW = exports.alt;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.of = exports.right;
	/**
	 * @since 2.7.0
	 */
	exports.throwError = exports.left;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'TaskEither';
	/**
	 * The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/Semigroup'
	 * import * as string from 'fp-ts/string'
	 * import * as T from 'fp-ts/Task'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * interface User {
	 *   readonly id: string
	 *   readonly name: string
	 * }
	 *
	 * const remoteDatabase: ReadonlyArray<User> = [
	 *   { id: 'id1', name: 'John' },
	 *   { id: 'id2', name: 'Mary' },
	 *   { id: 'id3', name: 'Joey' }
	 * ]
	 *
	 * const fetchUser = (id: string): TE.TaskEither<string, User> =>
	 *   pipe(
	 *     remoteDatabase,
	 *     RA.findFirst((user) => user.id === id),
	 *     TE.fromOption(() => `${id} not found`)
	 *   )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(TE.ApplicativePar)(fetchUser))(),
	 *     E.left('id4 not found') // <= first error
	 *   )
	 *
	 *   const Applicative = TE.getApplicativeTaskValidation(
	 *     T.ApplyPar,
	 *     pipe(string.Semigroup, S.intercalate(', '))
	 *   )
	 *
	 *   assert.deepStrictEqual(
	 *     await pipe(['id4', 'id5'], RA.traverse(Applicative)(fetchUser))(),
	 *     E.left('id4 not found, id5 not found') // <= all errors
	 *   )
	 * }
	 *
	 * test()
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getApplicativeTaskValidation(A, S) {
	    var ap = (0, Apply_1.ap)(A, E.getApplicativeValidation(S));
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: function (fab, fa) { return (0, function_1.pipe)(fab, ap(fa)); },
	        of: exports.of
	    };
	}
	exports.getApplicativeTaskValidation = getApplicativeTaskValidation;
	/**
	 * The default [`Alt`](#alt) instance returns the last error, if you want to
	 * get all errors you need to provide a way to concatenate them via a `Semigroup`.
	 *
	 * See [`getAltValidation`](./Either.ts.html#getaltvalidation).
	 *
	 * @category error handling
	 * @since 2.7.0
	 */
	function getAltTaskValidation(S) {
	    var alt = ET.altValidation(T.Monad, S);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        alt: function (fa, that) { return (0, function_1.pipe)(fa, alt(that)); }
	    };
	}
	exports.getAltTaskValidation = getAltTaskValidation;
	/**
	 * @category filtering
	 * @since 2.10.0
	 */
	var getCompactable = function (M) {
	    var C = E.getCompactable(M);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        compact: (0, Compactable_1.compact)(T.Functor, C),
	        separate: (0, Compactable_1.separate)(T.Functor, C, E.Functor)
	    };
	};
	exports.getCompactable = getCompactable;
	/**
	 * @category filtering
	 * @since 2.1.0
	 */
	function getFilterable(M) {
	    var F = E.getFilterable(M);
	    var C = (0, exports.getCompactable)(M);
	    var filter = (0, Filterable_1.filter)(T.Functor, F);
	    var filterMap = (0, Filterable_1.filterMap)(T.Functor, F);
	    var partition = (0, Filterable_1.partition)(T.Functor, F);
	    var partitionMap = (0, Filterable_1.partitionMap)(T.Functor, F);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        compact: C.compact,
	        separate: C.separate,
	        filter: function (fa, predicate) { return (0, function_1.pipe)(fa, filter(predicate)); },
	        filterMap: function (fa, f) { return (0, function_1.pipe)(fa, filterMap(f)); },
	        partition: function (fa, predicate) { return (0, function_1.pipe)(fa, partition(predicate)); },
	        partitionMap: function (fa, f) { return (0, function_1.pipe)(fa, partitionMap(f)); }
	    };
	}
	exports.getFilterable = getFilterable;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Maps the `Right` value of this `TaskEither` to the specified constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.as = (0, function_1.dual)(2, (0, Functor_1.as)(exports.Functor));
	/**
	 * Maps the `Right` value of this `TaskEither` to the void constant value.
	 *
	 * @category mapping
	 * @since 2.16.0
	 */
	exports.asUnit = (0, Functor_1.asUnit)(exports.Functor);
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplyPar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.0.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.ApplyPar);
	/**
	 * Less strict version of [`apFirst`](#apfirst).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apFirstW = exports.apFirst;
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.0.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.ApplyPar);
	/**
	 * Less strict version of [`apSecond`](#apsecond).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	exports.apSecondW = exports.apSecond;
	/**
	 * Runs computations in parallel.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativePar = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    of: exports.of
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.ApplySeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq
	};
	/**
	 * Runs computations sequentially.
	 *
	 * @category instances
	 * @since 2.7.0
	 */
	exports.ApplicativeSeq = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apSeq,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadIO = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadTask = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonadThrow = {
	    URI: exports.URI,
	    map: _map,
	    ap: _apPar,
	    chain: exports.flatMap,
	    of: exports.of,
	    throwError: exports.throwError
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromIO = {
	    URI: exports.URI,
	    fromIO: exports.fromIO
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.FromTask = {
	    URI: exports.URI,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category combinators
	 * @since 2.15.0
	 */
	exports.tap = (0, function_1.dual)(2, chainable.tap(exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 *
	 * const checkString = (value: string) => pipe(
	 *   TE.of(value),
	 *   TE.tapEither(() => value.length > 0 ? E.right('ok') : E.left('error'))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await checkString('')(), E.left('error'))
	 *   assert.deepStrictEqual(await checkString('fp-ts')(), E.right('fp-ts'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapEither = (0, function_1.dual)(2, (0, FromEither_1.tapEither)(exports.FromEither, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as E from 'fp-ts/Either'
	 * import * as Console from 'fp-ts/Console'
	 *
	 *
	 * // Will produce `Hello, fp-ts` to the stdout
	 * const effectA = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => Console.log(`Hello, ${value}`)
	 * )
	 *
	 * // No output to the stdout
	 * const effectB = pipe(
	 *   TE.left('error'),
	 *   TE.tapIO((value) => Console.log(`Hello, ${value}`))
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effectA(), E.of(1))
	 *   assert.deepStrictEqual(await effectB(), E.left('error'))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapIO = (0, function_1.dual)(2, (0, FromIO_1.tapIO)(exports.FromIO, exports.Chain));
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as TE from 'fp-ts/TaskEither'
	 * import * as T from 'fp-ts/Task'
	 * import * as E from 'fp-ts/Either'
	 *
	 *
	 * const effect = TE.tapIO(
	 *   TE.of(1),
	 *   (value) => T.of(value + 1)
	 * )
	 *
	 * async function test() {
	 *   assert.deepStrictEqual(await effect(), E.of(1))
	 * }
	 *
	 * test()
	 *
	 * @category combinators
	 * @since 2.16.0
	 */
	exports.tapTask = (0, function_1.dual)(2, (0, FromTask_1.tapTask)(exports.FromTask, exports.Chain));
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Bifunctor = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category conversions
	 * @since 2.0.0
	 */
	exports.fromOption = 
	/*#__PURE__*/ (0, FromEither_1.fromOption)(exports.FromEither);
	/**
	 * Use `liftOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.fromOptionK = 
	/*#__PURE__*/ (0, FromEither_1.fromOptionK)(exports.FromEither);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainOptionK = (0, FromEither_1.chainOptionK)(exports.FromEither, exports.Chain);
	/**
	 * Use `flatMapOption`.
	 *
	 * @category legacy
	 * @since 2.13.2
	 */
	exports.chainOptionKW = 
	 exports.chainOptionK;
	/** @internal */
	var _FromEither = {
	    fromEither: exports.FromEither.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftNullable = _.liftNullable(_FromEither);
	/**
	 * @category lifting
	 * @since 2.15.0
	 */
	exports.liftOption = _.liftOption(_FromEither);
	/** @internal */
	var _FlatMap = {
	    flatMap: exports.flatMap
	};
	/** @internal */
	var _FromIO = {
	    fromIO: exports.FromIO.fromIO
	};
	/** @internal */
	var _FromTask = {
	    fromTask: exports.fromTask
	};
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapNullable = _.flatMapNullable(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapOption = _.flatMapOption(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapEither = _.flatMapEither(_FromEither, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.15.0
	 */
	exports.flatMapIO = _.flatMapIO(_FromIO, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTask = _.flatMapTask(_FromTask, _FlatMap);
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapIOEither = (0, function_1.dual)(2, function (self, f) {
	    return (0, exports.flatMap)(self, (0, exports.fromIOEitherK)(f));
	});
	/**
	 * @category sequencing
	 * @since 2.16.0
	 */
	exports.flatMapTaskOption = (0, function_1.dual)(3, function (self, f, onNone) {
	    return (0, exports.flatMap)(self, function (a) { return (0, exports.fromTaskOption)(function () { return onNone(a); })(f(a)); });
	});
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainEitherK = exports.flatMapEither;
	/**
	 * Alias of `flatMapEither`.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainEitherKW = exports.flatMapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherK = exports.tapEither;
	/**
	 * Alias of `tapEither`.
	 *
	 * Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.12.0
	 */
	exports.chainFirstEitherKW = exports.tapEither;
	/**
	 * @category lifting
	 * @since 2.0.0
	 */
	exports.fromPredicate = (0, FromEither_1.fromPredicate)(exports.FromEither);
	/**
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.filterOrElse = (0, FromEither_1.filterOrElse)(exports.FromEither, exports.Chain);
	/**
	 * Less strict version of [`filterOrElse`](#filterorelse).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category filtering
	 * @since 2.9.0
	 */
	exports.filterOrElseW = exports.filterOrElse;
	/**
	 * @category lifting
	 * @since 2.4.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromIOK = (0, FromIO_1.fromIOK)(exports.FromIO);
	/**
	 * Alias of `flatMapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainIOK = exports.flatMapIO;
	/**
	 * Alias of `tapIO`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstIOK = exports.tapIO;
	/**
	 * @category lifting
	 * @since 2.10.0
	 */
	exports.fromTaskK = (0, FromTask_1.fromTaskK)(exports.FromTask);
	/**
	 * Alias of `flatMapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainTaskK = exports.flatMapTask;
	/**
	 * Alias of `tapTask`.
	 *
	 * @category legacy
	 * @since 2.10.0
	 */
	exports.chainFirstTaskK = exports.tapTask;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * Less strict version of [`chainIOEitherK`](#chainioeitherk).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category legacy
	 * @since 2.6.1
	 */
	exports.chainIOEitherKW = exports.flatMapIOEither;
	/**
	 * Alias of `flatMapIOEither`.
	 *
	 * @category legacy
	 * @since 2.4.0
	 */
	exports.chainIOEitherK = exports.flatMapIOEither;
	function taskify(f) {
	    return function () {
	        var args = Array.prototype.slice.call(arguments);
	        return function () {
	            return new Promise(function (resolve) {
	                var cbResolver = function (e, r) { return (e != null ? resolve(_.left(e)) : resolve(_.right(r))); };
	                f.apply(null, args.concat(cbResolver));
	            });
	        };
	    };
	}
	exports.taskify = taskify;
	/**
	 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
	 * whether the body action throws (\*) or returns.
	 *
	 * (\*) i.e. returns a `Left`
	 *
	 * @since 2.0.0
	 */
	var bracket = function (acquire, use, release) { return (0, exports.bracketW)(acquire, use, release); };
	exports.bracket = bracket;
	/**
	 * Less strict version of [`bracket`](#bracket).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @since 2.12.0
	 */
	var bracketW = function (acquire, use, release) {
	    return (0, exports.flatMap)(acquire, function (a) { return T.flatMap(use(a), function (e) { return (0, exports.flatMap)(release(a, e), function () { return T.of(e); }); }); });
	};
	exports.bracketW = bracketW;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = chainable.bind(exports.Chain);
	/**
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindW = exports.bind;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.ApplyPar);
	/**
	 * Less strict version of [`apS`](#aps).
	 *
	 * The `W` suffix (short for **W**idening) means that the error types will be merged.
	 *
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apSW = exports.apS;
	/**
	 * @since 2.11.0
	 */
	exports.ApT = (0, exports.of)(_.emptyReadonlyArray);
	// -------------------------------------------------------------------------------------
	// array utils
	// -------------------------------------------------------------------------------------
	/**
	 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndex = function (f) {
	    return (0, function_1.flow)(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(E.traverseReadonlyNonEmptyArrayWithIndex(function_1.SK)));
	};
	exports.traverseReadonlyNonEmptyArrayWithIndex = traverseReadonlyNonEmptyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndex = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndex)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndex = traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyNonEmptyArrayWithIndexSeq = function (f) {
	    return function (as) {
	        return function () {
	            return _.tail(as).reduce(function (acc, a, i) {
	                return acc.then(function (ebs) {
	                    return _.isLeft(ebs)
	                        ? acc
	                        : f(i + 1, a)().then(function (eb) {
	                            if (_.isLeft(eb)) {
	                                return eb;
	                            }
	                            ebs.right.push(eb.right);
	                            return ebs;
	                        });
	                });
	            }, f(0, _.head(as))().then(E.map(_.singleton)));
	        };
	    };
	};
	exports.traverseReadonlyNonEmptyArrayWithIndexSeq = traverseReadonlyNonEmptyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.11.0
	 */
	var traverseReadonlyArrayWithIndexSeq = function (f) {
	    var g = (0, exports.traverseReadonlyNonEmptyArrayWithIndexSeq)(f);
	    return function (as) { return (_.isNonEmpty(as) ? g(as) : exports.ApT); };
	};
	exports.traverseReadonlyArrayWithIndexSeq = traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseArrayWithIndex = exports.traverseReadonlyArrayWithIndex;
	/**
	 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndex)(function (_, a) { return f(a); }); };
	exports.traverseArray = traverseArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceArray = 
	/*#__PURE__*/ (0, exports.traverseArray)(function_1.identity);
	/**
	 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.traverseSeqArrayWithIndex = exports.traverseReadonlyArrayWithIndexSeq;
	/**
	 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	var traverseSeqArray = function (f) { return (0, exports.traverseReadonlyArrayWithIndexSeq)(function (_, a) { return f(a); }); };
	exports.traverseSeqArray = traverseSeqArray;
	/**
	 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
	 *
	 * @category traversing
	 * @since 2.9.0
	 */
	exports.sequenceSeqArray = 
	/*#__PURE__*/ (0, exports.traverseSeqArray)(function_1.identity);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.6.0
	 */
	exports.chainW = exports.flatMap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chainFirst = exports.tap;
	/**
	 * Alias of `tap`.
	 *
	 * @category legacy
	 * @since 2.8.0
	 */
	exports.chainFirstW = exports.tap;
	/**
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirst = exports.tapError;
	/**
	 * Alias of `tapError`.
	 *
	 * @category legacy
	 * @since 2.11.0
	 */
	exports.orElseFirstW = exports.tapError;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEither`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEither = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apPar,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `TE.Functor` instead of `TE.taskEitherSeq`
	 * (where `TE` is from `import TE from 'fp-ts/TaskEither'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.taskEitherSeq = {
	    URI: exports.URI,
	    bimap: exports.mapBoth,
	    mapLeft: exports.mapError,
	    map: _map,
	    of: exports.of,
	    ap: _apSeq,
	    chain: exports.flatMap,
	    alt: _alt,
	    fromIO: exports.fromIO,
	    fromTask: exports.fromTask,
	    throwError: exports.throwError
	};
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplySemigroup = 
	/*#__PURE__*/ (0, Apply_1.getApplySemigroup)(exports.ApplySeq);
	/**
	 * Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.getApplyMonoid = 
	/*#__PURE__*/ (0, Applicative_1.getApplicativeMonoid)(exports.ApplicativeSeq);
	/**
	 * Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var getSemigroup = function (S) {
	    return (0, Apply_1.getApplySemigroup)(T.ApplySeq)(E.getSemigroup(S));
	};
	exports.getSemigroup = getSemigroup;
	/**
	 * Use [`getApplicativeTaskValidation`](#getapplicativetaskvalidation) and [`getAltTaskValidation`](#getalttaskvalidation) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	function getTaskValidation(SE) {
	    var applicativeTaskValidation = getApplicativeTaskValidation(T.ApplicativePar, SE);
	    var altTaskValidation = getAltTaskValidation(SE);
	    return {
	        URI: exports.URI,
	        _E: undefined,
	        map: _map,
	        ap: applicativeTaskValidation.ap,
	        of: exports.of,
	        chain: exports.flatMap,
	        bimap: exports.mapBoth,
	        mapLeft: exports.mapError,
	        alt: altTaskValidation.alt,
	        fromIO: exports.fromIO,
	        fromTask: exports.fromTask,
	        throwError: exports.throwError
	    };
	}
	exports.getTaskValidation = getTaskValidation; 
} (TaskEither));

var _Array = {};

var NonEmptyArray = {};

var ReadonlyNonEmptyArray = {};

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __spreadArray = (index.commonjsGlobal && index.commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.reduceRight = exports.foldMap = exports.reduce = exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.of = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.modifyAt = exports.updateAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.fromArray = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromReadonlyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = exports.empty = void 0;
	exports.groupSort = exports.chain = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.foldMapWithIndex = exports.reduceWithIndex = void 0;
	exports.readonlyNonEmptyArray = exports.fold = exports.prependToAll = exports.insertAt = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = void 0;
	var Apply_1 = index.Apply;
	var Chain_1 = index.Chain;
	var Eq_1 = withdrawal.Eq;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var Ord_1 = withdrawal.Ord;
	var Se = __importStar(withdrawal.Semigroup);
	// -------------------------------------------------------------------------------------
	// internal
	// -------------------------------------------------------------------------------------
	/**
	 * @internal
	 */
	exports.empty = _.emptyReadonlyArray;
	/**
	 * @internal
	 */
	exports.isNonEmpty = _.isNonEmpty;
	/**
	 * @internal
	 */
	var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
	exports.isOutOfBound = isOutOfBound;
	/**
	 * @internal
	 */
	var prependW = function (head) {
	    return function (tail) {
	        return __spreadArray([head], tail, true);
	    };
	};
	exports.prependW = prependW;
	/**
	 * @internal
	 */
	exports.prepend = exports.prependW;
	/**
	 * @internal
	 */
	var appendW = function (end) {
	    return function (init) {
	        return __spreadArray(__spreadArray([], init, true), [end], false);
	    };
	};
	exports.appendW = appendW;
	/**
	 * @internal
	 */
	exports.append = exports.appendW;
	/**
	 * @internal
	 */
	var unsafeInsertAt = function (i, a, as) {
	    if ((0, exports.isNonEmpty)(as)) {
	        var xs = _.fromReadonlyNonEmptyArray(as);
	        xs.splice(i, 0, a);
	        return xs;
	    }
	    return [a];
	};
	exports.unsafeInsertAt = unsafeInsertAt;
	/**
	 * @internal
	 */
	var unsafeUpdateAt = function (i, a, as) {
	    if (as[i] === a) {
	        return as;
	    }
	    else {
	        var xs = _.fromReadonlyNonEmptyArray(as);
	        xs[i] = a;
	        return xs;
	    }
	};
	exports.unsafeUpdateAt = unsafeUpdateAt;
	/**
	 * Remove duplicates from a `ReadonlyNonEmptyArray`, keeping the first occurrence of an element.
	 *
	 * @example
	 * import { uniq } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
	 *
	 * @since 2.11.0
	 */
	var uniq = function (E) {
	    return function (as) {
	        if (as.length === 1) {
	            return as;
	        }
	        var out = [(0, exports.head)(as)];
	        var rest = (0, exports.tail)(as);
	        var _loop_1 = function (a) {
	            if (out.every(function (o) { return !E.equals(o, a); })) {
	                out.push(a);
	            }
	        };
	        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
	            var a = rest_1[_i];
	            _loop_1(a);
	        }
	        return out;
	    };
	};
	exports.uniq = uniq;
	/**
	 * Sort the elements of a `ReadonlyNonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	 * etc...
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { contramap } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Person {
	 *   name: string
	 *   age: number
	 * }
	 *
	 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
	 *
	 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
	 *
	 * const sortByNameByAge = RNEA.sortBy([byName, byAge])
	 *
	 * const persons: RNEA.ReadonlyNonEmptyArray<Person> = [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 },
	 *   { name: 'b', age: 2 }
	 * ]
	 *
	 * assert.deepStrictEqual(sortByNameByAge(persons), [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 2 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 }
	 * ])
	 *
	 * @since 2.11.0
	 */
	var sortBy = function (ords) {
	    if ((0, exports.isNonEmpty)(ords)) {
	        var M = (0, Ord_1.getMonoid)();
	        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
	    }
	    return function_1.identity;
	};
	exports.sortBy = sortBy;
	/**
	 * @since 2.11.0
	 */
	var union = function (E) {
	    var uniqE = (0, exports.uniq)(E);
	    return function (second) { return function (first) { return uniqE((0, function_1.pipe)(first, concat(second))); }; };
	};
	exports.union = union;
	/**
	 * Rotate a `ReadonlyNonEmptyArray` by `n` steps.
	 *
	 * @example
	 * import { rotate } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
	 *
	 * @since 2.11.0
	 */
	var rotate = function (n) {
	    return function (as) {
	        var len = as.length;
	        var m = Math.round(n) % len;
	        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
	            return as;
	        }
	        if (m < 0) {
	            var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
	            return (0, function_1.pipe)(s, concat(f));
	        }
	        else {
	            return (0, exports.rotate)(m - len)(as);
	        }
	    };
	};
	exports.rotate = rotate;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Return a `ReadonlyNonEmptyArray` from a `ReadonlyArray` returning `none` if the input is empty.
	 *
	 * @category conversions
	 * @since 2.5.0
	 */
	var fromReadonlyArray = function (as) {
	    return (0, exports.isNonEmpty)(as) ? _.some(as) : _.none;
	};
	exports.fromReadonlyArray = fromReadonlyArray;
	/**
	 * Return a `ReadonlyNonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { makeBy } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const double = (n: number): number => n * 2
	 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var makeBy = function (f) {
	    return function (n) {
	        var j = Math.max(0, Math.floor(n));
	        var out = [f(0)];
	        for (var i = 1; i < j; i++) {
	            out.push(f(i));
	        }
	        return out;
	    };
	};
	exports.makeBy = makeBy;
	/**
	 * Create a `ReadonlyNonEmptyArray` containing a value repeated the specified number of times.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { replicate } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var replicate = function (a) { return (0, exports.makeBy)(function () { return a; }); };
	exports.replicate = replicate;
	/**
	 * Create a `ReadonlyNonEmptyArray` containing a range of integers, including both endpoints.
	 *
	 * @example
	 * import { range } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var range = function (start, end) {
	    return start <= end ? (0, exports.makeBy)(function (i) { return start + i; })(end - start + 1) : [start];
	};
	exports.range = range;
	/**
	 * Return the tuple of the `head` and the `tail`.
	 *
	 * @example
	 * import { unprepend } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(unprepend([1, 2, 3, 4]), [1, [2, 3, 4]])
	 *
	 * @since 2.9.0
	 */
	var unprepend = function (as) { return [(0, exports.head)(as), (0, exports.tail)(as)]; };
	exports.unprepend = unprepend;
	/**
	 * Return the tuple of the `init` and the `last`.
	 *
	 * @example
	 * import { unappend } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
	 *
	 * @since 2.9.0
	 */
	var unappend = function (as) { return [(0, exports.init)(as), (0, exports.last)(as)]; };
	exports.unappend = unappend;
	/**
	 * @category conversions
	 * @since 2.5.0
	 */
	var fromArray = function (as) { return (0, exports.fromReadonlyArray)(as.slice()); };
	exports.fromArray = fromArray;
	function concatW(second) {
	    return function (first) { return first.concat(second); };
	}
	exports.concatW = concatW;
	function concat(x, y) {
	    return y ? x.concat(y) : function (y) { return y.concat(x); };
	}
	exports.concat = concat;
	/**
	 * @since 2.5.0
	 */
	var reverse = function (as) {
	    return as.length === 1 ? as : __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true);
	};
	exports.reverse = reverse;
	function group(E) {
	    return function (as) {
	        var len = as.length;
	        if (len === 0) {
	            return exports.empty;
	        }
	        var out = [];
	        var head = as[0];
	        var nea = [head];
	        for (var i = 1; i < len; i++) {
	            var a = as[i];
	            if (E.equals(a, head)) {
	                nea.push(a);
	            }
	            else {
	                out.push(nea);
	                head = a;
	                nea = [head];
	            }
	        }
	        out.push(nea);
	        return out;
	    };
	}
	exports.group = group;
	/**
	 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
	 * function on each element, and grouping the results according to values returned
	 *
	 * @example
	 * import { groupBy } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
	 *   '1': ['a', 'b'],
	 *   '2': ['ab']
	 * })
	 *
	 * @since 2.5.0
	 */
	var groupBy = function (f) {
	    return function (as) {
	        var out = {};
	        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
	            var a = as_1[_i];
	            var k = f(a);
	            if (_.has.call(out, k)) {
	                out[k].push(a);
	            }
	            else {
	                out[k] = [a];
	            }
	        }
	        return out;
	    };
	};
	exports.groupBy = groupBy;
	/**
	 * @since 2.5.0
	 */
	var sort = function (O) {
	    return function (as) {
	        return as.length === 1 ? as : as.slice().sort(O.compare);
	    };
	};
	exports.sort = sort;
	/**
	 * @since 2.5.0
	 */
	var updateAt = function (i, a) {
	    return (0, exports.modifyAt)(i, function () { return a; });
	};
	exports.updateAt = updateAt;
	/**
	 * @since 2.5.0
	 */
	var modifyAt = function (i, f) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
	    };
	};
	exports.modifyAt = modifyAt;
	/**
	 * @since 2.5.1
	 */
	var zipWith = function (as, bs, f) {
	    var cs = [f(as[0], bs[0])];
	    var len = Math.min(as.length, bs.length);
	    for (var i = 1; i < len; i++) {
	        cs[i] = f(as[i], bs[i]);
	    }
	    return cs;
	};
	exports.zipWith = zipWith;
	function zip(as, bs) {
	    if (bs === undefined) {
	        return function (bs) { return zip(bs, as); };
	    }
	    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
	}
	exports.zip = zip;
	/**
	 * @since 2.5.1
	 */
	var unzip = function (abs) {
	    var fa = [abs[0][0]];
	    var fb = [abs[0][1]];
	    for (var i = 1; i < abs.length; i++) {
	        fa[i] = abs[i][0];
	        fb[i] = abs[i][1];
	    }
	    return [fa, fb];
	};
	exports.unzip = unzip;
	/**
	 * Prepend an element to every member of a `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { prependAll } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.10.0
	 */
	var prependAll = function (middle) {
	    return function (as) {
	        var out = [middle, as[0]];
	        for (var i = 1; i < as.length; i++) {
	            out.push(middle, as[i]);
	        }
	        return out;
	    };
	};
	exports.prependAll = prependAll;
	/**
	 * Places an element in between members of a `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { intersperse } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.9.0
	 */
	var intersperse = function (middle) {
	    return function (as) {
	        var rest = (0, exports.tail)(as);
	        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : as;
	    };
	};
	exports.intersperse = intersperse;
	/**
	 * @category sequencing
	 * @since 2.10.0
	 */
	var chainWithIndex = function (f) {
	    return function (as) {
	        var out = _.fromReadonlyNonEmptyArray(f(0, (0, exports.head)(as)));
	        for (var i = 1; i < as.length; i++) {
	            out.push.apply(out, f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.chainWithIndex = chainWithIndex;
	/**
	 * A useful recursion pattern for processing a `ReadonlyNonEmptyArray` to produce a new `ReadonlyNonEmptyArray`, often used for "chopping" up the input
	 * `ReadonlyNonEmptyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyNonEmptyArray` and produce a
	 * value and the tail of the `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.10.0
	 */
	var chop = function (f) {
	    return function (as) {
	        var _a = f(as), b = _a[0], rest = _a[1];
	        var out = [b];
	        var next = rest;
	        while ((0, exports.isNonEmpty)(next)) {
	            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
	            out.push(b_1);
	            next = rest_2;
	        }
	        return out;
	    };
	};
	exports.chop = chop;
	/**
	 * Splits a `ReadonlyNonEmptyArray` into two pieces, the first piece has max `n` elements.
	 *
	 * @since 2.10.0
	 */
	var splitAt = function (n) {
	    return function (as) {
	        var m = Math.max(1, n);
	        return m >= as.length ? [as, exports.empty] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
	    };
	};
	exports.splitAt = splitAt;
	/**
	 * Splits a `ReadonlyNonEmptyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	 * the `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.10.0
	 */
	var chunksOf = function (n) { return (0, exports.chop)((0, exports.splitAt)(n)); };
	exports.chunksOf = chunksOf;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	/* istanbul ignore next */
	var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	/* istanbul ignore next */
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	/* istanbul ignore next */
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/* istanbul ignore next */
	var _reduceWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRightWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _traverseWithIndex = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
	};
	/**
	 * @category constructors
	 * @since 2.5.0
	 */
	exports.of = _.singleton;
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3] as RNEA.ReadonlyNonEmptyArray<number>,
	 *     RNEA.altW(() => ['a', 'b'])
	 *   ),
	 *   [1, 2, 3, 'a', 'b']
	 * )
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) {
	    return function (as) {
	        return (0, function_1.pipe)(as, concatW(that()));
	    };
	};
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `ReadonlyNonEmptyArray` concatenates the inputs into a single array.
	 *
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RNEA.alt(() => [4, 5])
	 *   ),
	 *   [1, 2, 3, 4, 5]
	 * )
	 *
	 * @category error handling
	 * @since 2.6.2
	 */
	exports.alt = exports.altW;
	/**
	 * @since 2.5.0
	 */
	var ap = function (as) { return (0, exports.flatMap)(function (f) { return (0, function_1.pipe)(as, (0, exports.map)(f)); }); };
	exports.ap = ap;
	/**
	 * @example
	 * import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RNEA.flatMap((n) => [`a${n}`, `b${n}`])
	 *   ),
	 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
	 * )
	 *
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (i, a) { return f(a, i); }));
	});
	/**
	 * @since 2.5.0
	 */
	var extend = function (f) {
	    return function (as) {
	        var next = (0, exports.tail)(as);
	        var out = [f(as)];
	        while ((0, exports.isNonEmpty)(next)) {
	            out.push(f(next));
	            next = (0, exports.tail)(next);
	        }
	        return out;
	    };
	};
	exports.extend = extend;
	/**
	 * @since 2.5.0
	 */
	exports.duplicate = 
	/*#__PURE__*/ (0, exports.extend)(function_1.identity);
	/**
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.flatten = 
	/*#__PURE__*/ (0, exports.flatMap)(function_1.identity);
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.5.0
	 */
	var map = function (f) {
	    return (0, exports.mapWithIndex)(function (_, a) { return f(a); });
	};
	exports.map = map;
	/**
	 * @category mapping
	 * @since 2.5.0
	 */
	var mapWithIndex = function (f) {
	    return function (as) {
	        var out = [f(0, (0, exports.head)(as))];
	        for (var i = 1; i < as.length; i++) {
	            out.push(f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.mapWithIndex = mapWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduce = function (b, f) {
	    return (0, exports.reduceWithIndex)(b, function (_, b, a) { return f(b, a); });
	};
	exports.reduce = reduce;
	/**
	 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
	 *
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMap = function (S) {
	    return function (f) {
	        return function (as) {
	            return as.slice(1).reduce(function (s, a) { return S.concat(s, f(a)); }, f(as[0]));
	        };
	    };
	};
	exports.foldMap = foldMap;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRight = function (b, f) {
	    return (0, exports.reduceRightWithIndex)(b, function (_, b, a) { return f(b, a); });
	};
	exports.reduceRight = reduceRight;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceWithIndex = function (b, f) {
	    return function (as) {
	        return as.reduce(function (b, a, i) { return f(i, b, a); }, b);
	    };
	};
	exports.reduceWithIndex = reduceWithIndex;
	/**
	 * **Note**. The constraint is relaxed: a `Semigroup` instead of a `Monoid`.
	 *
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMapWithIndex = function (S) {
	    return function (f) {
	        return function (as) {
	            return as.slice(1).reduce(function (s, a, i) { return S.concat(s, f(i + 1, a)); }, f(0, as[0]));
	        };
	    };
	};
	exports.foldMapWithIndex = foldMapWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRightWithIndex = function (b, f) {
	    return function (as) {
	        return as.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
	    };
	};
	exports.reduceRightWithIndex = reduceRightWithIndex;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
	};
	exports.traverse = traverse;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) { return (0, exports.traverseWithIndex)(F)(function_1.SK); };
	exports.sequence = sequence;
	/**
	 * @category sequencing
	 * @since 2.6.3
	 */
	var traverseWithIndex = function (F) {
	    return function (f) {
	        return function (as) {
	            var out = F.map(f(0, (0, exports.head)(as)), exports.of);
	            for (var i = 1; i < as.length; i++) {
	                out = F.ap(F.map(out, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, as[i]));
	            }
	            return out;
	        };
	    };
	};
	exports.traverseWithIndex = traverseWithIndex;
	/**
	 * @category Comonad
	 * @since 2.6.3
	 */
	exports.extract = _.head;
	/**
	 * @category type lambdas
	 * @since 2.5.0
	 */
	exports.URI = 'ReadonlyNonEmptyArray';
	/**
	 * @category instances
	 * @since 2.5.0
	 */
	var getShow = function (S) { return ({
	    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
	}); };
	exports.getShow = getShow;
	/**
	 * Builds a `Semigroup` instance for `ReadonlyNonEmptyArray`
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getSemigroup = function () { return ({
	    concat: concat
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * @example
	 * import { getEq } from 'fp-ts/ReadonlyNonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * const E = getEq(N.Eq)
	 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
	 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getEq = function (E) {
	    return (0, Eq_1.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
	};
	exports.getEq = getEq;
	/**
	 * @since 2.11.0
	 */
	var getUnionSemigroup = function (E) {
	    var unionE = (0, exports.union)(E);
	    return {
	        concat: function (first, second) { return unionE(second)(first); }
	    };
	};
	exports.getUnionSemigroup = getUnionSemigroup;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.5.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.5.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.chainFirst(() => ['a', 'b'])
	 *   ),
	 *   [1, 1, 2, 2, 3, 3]
	 * )
	 *
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.chainFirst = (0, Chain_1.chainFirst)(exports.Chain);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Comonad = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend,
	    extract: exports.extract
	};
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = (0, Chain_1.bind)(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.5.0
	 */
	exports.head = exports.extract;
	/**
	 * @since 2.5.0
	 */
	exports.tail = _.tail;
	/**
	 * @since 2.5.0
	 */
	var last = function (as) { return as[as.length - 1]; };
	exports.last = last;
	/**
	 * Get all but the last element of a non empty array, creating a new array.
	 *
	 * @example
	 * import { init } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
	 * assert.deepStrictEqual(init([1]), [])
	 *
	 * @since 2.5.0
	 */
	var init = function (as) { return as.slice(0, -1); };
	exports.init = init;
	/**
	 * @since 2.5.0
	 */
	var min = function (O) {
	    var S = Se.min(O);
	    return function (as) { return as.reduce(S.concat); };
	};
	exports.min = min;
	/**
	 * @since 2.5.0
	 */
	var max = function (O) {
	    var S = Se.max(O);
	    return function (as) { return as.reduce(S.concat); };
	};
	exports.max = max;
	/**
	 * @since 2.10.0
	 */
	var concatAll = function (S) {
	    return function (as) {
	        return as.reduce(S.concat);
	    };
	};
	exports.concatAll = concatAll;
	/**
	 * Break a `ReadonlyArray` into its first element and remaining elements.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchLeft = function (f) {
	    return function (as) {
	        return f((0, exports.head)(as), (0, exports.tail)(as));
	    };
	};
	exports.matchLeft = matchLeft;
	/**
	 * Break a `ReadonlyArray` into its initial elements and the last element.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchRight = function (f) {
	    return function (as) {
	        return f((0, exports.init)(as), (0, exports.last)(as));
	    };
	};
	exports.matchRight = matchRight;
	/**
	 * Apply a function to the head, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyHead = function (f) {
	    return function (as) {
	        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
	    };
	};
	exports.modifyHead = modifyHead;
	/**
	 * Change the head, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateHead = function (a) { return (0, exports.modifyHead)(function () { return a; }); };
	exports.updateHead = updateHead;
	/**
	 * Apply a function to the last element, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyLast = function (f) {
	    return function (as) {
	        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
	    };
	};
	exports.modifyLast = modifyLast;
	/**
	 * Change the last element, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateLast = function (a) { return (0, exports.modifyLast)(function () { return a; }); };
	exports.updateLast = updateLast;
	/**
	 * Places an element in between members of a `ReadonlyNonEmptyArray`, then folds the results using the provided `Semigroup`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { intercalate } from 'fp-ts/ReadonlyNonEmptyArray'
	 *
	 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
	 *
	 * @since 2.12.0
	 */
	var intercalate = function (S) {
	    var concatAllS = (0, exports.concatAll)(S);
	    return function (middle) { return (0, function_1.flow)((0, exports.intersperse)(middle), concatAllS); };
	};
	exports.intercalate = intercalate;
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.5.0
	 */
	exports.chain = exports.flatMap;
	function groupSort(O) {
	    var sortO = (0, exports.sort)(O);
	    var groupO = group(O);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : exports.empty); };
	}
	exports.groupSort = groupSort;
	function filter(predicate) {
	    return (0, exports.filterWithIndex)(function (_, a) { return predicate(a); });
	}
	exports.filter = filter;
	/**
	 * Use [`filterWithIndex`](./ReadonlyArray.ts.html#filterwithindex) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var filterWithIndex = function (predicate) {
	    return function (as) {
	        return (0, exports.fromReadonlyArray)(as.filter(function (a, i) { return predicate(i, a); }));
	    };
	};
	exports.filterWithIndex = filterWithIndex;
	/**
	 * Use [`unprepend`](#unprepend) instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	exports.uncons = exports.unprepend;
	/**
	 * Use [`unappend`](#unappend) instead.
	 *
	 * @category zone of death
	 * @since 2.10.0
	 * @deprecated
	 */
	exports.unsnoc = exports.unappend;
	function cons(head, tail) {
	    return tail === undefined ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail, (0, exports.prepend)(head));
	}
	exports.cons = cons;
	/**
	 * Use [`append`](./ReadonlyArray.ts.html#append) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var snoc = function (init, end) { return (0, function_1.pipe)(init, concat([end])); };
	exports.snoc = snoc;
	/**
	 * Use [`insertAt`](./ReadonlyArray.ts.html#insertat) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	var insertAt = function (i, a) {
	    return function (as) {
	        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
	    };
	};
	exports.insertAt = insertAt;
	/**
	 * Use [`prependAll`](#prependall) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.prependToAll = exports.prependAll;
	/**
	 * Use [`concatAll`](#concatall) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.fold = exports.concatAll;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `RNEA.Functor` instead of `RNEA.readonlyNonEmptyArray`
	 * (where `RNEA` is from `import RNEA from 'fp-ts/ReadonlyNonEmptyArray'`)
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.readonlyNonEmptyArray = {
	    URI: exports.URI,
	    of: exports.of,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    ap: _ap,
	    chain: exports.flatMap,
	    extend: _extend,
	    extract: exports.extract,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex,
	    alt: _alt
	}; 
} (ReadonlyNonEmptyArray));

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __spreadArray = (index.commonjsGlobal && index.commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.mapWithIndex = exports.map = exports.flatten = exports.duplicate = exports.extend = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.chunksOf = exports.splitAt = exports.chop = exports.chainWithIndex = exports.foldMap = exports.foldMapWithIndex = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.of = exports.copy = exports.modifyAt = exports.updateAt = exports.insertAt = exports.sort = exports.groupBy = exports.group = exports.reverse = exports.concat = exports.concatW = exports.unappend = exports.unprepend = exports.range = exports.replicate = exports.makeBy = exports.fromArray = exports.fromReadonlyNonEmptyArray = exports.rotate = exports.union = exports.sortBy = exports.uniq = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.append = exports.appendW = exports.prepend = exports.prependW = exports.isOutOfBound = exports.isNonEmpty = void 0;
	exports.chain = exports.intercalate = exports.updateLast = exports.modifyLast = exports.updateHead = exports.modifyHead = exports.matchRight = exports.matchLeft = exports.concatAll = exports.max = exports.min = exports.init = exports.last = exports.tail = exports.head = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.Comonad = exports.Alt = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getUnionSemigroup = exports.getEq = exports.getSemigroup = exports.getShow = exports.URI = exports.extract = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = void 0;
	exports.nonEmptyArray = exports.fold = exports.prependToAll = exports.snoc = exports.cons = exports.unsnoc = exports.uncons = exports.filterWithIndex = exports.filter = exports.groupSort = void 0;
	var Apply_1 = index.Apply;
	var Chain_1 = index.Chain;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var Ord_1 = withdrawal.Ord;
	var RNEA = __importStar(ReadonlyNonEmptyArray);
	// -------------------------------------------------------------------------------------
	// internal
	// -------------------------------------------------------------------------------------
	/**
	 * @internal
	 */
	var isNonEmpty = function (as) { return as.length > 0; };
	exports.isNonEmpty = isNonEmpty;
	/**
	 * @internal
	 */
	var isOutOfBound = function (i, as) { return i < 0 || i >= as.length; };
	exports.isOutOfBound = isOutOfBound;
	/**
	 * @internal
	 */
	var prependW = function (head) {
	    return function (tail) {
	        return __spreadArray([head], tail, true);
	    };
	};
	exports.prependW = prependW;
	/**
	 * @internal
	 */
	exports.prepend = exports.prependW;
	/**
	 * @internal
	 */
	var appendW = function (end) {
	    return function (init) {
	        return __spreadArray(__spreadArray([], init, true), [end], false);
	    };
	};
	exports.appendW = appendW;
	/**
	 * @internal
	 */
	exports.append = exports.appendW;
	/**
	 * @internal
	 */
	var unsafeInsertAt = function (i, a, as) {
	    if ((0, exports.isNonEmpty)(as)) {
	        var xs = (0, exports.fromReadonlyNonEmptyArray)(as);
	        xs.splice(i, 0, a);
	        return xs;
	    }
	    return [a];
	};
	exports.unsafeInsertAt = unsafeInsertAt;
	/**
	 * @internal
	 */
	var unsafeUpdateAt = function (i, a, as) {
	    var xs = (0, exports.fromReadonlyNonEmptyArray)(as);
	    xs[i] = a;
	    return xs;
	};
	exports.unsafeUpdateAt = unsafeUpdateAt;
	/**
	 * Remove duplicates from a `NonEmptyArray`, keeping the first occurrence of an element.
	 *
	 * @example
	 * import { uniq } from 'fp-ts/NonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
	 *
	 * @since 2.11.0
	 */
	var uniq = function (E) {
	    return function (as) {
	        if (as.length === 1) {
	            return (0, exports.copy)(as);
	        }
	        var out = [(0, exports.head)(as)];
	        var rest = (0, exports.tail)(as);
	        var _loop_1 = function (a) {
	            if (out.every(function (o) { return !E.equals(o, a); })) {
	                out.push(a);
	            }
	        };
	        for (var _i = 0, rest_1 = rest; _i < rest_1.length; _i++) {
	            var a = rest_1[_i];
	            _loop_1(a);
	        }
	        return out;
	    };
	};
	exports.uniq = uniq;
	/**
	 * Sort the elements of a `NonEmptyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	 * etc...
	 *
	 * @example
	 * import * as NEA from 'fp-ts/NonEmptyArray'
	 * import { contramap } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Person {
	 *   name: string
	 *   age: number
	 * }
	 *
	 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
	 *
	 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
	 *
	 * const sortByNameByAge = NEA.sortBy([byName, byAge])
	 *
	 * const persons: NEA.NonEmptyArray<Person> = [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 },
	 *   { name: 'b', age: 2 }
	 * ]
	 *
	 * assert.deepStrictEqual(sortByNameByAge(persons), [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 2 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 }
	 * ])
	 *
	 * @since 2.11.0
	 */
	var sortBy = function (ords) {
	    if ((0, exports.isNonEmpty)(ords)) {
	        var M = (0, Ord_1.getMonoid)();
	        return (0, exports.sort)(ords.reduce(M.concat, M.empty));
	    }
	    return exports.copy;
	};
	exports.sortBy = sortBy;
	/**
	 * @since 2.11.0
	 */
	var union = function (E) {
	    var uniqE = (0, exports.uniq)(E);
	    return function (second) { return function (first) { return uniqE((0, function_1.pipe)(first, concat(second))); }; };
	};
	exports.union = union;
	/**
	 * Rotate a `NonEmptyArray` by `n` steps.
	 *
	 * @example
	 * import { rotate } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
	 *
	 * @since 2.11.0
	 */
	var rotate = function (n) {
	    return function (as) {
	        var len = as.length;
	        var m = Math.round(n) % len;
	        if ((0, exports.isOutOfBound)(Math.abs(m), as) || m === 0) {
	            return (0, exports.copy)(as);
	        }
	        if (m < 0) {
	            var _a = (0, exports.splitAt)(-m)(as), f = _a[0], s = _a[1];
	            return (0, function_1.pipe)(s, concat(f));
	        }
	        else {
	            return (0, exports.rotate)(m - len)(as);
	        }
	    };
	};
	exports.rotate = rotate;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.10.0
	 */
	exports.fromReadonlyNonEmptyArray = _.fromReadonlyNonEmptyArray;
	/**
	 * Builds a `NonEmptyArray` from an `Array` returning `none` if `as` is an empty array
	 *
	 * @category conversions
	 * @since 2.0.0
	 */
	var fromArray = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(as) : _.none); };
	exports.fromArray = fromArray;
	/**
	 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { makeBy } from 'fp-ts/NonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const double = (n: number): number => n * 2
	 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var makeBy = function (f) {
	    return function (n) {
	        var j = Math.max(0, Math.floor(n));
	        var out = [f(0)];
	        for (var i = 1; i < j; i++) {
	            out.push(f(i));
	        }
	        return out;
	    };
	};
	exports.makeBy = makeBy;
	/**
	 * Create a `NonEmptyArray` containing a value repeated the specified number of times.
	 *
	 * **Note**. `n` is normalized to a natural number.
	 *
	 * @example
	 * import { replicate } from 'fp-ts/NonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var replicate = function (a) { return (0, exports.makeBy)(function () { return a; }); };
	exports.replicate = replicate;
	/**
	 * Create a `NonEmptyArray` containing a range of integers, including both endpoints.
	 *
	 * @example
	 * import { range } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
	 *
	 * @category constructors
	 * @since 2.11.0
	 */
	var range = function (start, end) {
	    return start <= end ? (0, exports.makeBy)(function (i) { return start + i; })(end - start + 1) : [start];
	};
	exports.range = range;
	/**
	 * Return the tuple of the `head` and the `tail`.
	 *
	 * @example
	 * import { unprepend } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(unprepend([1, 2, 3]), [1, [2, 3]])
	 *
	 * @since 2.9.0
	 */
	var unprepend = function (as) { return [(0, exports.head)(as), (0, exports.tail)(as)]; };
	exports.unprepend = unprepend;
	/**
	 * Return the tuple of the `init` and the `last`.
	 *
	 * @example
	 * import { unappend } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(unappend([1, 2, 3, 4]), [[1, 2, 3], 4])
	 *
	 * @since 2.9.0
	 */
	var unappend = function (as) { return [(0, exports.init)(as), (0, exports.last)(as)]; };
	exports.unappend = unappend;
	function concatW(second) {
	    return function (first) { return first.concat(second); };
	}
	exports.concatW = concatW;
	function concat(x, y) {
	    return y ? x.concat(y) : function (y) { return y.concat(x); };
	}
	exports.concat = concat;
	/**
	 * @since 2.0.0
	 */
	var reverse = function (as) { return __spreadArray([(0, exports.last)(as)], as.slice(0, -1).reverse(), true); };
	exports.reverse = reverse;
	function group(E) {
	    return function (as) {
	        var len = as.length;
	        if (len === 0) {
	            return [];
	        }
	        var out = [];
	        var head = as[0];
	        var nea = [head];
	        for (var i = 1; i < len; i++) {
	            var a = as[i];
	            if (E.equals(a, head)) {
	                nea.push(a);
	            }
	            else {
	                out.push(nea);
	                head = a;
	                nea = [head];
	            }
	        }
	        out.push(nea);
	        return out;
	    };
	}
	exports.group = group;
	/**
	 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
	 * function on each element, and grouping the results according to values returned
	 *
	 * @example
	 * import { groupBy } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(groupBy((s: string) => String(s.length))(['a', 'b', 'ab']), {
	 *   '1': ['a', 'b'],
	 *   '2': ['ab']
	 * })
	 *
	 * @since 2.0.0
	 */
	var groupBy = function (f) {
	    return function (as) {
	        var out = {};
	        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
	            var a = as_1[_i];
	            var k = f(a);
	            if (_.has.call(out, k)) {
	                out[k].push(a);
	            }
	            else {
	                out[k] = [a];
	            }
	        }
	        return out;
	    };
	};
	exports.groupBy = groupBy;
	/**
	 * @since 2.0.0
	 */
	var sort = function (O) {
	    return function (as) {
	        return as.slice().sort(O.compare);
	    };
	};
	exports.sort = sort;
	/**
	 * @since 2.0.0
	 */
	var insertAt = function (i, a) {
	    return function (as) {
	        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
	    };
	};
	exports.insertAt = insertAt;
	/**
	 * @since 2.0.0
	 */
	var updateAt = function (i, a) {
	    return (0, exports.modifyAt)(i, function () { return a; });
	};
	exports.updateAt = updateAt;
	/**
	 * @since 2.0.0
	 */
	var modifyAt = function (i, f) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
	    };
	};
	exports.modifyAt = modifyAt;
	/**
	 * @since 2.0.0
	 */
	exports.copy = exports.fromReadonlyNonEmptyArray;
	/**
	 * @category constructors
	 * @since 2.0.0
	 */
	var of = function (a) { return [a]; };
	exports.of = of;
	/**
	 * @since 2.5.1
	 */
	var zipWith = function (as, bs, f) {
	    var cs = [f(as[0], bs[0])];
	    var len = Math.min(as.length, bs.length);
	    for (var i = 1; i < len; i++) {
	        cs[i] = f(as[i], bs[i]);
	    }
	    return cs;
	};
	exports.zipWith = zipWith;
	function zip(as, bs) {
	    if (bs === undefined) {
	        return function (bs) { return zip(bs, as); };
	    }
	    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
	}
	exports.zip = zip;
	/**
	 * @since 2.5.1
	 */
	var unzip = function (abs) {
	    var fa = [abs[0][0]];
	    var fb = [abs[0][1]];
	    for (var i = 1; i < abs.length; i++) {
	        fa[i] = abs[i][0];
	        fb[i] = abs[i][1];
	    }
	    return [fa, fb];
	};
	exports.unzip = unzip;
	/**
	 * Prepend an element to every member of an array
	 *
	 * @example
	 * import { prependAll } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.10.0
	 */
	var prependAll = function (middle) {
	    return function (as) {
	        var out = [middle, as[0]];
	        for (var i = 1; i < as.length; i++) {
	            out.push(middle, as[i]);
	        }
	        return out;
	    };
	};
	exports.prependAll = prependAll;
	/**
	 * Places an element in between members of an array
	 *
	 * @example
	 * import { intersperse } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.9.0
	 */
	var intersperse = function (middle) {
	    return function (as) {
	        var rest = (0, exports.tail)(as);
	        return (0, exports.isNonEmpty)(rest) ? (0, function_1.pipe)(rest, (0, exports.prependAll)(middle), (0, exports.prepend)((0, exports.head)(as))) : (0, exports.copy)(as);
	    };
	};
	exports.intersperse = intersperse;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.foldMapWithIndex = RNEA.foldMapWithIndex;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.foldMap = RNEA.foldMap;
	/**
	 * @category sequencing
	 * @since 2.10.0
	 */
	var chainWithIndex = function (f) {
	    return function (as) {
	        var out = (0, exports.fromReadonlyNonEmptyArray)(f(0, (0, exports.head)(as)));
	        for (var i = 1; i < as.length; i++) {
	            out.push.apply(out, f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.chainWithIndex = chainWithIndex;
	/**
	 * @since 2.10.0
	 */
	var chop = function (f) {
	    return function (as) {
	        var _a = f(as), b = _a[0], rest = _a[1];
	        var out = [b];
	        var next = rest;
	        while ((0, exports.isNonEmpty)(next)) {
	            var _b = f(next), b_1 = _b[0], rest_2 = _b[1];
	            out.push(b_1);
	            next = rest_2;
	        }
	        return out;
	    };
	};
	exports.chop = chop;
	/**
	 * Splits a `NonEmptyArray` into two pieces, the first piece has max `n` elements.
	 *
	 * @since 2.10.0
	 */
	var splitAt = function (n) {
	    return function (as) {
	        var m = Math.max(1, n);
	        return m >= as.length ? [(0, exports.copy)(as), []] : [(0, function_1.pipe)(as.slice(1, m), (0, exports.prepend)((0, exports.head)(as))), as.slice(m)];
	    };
	};
	exports.splitAt = splitAt;
	/**
	 * @since 2.10.0
	 */
	var chunksOf = function (n) { return (0, exports.chop)((0, exports.splitAt)(n)); };
	exports.chunksOf = chunksOf;
	/* istanbul ignore next */
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	/* istanbul ignore next */
	var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
	/* istanbul ignore next */
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _extend = function (wa, f) { return (0, function_1.pipe)(wa, (0, exports.extend)(f)); };
	/* istanbul ignore next */
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	/* istanbul ignore next */
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	/* istanbul ignore next */
	var _reduceWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRightWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _traverseWithIndex = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
	};
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @example
	 * import * as NEA from 'fp-ts/NonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3] as NEA.NonEmptyArray<number>,
	 *     NEA.altW(() => ['a', 'b'])
	 *   ),
	 *   [1, 2, 3, 'a', 'b']
	 * )
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) {
	    return function (as) {
	        return (0, function_1.pipe)(as, concatW(that()));
	    };
	};
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `NonEmptyArray` concatenates the inputs into a single array.
	 *
	 * @example
	 * import * as NEA from 'fp-ts/NonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     NEA.alt(() => [4, 5])
	 *   ),
	 *   [1, 2, 3, 4, 5]
	 * )
	 *
	 * @category error handling
	 * @since 2.6.2
	 */
	exports.alt = exports.altW;
	/**
	 * Apply a function to an argument under a type constructor.
	 *
	 * @since 2.0.0
	 */
	var ap = function (as) {
	    return (0, exports.flatMap)(function (f) { return (0, function_1.pipe)(as, (0, exports.map)(f)); });
	};
	exports.ap = ap;
	/**
	 * @example
	 * import * as NEA from 'fp-ts/NonEmptyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     NEA.flatMap((n) => [`a${n}`, `b${n}`])
	 *   ),
	 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
	 * )
	 *
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (i, a) { return f(a, i); }));
	});
	/**
	 * @since 2.0.0
	 */
	var extend = function (f) {
	    return function (as) {
	        var next = (0, exports.tail)(as);
	        var out = [f(as)];
	        while ((0, exports.isNonEmpty)(next)) {
	            out.push(f(next));
	            next = (0, exports.tail)(next);
	        }
	        return out;
	    };
	};
	exports.extend = extend;
	/**
	 * @since 2.5.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return (0, exports.mapWithIndex)(function (_, a) { return f(a); }); };
	exports.map = map;
	/**
	 * @category mapping
	 * @since 2.0.0
	 */
	var mapWithIndex = function (f) {
	    return function (as) {
	        var out = [f(0, (0, exports.head)(as))];
	        for (var i = 1; i < as.length; i++) {
	            out.push(f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.mapWithIndex = mapWithIndex;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduce = RNEA.reduce;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceWithIndex = RNEA.reduceWithIndex;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceRight = RNEA.reduceRight;
	/**
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceRightWithIndex = RNEA.reduceRightWithIndex;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
	};
	exports.traverse = traverse;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) { return (0, exports.traverseWithIndex)(F)(function (_, a) { return a; }); };
	exports.sequence = sequence;
	/**
	 * @category sequencing
	 * @since 2.6.3
	 */
	var traverseWithIndex = function (F) {
	    return function (f) {
	        return function (as) {
	            var out = F.map(f(0, (0, exports.head)(as)), exports.of);
	            for (var i = 1; i < as.length; i++) {
	                out = F.ap(F.map(out, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, as[i]));
	            }
	            return out;
	        };
	    };
	};
	exports.traverseWithIndex = traverseWithIndex;
	/**
	 * @since 2.7.0
	 */
	exports.extract = RNEA.head;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'NonEmptyArray';
	/**
	 * @category instances
	 * @since 2.0.0
	 */
	exports.getShow = RNEA.getShow;
	/**
	 * Builds a `Semigroup` instance for `NonEmptyArray`
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getSemigroup = function () { return ({
	    concat: concat
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * @example
	 * import { getEq } from 'fp-ts/NonEmptyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * const E = getEq(N.Eq)
	 * assert.strictEqual(E.equals([1, 2], [1, 2]), true)
	 * assert.strictEqual(E.equals([1, 2], [1, 3]), false)
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	exports.getEq = RNEA.getEq;
	/**
	 * @since 2.11.0
	 */
	var getUnionSemigroup = function (E) {
	    var unionE = (0, exports.union)(E);
	    return {
	        concat: function (first, second) { return unionE(second)(first); }
	    };
	};
	exports.getUnionSemigroup = getUnionSemigroup;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.5.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.5.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.chainFirst = 
	/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Comonad = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend,
	    extract: exports.extract
	};
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = (0, Chain_1.bind)(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * @since 2.0.0
	 */
	exports.head = RNEA.head;
	/**
	 * @since 2.0.0
	 */
	var tail = function (as) { return as.slice(1); };
	exports.tail = tail;
	/**
	 * @since 2.0.0
	 */
	exports.last = RNEA.last;
	/**
	 * Get all but the last element of a non empty array, creating a new array.
	 *
	 * @example
	 * import { init } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(init([1, 2, 3]), [1, 2])
	 * assert.deepStrictEqual(init([1]), [])
	 *
	 * @since 2.2.0
	 */
	var init = function (as) { return as.slice(0, -1); };
	exports.init = init;
	/**
	 * @since 2.0.0
	 */
	exports.min = RNEA.min;
	/**
	 * @since 2.0.0
	 */
	exports.max = RNEA.max;
	/**
	 * @since 2.10.0
	 */
	var concatAll = function (S) {
	    return function (as) {
	        return as.reduce(S.concat);
	    };
	};
	exports.concatAll = concatAll;
	/**
	 * Break an `Array` into its first element and remaining elements.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchLeft = function (f) {
	    return function (as) {
	        return f((0, exports.head)(as), (0, exports.tail)(as));
	    };
	};
	exports.matchLeft = matchLeft;
	/**
	 * Break an `Array` into its initial elements and the last element.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchRight = function (f) {
	    return function (as) {
	        return f((0, exports.init)(as), (0, exports.last)(as));
	    };
	};
	exports.matchRight = matchRight;
	/**
	 * Apply a function to the head, creating a new `NonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyHead = function (f) {
	    return function (as) {
	        return __spreadArray([f((0, exports.head)(as))], (0, exports.tail)(as), true);
	    };
	};
	exports.modifyHead = modifyHead;
	/**
	 * Change the head, creating a new `NonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateHead = function (a) { return (0, exports.modifyHead)(function () { return a; }); };
	exports.updateHead = updateHead;
	/**
	 * Apply a function to the last element, creating a new `NonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var modifyLast = function (f) {
	    return function (as) {
	        return (0, function_1.pipe)((0, exports.init)(as), (0, exports.append)(f((0, exports.last)(as))));
	    };
	};
	exports.modifyLast = modifyLast;
	/**
	 * Change the last element, creating a new `NonEmptyArray`.
	 *
	 * @since 2.11.0
	 */
	var updateLast = function (a) { return (0, exports.modifyLast)(function () { return a; }); };
	exports.updateLast = updateLast;
	/**
	 * Places an element in between members of a `NonEmptyArray`, then folds the results using the provided `Semigroup`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { intercalate } from 'fp-ts/NonEmptyArray'
	 *
	 * assert.deepStrictEqual(intercalate(S.Semigroup)('-')(['a', 'b', 'c']), 'a-b-c')
	 *
	 * @since 2.12.0
	 */
	exports.intercalate = RNEA.intercalate;
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	function groupSort(O) {
	    var sortO = (0, exports.sort)(O);
	    var groupO = group(O);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? groupO(sortO(as)) : []); };
	}
	exports.groupSort = groupSort;
	function filter(predicate) {
	    return (0, exports.filterWithIndex)(function (_, a) { return predicate(a); });
	}
	exports.filter = filter;
	/**
	 * Use [`filterWithIndex`](./Array.ts.html#filterwithindex) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var filterWithIndex = function (predicate) {
	    return function (as) {
	        return (0, exports.fromArray)(as.filter(function (a, i) { return predicate(i, a); }));
	    };
	};
	exports.filterWithIndex = filterWithIndex;
	/**
	 * Use [`unprepend`](#unprepend) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.uncons = exports.unprepend;
	/**
	 * Use [`unappend`](#unappend) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.unsnoc = exports.unappend;
	function cons(head, tail) {
	    return tail === undefined ? (0, exports.prepend)(head) : (0, function_1.pipe)(tail, (0, exports.prepend)(head));
	}
	exports.cons = cons;
	/**
	 * Use [`append`](./Array.ts.html#append) instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	var snoc = function (init, end) { return (0, function_1.pipe)(init, (0, exports.append)(end)); };
	exports.snoc = snoc;
	/**
	 * Use [`prependAll`](#prependall) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.prependToAll = exports.prependAll;
	/**
	 * Use [`concatAll`](#concatall) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.fold = RNEA.concatAll;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `NEA.Functor` instead of `NEA.nonEmptyArray`
	 * (where `NEA` is from `import NEA from 'fp-ts/NonEmptyArray'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.nonEmptyArray = {
	    URI: exports.URI,
	    of: exports.of,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    ap: _ap,
	    chain: exports.flatMap,
	    extend: _extend,
	    extract: exports.extract,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex,
	    alt: _alt
	}; 
} (NonEmptyArray));

var ReadonlyArray = {};

var number = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Field = exports.MonoidProduct = exports.MonoidSum = exports.SemigroupProduct = exports.SemigroupSum = exports.MagmaSub = exports.Show = exports.Bounded = exports.Ord = exports.Eq = exports.isNumber = void 0;
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * @category refinements
	 * @since 2.11.0
	 */
	var isNumber = function (u) { return typeof u === 'number'; };
	exports.isNumber = isNumber;
	// -------------------------------------------------------------------------------------
	// instances
	// -------------------------------------------------------------------------------------
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Eq = {
	    equals: function (first, second) { return first === second; }
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Ord = {
	    equals: exports.Eq.equals,
	    compare: function (first, second) { return (first < second ? -1 : first > second ? 1 : 0); }
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Bounded = {
	    equals: exports.Eq.equals,
	    compare: exports.Ord.compare,
	    top: Infinity,
	    bottom: -Infinity
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Show = {
	    show: function (n) { return JSON.stringify(n); }
	};
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.MagmaSub = {
	    concat: function (first, second) { return first - second; }
	};
	/**
	 * `number` semigroup under addition.
	 *
	 * @example
	 * import { SemigroupSum } from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(SemigroupSum.concat(2, 3), 5)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.SemigroupSum = {
	    concat: function (first, second) { return first + second; }
	};
	/**
	 * `number` semigroup under multiplication.
	 *
	 * @example
	 * import { SemigroupProduct } from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(SemigroupProduct.concat(2, 3), 6)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.SemigroupProduct = {
	    concat: function (first, second) { return first * second; }
	};
	/**
	 * `number` monoid under addition.
	 *
	 * The `empty` value is `0`.
	 *
	 * @example
	 * import { MonoidSum } from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(MonoidSum.concat(2, MonoidSum.empty), 2)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonoidSum = {
	    concat: exports.SemigroupSum.concat,
	    empty: 0
	};
	/**
	 * `number` monoid under multiplication.
	 *
	 * The `empty` value is `1`.
	 *
	 * @example
	 * import { MonoidProduct } from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(MonoidProduct.concat(2, MonoidProduct.empty), 2)
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	exports.MonoidProduct = {
	    concat: exports.SemigroupProduct.concat,
	    empty: 1
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Field = {
	    add: exports.SemigroupSum.concat,
	    zero: 0,
	    mul: exports.SemigroupProduct.concat,
	    one: 1,
	    sub: exports.MagmaSub.concat,
	    degree: function (_) { return 1; },
	    div: function (first, second) { return first / second; },
	    mod: function (first, second) { return first % second; }
	}; 
} (number));

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __spreadArray = (index.commonjsGlobal && index.commonjsGlobal.__spreadArray) || function (to, from, pack) {
	    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
	        if (ar || !(i in from)) {
	            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
	            ar[i] = from[i];
	        }
	    }
	    return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
	exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.flatten = exports.flatMap = exports.ap = exports.alt = exports.altW = exports.zero = exports.of = exports._chainRecBreadthFirst = exports._chainRecDepthFirst = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = void 0;
	exports.toArray = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.Witherable = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.chainFirst = exports.Monad = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = void 0;
	exports.readonlyArray = exports.prependToAll = exports.snoc = exports.cons = exports.range = exports.chain = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.intercalate = exports.exists = exports.some = exports.every = exports.empty = exports.fromArray = void 0;
	var Apply_1 = index.Apply;
	var Chain_1 = index.Chain;
	var Eq_1 = withdrawal.Eq;
	var FromEither_1 = index.FromEither;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var N = __importStar(number);
	var Ord_1 = withdrawal.Ord;
	var RNEA = __importStar(ReadonlyNonEmptyArray);
	var Separated_1 = index.Separated;
	var Witherable_1 = index.Witherable;
	var Zero_1 = withdrawal.Zero;
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * Test whether a `ReadonlyArray` is empty.
	 *
	 * @example
	 * import { isEmpty } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.strictEqual(isEmpty([]), true)
	 *
	 * @category refinements
	 * @since 2.5.0
	 */
	var isEmpty = function (as) { return as.length === 0; };
	exports.isEmpty = isEmpty;
	/**
	 * Test whether a `ReadonlyArray` is non empty.
	 *
	 * @category refinements
	 * @since 2.5.0
	 */
	exports.isNonEmpty = RNEA.isNonEmpty;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { prepend } from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
	 *
	 * @since 2.10.0
	 */
	exports.prepend = RNEA.prepend;
	/**
	 * Less strict version of [`prepend`](#prepend).
	 *
	 * @since 2.11.0
	 */
	exports.prependW = RNEA.prependW;
	/**
	 * Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
	 *
	 * @example
	 * import { append } from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
	 *
	 * @since 2.10.0
	 */
	exports.append = RNEA.append;
	/**
	 * Less strict version of [`append`](#append).
	 *
	 * @since 2.11.0
	 */
	exports.appendW = RNEA.appendW;
	/**
	 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { makeBy } from 'fp-ts/ReadonlyArray'
	 *
	 * const double = (n: number): number => n * 2
	 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
	 *
	 * @category constructors
	 * @since 2.5.0
	 */
	var makeBy = function (n, f) { return (n <= 0 ? exports.empty : RNEA.makeBy(f)(n)); };
	exports.makeBy = makeBy;
	/**
	 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { replicate } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
	 *
	 * @category constructors
	 * @since 2.5.0
	 */
	var replicate = function (n, a) { return (0, exports.makeBy)(n, function () { return a; }); };
	exports.replicate = replicate;
	function fromPredicate(predicate) {
	    return function (a) { return (predicate(a) ? [a] : exports.empty); };
	}
	exports.fromPredicate = fromPredicate;
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromOption = function (ma) { return (_.isNone(ma) ? exports.empty : [ma.value]); };
	exports.fromOption = fromOption;
	/**
	 * Transforms an `Either` to a `ReadonlyArray`.
	 *
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromEither = function (e) { return (_.isLeft(e) ? exports.empty : [e.right]); };
	exports.fromEither = fromEither;
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(as) : onEmpty();
	    };
	};
	exports.matchW = matchW;
	/**
	 * @category pattern matching
	 * @since 2.11.0
	 */
	exports.match = exports.matchW;
	/**
	 * Less strict version of [`matchLeft`](#matchleft).
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchLeftW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.head(as), RNEA.tail(as)) : onEmpty();
	    };
	};
	exports.matchLeftW = matchLeftW;
	/**
	 * Break a `ReadonlyArray` into its first element and remaining elements.
	 *
	 * @example
	 * import { matchLeft } from 'fp-ts/ReadonlyArray'
	 *
	 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
	 * assert.strictEqual(len([1, 2, 3]), 3)
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchLeft = exports.matchLeftW;
	/**
	 * Alias of [`matchLeft`](#matchleft).
	 *
	 * @category pattern matching
	 * @since 2.5.0
	 */
	exports.foldLeft = exports.matchLeft;
	/**
	 * Less strict version of [`matchRight`](#matchright).
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchRightW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(RNEA.init(as), RNEA.last(as)) : onEmpty();
	    };
	};
	exports.matchRightW = matchRightW;
	/**
	 * Break a `ReadonlyArray` into its initial elements and the last element.
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchRight = exports.matchRightW;
	/**
	 * Alias of [`matchRight`](#matchright).
	 *
	 * @category pattern matching
	 * @since 2.5.0
	 */
	exports.foldRight = exports.matchRight;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * @category sequencing
	 * @since 2.7.0
	 */
	var chainWithIndex = function (f) {
	    return function (as) {
	        if ((0, exports.isEmpty)(as)) {
	            return exports.empty;
	        }
	        var out = [];
	        for (var i = 0; i < as.length; i++) {
	            out.push.apply(out, f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.chainWithIndex = chainWithIndex;
	/**
	 * Same as `reduce` but it carries over the intermediate steps.
	 *
	 * @example
	 * import { scanLeft } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
	 *
	 * @since 2.5.0
	 */
	var scanLeft = function (b, f) {
	    return function (as) {
	        var len = as.length;
	        var out = new Array(len + 1);
	        out[0] = b;
	        for (var i = 0; i < len; i++) {
	            out[i + 1] = f(out[i], as[i]);
	        }
	        return out;
	    };
	};
	exports.scanLeft = scanLeft;
	/**
	 * Fold an array from the right, keeping all intermediate results instead of only the final result
	 *
	 * @example
	 * import { scanRight } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
	 *
	 * @since 2.5.0
	 */
	var scanRight = function (b, f) {
	    return function (as) {
	        var len = as.length;
	        var out = new Array(len + 1);
	        out[len] = b;
	        for (var i = len - 1; i >= 0; i--) {
	            out[i] = f(as[i], out[i + 1]);
	        }
	        return out;
	    };
	};
	exports.scanRight = scanRight;
	/**
	 * Calculate the number of elements in a `ReadonlyArray`.
	 *
	 * @since 2.10.0
	 */
	var size = function (as) { return as.length; };
	exports.size = size;
	/**
	 * Test whether an array contains a particular index
	 *
	 * @since 2.5.0
	 */
	exports.isOutOfBound = RNEA.isOutOfBound;
	function lookup(i, as) {
	    return as === undefined ? function (as) { return lookup(i, as); } : (0, exports.isOutOfBound)(i, as) ? _.none : _.some(as[i]);
	}
	exports.lookup = lookup;
	/**
	 * Get the first element in an array, or `None` if the array is empty
	 *
	 * @example
	 * import { head } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
	 * assert.deepStrictEqual(head([]), none)
	 *
	 * @since 2.5.0
	 */
	var head = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(RNEA.head(as)) : _.none); };
	exports.head = head;
	/**
	 * Get the last element in an array, or `None` if the array is empty
	 *
	 * @example
	 * import { last } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
	 * assert.deepStrictEqual(last([]), none)
	 *
	 * @since 2.5.0
	 */
	var last = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(RNEA.last(as)) : _.none); };
	exports.last = last;
	/**
	 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
	 *
	 * @example
	 * import { tail } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
	 * assert.deepStrictEqual(tail([]), none)
	 *
	 * @since 2.5.0
	 */
	var tail = function (as) {
	    return (0, exports.isNonEmpty)(as) ? _.some(RNEA.tail(as)) : _.none;
	};
	exports.tail = tail;
	/**
	 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
	 *
	 * @example
	 * import { init } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
	 * assert.deepStrictEqual(init([]), none)
	 *
	 * @since 2.5.0
	 */
	var init = function (as) {
	    return (0, exports.isNonEmpty)(as) ? _.some(RNEA.init(as)) : _.none;
	};
	exports.init = init;
	/**
	 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const input: ReadonlyArray<number> = [1, 2, 3]
	 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
	 *
	 * // out of bounds
	 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
	 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
	 *
	 * @since 2.5.0
	 */
	var takeLeft = function (n) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(0, n);
	    };
	};
	exports.takeLeft = takeLeft;
	/**
	 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const input: ReadonlyArray<number> = [1, 2, 3]
	 * assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])
	 *
	 * // out of bounds
	 * assert.strictEqual(pipe(input, RA.takeRight(4)), input)
	 * assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
	 *
	 * @since 2.5.0
	 */
	var takeRight = function (n) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(n, as) ? as : n === 0 ? exports.empty : as.slice(-n);
	    };
	};
	exports.takeRight = takeRight;
	function takeLeftWhile(predicate) {
	    return function (as) {
	        var out = [];
	        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
	            var a = as_1[_i];
	            if (!predicate(a)) {
	                break;
	            }
	            out.push(a);
	        }
	        var len = out.length;
	        return len === as.length ? as : len === 0 ? exports.empty : out;
	    };
	}
	exports.takeLeftWhile = takeLeftWhile;
	var spanLeftIndex = function (as, predicate) {
	    var l = as.length;
	    var i = 0;
	    for (; i < l; i++) {
	        if (!predicate(as[i])) {
	            break;
	        }
	    }
	    return i;
	};
	function spanLeft(predicate) {
	    return function (as) {
	        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
	        return { init: init, rest: rest };
	    };
	}
	exports.spanLeft = spanLeft;
	/**
	 * Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const input: ReadonlyArray<number> = [1, 2, 3]
	 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
	 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
	 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
	 *
	 * @since 2.5.0
	 */
	var dropLeft = function (n) {
	    return function (as) {
	        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(n, as.length);
	    };
	};
	exports.dropLeft = dropLeft;
	/**
	 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const input: ReadonlyArray<number> = [1, 2, 3]
	 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
	 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
	 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
	 *
	 * @since 2.5.0
	 */
	var dropRight = function (n) {
	    return function (as) {
	        return n <= 0 || (0, exports.isEmpty)(as) ? as : n >= as.length ? exports.empty : as.slice(0, as.length - n);
	    };
	};
	exports.dropRight = dropRight;
	function dropLeftWhile(predicate) {
	    return function (as) {
	        var i = spanLeftIndex(as, predicate);
	        return i === 0 ? as : i === as.length ? exports.empty : as.slice(i);
	    };
	}
	exports.dropLeftWhile = dropLeftWhile;
	/**
	 * Find the first index for which a predicate holds
	 *
	 * @example
	 * import { findIndex } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
	 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
	 *
	 * @since 2.5.0
	 */
	var findIndex = function (predicate) {
	    return function (as) {
	        for (var i = 0; i < as.length; i++) {
	            if (predicate(as[i])) {
	                return _.some(i);
	            }
	        }
	        return _.none;
	    };
	};
	exports.findIndex = findIndex;
	function findFirst(predicate) {
	    return function (as) {
	        for (var i = 0; i < as.length; i++) {
	            if (predicate(as[i])) {
	                return _.some(as[i]);
	            }
	        }
	        return _.none;
	    };
	}
	exports.findFirst = findFirst;
	/**
	 * Find the first element returned by an option based selector function
	 *
	 * @example
	 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age?: number
	 * }
	 *
	 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	 *
	 * // returns the name of the first person that has an age
	 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
	 *
	 * @since 2.5.0
	 */
	var findFirstMap = function (f) {
	    return function (as) {
	        for (var i = 0; i < as.length; i++) {
	            var out = f(as[i]);
	            if (_.isSome(out)) {
	                return out;
	            }
	        }
	        return _.none;
	    };
	};
	exports.findFirstMap = findFirstMap;
	function findLast(predicate) {
	    return function (as) {
	        for (var i = as.length - 1; i >= 0; i--) {
	            if (predicate(as[i])) {
	                return _.some(as[i]);
	            }
	        }
	        return _.none;
	    };
	}
	exports.findLast = findLast;
	/**
	 * Find the last element returned by an option based selector function
	 *
	 * @example
	 * import { findLastMap } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age?: number
	 * }
	 *
	 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	 *
	 * // returns the name of the last person that has an age
	 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
	 *
	 * @since 2.5.0
	 */
	var findLastMap = function (f) {
	    return function (as) {
	        for (var i = as.length - 1; i >= 0; i--) {
	            var out = f(as[i]);
	            if (_.isSome(out)) {
	                return out;
	            }
	        }
	        return _.none;
	    };
	};
	exports.findLastMap = findLastMap;
	/**
	 * Returns the index of the last element of the list which matches the predicate
	 *
	 * @example
	 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface X {
	 *   readonly a: number
	 *   readonly b: number
	 * }
	 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
	 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
	 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
	 *
	 *
	 * @since 2.5.0
	 */
	var findLastIndex = function (predicate) {
	    return function (as) {
	        for (var i = as.length - 1; i >= 0; i--) {
	            if (predicate(as[i])) {
	                return _.some(i);
	            }
	        }
	        return _.none;
	    };
	};
	exports.findLastIndex = findLastIndex;
	/**
	 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	 *
	 * @example
	 * import { insertAt } from 'fp-ts/ReadonlyArray'
	 * import { some } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
	 *
	 * @since 2.5.0
	 */
	var insertAt = function (i, a) {
	    return function (as) {
	        return i < 0 || i > as.length ? _.none : _.some(RNEA.unsafeInsertAt(i, a, as));
	    };
	};
	exports.insertAt = insertAt;
	/**
	 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	 *
	 * @example
	 * import { updateAt } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
	 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
	 *
	 * @since 2.5.0
	 */
	var updateAt = function (i, a) {
	    return (0, exports.modifyAt)(i, function () { return a; });
	};
	exports.updateAt = updateAt;
	/**
	 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	 *
	 * @example
	 * import { deleteAt } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
	 * assert.deepStrictEqual(deleteAt(1)([]), none)
	 *
	 * @since 2.5.0
	 */
	var deleteAt = function (i) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeDeleteAt)(i, as));
	    };
	};
	exports.deleteAt = deleteAt;
	/**
	 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
	 * of bounds
	 *
	 * @example
	 * import { modifyAt } from 'fp-ts/ReadonlyArray'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * const double = (x: number): number => x * 2
	 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
	 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
	 *
	 * @since 2.5.0
	 */
	var modifyAt = function (i, f) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
	    };
	};
	exports.modifyAt = modifyAt;
	/**
	 * Reverse an array, creating a new array
	 *
	 * @example
	 * import { reverse } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
	 *
	 * @since 2.5.0
	 */
	var reverse = function (as) { return (as.length <= 1 ? as : as.slice().reverse()); };
	exports.reverse = reverse;
	/**
	 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
	 *
	 * @example
	 * import { rights } from 'fp-ts/ReadonlyArray'
	 * import { right, left } from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
	 *
	 * @since 2.5.0
	 */
	var rights = function (as) {
	    var r = [];
	    for (var i = 0; i < as.length; i++) {
	        var a = as[i];
	        if (a._tag === 'Right') {
	            r.push(a.right);
	        }
	    }
	    return r;
	};
	exports.rights = rights;
	/**
	 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
	 *
	 * @example
	 * import { lefts } from 'fp-ts/ReadonlyArray'
	 * import { left, right } from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
	 *
	 * @since 2.5.0
	 */
	var lefts = function (as) {
	    var r = [];
	    for (var i = 0; i < as.length; i++) {
	        var a = as[i];
	        if (a._tag === 'Left') {
	            r.push(a.left);
	        }
	    }
	    return r;
	};
	exports.lefts = lefts;
	/**
	 * Sort the elements of an array in increasing order, creating a new array
	 *
	 * @example
	 * import { sort } from 'fp-ts/ReadonlyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
	 *
	 * @since 2.5.0
	 */
	var sort = function (O) {
	    return function (as) {
	        return as.length <= 1 ? as : as.slice().sort(O.compare);
	    };
	};
	exports.sort = sort;
	// TODO: curry and make data-last in v3
	/**
	 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
	 * input array is short, excess elements of the longer array are discarded.
	 *
	 * @example
	 * import { zipWith } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
	 *
	 * @since 2.5.0
	 */
	var zipWith = function (fa, fb, f) {
	    var fc = [];
	    var len = Math.min(fa.length, fb.length);
	    for (var i = 0; i < len; i++) {
	        fc[i] = f(fa[i], fb[i]);
	    }
	    return fc;
	};
	exports.zipWith = zipWith;
	function zip(as, bs) {
	    if (bs === undefined) {
	        return function (bs) { return zip(bs, as); };
	    }
	    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
	}
	exports.zip = zip;
	/**
	 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
	 *
	 * @example
	 * import { unzip } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
	 *
	 * @since 2.5.0
	 */
	var unzip = function (as) {
	    var fa = [];
	    var fb = [];
	    for (var i = 0; i < as.length; i++) {
	        fa[i] = as[i][0];
	        fb[i] = as[i][1];
	    }
	    return [fa, fb];
	};
	exports.unzip = unzip;
	/**
	 * Prepend an element to every member of an array
	 *
	 * @example
	 * import { prependAll } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.10.0
	 */
	var prependAll = function (middle) {
	    var f = RNEA.prependAll(middle);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
	};
	exports.prependAll = prependAll;
	/**
	 * Places an element in between members of an array
	 *
	 * @example
	 * import { intersperse } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.9.0
	 */
	var intersperse = function (middle) {
	    var f = RNEA.intersperse(middle);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
	};
	exports.intersperse = intersperse;
	/**
	 * Rotate a `ReadonlyArray` by `n` steps.
	 *
	 * @example
	 * import { rotate } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	 *
	 * @since 2.5.0
	 */
	var rotate = function (n) {
	    var f = RNEA.rotate(n);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
	};
	exports.rotate = rotate;
	function elem(E) {
	    return function (a, as) {
	        if (as === undefined) {
	            var elemE_1 = elem(E);
	            return function (as) { return elemE_1(a, as); };
	        }
	        var predicate = function (element) { return E.equals(element, a); };
	        var i = 0;
	        for (; i < as.length; i++) {
	            if (predicate(as[i])) {
	                return true;
	            }
	        }
	        return false;
	    };
	}
	exports.elem = elem;
	/**
	 * Remove duplicates from an array, keeping the first occurrence of an element.
	 *
	 * @example
	 * import { uniq } from 'fp-ts/ReadonlyArray'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
	 *
	 * @since 2.5.0
	 */
	var uniq = function (E) {
	    var f = RNEA.uniq(E);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
	};
	exports.uniq = uniq;
	/**
	 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	 * etc...
	 *
	 * @example
	 * import { sortBy } from 'fp-ts/ReadonlyArray'
	 * import { contramap } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age: number
	 * }
	 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
	 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
	 *
	 * const sortByNameByAge = sortBy([byName, byAge])
	 *
	 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
	 * assert.deepStrictEqual(sortByNameByAge(persons), [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 2 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 }
	 * ])
	 *
	 * @since 2.5.0
	 */
	var sortBy = function (ords) {
	    var f = RNEA.sortBy(ords);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : as); };
	};
	exports.sortBy = sortBy;
	/**
	 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
	 * `ReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
	 * value and the tail of the `ReadonlyArray`.
	 *
	 * @example
	 * import { Eq } from 'fp-ts/Eq'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
	 *   return RA.chop(as => {
	 *     const { init, rest } = pipe(as, RA.spanLeft((a: A) => S.equals(a, as[0])))
	 *     return [init, rest]
	 *   })
	 * }
	 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
	 *
	 * @since 2.5.0
	 */
	var chop = function (f) {
	    var g = RNEA.chop(f);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? g(as) : exports.empty); };
	};
	exports.chop = chop;
	/**
	 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
	 *
	 * @example
	 * import { splitAt } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
	 *
	 * @since 2.5.0
	 */
	var splitAt = function (n) {
	    return function (as) {
	        return n >= 1 && (0, exports.isNonEmpty)(as) ? RNEA.splitAt(n)(as) : (0, exports.isEmpty)(as) ? [as, exports.empty] : [exports.empty, as];
	    };
	};
	exports.splitAt = splitAt;
	/**
	 * Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	 * the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
	 * definition of `chunksOf`; it satisfies the property that:
	 *
	 * ```ts
	 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
	 * ```
	 *
	 * whenever `n` evenly divides the length of `as`.
	 *
	 * @example
	 * import { chunksOf } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
	 *
	 * @since 2.5.0
	 */
	var chunksOf = function (n) {
	    var f = RNEA.chunksOf(n);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : exports.empty); };
	};
	exports.chunksOf = chunksOf;
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	var fromOptionK = function (f) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.fromOption)(f.apply(void 0, a));
	    };
	};
	exports.fromOptionK = fromOptionK;
	function comprehension(input, f, g) {
	    if (g === void 0) { g = function () { return true; }; }
	    var go = function (scope, input) {
	        return (0, exports.isNonEmpty)(input)
	            ? (0, exports.flatMap)(RNEA.head(input), function (a) { return go((0, function_1.pipe)(scope, (0, exports.append)(a)), RNEA.tail(input)); })
	            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
	                : exports.empty;
	    };
	    return go(exports.empty, input);
	}
	exports.comprehension = comprehension;
	/**
	 * @since 2.11.0
	 */
	var concatW = function (second) {
	    return function (first) {
	        return (0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second);
	    };
	};
	exports.concatW = concatW;
	/**
	 * @since 2.11.0
	 */
	exports.concat = exports.concatW;
	function union(E) {
	    var unionE = RNEA.union(E);
	    return function (first, second) {
	        if (second === undefined) {
	            var unionE_1 = union(E);
	            return function (second) { return unionE_1(second, first); };
	        }
	        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second) ? unionE(second)(first) : (0, exports.isNonEmpty)(first) ? first : second;
	    };
	}
	exports.union = union;
	function intersection(E) {
	    var elemE = elem(E);
	    return function (xs, ys) {
	        if (ys === undefined) {
	            var intersectionE_1 = intersection(E);
	            return function (ys) { return intersectionE_1(ys, xs); };
	        }
	        return xs.filter(function (a) { return elemE(a, ys); });
	    };
	}
	exports.intersection = intersection;
	function difference(E) {
	    var elemE = elem(E);
	    return function (xs, ys) {
	        if (ys === undefined) {
	            var differenceE_1 = difference(E);
	            return function (ys) { return differenceE_1(ys, xs); };
	        }
	        return xs.filter(function (a) { return !elemE(a, ys); });
	    };
	}
	exports.difference = difference;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	var _filter = function (fa, predicate) {
	    return (0, function_1.pipe)(fa, (0, exports.filter)(predicate));
	};
	var _filterMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMap)(f)); };
	var _partition = function (fa, predicate) {
	    return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
	};
	var _partitionMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f)); };
	var _partitionWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.partitionWithIndex)(predicateWithIndex)); };
	var _partitionMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMapWithIndex)(f)); };
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	var _reduceWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
	};
	var _foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
	};
	var _reduceRightWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
	};
	var _filterMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMapWithIndex)(f)); };
	var _filterWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.filterWithIndex)(predicateWithIndex)); };
	var _extend = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.extend)(f)); };
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _traverseWithIndex = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
	};
	/** @internal */
	var _chainRecDepthFirst = function (a, f) { return (0, function_1.pipe)(a, (0, exports.chainRecDepthFirst)(f)); };
	exports._chainRecDepthFirst = _chainRecDepthFirst;
	/** @internal */
	var _chainRecBreadthFirst = function (a, f) { return (0, function_1.pipe)(a, (0, exports.chainRecBreadthFirst)(f)); };
	exports._chainRecBreadthFirst = _chainRecBreadthFirst;
	/**
	 * @category constructors
	 * @since 2.5.0
	 */
	exports.of = RNEA.of;
	/**
	 * @since 2.7.0
	 */
	var zero = function () { return exports.empty; };
	exports.zero = zero;
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.altW(() => ['a', 'b'])
	 *   ),
	 *   [1, 2, 3, 'a', 'b']
	 * )
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) {
	    return function (fa) {
	        return fa.concat(that());
	    };
	};
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `ReadonlyArray` concatenates the inputs into a single array.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.alt(() => [4, 5])
	 *   ),
	 *   [1, 2, 3, 4, 5]
	 * )
	 *
	 * @category error handling
	 * @since 2.5.0
	 */
	exports.alt = exports.altW;
	/**
	 * @since 2.5.0
	 */
	var ap = function (fa) {
	    return (0, exports.flatMap)(function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); });
	};
	exports.ap = ap;
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.flatMap((n) => [`a${n}`, `b${n}`])
	 *   ),
	 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.flatMap(() => [])
	 *   ),
	 *   []
	 * )
	 *
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (i, a) { return f(a, i); }));
	});
	/**
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	 * use the type constructor `F` to represent some computational context.
	 *
	 * @category mapping
	 * @since 2.5.0
	 */
	var map = function (f) { return function (fa) {
	    return fa.map(function (a) { return f(a); });
	}; };
	exports.map = map;
	/**
	 * @category mapping
	 * @since 2.5.0
	 */
	var mapWithIndex = function (f) { return function (fa) {
	    return fa.map(function (a, i) { return f(i, a); });
	}; };
	exports.mapWithIndex = mapWithIndex;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var separate = function (fa) {
	    var left = [];
	    var right = [];
	    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
	        var e = fa_1[_i];
	        if (e._tag === 'Left') {
	            left.push(e.left);
	        }
	        else {
	            right.push(e.right);
	        }
	    }
	    return (0, Separated_1.separated)(left, right);
	};
	exports.separate = separate;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var filter = function (predicate) {
	    return function (as) {
	        return as.filter(predicate);
	    };
	};
	exports.filter = filter;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var filterMapWithIndex = function (f) {
	    return function (fa) {
	        var out = [];
	        for (var i = 0; i < fa.length; i++) {
	            var optionB = f(i, fa[i]);
	            if (_.isSome(optionB)) {
	                out.push(optionB.value);
	            }
	        }
	        return out;
	    };
	};
	exports.filterMapWithIndex = filterMapWithIndex;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var filterMap = function (f) {
	    return (0, exports.filterMapWithIndex)(function (_, a) { return f(a); });
	};
	exports.filterMap = filterMap;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	exports.compact = (0, exports.filterMap)(function_1.identity);
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var partition = function (predicate) {
	    return (0, exports.partitionWithIndex)(function (_, a) { return predicate(a); });
	};
	exports.partition = partition;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var partitionWithIndex = function (predicateWithIndex) {
	    return function (as) {
	        var left = [];
	        var right = [];
	        for (var i = 0; i < as.length; i++) {
	            var a = as[i];
	            if (predicateWithIndex(i, a)) {
	                right.push(a);
	            }
	            else {
	                left.push(a);
	            }
	        }
	        return (0, Separated_1.separated)(left, right);
	    };
	};
	exports.partitionWithIndex = partitionWithIndex;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var partitionMap = function (f) {
	    return (0, exports.partitionMapWithIndex)(function (_, a) { return f(a); });
	};
	exports.partitionMap = partitionMap;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var partitionMapWithIndex = function (f) {
	    return function (fa) {
	        var left = [];
	        var right = [];
	        for (var i = 0; i < fa.length; i++) {
	            var e = f(i, fa[i]);
	            if (e._tag === 'Left') {
	                left.push(e.left);
	            }
	            else {
	                right.push(e.right);
	            }
	        }
	        return (0, Separated_1.separated)(left, right);
	    };
	};
	exports.partitionMapWithIndex = partitionMapWithIndex;
	/**
	 * @category filtering
	 * @since 2.5.0
	 */
	var filterWithIndex = function (predicateWithIndex) {
	    return function (as) {
	        return as.filter(function (a, i) { return predicateWithIndex(i, a); });
	    };
	};
	exports.filterWithIndex = filterWithIndex;
	/**
	 * @since 2.5.0
	 */
	var extend = function (f) { return function (wa) {
	    return wa.map(function (_, i) { return f(wa.slice(i)); });
	}; };
	exports.extend = extend;
	/**
	 * @since 2.5.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMapWithIndex = function (M) {
	    return function (f) {
	        return function (fa) {
	            return fa.reduce(function (b, a, i) { return M.concat(b, f(i, a)); }, M.empty);
	        };
	    };
	};
	exports.foldMapWithIndex = foldMapWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduce = function (b, f) {
	    return (0, exports.reduceWithIndex)(b, function (_, b, a) { return f(b, a); });
	};
	exports.reduce = reduce;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var foldMap = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (f) { return foldMapWithIndexM(function (_, a) { return f(a); }); };
	};
	exports.foldMap = foldMap;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceWithIndex = function (b, f) { return function (fa) {
	    var len = fa.length;
	    var out = b;
	    for (var i = 0; i < len; i++) {
	        out = f(i, out, fa[i]);
	    }
	    return out;
	}; };
	exports.reduceWithIndex = reduceWithIndex;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRight = function (b, f) {
	    return (0, exports.reduceRightWithIndex)(b, function (_, a, b) { return f(a, b); });
	};
	exports.reduceRight = reduceRight;
	/**
	 * @category folding
	 * @since 2.5.0
	 */
	var reduceRightWithIndex = function (b, f) { return function (fa) {
	    return fa.reduceRight(function (b, a, i) { return f(i, a, b); }, b);
	}; };
	exports.reduceRightWithIndex = reduceRightWithIndex;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
	};
	exports.traverse = traverse;
	/**
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) {
	    return function (ta) {
	        return _reduce(ta, F.of((0, exports.zero)()), function (fas, fa) {
	            return F.ap(F.map(fas, function (as) { return function (a) { return (0, function_1.pipe)(as, (0, exports.append)(a)); }; }), fa);
	        });
	    };
	};
	exports.sequence = sequence;
	/**
	 * @category sequencing
	 * @since 2.6.3
	 */
	var traverseWithIndex = function (F) {
	    return function (f) {
	        return (0, exports.reduceWithIndex)(F.of((0, exports.zero)()), function (i, fbs, a) {
	            return F.ap(F.map(fbs, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, a));
	        });
	    };
	};
	exports.traverseWithIndex = traverseWithIndex;
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wither = function (F) {
	    var _witherF = _wither(F);
	    return function (f) { return function (fa) { return _witherF(fa, f); }; };
	};
	exports.wither = wither;
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wilt = function (F) {
	    var _wiltF = _wilt(F);
	    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
	};
	exports.wilt = wilt;
	/**
	 * @since 2.6.6
	 */
	var unfold = function (b, f) {
	    var out = [];
	    var bb = b;
	    // eslint-disable-next-line no-constant-condition
	    while (true) {
	        var mt = f(bb);
	        if (_.isSome(mt)) {
	            var _a = mt.value, a = _a[0], b_1 = _a[1];
	            out.push(a);
	            bb = b_1;
	        }
	        else {
	            break;
	        }
	    }
	    return out;
	};
	exports.unfold = unfold;
	/**
	 * @category type lambdas
	 * @since 2.5.0
	 */
	exports.URI = 'ReadonlyArray';
	/**
	 * @category instances
	 * @since 2.5.0
	 */
	var getShow = function (S) { return ({
	    show: function (as) { return "[".concat(as.map(S.show).join(', '), "]"); }
	}); };
	exports.getShow = getShow;
	/**
	 * @category instances
	 * @since 2.5.0
	 */
	var getSemigroup = function () { return ({
	    concat: function (first, second) { return ((0, exports.isEmpty)(first) ? second : (0, exports.isEmpty)(second) ? first : first.concat(second)); }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * Returns a `Monoid` for `ReadonlyArray<A>`.
	 *
	 * @example
	 * import { getMonoid } from 'fp-ts/ReadonlyArray'
	 *
	 * const M = getMonoid<number>()
	 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getMonoid = function () { return ({
	    concat: (0, exports.getSemigroup)().concat,
	    empty: exports.empty
	}); };
	exports.getMonoid = getMonoid;
	/**
	 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
	 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
	 * different lengths, the result is non equality.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { getEq } from 'fp-ts/ReadonlyArray'
	 *
	 * const E = getEq(S.Eq)
	 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
	 * assert.strictEqual(E.equals(['a'], []), false)
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getEq = function (E) {
	    return (0, Eq_1.fromEquals)(function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return E.equals(x, ys[i]); }); });
	};
	exports.getEq = getEq;
	/**
	 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
	 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
	 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
	 * the same length, the result is equality.
	 *
	 * @example
	 * import { getOrd } from 'fp-ts/ReadonlyArray'
	 * import * as S from 'fp-ts/string'
	 *
	 * const O = getOrd(S.Ord)
	 * assert.strictEqual(O.compare(['b'], ['a']), 1)
	 * assert.strictEqual(O.compare(['a'], ['a']), 0)
	 * assert.strictEqual(O.compare(['a'], ['b']), -1)
	 *
	 *
	 * @category instances
	 * @since 2.5.0
	 */
	var getOrd = function (O) {
	    return (0, Ord_1.fromCompare)(function (a, b) {
	        var aLen = a.length;
	        var bLen = b.length;
	        var len = Math.min(aLen, bLen);
	        for (var i = 0; i < len; i++) {
	            var ordering = O.compare(a[i], b[i]);
	            if (ordering !== 0) {
	                return ordering;
	            }
	        }
	        return N.Ord.compare(aLen, bLen);
	    });
	};
	exports.getOrd = getOrd;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getUnionSemigroup = function (E) {
	    var unionE = union(E);
	    return {
	        concat: function (first, second) { return unionE(second)(first); }
	    };
	};
	exports.getUnionSemigroup = getUnionSemigroup;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getUnionMonoid = function (E) { return ({
	    concat: (0, exports.getUnionSemigroup)(E).concat,
	    empty: exports.empty
	}); };
	exports.getUnionMonoid = getUnionMonoid;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getIntersectionSemigroup = function (E) {
	    var intersectionE = intersection(E);
	    return {
	        concat: function (first, second) { return intersectionE(second)(first); }
	    };
	};
	exports.getIntersectionSemigroup = getIntersectionSemigroup;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	var getDifferenceMagma = function (E) {
	    var differenceE = difference(E);
	    return {
	        concat: function (first, second) { return differenceE(second)(first); }
	    };
	};
	exports.getDifferenceMagma = getDifferenceMagma;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.5.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.5.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.chainFirst(() => ['a', 'b'])
	 *   ),
	 *   [1, 1, 2, 2, 3, 3]
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     RA.chainFirst(() => [])
	 *   ),
	 *   []
	 * )
	 *
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.chainFirst = 
	/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Unfoldable = {
	    URI: exports.URI,
	    unfold: exports.unfold
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.Zero = {
	    URI: exports.URI,
	    zero: exports.zero
	};
	/**
	 * @category do notation
	 * @since 2.11.0
	 */
	exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alternative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    alt: _alt,
	    zero: exports.zero
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Extend = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Filterable = {
	    URI: exports.URI,
	    map: _map,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FilterableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    partitionMapWithIndex: _partitionMapWithIndex,
	    partitionWithIndex: _partitionWithIndex,
	    filterMapWithIndex: _filterMapWithIndex,
	    filterWithIndex: _filterWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    traverseWithIndex: _traverseWithIndex
	};
	/**
	 * @category sequencing
	 * @since 2.11.0
	 */
	var chainRecDepthFirst = function (f) {
	    return function (a) {
	        var todo = __spreadArray([], f(a), true);
	        var out = [];
	        while (todo.length > 0) {
	            var e = todo.shift();
	            if (_.isLeft(e)) {
	                todo.unshift.apply(todo, f(e.left));
	            }
	            else {
	                out.push(e.right);
	            }
	        }
	        return out;
	    };
	};
	exports.chainRecDepthFirst = chainRecDepthFirst;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.ChainRecDepthFirst = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: exports._chainRecDepthFirst
	};
	/**
	 * @category sequencing
	 * @since 2.11.0
	 */
	var chainRecBreadthFirst = function (f) {
	    return function (a) {
	        var initial = f(a);
	        var todo = [];
	        var out = [];
	        function go(e) {
	            if (_.isLeft(e)) {
	                f(e.left).forEach(function (v) { return todo.push(v); });
	            }
	            else {
	                out.push(e.right);
	            }
	        }
	        for (var _i = 0, initial_1 = initial; _i < initial_1.length; _i++) {
	            var e = initial_1[_i];
	            go(e);
	        }
	        while (todo.length > 0) {
	            go(todo.shift());
	        }
	        return out;
	    };
	};
	exports.chainRecBreadthFirst = chainRecBreadthFirst;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.ChainRecBreadthFirst = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: exports._chainRecBreadthFirst
	};
	var _wither = /*#__PURE__*/ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
	var _wilt = /*#__PURE__*/ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Witherable = {
	    URI: exports.URI,
	    map: _map,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    wither: _wither,
	    wilt: _wilt
	};
	/**
	 * Filter values inside a context.
	 *
	 * @example
	 * import { pipe } from 'fp-ts/function'
	 * import * as RA from 'fp-ts/ReadonlyArray'
	 * import * as T from 'fp-ts/Task'
	 *
	 * const filterE = RA.filterE(T.ApplicativePar)
	 * async function test() {
	 *   assert.deepStrictEqual(
	 *     await pipe(
	 *       [-1, 2, 3],
	 *       filterE((n) => T.of(n > 0))
	 *     )(),
	 *     [2, 3]
	 *   )
	 * }
	 * test()
	 *
	 * @since 2.11.0
	 */
	exports.filterE = (0, Witherable_1.filterE)(exports.Witherable);
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// unsafe
	// -------------------------------------------------------------------------------------
	/**
	 * @category unsafe
	 * @since 2.5.0
	 */
	exports.unsafeInsertAt = RNEA.unsafeInsertAt;
	/**
	 * @category unsafe
	 * @since 2.5.0
	 */
	var unsafeUpdateAt = function (i, a, as) {
	    return (0, exports.isNonEmpty)(as) ? RNEA.unsafeUpdateAt(i, a, as) : as;
	};
	exports.unsafeUpdateAt = unsafeUpdateAt;
	/**
	 * @category unsafe
	 * @since 2.5.0
	 */
	var unsafeDeleteAt = function (i, as) {
	    var xs = as.slice();
	    xs.splice(i, 1);
	    return xs;
	};
	exports.unsafeDeleteAt = unsafeDeleteAt;
	/**
	 * @category conversions
	 * @since 2.5.0
	 */
	var toArray = function (as) { return as.slice(); };
	exports.toArray = toArray;
	/**
	 * @category conversions
	 * @since 2.5.0
	 */
	var fromArray = function (as) { return ((0, exports.isEmpty)(as) ? exports.empty : as.slice()); };
	exports.fromArray = fromArray;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * An empty array
	 *
	 * @since 2.5.0
	 */
	exports.empty = RNEA.empty;
	function every(predicate) {
	    return function (as) { return as.every(predicate); };
	}
	exports.every = every;
	/**
	 * Check if a predicate holds true for any array member.
	 *
	 * @example
	 * import { some } from 'fp-ts/ReadonlyArray'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const isPositive = (n: number): boolean => n > 0
	 *
	 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
	 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
	 *
	 * @since 2.9.0
	 */
	var some = function (predicate) {
	    return function (as) {
	        return as.some(predicate);
	    };
	};
	exports.some = some;
	/**
	 * Alias of [`some`](#some)
	 *
	 * @since 2.11.0
	 */
	exports.exists = exports.some;
	/**
	 * Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { intercalate } from 'fp-ts/ReadonlyArray'
	 *
	 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
	 *
	 * @since 2.12.0
	 */
	var intercalate = function (M) {
	    var intercalateM = RNEA.intercalate(M);
	    return function (middle) { return (0, exports.match)(function () { return M.empty; }, intercalateM(middle)); };
	};
	exports.intercalate = intercalate;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = (0, Chain_1.bind)(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.5.0
	 */
	exports.chain = exports.flatMap;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use `ReadonlyNonEmptyArray` module instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.range = RNEA.range;
	/**
	 * Use [`prepend`](#prepend) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.cons = RNEA.cons;
	/**
	 * Use [`append`](#append) instead.
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.snoc = RNEA.snoc;
	/**
	 * Use [`prependAll`](#prependall) instead.
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.prependToAll = exports.prependAll;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `RA.Functor` instead of `RA.readonlyArray`
	 * (where `RA` is from `import RA from 'fp-ts/ReadonlyArray'`)
	 *
	 * @category zone of death
	 * @since 2.5.0
	 * @deprecated
	 */
	exports.readonlyArray = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    mapWithIndex: _mapWithIndex,
	    partitionMapWithIndex: _partitionMapWithIndex,
	    partitionWithIndex: _partitionWithIndex,
	    filterMapWithIndex: _filterMapWithIndex,
	    filterWithIndex: _filterWithIndex,
	    alt: _alt,
	    zero: exports.zero,
	    unfold: exports.unfold,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex,
	    extend: _extend,
	    wither: _wither,
	    wilt: _wilt
	}; 
} (ReadonlyArray));

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.copy = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.lookup = exports.isOutOfBound = exports.size = exports.scanRight = exports.scanLeft = exports.chainWithIndex = exports.foldRight = exports.matchRight = exports.matchRightW = exports.foldLeft = exports.matchLeft = exports.matchLeftW = exports.match = exports.matchW = exports.fromEither = exports.fromOption = exports.fromPredicate = exports.replicate = exports.makeBy = exports.appendW = exports.append = exports.prependW = exports.prepend = exports.isNonEmpty = exports.isEmpty = void 0;
	exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.alt = exports.altW = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.filter = exports.separate = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.mapWithIndex = exports.flatten = exports.flatMap = exports.ap = exports.map = exports.zero = exports.of = exports.difference = exports.intersection = exports.union = exports.concat = exports.concatW = exports.comprehension = exports.fromOptionK = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.intersperse = exports.prependAll = exports.unzip = exports.zip = exports.zipWith = exports.sort = void 0;
	exports.some = exports.every = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.fromEitherK = exports.FromEither = exports.filterE = exports.ChainRecBreadthFirst = exports.chainRecBreadthFirst = exports.ChainRecDepthFirst = exports.chainRecDepthFirst = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.guard = exports.Zero = exports.Alt = exports.Unfoldable = exports.Monad = exports.chainFirst = exports.Chain = exports.Applicative = exports.apSecond = exports.apFirst = exports.Apply = exports.FunctorWithIndex = exports.Pointed = exports.flap = exports.Functor = exports.getDifferenceMagma = exports.getIntersectionSemigroup = exports.getUnionMonoid = exports.getUnionSemigroup = exports.getOrd = exports.getEq = exports.getMonoid = exports.getSemigroup = exports.getShow = exports.URI = exports.unfold = exports.wilt = exports.wither = void 0;
	exports.array = exports.prependToAll = exports.snoc = exports.cons = exports.empty = exports.range = exports.chain = exports.apS = exports.bind = exports.let = exports.bindTo = exports.Do = exports.intercalate = exports.exists = void 0;
	var Apply_1 = index.Apply;
	var Chain_1 = index.Chain;
	var FromEither_1 = index.FromEither;
	var function_1 = index._function;
	var Functor_1 = index.Functor;
	var _ = __importStar(index.internal);
	var NEA = __importStar(NonEmptyArray);
	var RA = __importStar(ReadonlyArray);
	var Separated_1 = index.Separated;
	var Witherable_1 = index.Witherable;
	var Zero_1 = withdrawal.Zero;
	// -------------------------------------------------------------------------------------
	// refinements
	// -------------------------------------------------------------------------------------
	/**
	 * Test whether an array is empty
	 *
	 * @example
	 * import { isEmpty } from 'fp-ts/Array'
	 *
	 * assert.strictEqual(isEmpty([]), true)
	 * assert.strictEqual(isEmpty(['a']), false)
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	var isEmpty = function (as) { return as.length === 0; };
	exports.isEmpty = isEmpty;
	/**
	 * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
	 *
	 * @example
	 * import { isNonEmpty } from 'fp-ts/Array'
	 *
	 * assert.strictEqual(isNonEmpty([]), false)
	 * assert.strictEqual(isNonEmpty(['a']), true)
	 *
	 * @category refinements
	 * @since 2.0.0
	 */
	exports.isNonEmpty = NEA.isNonEmpty;
	// -------------------------------------------------------------------------------------
	// constructors
	// -------------------------------------------------------------------------------------
	/**
	 * Prepend an element to the front of a `Array`, creating a new `NonEmptyArray`.
	 *
	 * @example
	 * import { prepend } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([2, 3, 4], prepend(1)), [1, 2, 3, 4])
	 *
	 * @since 2.10.0
	 */
	exports.prepend = NEA.prepend;
	/**
	 * Less strict version of [`prepend`](#prepend).
	 *
	 * @example
	 * import { prependW } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([2, 3, 4], prependW("a")), ["a", 2, 3, 4]);
	 *
	 * @since 2.11.0
	 */
	exports.prependW = NEA.prependW;
	/**
	 * Append an element to the end of a `Array`, creating a new `NonEmptyArray`.
	 *
	 * @example
	 * import { append } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
	 *
	 * @since 2.10.0
	 */
	exports.append = NEA.append;
	/**
	 * Less strict version of [`append`](#append).
	 *
	 * @example
	 * import { appendW } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([1, 2, 3], appendW("d")), [1, 2, 3, "d"]);
	 *
	 * @since 2.11.0
	 */
	exports.appendW = NEA.appendW;
	/**
	 * Return a `Array` of length `n` with element `i` initialized with `f(i)`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { makeBy } from 'fp-ts/Array'
	 *
	 * const double = (i: number): number => i * 2
	 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
	 * assert.deepStrictEqual(makeBy(-3, double), [])
	 * assert.deepStrictEqual(makeBy(4.32164, double), [0, 2, 4, 6])
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	var makeBy = function (n, f) { return (n <= 0 ? [] : NEA.makeBy(f)(n)); };
	exports.makeBy = makeBy;
	/**
	 * Create a `Array` containing a value repeated the specified number of times.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { replicate } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
	 * assert.deepStrictEqual(replicate(-3, 'a'), [])
	 * assert.deepStrictEqual(replicate(2.985647, 'a'), ['a', 'a'])
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	var replicate = function (n, a) { return (0, exports.makeBy)(n, function () { return a; }); };
	exports.replicate = replicate;
	function fromPredicate(predicate) {
	    return function (a) { return (predicate(a) ? [a] : []); };
	}
	exports.fromPredicate = fromPredicate;
	// -------------------------------------------------------------------------------------
	// conversions
	// -------------------------------------------------------------------------------------
	/**
	 * Create an array from an `Option`. The resulting array will contain the content of the
	 * `Option` if it is `Some` and it will be empty if the `Option` is `None`.
	 *
	 * @example
	 * import { fromOption } from 'fp-ts/Array'
	 * import { option } from "fp-ts";
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(option.some("a"), fromOption),["a"])
	 * assert.deepStrictEqual(pipe(option.none, fromOption),[])
	 *
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromOption = function (ma) { return (_.isNone(ma) ? [] : [ma.value]); };
	exports.fromOption = fromOption;
	/**
	 * Create an array from an `Either`. The resulting array will contain the content of the
	 * `Either` if it is `Right` and it will be empty if the `Either` is `Left`.
	 *
	 * @example
	 * import { fromEither } from 'fp-ts/Array'
	 * import { either } from "fp-ts";
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe(either.right("r"), fromEither), ["r"]);
	 * assert.deepStrictEqual(pipe(either.left("l"), fromEither), []);
	 *
	 * @category conversions
	 * @since 2.11.0
	 */
	var fromEither = function (e) { return (_.isLeft(e) ? [] : [e.right]); };
	exports.fromEither = fromEither;
	/**
	 * Less strict version of [`match`](#match).
	 *
	 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
	 *
	 * @example
	 * import { matchW } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const matcherW = matchW(
	 *   () => "No elements",
	 *   (as) => as.length
	 * );
	 * assert.deepStrictEqual(pipe([1, 2, 3, 4], matcherW), 4);
	 * assert.deepStrictEqual(pipe([], matcherW), "No elements");
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(as) : onEmpty();
	    };
	};
	exports.matchW = matchW;
	/**
	 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
	 * it passes the array to `onNonEmpty` and returns the result.
	 *
	 * @example
	 * import { match } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const matcher = match(
	 *   () => "No elements",
	 *   (as) => `Found ${as.length} element(s)`
	 * );
	 * assert.deepStrictEqual(pipe([1, 2, 3, 4], matcher), "Found 4 element(s)");
	 * assert.deepStrictEqual(pipe([], matcher), "No elements");
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	exports.match = exports.matchW;
	/**
	 * Less strict version of [`matchLeft`](#matchleft). It will work when `onEmpty` and
	 * `onNonEmpty` have different return types.
	 *
	 * @example
	 * import { matchLeftW } from 'fp-ts/Array'
	 *
	 * const f = matchLeftW(
	 *   () => 0,
	 *   (head: string, tail: string[]) => `Found "${head}" followed by ${tail.length} elements`
	 * );
	 * assert.strictEqual(f(["a", "b", "c"]), 'Found "a" followed by 2 elements');
	 * assert.strictEqual(f([]), 0);
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchLeftW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(NEA.head(as), NEA.tail(as)) : onEmpty();
	    };
	};
	exports.matchLeftW = matchLeftW;
	/**
	 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
	 * it passes the array to `onNonEmpty` broken into its first element and remaining elements.
	 *
	 * @example
	 * import { matchLeft } from 'fp-ts/Array'
	 *
	 * const len: <A>(as: Array<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
	 * assert.strictEqual(len([1, 2, 3]), 3)
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchLeft = exports.matchLeftW;
	/**
	 * Alias of [`matchLeft`](#matchleft).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.foldLeft = exports.matchLeft;
	/**
	 * Less strict version of [`matchRight`](#matchright). It will work when `onEmpty` and
	 * `onNonEmpty` have different return types.
	 *
	 * @example
	 * import { matchRightW } from 'fp-ts/Array'
	 *
	 * const f = matchRightW(
	 *   () => 0,
	 *   (head: string[], tail: string) => `Found ${head.length} elements folllowed by "${tail}"`
	 * );
	 * assert.strictEqual(f(["a", "b", "c"]), 'Found 2 elements folllowed by "c"');
	 * assert.strictEqual(f([]), 0);
	 *
	 * @category pattern matching
	 * @since 2.11.0
	 */
	var matchRightW = function (onEmpty, onNonEmpty) {
	    return function (as) {
	        return (0, exports.isNonEmpty)(as) ? onNonEmpty(NEA.init(as), NEA.last(as)) : onEmpty();
	    };
	};
	exports.matchRightW = matchRightW;
	/**
	 * Takes an array, if the array is empty it returns the result of `onEmpty`, otherwise
	 * it passes the array to `onNonEmpty` broken  into its initial elements and the last element.
	 *
	 * @example
	 * import { matchRight } from 'fp-ts/Array'
	 *
	 * const len: <A>(as: Array<A>) => number = matchRight(
	 *   () => 0,
	 *   (head, _) => 1 + len(head)
	 * );
	 * assert.strictEqual(len([1, 2, 3]), 3);
	 *
	 * @category pattern matching
	 * @since 2.10.0
	 */
	exports.matchRight = exports.matchRightW;
	/**
	 * Alias of [`matchRight`](#matchright).
	 *
	 * @category pattern matching
	 * @since 2.0.0
	 */
	exports.foldRight = exports.matchRight;
	// -------------------------------------------------------------------------------------
	// combinators
	// -------------------------------------------------------------------------------------
	/**
	 * Same as [`chain`](#chain), but passing also the index to the iterating function.
	 *
	 * @example
	 * import { chainWithIndex, replicate } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const f = (index: number, x: string) => replicate(2, `${x}${index}`);
	 * assert.deepStrictEqual(pipe(["a", "b", "c"], chainWithIndex(f)), ["a0", "a0", "b1", "b1", "c2", "c2"]);
	 *
	 * @category sequencing
	 * @since 2.7.0
	 */
	var chainWithIndex = function (f) {
	    return function (as) {
	        var out = [];
	        for (var i = 0; i < as.length; i++) {
	            out.push.apply(out, f(i, as[i]));
	        }
	        return out;
	    };
	};
	exports.chainWithIndex = chainWithIndex;
	/**
	 * Same as `reduce` but it carries over the intermediate steps
	 *
	 * @example
	 * import { scanLeft } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
	 *
	 * @since 2.0.0
	 */
	var scanLeft = function (b, f) {
	    return function (as) {
	        var len = as.length;
	        var out = new Array(len + 1);
	        out[0] = b;
	        for (var i = 0; i < len; i++) {
	            out[i + 1] = f(out[i], as[i]);
	        }
	        return out;
	    };
	};
	exports.scanLeft = scanLeft;
	/**
	 * Fold an array from the right, keeping all intermediate results instead of only the final result
	 *
	 * @example
	 * import { scanRight } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
	 *
	 * @since 2.0.0
	 */
	var scanRight = function (b, f) {
	    return function (as) {
	        var len = as.length;
	        var out = new Array(len + 1);
	        out[len] = b;
	        for (var i = len - 1; i >= 0; i--) {
	            out[i] = f(as[i], out[i + 1]);
	        }
	        return out;
	    };
	};
	exports.scanRight = scanRight;
	/**
	 * Calculate the number of elements in a `Array`.
	 *
	 * @example
	 * import { size } from 'fp-ts/Array'
	 *
	 * assert.strictEqual(size(["a","b","c"]),3)
	 *
	 * @since 2.10.0
	 */
	var size = function (as) { return as.length; };
	exports.size = size;
	/**
	 * Test whether an array contains a particular index
	 *
	 * @example
	 * import { isOutOfBound } from 'fp-ts/Array'
	 *
	 * assert.strictEqual(isOutOfBound(1,["a","b","c"]),false)
	 * assert.strictEqual(isOutOfBound(-1,["a","b","c"]),true)
	 * assert.strictEqual(isOutOfBound(3,["a","b","c"]),true)
	 *
	 * @since 2.0.0
	 */
	exports.isOutOfBound = NEA.isOutOfBound;
	// TODO: remove non-curried overloading in v3
	/**
	 * This function provides a safe way to read a value at a particular index from an array.
	 * It returns a `none` if the index is out of bounds, and a `some` of the element if the
	 * index is valid.
	 *
	 * @example
	 * import { lookup } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
	 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
	 *
	 * @since 2.0.0
	 */
	exports.lookup = RA.lookup;
	/**
	 * Get the first element in an array, or `None` if the array is empty
	 *
	 * @example
	 * import { head } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
	 * assert.deepStrictEqual(head([]), none)
	 *
	 * @since 2.0.0
	 */
	exports.head = RA.head;
	/**
	 * Get the last element in an array, or `None` if the array is empty
	 *
	 * @example
	 * import { last } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
	 * assert.deepStrictEqual(last([]), none)
	 *
	 * @since 2.0.0
	 */
	exports.last = RA.last;
	/**
	 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
	 *
	 * @example
	 * import { tail } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
	 * assert.deepStrictEqual(tail([]), none)
	 *
	 * @since 2.0.0
	 */
	var tail = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(NEA.tail(as)) : _.none); };
	exports.tail = tail;
	/**
	 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
	 *
	 * @example
	 * import { init } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
	 * assert.deepStrictEqual(init([]), none)
	 *
	 * @since 2.0.0
	 */
	var init = function (as) { return ((0, exports.isNonEmpty)(as) ? _.some(NEA.init(as)) : _.none); };
	exports.init = init;
	/**
	 * Keep only a max number of elements from the start of an `Array`, creating a new `Array`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { takeLeft } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3, 4, 5]), [1, 2]);
	 * assert.deepStrictEqual(takeLeft(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
	 * assert.deepStrictEqual(takeLeft(0)([1, 2, 3, 4, 5]), []);
	 * assert.deepStrictEqual(takeLeft(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
	 *
	 * @since 2.0.0
	 */
	var takeLeft = function (n) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(n, as) ? (0, exports.copy)(as) : as.slice(0, n);
	    };
	};
	exports.takeLeft = takeLeft;
	/**
	 * Keep only a max number of elements from the end of an `Array`, creating a new `Array`.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { takeRight } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5]);
	 * assert.deepStrictEqual(takeRight(7)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
	 * assert.deepStrictEqual(takeRight(0)([1, 2, 3, 4, 5]), []);
	 * assert.deepStrictEqual(takeRight(-1)([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5]);
	 *
	 * @since 2.0.0
	 */
	var takeRight = function (n) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(n, as) ? (0, exports.copy)(as) : n === 0 ? [] : as.slice(-n);
	    };
	};
	exports.takeRight = takeRight;
	function takeLeftWhile(predicate) {
	    return function (as) {
	        var out = [];
	        for (var _i = 0, as_1 = as; _i < as_1.length; _i++) {
	            var a = as_1[_i];
	            if (!predicate(a)) {
	                break;
	            }
	            out.push(a);
	        }
	        return out;
	    };
	}
	exports.takeLeftWhile = takeLeftWhile;
	var spanLeftIndex = function (as, predicate) {
	    var l = as.length;
	    var i = 0;
	    for (; i < l; i++) {
	        if (!predicate(as[i])) {
	            break;
	        }
	    }
	    return i;
	};
	function spanLeft(predicate) {
	    return function (as) {
	        var _a = (0, exports.splitAt)(spanLeftIndex(as, predicate))(as), init = _a[0], rest = _a[1];
	        return { init: init, rest: rest };
	    };
	}
	exports.spanLeft = spanLeft;
	/**
	 * Creates a new `Array` which is a copy of the input dropping a max number of elements from the start.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { dropLeft } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3]);
	 * assert.deepStrictEqual(dropLeft(5)([1, 2, 3]), []);
	 * assert.deepStrictEqual(dropLeft(0)([1, 2, 3]), [1, 2, 3]);
	 * assert.deepStrictEqual(dropLeft(-2)([1, 2, 3]), [1, 2, 3]);
	 *
	 * @since 2.0.0
	 */
	var dropLeft = function (n) {
	    return function (as) {
	        return n <= 0 || (0, exports.isEmpty)(as) ? (0, exports.copy)(as) : n >= as.length ? [] : as.slice(n, as.length);
	    };
	};
	exports.dropLeft = dropLeft;
	/**
	 * Creates a new `Array` which is a copy of the input dropping a max number of elements from the end.
	 *
	 * **Note**. `n` is normalized to a non negative integer.
	 *
	 * @example
	 * import { dropRight } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(dropRight(2)([1, 2, 3]), [1]);
	 * assert.deepStrictEqual(dropRight(5)([1, 2, 3]), []);
	 * assert.deepStrictEqual(dropRight(0)([1, 2, 3]), [1, 2, 3]);
	 * assert.deepStrictEqual(dropRight(-2)([1, 2, 3]), [1, 2, 3]);
	 *
	 * @since 2.0.0
	 */
	var dropRight = function (n) {
	    return function (as) {
	        return n <= 0 || (0, exports.isEmpty)(as) ? (0, exports.copy)(as) : n >= as.length ? [] : as.slice(0, as.length - n);
	    };
	};
	exports.dropRight = dropRight;
	function dropLeftWhile(predicate) {
	    return function (as) { return as.slice(spanLeftIndex(as, predicate)); };
	}
	exports.dropLeftWhile = dropLeftWhile;
	/**
	 * `findIndex` returns an `Option` containing the first index for which a predicate holds.
	 * It returns `None` if no element satisfies the predicate.
	 * Similar to [`findFirst`](#findFirst) but returning the index instead of the element.
	 *
	 * @example
	 * import { findIndex } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
	 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
	 *
	 * @since 2.0.0
	 */
	exports.findIndex = RA.findIndex;
	function findFirst(predicate) {
	    return RA.findFirst(predicate);
	}
	exports.findFirst = findFirst;
	/**
	 * Given a selector function which takes an element and returns an option,
	 * this function applies the selector to each element of the array and
	 * returns the first `Some` result. Otherwise it returns `None`.
	 *
	 * @example
	 * import { findFirstMap } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface Person {
	 *   readonly name: string;
	 *   readonly age: number;
	 * }
	 *
	 * const persons: Array<Person> = [
	 *   { name: "John", age: 16 },
	 *   { name: "Mary", age: 45 },
	 *   { name: "Joey", age: 28 },
	 * ];
	 *
	 * const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name));
	 * const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name));
	 * assert.deepStrictEqual(findFirstMap(nameOfPersonAbove18)(persons), some("Mary"));
	 * assert.deepStrictEqual(findFirstMap(nameOfPersonAbove70)(persons), none);
	 *
	 * @since 2.0.0
	 */
	exports.findFirstMap = RA.findFirstMap;
	function findLast(predicate) {
	    return RA.findLast(predicate);
	}
	exports.findLast = findLast;
	/**
	 * Given a selector function which takes an element and returns an option,
	 * this function applies the selector to each element of the array starting from the
	 * end and returns the last `Some` result. Otherwise it returns `None`.
	 *
	 * @example
	 * import { findLastMap } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface Person {
	 *   readonly name: string;
	 *   readonly age: number;
	 * }
	 *
	 * const persons: Array<Person> = [
	 *   { name: "John", age: 16 },
	 *   { name: "Mary", age: 45 },
	 *   { name: "Joey", age: 28 },
	 * ];
	 *
	 * const nameOfPersonAbove18 = (p: Person) => (p.age <= 18 ? none : some(p.name));
	 * const nameOfPersonAbove70 = (p: Person) => (p.age <= 70 ? none : some(p.name));
	 * assert.deepStrictEqual(findLastMap(nameOfPersonAbove18)(persons), some("Joey"));
	 * assert.deepStrictEqual(findLastMap(nameOfPersonAbove70)(persons), none);
	 *
	 * @since 2.0.0
	 */
	exports.findLastMap = RA.findLastMap;
	/**
	 * Returns the index of the last element of the list which matches the predicate.
	 * It returns an `Option` containing the index or `None` if not found.
	 *
	 * @example
	 * import { findLastIndex } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * interface X {
	 *   readonly a: number
	 *   readonly b: number
	 * }
	 * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
	 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 1)(xs), some(1))
	 * assert.deepStrictEqual(findLastIndex((x: { readonly a: number }) => x.a === 4)(xs), none)
	 *
	 * @since 2.0.0
	 */
	exports.findLastIndex = RA.findLastIndex;
	/**
	 * This function takes an array and makes a new array containing the same elements.
	 *
	 * @since 2.0.0
	 */
	var copy = function (as) { return as.slice(); };
	exports.copy = copy;
	/**
	 * Insert an element at the specified index, creating a new array,
	 * or returning `None` if the index is out of bounds.
	 *
	 * @example
	 * import { insertAt } from 'fp-ts/Array'
	 * import { some } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
	 *
	 * @since 2.0.0
	 */
	var insertAt = function (i, a) {
	    return function (as) {
	        return i < 0 || i > as.length ? _.none : _.some((0, exports.unsafeInsertAt)(i, a, as));
	    };
	};
	exports.insertAt = insertAt;
	/**
	 * Change the element at the specified index, creating a new array,
	 * or returning `None` if the index is out of bounds.
	 *
	 * @example
	 * import { updateAt } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
	 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
	 *
	 * @since 2.0.0
	 */
	var updateAt = function (i, a) { return (0, exports.modifyAt)(i, function () { return a; }); };
	exports.updateAt = updateAt;
	/**
	 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds.
	 *
	 * @example
	 * import { deleteAt } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
	 * assert.deepStrictEqual(deleteAt(1)([]), none)
	 *
	 * @since 2.0.0
	 */
	var deleteAt = function (i) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeDeleteAt)(i, as));
	    };
	};
	exports.deleteAt = deleteAt;
	/**
	 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
	 * of bounds.
	 *
	 * @example
	 * import { modifyAt } from 'fp-ts/Array'
	 * import { some, none } from 'fp-ts/Option'
	 *
	 * const double = (x: number): number => x * 2
	 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
	 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
	 *
	 * @since 2.0.0
	 */
	var modifyAt = function (i, f) {
	    return function (as) {
	        return (0, exports.isOutOfBound)(i, as) ? _.none : _.some((0, exports.unsafeUpdateAt)(i, f(as[i]), as));
	    };
	};
	exports.modifyAt = modifyAt;
	/**
	 * Reverse an array, creating a new array
	 *
	 * @example
	 * import { reverse } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
	 *
	 * @since 2.0.0
	 */
	var reverse = function (as) { return ((0, exports.isEmpty)(as) ? [] : as.slice().reverse()); };
	exports.reverse = reverse;
	/**
	 * Takes an `Array` of `Either` and produces a new `Array` containing
	 * the values of all the `Right` elements in the same order.
	 *
	 * @example
	 * import { rights } from 'fp-ts/Array'
	 * import { right, left } from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
	 *
	 * @since 2.0.0
	 */
	var rights = function (as) {
	    var r = [];
	    for (var i = 0; i < as.length; i++) {
	        var a = as[i];
	        if (a._tag === 'Right') {
	            r.push(a.right);
	        }
	    }
	    return r;
	};
	exports.rights = rights;
	/**
	 * Takes an `Array` of `Either` and produces a new `Array` containing
	 * the values of all the `Left` elements in the same order.
	 *
	 * @example
	 * import { lefts } from 'fp-ts/Array'
	 * import { left, right } from 'fp-ts/Either'
	 *
	 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
	 *
	 * @since 2.0.0
	 */
	var lefts = function (as) {
	    var r = [];
	    for (var i = 0; i < as.length; i++) {
	        var a = as[i];
	        if (a._tag === 'Left') {
	            r.push(a.left);
	        }
	    }
	    return r;
	};
	exports.lefts = lefts;
	/**
	 * Sort the elements of an array in increasing order, creating a new array
	 *
	 * @example
	 * import { sort } from 'fp-ts/Array'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
	 *
	 * @since 2.0.0
	 */
	var sort = function (O) {
	    return function (as) {
	        return as.length <= 1 ? (0, exports.copy)(as) : as.slice().sort(O.compare);
	    };
	};
	exports.sort = sort;
	/**
	 * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
	 * input array is short, excess elements of the longer array are discarded.
	 *
	 * @example
	 * import { zipWith } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
	 *
	 * @since 2.0.0
	 */
	var zipWith = function (fa, fb, f) {
	    var fc = [];
	    var len = Math.min(fa.length, fb.length);
	    for (var i = 0; i < len; i++) {
	        fc[i] = f(fa[i], fb[i]);
	    }
	    return fc;
	};
	exports.zipWith = zipWith;
	function zip(as, bs) {
	    if (bs === undefined) {
	        return function (bs) { return zip(bs, as); };
	    }
	    return (0, exports.zipWith)(as, bs, function (a, b) { return [a, b]; });
	}
	exports.zip = zip;
	/**
	 * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
	 *
	 * @example
	 * import { unzip } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
	 *
	 * @since 2.0.0
	 */
	var unzip = function (as) {
	    var fa = [];
	    var fb = [];
	    for (var i = 0; i < as.length; i++) {
	        fa[i] = as[i][0];
	        fb[i] = as[i][1];
	    }
	    return [fa, fb];
	};
	exports.unzip = unzip;
	/**
	 * Creates a new `Array`, prepending an element to every member of the input `Array`.
	 *
	 * @example
	 * import { prependAll } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(prependAll(9)([1, 2, 3, 4]), [9, 1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.10.0
	 */
	var prependAll = function (middle) {
	    var f = NEA.prependAll(middle);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : []); };
	};
	exports.prependAll = prependAll;
	/**
	 * Creates a new `Array` placing an element in between members of the input `Array`.
	 *
	 * @example
	 * import { intersperse } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(intersperse(9)([1, 2, 3, 4]), [1, 9, 2, 9, 3, 9, 4])
	 *
	 * @since 2.9.0
	 */
	var intersperse = function (middle) {
	    var f = NEA.intersperse(middle);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as)); };
	};
	exports.intersperse = intersperse;
	/**
	 * Creates a new `Array` rotating the input `Array` by `n` steps.
	 *
	 * @example
	 * import { rotate } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	 *
	 * @since 2.0.0
	 */
	var rotate = function (n) {
	    var f = NEA.rotate(n);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as)); };
	};
	exports.rotate = rotate;
	// TODO: remove non-curried overloading in v3
	/**
	 * Test if a value is a member of an `Array`. Takes a `Eq<A>` as a single
	 * argument which returns the function to use to search for a value of type `A` in
	 * an `Array<A>`.
	 *
	 * @example
	 * import { elem } from 'fp-ts/Array'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
	 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
	 *
	 * @since 2.0.0
	 */
	exports.elem = RA.elem;
	/**
	 * Creates a new `Array` removing duplicate elements, keeping the first occurrence of an element,
	 * based on a `Eq<A>`.
	 *
	 * @example
	 * import { uniq } from 'fp-ts/Array'
	 * import * as N from 'fp-ts/number'
	 *
	 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
	 *
	 * @since 2.0.0
	 */
	var uniq = function (E) {
	    var f = NEA.uniq(E);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as)); };
	};
	exports.uniq = uniq;
	/**
	 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	 * etc...
	 *
	 * @example
	 * import { sortBy } from 'fp-ts/Array'
	 * import { contramap } from 'fp-ts/Ord'
	 * import * as S from 'fp-ts/string'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * interface Person {
	 *   readonly name: string
	 *   readonly age: number
	 * }
	 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
	 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
	 *
	 * const sortByNameByAge = sortBy([byName, byAge])
	 *
	 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
	 * assert.deepStrictEqual(sortByNameByAge(persons), [
	 *   { name: 'a', age: 1 },
	 *   { name: 'b', age: 2 },
	 *   { name: 'b', age: 3 },
	 *   { name: 'c', age: 2 }
	 * ])
	 *
	 * @since 2.0.0
	 */
	var sortBy = function (ords) {
	    var f = NEA.sortBy(ords);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : (0, exports.copy)(as)); };
	};
	exports.sortBy = sortBy;
	/**
	 * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
	 * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
	 * value and the rest of the array.
	 *
	 * @example
	 * import { Eq } from 'fp-ts/Eq'
	 * import * as A from 'fp-ts/Array'
	 * import * as N from 'fp-ts/number'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
	 *   return A.chop(as => {
	 *     const { init, rest } = pipe(as, A.spanLeft((a: A) => S.equals(a, as[0])))
	 *     return [init, rest]
	 *   })
	 * }
	 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
	 *
	 * @since 2.0.0
	 */
	var chop = function (f) {
	    var g = NEA.chop(f);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? g(as) : []); };
	};
	exports.chop = chop;
	/**
	 * Splits an `Array` into two pieces, the first piece has max `n` elements.
	 *
	 * @example
	 * import { splitAt } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
	 *
	 * @since 2.0.0
	 */
	var splitAt = function (n) {
	    return function (as) {
	        return n >= 1 && (0, exports.isNonEmpty)(as) ? NEA.splitAt(n)(as) : (0, exports.isEmpty)(as) ? [(0, exports.copy)(as), []] : [[], (0, exports.copy)(as)];
	    };
	};
	exports.splitAt = splitAt;
	/**
	 * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	 * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
	 * definition of `chunksOf`; it satisfies the property that
	 *
	 * ```ts
	 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
	 * ```
	 *
	 * whenever `n` evenly divides the length of `xs`.
	 *
	 * @example
	 * import { chunksOf } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
	 *
	 * @since 2.0.0
	 */
	var chunksOf = function (n) {
	    var f = NEA.chunksOf(n);
	    return function (as) { return ((0, exports.isNonEmpty)(as) ? f(as) : []); };
	};
	exports.chunksOf = chunksOf;
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	var fromOptionK = function (f) {
	    return function () {
	        var a = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            a[_i] = arguments[_i];
	        }
	        return (0, exports.fromOption)(f.apply(void 0, a));
	    };
	};
	exports.fromOptionK = fromOptionK;
	function comprehension(input, f, g) {
	    if (g === void 0) { g = function () { return true; }; }
	    var go = function (scope, input) {
	        return (0, exports.isNonEmpty)(input)
	            ? (0, exports.flatMap)(NEA.head(input), function (a) { return go((0, function_1.pipe)(scope, (0, exports.append)(a)), NEA.tail(input)); })
	            : g.apply(void 0, scope) ? [f.apply(void 0, scope)]
	                : [];
	    };
	    return go([], input);
	}
	exports.comprehension = comprehension;
	/**
	 * @since 2.11.0
	 */
	var concatW = function (second) {
	    return function (first) {
	        return (0, exports.isEmpty)(first) ? (0, exports.copy)(second) : (0, exports.isEmpty)(second) ? (0, exports.copy)(first) : first.concat(second);
	    };
	};
	exports.concatW = concatW;
	/**
	 * @since 2.11.0
	 */
	exports.concat = exports.concatW;
	function union(E) {
	    var unionE = NEA.union(E);
	    return function (first, second) {
	        if (second === undefined) {
	            var unionE_1 = union(E);
	            return function (second) { return unionE_1(second, first); };
	        }
	        return (0, exports.isNonEmpty)(first) && (0, exports.isNonEmpty)(second)
	            ? unionE(second)(first)
	            : (0, exports.isNonEmpty)(first)
	                ? (0, exports.copy)(first)
	                : (0, exports.copy)(second);
	    };
	}
	exports.union = union;
	function intersection(E) {
	    var elemE = (0, exports.elem)(E);
	    return function (xs, ys) {
	        if (ys === undefined) {
	            var intersectionE_1 = intersection(E);
	            return function (ys) { return intersectionE_1(ys, xs); };
	        }
	        return xs.filter(function (a) { return elemE(a, ys); });
	    };
	}
	exports.intersection = intersection;
	function difference(E) {
	    var elemE = (0, exports.elem)(E);
	    return function (xs, ys) {
	        if (ys === undefined) {
	            var differenceE_1 = difference(E);
	            return function (ys) { return differenceE_1(ys, xs); };
	        }
	        return xs.filter(function (a) { return !elemE(a, ys); });
	    };
	}
	exports.difference = difference;
	var _map = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); };
	/* istanbul ignore next */
	var _mapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.mapWithIndex)(f)); };
	var _ap = function (fab, fa) { return (0, function_1.pipe)(fab, (0, exports.ap)(fa)); };
	/* istanbul ignore next */
	var _filter = function (fa, predicate) { return (0, function_1.pipe)(fa, (0, exports.filter)(predicate)); };
	/* istanbul ignore next */
	var _filterMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMap)(f)); };
	/* istanbul ignore next */
	var _partition = function (fa, predicate) {
	    return (0, function_1.pipe)(fa, (0, exports.partition)(predicate));
	};
	/* istanbul ignore next */
	var _partitionMap = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMap)(f)); };
	/* istanbul ignore next */
	var _partitionWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.partitionWithIndex)(predicateWithIndex)); };
	/* istanbul ignore next */
	var _partitionMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.partitionMapWithIndex)(f)); };
	/* istanbul ignore next */
	var _alt = function (fa, that) { return (0, function_1.pipe)(fa, (0, exports.alt)(that)); };
	var _reduce = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduce)(b, f)); };
	/* istanbul ignore next */
	var _foldMap = function (M) {
	    var foldMapM = (0, exports.foldMap)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRight = function (fa, b, f) { return (0, function_1.pipe)(fa, (0, exports.reduceRight)(b, f)); };
	/* istanbul ignore next */
	var _reduceWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = (0, exports.foldMapWithIndex)(M);
	    return function (fa, f) { return (0, function_1.pipe)(fa, foldMapWithIndexM(f)); };
	};
	/* istanbul ignore next */
	var _reduceRightWithIndex = function (fa, b, f) {
	    return (0, function_1.pipe)(fa, (0, exports.reduceRightWithIndex)(b, f));
	};
	/* istanbul ignore next */
	var _filterMapWithIndex = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.filterMapWithIndex)(f)); };
	/* istanbul ignore next */
	var _filterWithIndex = function (fa, predicateWithIndex) { return (0, function_1.pipe)(fa, (0, exports.filterWithIndex)(predicateWithIndex)); };
	/* istanbul ignore next */
	var _extend = function (fa, f) { return (0, function_1.pipe)(fa, (0, exports.extend)(f)); };
	/* istanbul ignore next */
	var _traverse = function (F) {
	    var traverseF = (0, exports.traverse)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseF(f)); };
	};
	/* istanbul ignore next */
	var _traverseWithIndex = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (ta, f) { return (0, function_1.pipe)(ta, traverseWithIndexF(f)); };
	};
	var _chainRecDepthFirst = RA._chainRecDepthFirst;
	var _chainRecBreadthFirst = RA._chainRecBreadthFirst;
	/**
	 * Given an element of the base type, `of` builds an `Array` containing just that
	 * element of the base type (this is useful for building a `Monad`).
	 *
	 * @example
	 * import { of } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(of("a"), ["a"]);
	 *
	 * @category constructors
	 * @since 2.0.0
	 */
	exports.of = NEA.of;
	/**
	 * Makes an empty `Array`, useful for building a [`Monoid`](#Monoid)
	 *
	 * @since 2.7.0
	 */
	var zero = function () { return []; };
	exports.zero = zero;
	/**
	 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: Array<A>) => Array<B>`.
	 * In practice it applies the base function to each element of the array and collects the
	 * results in a new array.
	 *
	 * @example
	 * import { map } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const f = (n: number) => n * 2;
	 * assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [2, 4, 6]);
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var map = function (f) { return function (fa) { return fa.map(function (a) { return f(a); }); }; };
	exports.map = map;
	/**
	 * @example
	 * import { ap, map, of } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * // a curried function with 3 input parameteres
	 * const f = (s1: string) => (n: number) => (s2: string) => s1 + n + s2;
	 *
	 * // let's use `ap` to iterate `f` over an array for each input parameter
	 * assert.deepStrictEqual(pipe(["a", "b"], map(f), ap([1, 2]), ap(["😀", "😫", "😎"])), [
	 *   "a1😀", "a1😫", "a1😎",
	 *   "a2😀", "a2😫", "a2😎",
	 *   "b1😀", "b1😫", "b1😎",
	 *   "b2😀", "b2😫", "b2😎",
	 * ]);
	 *
	 * // given Array implements the Applicative interface with the `of` method,
	 * // we can write exactly the same thing in a more symmetric way
	 * // using `of` on `f` and `ap` on each array in input
	 * assert.deepStrictEqual(
	 *   pipe(of(f), ap(["a", "b"]), ap([1, 2]), ap(["😀", "😫", "😎"])),
	 *   pipe(["a", "b"], map(f), ap([1, 2]), ap(["😀", "😫", "😎"]))
	 * );
	 *
	 * @since 2.0.0
	 */
	var ap = function (fa) {
	    return (0, exports.flatMap)(function (f) { return (0, function_1.pipe)(fa, (0, exports.map)(f)); });
	};
	exports.ap = ap;
	/**
	 * Composes computations in sequence, using the return value of one computation to
	 * determine the next computation.
	 *
	 * In other words it takes a function `f` that produces an array from a single element of
	 * the base type `A` and returns a new function which applies `f` to each element of the
	 * input array (like [`map`](#map)) and, instead of returning an array of arrays, concatenates the
	 * results into a single array (like [`flatten`](#flatten)).
	 *
	 * @example
	 * import { flatMap, map, replicate } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const f = (n: number) => replicate(n, `${n}`);
	 * assert.deepStrictEqual(pipe([1, 2, 3], map(f)), [["1"], ["2", "2"], ["3", "3", "3"]]);
	 * assert.deepStrictEqual(pipe([1, 2, 3], flatMap(f)), ["1", "2", "2", "3", "3", "3"]);
	 *
	 * @category sequencing
	 * @since 2.14.0
	 */
	exports.flatMap = (0, function_1.dual)(2, function (ma, f) {
	    return (0, function_1.pipe)(ma, (0, exports.chainWithIndex)(function (i, a) { return f(a, i); }));
	});
	/**
	 * Takes an array of arrays of `A` and flattens them into an array of `A`
	 * by concatenating the elements of each array in order.
	 *
	 * @example
	 * import { flatten } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(flatten([["a"], ["b", "c"], ["d", "e", "f"]]), ["a", "b", "c", "d", "e", "f"]);
	 *
	 * @category sequencing
	 * @since 2.5.0
	 */
	exports.flatten = (0, exports.flatMap)(function_1.identity);
	/**
	 * Same as [`map`](#map), but the iterating function takes both the index and the value
	 * of the element.
	 *
	 * @example
	 * import { mapWithIndex } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * const f = (i: number, s: string) => `${s} - ${i}`;
	 * assert.deepStrictEqual(pipe(["a", "b", "c"], mapWithIndex(f)), ["a - 0", "b - 1", "c - 2"]);
	 *
	 * @category mapping
	 * @since 2.0.0
	 */
	var mapWithIndex = function (f) { return function (fa) {
	    return fa.map(function (a, i) { return f(i, a); });
	}; };
	exports.mapWithIndex = mapWithIndex;
	/**
	 * Maps an array with an iterating function that takes the index and the value of
	 * each element and returns an `Option`. It keeps only the `Some` values discarding
	 * the `None`s.
	 *
	 * Same as [`filterMap`](#filterMap), but with an iterating function which takes also
	 * the index as input.
	 *
	 * @example
	 * import { filterMapWithIndex } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 * import { option } from "fp-ts";
	 *
	 * const f = (i: number, s: string) => (i % 2 === 1 ? option.some(s.toUpperCase()) : option.none);
	 * assert.deepStrictEqual(pipe(["a", "no", "neither", "b"], filterMapWithIndex(f)), ["NO", "B"]);
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var filterMapWithIndex = function (f) {
	    return function (fa) {
	        var out = [];
	        for (var i = 0; i < fa.length; i++) {
	            var optionB = f(i, fa[i]);
	            if (_.isSome(optionB)) {
	                out.push(optionB.value);
	            }
	        }
	        return out;
	    };
	};
	exports.filterMapWithIndex = filterMapWithIndex;
	/**
	 * Maps an array with an iterating function that returns an `Option`
	 * and it keeps only the `Some` values discarding the `None`s.
	 *
	 * @example
	 * import { filterMap } from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 * import { option } from "fp-ts";
	 *
	 * const f = (s: string) => s.length === 1 ? option.some(s.toUpperCase()) : option.none;
	 * assert.deepStrictEqual(pipe(["a", "no", "neither", "b"], filterMap(f)), ["A", "B"]);
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var filterMap = function (f) {
	    return (0, exports.filterMapWithIndex)(function (_, a) { return f(a); });
	};
	exports.filterMap = filterMap;
	/**
	 * Compact an array of `Option`s discarding the `None` values and
	 * keeping the `Some` values. It returns a new array containing the values of
	 * the `Some` options.
	 *
	 * @example
	 * import { compact } from 'fp-ts/Array'
	 * import { option } from "fp-ts";
	 *
	 * assert.deepStrictEqual(compact([option.some("a"), option.none, option.some("b")]), ["a", "b"]);
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	exports.compact = (0, exports.filterMap)(function_1.identity);
	/**
	 * Separate an array of `Either`s into `Left`s and `Right`s, creating two new arrays:
	 * one containing all the left values and one containing all the right values.
	 *
	 * @example
	 * import { separate } from 'fp-ts/Array'
	 * import { either } from "fp-ts";
	 *
	 * assert.deepStrictEqual(separate([either.right("r1"), either.left("l1"), either.right("r2")]), {
	 *   left: ["l1"],
	 *   right: ["r1", "r2"],
	 * });
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var separate = function (fa) {
	    var left = [];
	    var right = [];
	    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
	        var e = fa_1[_i];
	        if (e._tag === 'Left') {
	            left.push(e.left);
	        }
	        else {
	            right.push(e.right);
	        }
	    }
	    return (0, Separated_1.separated)(left, right);
	};
	exports.separate = separate;
	/**
	 * Given an iterating function that is a `Predicate` or a `Refinement`,
	 * `filter` creates a new `Array` containing the elements of the original
	 * `Array` for which the iterating function is `true`.
	 *
	 * @example
	 * import { filter } from 'fp-ts/Array'
	 * import { isString } from "fp-ts/lib/string";
	 *
	 * assert.deepStrictEqual(filter(isString)(["a", 1, {}, "b", 5]), ["a", "b"]);
	 * assert.deepStrictEqual(filter((x:number) => x > 0)([-3, 1, -2, 5]), [1, 5]);
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var filter = function (predicate) {
	    return function (as) {
	        return as.filter(predicate);
	    };
	};
	exports.filter = filter;
	/**
	 * Given an iterating function that is a `Predicate` or a `Refinement`,
	 * `partition` creates two new `Array`s: `right` containing the elements of the original
	 * `Array` for which the iterating function is `true`, `left` containing the elements
	 * for which it is false.
	 *
	 * @example
	 * import { partition } from 'fp-ts/Array'
	 * import { isString } from "fp-ts/lib/string";
	 *
	 * assert.deepStrictEqual(partition(isString)(["a", 1, {}, "b", 5]), { left: [1, {}, 5], right: ["a", "b"] });
	 * assert.deepStrictEqual(partition((x: number) => x > 0)([-3, 1, -2, 5]), { left: [-3, -2], right: [1, 5] });
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var partition = function (predicate) {
	    return (0, exports.partitionWithIndex)(function (_, a) { return predicate(a); });
	};
	exports.partition = partition;
	/**
	 * Same as [`partition`](#partition), but passing also the index to the iterating function.
	 *
	 * @example
	 * import { partitionWithIndex } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(partitionWithIndex((index, x: number) => index < 3 && x > 0)([-2, 5, 6, 7]), {
	 *   left: [-2, 7],
	 *   right: [5, 6],
	 * });
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var partitionWithIndex = function (predicateWithIndex) {
	    return function (as) {
	        var left = [];
	        var right = [];
	        for (var i = 0; i < as.length; i++) {
	            var b = as[i];
	            if (predicateWithIndex(i, b)) {
	                right.push(b);
	            }
	            else {
	                left.push(b);
	            }
	        }
	        return (0, Separated_1.separated)(left, right);
	    };
	};
	exports.partitionWithIndex = partitionWithIndex;
	/**
	 * Given an iterating function that returns an `Either`,
	 * `partitionMap` applies the iterating function to each element and it creates two `Array`s:
	 * `right` containing the values of `Right` results, `left` containing the values of `Left` results.
	 *
	 * @example
	 * import { partitionMap } from 'fp-ts/Array'
	 * import { Either, left, right } from "fp-ts/lib/Either";
	 *
	 * const upperIfString = <B>(x: B): Either<B, string> =>
	 *   typeof x === "string" ? right(x.toUpperCase()) : left(x);
	 * assert.deepStrictEqual(partitionMap(upperIfString)([-2, "hello", 6, 7, "world"]), {
	 *   left: [-2, 6, 7],
	 *   right: [ 'HELLO', 'WORLD' ],
	 * });
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var partitionMap = function (f) { return (0, exports.partitionMapWithIndex)(function (_, a) { return f(a); }); };
	exports.partitionMap = partitionMap;
	/**
	 * Same as [`partitionMap`](#partitionMap), but passing also the index to the iterating function.
	 *
	 * @example
	 * import { partitionMapWithIndex } from 'fp-ts/Array'
	 * import { Either, left, right } from "fp-ts/lib/Either";
	 *
	 * const upperIfStringBefore3 = <B>(index: number, x: B): Either<B, string> =>
	 *   index < 3 && typeof x === "string" ? right(x.toUpperCase()) : left(x);
	 * assert.deepStrictEqual(partitionMapWithIndex(upperIfStringBefore3)([-2, "hello", 6, 7, "world"]), {
	 *   left: [-2, 6, 7, "world"],
	 *   right: ["HELLO"],
	 * });
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var partitionMapWithIndex = function (f) {
	    return function (fa) {
	        var left = [];
	        var right = [];
	        for (var i = 0; i < fa.length; i++) {
	            var e = f(i, fa[i]);
	            if (e._tag === 'Left') {
	                left.push(e.left);
	            }
	            else {
	                right.push(e.right);
	            }
	        }
	        return (0, Separated_1.separated)(left, right);
	    };
	};
	exports.partitionMapWithIndex = partitionMapWithIndex;
	/**
	 * Less strict version of [`alt`](#alt).
	 *
	 * The `W` suffix (short for **W**idening) means that the return types will be merged.
	 *
	 * @example
	 * import * as A from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     A.altW(() => ['a', 'b'])
	 *   ),
	 *   [1, 2, 3, 'a', 'b']
	 * )
	 *
	 * @category error handling
	 * @since 2.9.0
	 */
	var altW = function (that) {
	    return function (fa) {
	        return fa.concat(that());
	    };
	};
	exports.altW = altW;
	/**
	 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	 * types of kind `* -> *`.
	 *
	 * In case of `Array` concatenates the inputs into a single array.
	 *
	 * @example
	 * import * as A from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     A.alt(() => [4, 5])
	 *   ),
	 *   [1, 2, 3, 4, 5]
	 * )
	 *
	 * @category error handling
	 * @since 2.0.0
	 */
	exports.alt = exports.altW;
	/**
	 * Same as [`filter`](#filter), but passing also the index to the iterating function.
	 *
	 * @example
	 * import { filterWithIndex } from 'fp-ts/Array';
	 *
	 * const f = (index: number, x: number) => x > 0 && index <= 2;
	 * assert.deepStrictEqual(filterWithIndex(f)([-3, 1, -2, 5]), [1]);
	 *
	 * @category filtering
	 * @since 2.0.0
	 */
	var filterWithIndex = function (predicateWithIndex) {
	    return function (as) {
	        return as.filter(function (b, i) { return predicateWithIndex(i, b); });
	    };
	};
	exports.filterWithIndex = filterWithIndex;
	/**
	 * Given an iterating function that takes `Array<A>` as input, `extend` returns
	 * an array containing the results of the iterating function applied to the whole input
	 * `Array`, then to the input `Array` without the first element, then to the input
	 * `Array` without the first two elements, etc.
	 *
	 * @example
	 * import { extend } from 'fp-ts/Array'
	 *
	 * const f = (a: string[]) => a.join(",");
	 * assert.deepStrictEqual(extend(f)(["a", "b", "c"]), ["a,b,c", "b,c", "c"]);
	 *
	 * @since 2.0.0
	 */
	var extend = function (f) { return function (wa) {
	    return wa.map(function (_, i) { return f(wa.slice(i)); });
	}; };
	exports.extend = extend;
	/**
	 * `duplicate` returns an array containing the whole input `Array`,
	 * then to the input `Array` dropping the first element, then to the input
	 * `Array` dropping the first two elements, etc.
	 *
	 * @example
	 * import { duplicate } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(duplicate(["a", "b", "c"]), [["a", "b", "c"], ["b", "c"], ["c"]]);
	 *
	 * @since 2.0.0
	 */
	exports.duplicate = (0, exports.extend)(function_1.identity);
	/**
	 * Map and fold an `Array`.
	 * Map the `Array` passing each value to the iterating function.
	 * Then fold the results using the provided `Monoid`.
	 *
	 * @example
	 * import { foldMap } from 'fp-ts/Array'
	 *
	 * const monoid = { concat: (a: string, b: string) => a + b, empty: "" };
	 * const f = (s: string) => s.toUpperCase()
	 * assert.deepStrictEqual(foldMap(monoid)(f)(["a", "b", "c"]), "ABC");
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.foldMap = RA.foldMap;
	/**
	 * Same as [`foldMap`](#foldMap) but passing also the index to the iterating function.
	 *
	 * @example
	 * import { foldMapWithIndex } from 'fp-ts/Array'
	 *
	 * const monoid = { concat: (a: string, b: string) => a + b, empty: "" };
	 * const f = (index:number, s: string) => `${s.toUpperCase()}(${index})`
	 * assert.deepStrictEqual(foldMapWithIndex(monoid)(f)(["a", "b", "c"]), "A(0)B(1)C(2)");
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.foldMapWithIndex = RA.foldMapWithIndex;
	/**
	 * Reduces an `Array`.
	 *
	 * `reduce` executes the supplied iterating function on each element of the array,
	 * in order, passing in the element and the return value from the calculation on the preceding element.
	 *
	 * The first time that the iterating function is called there is no "return value of the
	 * previous calculation", the initial value is used in its place.
	 *
	 * @example
	 * import { reduce } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(reduce(5, (acc: number, cur: number) => acc * cur)([2, 3]), 5 * 2 * 3);
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduce = RA.reduce;
	/**
	 * Same as [`reduce`](#reduce) but passing also the index to the iterating function.
	 *
	 * @example
	 * import { reduceWithIndex } from 'fp-ts/Array'
	 *
	 * const f = (index: number, acc: string, cur: unknown) =>
	 *   acc + (typeof cur === "string" ? cur.toUpperCase() + index : "");
	 * assert.deepStrictEqual(reduceWithIndex("", f)([2, "a", "b", null]), "A1B2");
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceWithIndex = RA.reduceWithIndex;
	/**
	 * Same as [`reduce`](#reduce) but applied from the end to the start.
	 *
	 * *Note*: the iterating function in this case takes the accumulator as the last argument.
	 *
	 * @example
	 * import { reduceRight } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(reduceRight("", (cur: string, acc: string) => acc + cur)(["a", "b", "c"]), "cba");
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceRight = RA.reduceRight;
	/**
	 * Same as [`reduceRight`](#reduceRight) but passing also the index to the iterating function.
	 *
	 * @example
	 * import { reduceRightWithIndex } from 'fp-ts/Array'
	 *
	 * const f = (index: number, cur: unknown, acc: string) =>
	 *   acc + (typeof cur === "string" ? cur.toUpperCase() + index : "");
	 * assert.deepStrictEqual(reduceRightWithIndex("", f)([2, "a", "b", null]), "B2A1");
	 *
	 * @category folding
	 * @since 2.0.0
	 */
	exports.reduceRightWithIndex = RA.reduceRightWithIndex;
	/**
	 * Given an iterating function that returns a `HKT` (higher kinded type), `traverse`
	 * applies the iterating function to each element of the `Array` and then [`sequence`](#sequence)-s
	 * the results using the provided `Applicative`.
	 *
	 * E.g. suppose you have an `Array` and you want to format each element with a function
	 * that returns a result or an error as `f = (a: A) => Either<Error, B>`, using `traverse`
	 * you can apply `f` to all elements and directly obtain as a result an `Either<Error,Array<B>>`
	 * i.e. an `Array<B>` if all the results are `B`, or an `Error` if some of the results
	 * are `Error`s.
	 *
	 * @example
	 * import { traverse } from 'fp-ts/Array'
	 * import { Applicative, left, right } from "fp-ts/lib/Either";
	 *
	 * const f = (x: unknown) =>
	 *   typeof x === "string" ? right(x.toUpperCase()) : left(new Error("not a string"));
	 * assert.deepStrictEqual(traverse(Applicative)(f)(["a", "b"]), right(["A", "B"]));
	 * assert.deepStrictEqual(traverse(Applicative)(f)(["a", 5]), left(new Error("not a string")));
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var traverse = function (F) {
	    var traverseWithIndexF = (0, exports.traverseWithIndex)(F);
	    return function (f) { return traverseWithIndexF(function (_, a) { return f(a); }); };
	};
	exports.traverse = traverse;
	/**
	 * `sequence` takes an `Array` where elements are `HKT<A>` (higher kinded type) and,
	 * using an applicative of that `HKT`, returns an `HKT` of `Array<A>`.
	 * E.g. it can turn an `Array<Either<Error, string>>` into an `Either<Error, Array<string>>`.
	 *
	 * `sequence` requires an `Applicative` of the `HKT` you are targeting, e.g. to turn an
	 * `Array<Either<E, A>>` into an `Either<E, Array<A>>`, it needs an
	 * `Applicative` for `Either`, to to turn an `Array<Option<A>>` into an `Option<Array<A>>`,
	 * it needs an `Applicative` for `Option`.
	 *
	 * @example
	 * import { sequence } from 'fp-ts/Array'
	 * import { Applicative, left, right } from "fp-ts/lib/Either";
	 *
	 * assert.deepStrictEqual(sequence(Applicative)([right("a"), right("b")]), right(["a", "b"]));
	 * assert.deepStrictEqual(
	 *   sequence(Applicative)([right("a"), left(new Error("not a string"))]),
	 *   left(new Error("not a string"))
	 * );
	 *
	 * @category traversing
	 * @since 2.6.3
	 */
	var sequence = function (F) {
	    return function (ta) {
	        return _reduce(ta, F.of((0, exports.zero)()), function (fas, fa) {
	            return F.ap(F.map(fas, function (as) { return function (a) { return (0, function_1.pipe)(as, (0, exports.append)(a)); }; }), fa);
	        });
	    };
	};
	exports.sequence = sequence;
	/**
	 * Same as [`traverse`](#traverse) but passing also the index to the iterating function.
	 *
	 * @example
	 * import { traverseWithIndex } from 'fp-ts/Array'
	 * import { Applicative, left, right } from "fp-ts/lib/Either";
	 *
	 * const f = (index:number, x:unknown) =>
	 *   typeof x === "string" ? right(x.toUpperCase() + index) : left(new Error("not a string"));
	 * assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(["a", "b"]), right(["A0", "B1"]));
	 * assert.deepStrictEqual(traverseWithIndex(Applicative)(f)(["a", 5]), left(new Error("not a string")));
	 *
	 * @category sequencing
	 * @since 2.6.3
	 */
	var traverseWithIndex = function (F) {
	    return function (f) {
	        return (0, exports.reduceWithIndex)(F.of((0, exports.zero)()), function (i, fbs, a) {
	            return F.ap(F.map(fbs, function (bs) { return function (b) { return (0, function_1.pipe)(bs, (0, exports.append)(b)); }; }), f(i, a));
	        });
	    };
	};
	exports.traverseWithIndex = traverseWithIndex;
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wither = function (F) {
	    var _witherF = _wither(F);
	    return function (f) { return function (fa) { return _witherF(fa, f); }; };
	};
	exports.wither = wither;
	/**
	 * @category filtering
	 * @since 2.6.5
	 */
	var wilt = function (F) {
	    var _wiltF = _wilt(F);
	    return function (f) { return function (fa) { return _wiltF(fa, f); }; };
	};
	exports.wilt = wilt;
	/**
	 * `unfold` takes a function `f` which returns an `Option` of a tuple containing an outcome
	 * value and an input for the following iteration.
	 * `unfold` applies `f` to the initial value `b` and then recursively to the second
	 * element of the tuple contained in the returned `option` of the previous
	 * calculation until `f` returns `Option.none`.
	 *
	 * @example
	 * import { unfold } from 'fp-ts/Array'
	 * import { option } from 'fp-ts'
	 *
	 * const f = (n: number) => {
	 *   if (n <= 0) return option.none;
	 *   const returnValue = n * 2;
	 *   const inputForNextRound = n - 1;
	 *   return option.some([returnValue, inputForNextRound] as const);
	 * };
	 * assert.deepStrictEqual(unfold(5, f), [10, 8, 6, 4, 2]);
	 *
	 * @since 2.6.6
	 */
	var unfold = function (b, f) {
	    var out = [];
	    var bb = b;
	    // eslint-disable-next-line no-constant-condition
	    while (true) {
	        var mt = f(bb);
	        if (_.isSome(mt)) {
	            var _a = mt.value, a = _a[0], b_1 = _a[1];
	            out.push(a);
	            bb = b_1;
	        }
	        else {
	            break;
	        }
	    }
	    return out;
	};
	exports.unfold = unfold;
	/**
	 * @category type lambdas
	 * @since 2.0.0
	 */
	exports.URI = 'Array';
	/**
	 * `getShow` makes a `Show` for an `Array<A>` from a `Show` for
	 * an `A`.
	 *
	 * @example
	 * import { getShow } from 'fp-ts/Array'
	 *
	 * const numShow = { show: (n: number) => (n >= 0 ? `${n}` : `(${-n})`) };
	 * assert.deepStrictEqual(getShow(numShow).show([-2, -1, 0, 1]), "[(2), (1), 0, 1]");
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	exports.getShow = RA.getShow;
	/**
	 * Get a `Semigroup` based on the concatenation of `Array`s.
	 * See also [`getMonoid`](#getMonoid).
	 *
	 * @example
	 * import { getSemigroup } from 'fp-ts/Array'
	 *
	 * const S = getSemigroup<number>();
	 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 2, 3]);
	 *
	 * @category instances
	 * @since 2.10.0
	 */
	var getSemigroup = function () { return ({
	    concat: function (first, second) { return first.concat(second); }
	}); };
	exports.getSemigroup = getSemigroup;
	/**
	 * Returns a `Monoid` for `Array<A>` based on the concatenation of `Array`s.
	 *
	 * @example
	 * import { getMonoid } from 'fp-ts/Array'
	 *
	 * const M = getMonoid<number>()
	 * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	var getMonoid = function () { return ({
	    concat: (0, exports.getSemigroup)().concat,
	    empty: []
	}); };
	exports.getMonoid = getMonoid;
	/**
	 * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
	 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
	 * different lengths, the result is non equality.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { getEq } from 'fp-ts/Array'
	 *
	 * const E = getEq(S.Eq)
	 * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
	 * assert.strictEqual(E.equals(['a'], []), false)
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	exports.getEq = RA.getEq;
	/**
	 * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
	 * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
	 * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
	 * the same length, the result is equality.
	 *
	 * @example
	 * import { getOrd } from 'fp-ts/Array'
	 * import * as S from 'fp-ts/string'
	 *
	 * const O = getOrd(S.Ord)
	 * assert.strictEqual(O.compare(['b'], ['a']), 1)
	 * assert.strictEqual(O.compare(['a'], ['a']), 0)
	 * assert.strictEqual(O.compare(['a'], ['b']), -1)
	 *
	 * @category instances
	 * @since 2.0.0
	 */
	exports.getOrd = RA.getOrd;
	/**
	 * Get a `Semigroup` based on the union of the elements of `Array`s.
	 * Elements which equal according to the provided `Eq` are included
	 * only once in the result.
	 * See also [`getUnionMonoid`](#getUnionMonoid).
	 *
	 * @example
	 * import { getUnionSemigroup } from 'fp-ts/Array';
	 * import { Eq } from 'fp-ts/number';
	 *
	 * const S = getUnionSemigroup<number>(Eq);
	 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1, 2, 3]);
	 *
	 * @category instances
	 * @since 2.11.0
	 */
	var getUnionSemigroup = function (E) {
	    var unionE = union(E);
	    return {
	        concat: function (first, second) { return unionE(second)(first); }
	    };
	};
	exports.getUnionSemigroup = getUnionSemigroup;
	/**
	 * Get a `Monoid` based on the union of the elements of `Array`s.
	 * Elements which equal according to the provided `Eq` are included
	 * only once in the result.
	 *
	 * @example
	 * import { getUnionMonoid } from 'fp-ts/Array'
	 * import { Eq } from 'fp-ts/number';
	 *
	 * const M = getUnionMonoid<number>(Eq);
	 * assert.deepStrictEqual(M.concat([1, 2], [2, 3]), [1, 2, 3]);
	 * assert.deepStrictEqual(M.empty,[]);
	 *
	 * @category instances
	 * @since 2.11.0
	 */
	var getUnionMonoid = function (E) { return ({
	    concat: (0, exports.getUnionSemigroup)(E).concat,
	    empty: []
	}); };
	exports.getUnionMonoid = getUnionMonoid;
	/**
	 * Get a `Semigroup` based on the intersection of the elements of `Array`s.
	 * Only elements present in the two arrays which are equal according to the
	 * provided `Eq` are included in the result.
	 *
	 * @example
	 * import { getIntersectionSemigroup } from 'fp-ts/Array'
	 * import { Eq } from 'fp-ts/number';
	 *
	 * const S = getIntersectionSemigroup<number>(Eq);
	 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [2]);
	 *
	 * @category instances
	 * @since 2.11.0
	 */
	var getIntersectionSemigroup = function (E) {
	    var intersectionE = intersection(E);
	    return {
	        concat: function (first, second) { return intersectionE(second)(first); }
	    };
	};
	exports.getIntersectionSemigroup = getIntersectionSemigroup;
	/**
	 * Get a `Magma` for `Array` where the `concat` function is the differnce between
	 * the first and the second array, i.e. the result contains all the elements of the
	 * first array for which their is no equal element in the second array according
	 * to the `Eq` provided.
	 *
	 *
	 * @example
	 * import { getDifferenceMagma } from 'fp-ts/Array'
	 * import { Eq } from 'fp-ts/number';
	 *
	 * const S = getDifferenceMagma<number>(Eq);
	 * assert.deepStrictEqual(S.concat([1, 2], [2, 3]), [1]);
	 *
	 * @category instances
	 * @since 2.11.0
	 */
	var getDifferenceMagma = function (E) {
	    var differenceE = difference(E);
	    return {
	        concat: function (first, second) { return differenceE(second)(first); }
	    };
	};
	exports.getDifferenceMagma = getDifferenceMagma;
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Functor = {
	    URI: exports.URI,
	    map: _map
	};
	/**
	 * Given an input an `Array` of functions, `flap` returns an `Array` containing
	 * the results of applying each function to the given input.
	 *
	 * @example
	 * import { flap } from 'fp-ts/Array'
	 *
	 * const funs = [
	 *   (n: number) => `Double: ${n * 2}`,
	 *   (n: number) => `Triple: ${n * 3}`,
	 *   (n: number) => `Square: ${n * n}`,
	 * ];
	 * assert.deepStrictEqual(flap(4)(funs), ['Double: 8', 'Triple: 12', 'Square: 16']);
	 *
	 * @category mapping
	 * @since 2.10.0
	 */
	exports.flap = (0, Functor_1.flap)(exports.Functor);
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Pointed = {
	    URI: exports.URI,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Apply = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap
	};
	/**
	 * Combine two effectful actions, keeping only the result of the first.
	 *
	 * @since 2.5.0
	 */
	exports.apFirst = (0, Apply_1.apFirst)(exports.Apply);
	/**
	 * Combine two effectful actions, keeping only the result of the second.
	 *
	 * @since 2.5.0
	 */
	exports.apSecond = (0, Apply_1.apSecond)(exports.Apply);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Applicative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of
	};
	/**
	 * @category instances
	 * @since 2.10.0
	 */
	exports.Chain = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap
	};
	/**
	 * Composes computations in sequence, using the return value of one computation to determine the next computation and
	 * keeping only the result of the first.
	 *
	 * @example
	 * import * as A from 'fp-ts/Array'
	 * import { pipe } from 'fp-ts/function'
	 *
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     A.chainFirst(() => ['a', 'b'])
	 *   ),
	 *   [1, 1, 2, 2, 3, 3]
	 * )
	 * assert.deepStrictEqual(
	 *   pipe(
	 *     [1, 2, 3],
	 *     A.chainFirst(() => [])
	 *   ),
	 *   []
	 * )
	 *
	 * @category sequencing
	 * @since 2.0.0
	 */
	exports.chainFirst = 
	/*#__PURE__*/ (0, Chain_1.chainFirst)(exports.Chain);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Monad = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Unfoldable = {
	    URI: exports.URI,
	    unfold: exports.unfold
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alt = {
	    URI: exports.URI,
	    map: _map,
	    alt: _alt
	};
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.Zero = {
	    URI: exports.URI,
	    zero: exports.zero
	};
	/**
	 * @category do notation
	 * @since 2.11.0
	 */
	exports.guard = (0, Zero_1.guard)(exports.Zero, exports.Pointed);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Alternative = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    alt: _alt,
	    zero: exports.zero
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Extend = {
	    URI: exports.URI,
	    map: _map,
	    extend: _extend
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Filterable = {
	    URI: exports.URI,
	    map: _map,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FilterableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    partitionMapWithIndex: _partitionMapWithIndex,
	    partitionWithIndex: _partitionWithIndex,
	    filterMapWithIndex: _filterMapWithIndex,
	    filterWithIndex: _filterWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Foldable = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Traversable = {
	    URI: exports.URI,
	    map: _map,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence
	};
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: _map,
	    mapWithIndex: _mapWithIndex,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    traverseWithIndex: _traverseWithIndex
	};
	var _wither = /*#__PURE__*/ (0, Witherable_1.witherDefault)(exports.Traversable, exports.Compactable);
	var _wilt = /*#__PURE__*/ (0, Witherable_1.wiltDefault)(exports.Traversable, exports.Compactable);
	/**
	 * @category instances
	 * @since 2.7.0
	 */
	exports.Witherable = {
	    URI: exports.URI,
	    map: _map,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    wither: _wither,
	    wilt: _wilt
	};
	/**
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.chainRecDepthFirst = RA.chainRecDepthFirst;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.ChainRecDepthFirst = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: _chainRecDepthFirst
	};
	/**
	 * @category sequencing
	 * @since 2.11.0
	 */
	exports.chainRecBreadthFirst = RA.chainRecBreadthFirst;
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.ChainRecBreadthFirst = {
	    URI: exports.URI,
	    map: _map,
	    ap: _ap,
	    chain: exports.flatMap,
	    chainRec: _chainRecBreadthFirst
	};
	/**
	 * Filter values inside a context.
	 *
	 * @since 2.11.0
	 */
	exports.filterE = (0, Witherable_1.filterE)(exports.Witherable);
	/**
	 * @category instances
	 * @since 2.11.0
	 */
	exports.FromEither = {
	    URI: exports.URI,
	    fromEither: exports.fromEither
	};
	/**
	 * @category lifting
	 * @since 2.11.0
	 */
	exports.fromEitherK = (0, FromEither_1.fromEitherK)(exports.FromEither);
	// -------------------------------------------------------------------------------------
	// unsafe
	// -------------------------------------------------------------------------------------
	/**
	 * @category unsafe
	 * @since 2.0.0
	 */
	exports.unsafeInsertAt = NEA.unsafeInsertAt;
	/**
	 * @category unsafe
	 * @since 2.0.0
	 */
	var unsafeUpdateAt = function (i, a, as) {
	    return (0, exports.isNonEmpty)(as) ? NEA.unsafeUpdateAt(i, a, as) : [];
	};
	exports.unsafeUpdateAt = unsafeUpdateAt;
	/**
	 * @category unsafe
	 * @since 2.0.0
	 */
	var unsafeDeleteAt = function (i, as) {
	    var xs = as.slice();
	    xs.splice(i, 1);
	    return xs;
	};
	exports.unsafeDeleteAt = unsafeDeleteAt;
	// -------------------------------------------------------------------------------------
	// utils
	// -------------------------------------------------------------------------------------
	/**
	 * `every` tells if the provided predicate holds true for every element in the `Array`.
	 *
	 * @example
	 * import { every } from 'fp-ts/Array'
	 *
	 * assert.equal(every((x: number) => x >= 0)([1, 2, 3]), true);
	 * assert.equal(every((x: number) => x >= 0)([-1, 2, 3]), false);
	 *
	 * @since 2.9.0
	 */
	exports.every = RA.every;
	/**
	 * `some` tells if the provided predicate holds true at least for one element in the `Array`.
	 *
	 * @example
	 * import { some } from 'fp-ts/Array'
	 *
	 * assert.equal(some((x: number) => x >= 0)([1, 2, 3]), true);
	 * assert.equal(some((x: number) => x >= 10)([1, 2, 3]), false);
	 *
	 * @since 2.9.0
	 */
	var some = function (predicate) {
	    return function (as) {
	        return as.some(predicate);
	    };
	};
	exports.some = some;
	/**
	 * Alias of [`some`](#some)
	 *
	 * @since 2.11.0
	 */
	exports.exists = exports.some;
	/**
	 * Places an element in between members of an `Array`, then folds the results using the provided `Monoid`.
	 *
	 * @example
	 * import * as S from 'fp-ts/string'
	 * import { intercalate } from 'fp-ts/Array'
	 *
	 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
	 *
	 * @since 2.12.0
	 */
	exports.intercalate = RA.intercalate;
	// -------------------------------------------------------------------------------------
	// do notation
	// -------------------------------------------------------------------------------------
	/**
	 * @category do notation
	 * @since 2.9.0
	 */
	exports.Do = (0, exports.of)(_.emptyRecord);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bindTo = (0, Functor_1.bindTo)(exports.Functor);
	var let_ = /*#__PURE__*/ (0, Functor_1.let)(exports.Functor);
	exports.let = let_;
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.bind = (0, Chain_1.bind)(exports.Chain);
	/**
	 * @category do notation
	 * @since 2.8.0
	 */
	exports.apS = (0, Apply_1.apS)(exports.Apply);
	// -------------------------------------------------------------------------------------
	// legacy
	// -------------------------------------------------------------------------------------
	/**
	 * Alias of `flatMap`.
	 *
	 * @category legacy
	 * @since 2.0.0
	 */
	exports.chain = exports.flatMap;
	// -------------------------------------------------------------------------------------
	// deprecated
	// -------------------------------------------------------------------------------------
	/**
	 * Use `NonEmptyArray` module instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.range = NEA.range;
	/**
	 * Use a new `[]` instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.empty = [];
	/**
	 * Use `prepend` instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.cons = NEA.cons;
	/**
	 * Use `append` instead.
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.snoc = NEA.snoc;
	/**
	 * Use `prependAll` instead
	 *
	 * @category zone of death
	 * @since 2.9.0
	 * @deprecated
	 */
	exports.prependToAll = exports.prependAll;
	/**
	 * This instance is deprecated, use small, specific instances instead.
	 * For example if a function needs a `Functor` instance, pass `A.Functor` instead of `A.array`
	 * (where `A` is from `import A from 'fp-ts/Array'`)
	 *
	 * @category zone of death
	 * @since 2.0.0
	 * @deprecated
	 */
	exports.array = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate,
	    map: _map,
	    ap: _ap,
	    of: exports.of,
	    chain: exports.flatMap,
	    filter: _filter,
	    filterMap: _filterMap,
	    partition: _partition,
	    partitionMap: _partitionMap,
	    mapWithIndex: _mapWithIndex,
	    partitionMapWithIndex: _partitionMapWithIndex,
	    partitionWithIndex: _partitionWithIndex,
	    filterMapWithIndex: _filterMapWithIndex,
	    filterWithIndex: _filterWithIndex,
	    alt: _alt,
	    zero: exports.zero,
	    unfold: exports.unfold,
	    reduce: _reduce,
	    foldMap: _foldMap,
	    reduceRight: _reduceRight,
	    traverse: _traverse,
	    sequence: exports.sequence,
	    reduceWithIndex: _reduceWithIndex,
	    foldMapWithIndex: _foldMapWithIndex,
	    reduceRightWithIndex: _reduceRightWithIndex,
	    traverseWithIndex: _traverseWithIndex,
	    extend: _extend,
	    wither: _wither,
	    wilt: _wilt
	}; 
} (_Array));

var src$1 = {};

var require$$0$1 = /*@__PURE__*/index.getAugmentedNamespace(transaction._Array);

var require$$1 = /*@__PURE__*/index.getAugmentedNamespace(index.Either$1);

var require$$2 = /*@__PURE__*/index.getAugmentedNamespace(transaction.NonEmptyArray);

var require$$3 = /*@__PURE__*/index.getAugmentedNamespace(index.Option);

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------
/**
 * Calculate the number of key/value pairs in a `Record`.
 *
 * @example
 * import { size } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(size({ a: true, b: 2, c: "three" }), 3);
 *
 * @since 2.0.0
 */
var size = transaction.size;
/**
 * Test whether a `Record` is empty.
 *
 * @example
 * import { isEmpty } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(isEmpty({}), true);
 * assert.deepStrictEqual(isEmpty({ a: 3 }), false);
 *
 * @since 2.0.0
 */
var isEmpty = transaction.isEmpty;
var keys_ = function (O) {
    return function (r) {
        return Object.keys(r).sort(O.compare);
    };
};
/**
 * The keys of a `Record`, sorted alphabetically.
 *
 * @example
 * import { keys } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(keys({ c: 1, a: 2, b: 3 }), ["a", "b", "c"]);
 *
 * @since 2.0.0
 */
var keys = /*#__PURE__*/ keys_(transaction.Ord);
function collect(O) {
    if (typeof O === 'function') {
        return collect(transaction.Ord)(O);
    }
    var keysO = keys_(O);
    return function (f) {
        return function (r) {
            var out = [];
            for (var _i = 0, _a = keysO(r); _i < _a.length; _i++) {
                var key = _a[_i];
                out.push(f(key, r[key]));
            }
            return out;
        };
    };
}
/**
 * Get a sorted `Array` of the key/value pairs contained in a `Record`.
 * Sorted alphabetically by key.
 *
 * @example
 * import { toArray } from 'fp-ts/Record'
 *
 * const x = { c: 3, a: "foo", b: false };
 * assert.deepStrictEqual(toArray(x), [
 *   ["a", "foo"],
 *   ["b", false],
 *   ["c", 3],
 * ]);
 *
 * @category conversions
 * @since 2.0.0
 */
var toArray = /*#__PURE__*/ collect(transaction.Ord)(function (k, a) { return [
    k,
    a
]; });
function toUnfoldable(U) {
    return function (r) {
        var sas = toArray(r);
        var len = sas.length;
        return U.unfold(0, function (b) { return (b < len ? index.some([sas[b], b + 1]) : index.none); });
    };
}
/**
 * Insert or replace a key/value pair in a `Record`.
 *
 * @example
 * import { upsertAt } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(upsertAt("a", 5)({ a: 1, b: 2 }), { a: 5, b: 2 });
 * assert.deepStrictEqual(upsertAt("c", 5)({ a: 1, b: 2 }), { a: 1, b: 2, c: 5 });
 *
 * @since 2.10.0
 */
var upsertAt = transaction.upsertAt;
/**
 * Test whether or not a key exists in a `Record`.
 *
 * Note. This function is not pipeable because is a `Refinement`.
 *
 * @example
 * import { has } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(has("a", { a: 1, b: 2 }), true);
 * assert.deepStrictEqual(has("c", { a: 1, b: 2 }), false);
 *
 * @since 2.10.0
 */
var has$4 = transaction.has;
function deleteAt(k) {
    return function (r) {
        if (!index.has.call(r, k)) {
            return r;
        }
        var out = Object.assign({}, r);
        delete out[k];
        return out;
    };
}
/**
 * Replace a key/value pair in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing a new `Record`
 * with the entry updated, otherwise it returns `None`
 *
 * @example
 * import { updateAt } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(updateAt("a", 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }));
 * assert.deepStrictEqual(updateAt("c", 3)({ a: 1, b: 2 }), option.none);
 *
 * @since 2.0.0
 */
var updateAt = function (k, a) {
    return modifyAt(k, function () { return a; });
};
/**
 * Applies a mapping function to one spcific key/value pair in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing a new `Record`
 * with the entry updated, otherwise it returns `None`
 *
 * @example
 * import { modifyAt } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(modifyAt("a", (x: number) => x * 3)({ a: 1, b: 2 }), option.some({ a: 3, b: 2 }));
 * assert.deepStrictEqual(modifyAt("c", (x: number) => x * 3)({ a: 1, b: 2 }), option.none);
 *
 * @since 2.0.0
 */
var modifyAt = function (k, f) {
    return function (r) {
        if (!has$4(k, r)) {
            return index.none;
        }
        var out = Object.assign({}, r);
        out[k] = f(r[k]);
        return index.some(out);
    };
};
function pop(k) {
    var deleteAtk = deleteAt(k);
    return function (r) {
        var oa = lookup(k, r);
        return index.isNone(oa) ? index.none : index.some([oa.value, deleteAtk(r)]);
    };
}
// TODO: remove non-curried overloading in v3
/**
 * Test whether one `Record` contains all of the keys and values
 * contained in another `Record`.
 *
 * @example
 * import { isSubrecord } from 'fp-ts/Record'
 * import { string } from 'fp-ts'
 *
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", b: "bar", c: "baz" }),
 *   true
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", c: "baz" }),
 *   true
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar", c: "baz" })({ a: "foo", b: "not-bar", c: "baz" }),
 *   false
 * );
 * assert.deepStrictEqual(
 *   isSubrecord(string.Eq)({ a: "foo", b: "bar" })({ a: "foo", b: "bar", c: "baz" }),
 *   false
 * );
 *
 * @since 2.0.0
 */
var isSubrecord = transaction.isSubrecord;
// TODO: remove non-curried overloading in v3
/**
 * Lookup the value for a key in a `Record`.
 *
 * @returns If the specified key exists it returns an `Option` containing the value,
 * otherwise it returns `None`
 *
 * @example
 * import { lookup } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(lookup("b")({ a: "foo", b: "bar" }), option.some("bar"));
 * assert.deepStrictEqual(lookup("c")({ a: "foo", b: "bar" }), option.none);
 *
 * @since 2.0.0
 */
var lookup = transaction.lookup;
/**
 * Map a `Record` passing the key/value pairs to the iterating function.
 *
 * @example
 * import { mapWithIndex } from "fp-ts/Record";
 *
 * const f = (k: string, n: number) => `${k.toUpperCase()}-${n}`;
 * assert.deepStrictEqual(mapWithIndex(f)({ a: 3, b: 5 }), { a: "A-3", b: "B-5" });
 *
 * @since 2.0.0
 */
var mapWithIndex = transaction.mapWithIndex;
/**
 * Map a `Record` passing the values to the iterating function.
 *
 * @example
 * import { map } from "fp-ts/Record";
 *
 * const f = (n: number) => `-${n}-`;
 * assert.deepStrictEqual(map(f)({ a: 3, b: 5 }), { a: "-3-", b: "-5-" });
 *
 * @category mapping
 * @since 2.0.0
 */
var map = transaction.map;
function reduceWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? transaction.reduceWithIndex(args[0]) : transaction.reduceWithIndex(transaction.Ord).apply(void 0, args);
}
function foldMapWithIndex(O) {
    return 'compare' in O ? transaction.foldMapWithIndex(O) : transaction.foldMapWithIndex(transaction.Ord)(O);
}
function reduceRightWithIndex() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? transaction.reduceRightWithIndex(args[0]) : transaction.reduceRightWithIndex(transaction.Ord).apply(void 0, args);
}
/**
 * Create a `Record` with one key/value pair.
 *
 * @example
 * import { singleton } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(singleton("a", 1), { a: 1 });
 *
 * @since 2.0.0
 */
var singleton = transaction.singleton;
function traverseWithIndex(F) {
    return transaction.traverseWithIndex(F);
}
function traverse(F) {
    return transaction.traverse(F);
}
function sequence(F) {
    return transaction.sequence(F);
}
/**
 * @category filtering
 * @since 2.6.5
 */
var wither = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(index.pipe(fa, traverseF(f)), compact$1); }; };
};
/**
 * @category filtering
 * @since 2.6.5
 */
var wilt = function (F) {
    var traverseF = traverse(F);
    return function (f) { return function (fa) { return F.map(index.pipe(fa, traverseF(f)), separate); }; };
};
/**
 * Maps a `Record` with a function returning an `Either` and
 * partitions the resulting `Record` into `Left`s and `Right`s.
 *
 * @example
 * import { partitionMapWithIndex } from "fp-ts/Record"
 * import { either } from "fp-ts"
 *
 * const f = (key: string, a: number) =>
 *   a >= 0 ? either.right(`${key} is >= 0 (${a})`) : either.left(`${key} is < 0 (${a})`);
 * assert.deepStrictEqual(partitionMapWithIndex(f)({ a: -1, b: 2, c: 123 }), {
 *   left: {
 *     a: "a is < 0 (-1)",
 *   },
 *   right: {
 *     b: "b is >= 0 (2)",
 *     c: "c is >= 0 (123)",
 *   },
 * });
 *
 * @since 2.0.0
 */
var partitionMapWithIndex = transaction.partitionMapWithIndex;
function partitionWithIndex(predicateWithIndex) {
    return transaction.partitionWithIndex(predicateWithIndex);
}
/**
 * Maps a `Record` with an iterating function that takes key and value and
 * returns an `Option`, keeping only the `Some` values and discarding `None`s.
 *
 * @example
 * import { filterMapWithIndex } from "fp-ts/Record"
 * import { option } from "fp-ts"
 *
 * const f = (key: string, a: number) => (a >= 0 ? option.some(`${key}${a}`) : option.none);
 * assert.deepStrictEqual(filterMapWithIndex(f)({ a: -1, b: 2, c: 3 }), {
 *   b: "b2",
 *   c: "c3",
 * });
 *
 * @since 2.0.0
 */
var filterMapWithIndex = transaction.filterMapWithIndex;
function filterWithIndex(predicateWithIndex) {
    return transaction.filterWithIndex(predicateWithIndex);
}
function fromFoldable(M, F) {
    return transaction.fromFoldable(M, F);
}
/**
 * Alias of [`toArray`](#toArray).
 *
 * @example
 * import { toEntries } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(toEntries({ b: 2, a: 1 }), [['a', 1], ['b', 2]])
 *
 * @since 2.12.0
 * @category conversions
 */
var toEntries = toArray;
/**
 * Converts an `Array` of `[key, value]` tuples into a `Record`.
 *
 * @example
 * import { fromEntries } from 'fp-ts/Record'
 *
 * assert.deepStrictEqual(fromEntries([['a', 1], ['b', 2], ['a', 3]]), { b: 2, a: 3 })
 *
 * @since 2.12.0
 * @category conversions
 */
var fromEntries = function (fa) { return fromFoldable(index.last(), transaction.Foldable)(fa); };
function fromFoldableMap(M, F) {
    return transaction.fromFoldableMap(M, F);
}
/**
 * Test if every value in a `Record` satisfies the predicate.
 *
 * @example
 * import { every } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: 2 }), true);
 * assert.deepStrictEqual(every((n: number) => n >= 0)({ a: 1, b: -1 }), false);
 *
 * @since 2.0.0
 */
var every = transaction.every;
/**
 * Test if at least one value in a `Record` satisfies the predicate.
 *
 * @example
 * import { some } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: 1, b: -2 }), true);
 * assert.deepStrictEqual(some((n: number) => n >= 0)({ a: -1, b: -2 }), false);
 *
 * @since 2.0.0
 */
var some = transaction.some;
// TODO: remove non-curried overloading in v3
/**
 * Given an `Eq` checks if a `Record` contains an entry with
 * value equal to a provided value.
 *
 * @example
 * import { elem } from "fp-ts/Record"
 * import { number } from "fp-ts"
 *
 * assert.deepStrictEqual(elem(number.Eq)(123, { foo: 123, bar: 234 }), true);
 * assert.deepStrictEqual(elem(number.Eq)(-7, { foo: 123, bar: 234 }), false);
 *
 * @since 2.0.0
 */
var elem = transaction.elem;
/**
 * Union of two `Record`s.
 * Takes two `Record`s and produces a `Record` combining all the
 * entries of the two inputs.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements with the same key.
 *
 * @example
 * import { union } from "fp-ts/Record";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(union(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4, b: 2, c: 3 });
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(union(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 });
 *
 * @since 2.11.0
 */
var union = function (M) {
    var unionM = transaction.union(M);
    return function (second) { return function (first) {
        if (isEmpty(first)) {
            return __assign({}, second);
        }
        if (isEmpty(second)) {
            return __assign({}, first);
        }
        return unionM(second)(first);
    }; };
};
/**
 * Intersection of two `Record`s.
 * Takes two `Record`s and produces a `Record` combining only the
 * entries of the two inputswith the same key.
 * It uses the `concat` function of the provided `Magma` to
 * combine the elements.
 *
 * @example
 * import { intersection } from "fp-ts/Record";
 * import { Magma } from "fp-ts/Magma";
 *
 * const m1: Magma<number> = { concat: (x: number, y: number) => x + y };
 * assert.deepStrictEqual(intersection(m1)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 4});
 * const m2: Magma<number> = { concat: (x: number) => x };
 * assert.deepStrictEqual(intersection(m2)({ a: 3, c: 3 })({ a: 1, b: 2 }), { a: 1});
 *
 * @since 2.11.0
 */
var intersection = function (M) {
    return function (second) {
        return function (first) {
            if (isEmpty(first) || isEmpty(second)) {
                return {};
            }
            return transaction.intersection(M)(second)(first);
        };
    };
};
/**
 * Difference between two `Record`s.
 * Takes two `Record`s and produces a `Record` composed by the
 * entries of the two inputs, removing the entries with the same
 * key in both inputs.
 *
 * @example
 * import { difference } from "fp-ts/Record";
 *
 * assert.deepStrictEqual(difference({ a: 1 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3 })({ a: 1, b: 2 }), { b: 2 });
 * assert.deepStrictEqual(difference({ a: 3, c: 3 })({ a: 1, b: 2 }), { b: 2, c: 3 });
 *
 * @since 2.11.0
 */
var difference = function (second) {
    return function (first) {
        if (isEmpty(first)) {
            return __assign({}, second);
        }
        if (isEmpty(second)) {
            return __assign({}, first);
        }
        return transaction.difference(second)(first);
    };
};
var _map = transaction._map;
var _mapWithIndex = transaction._mapWithIndex;
var _reduce = transaction._reduce;
var _foldMap = transaction._foldMap;
var _reduceRight = transaction._reduceRight;
var _filter = transaction._filter;
var _filterMap = transaction._filterMap;
var _partition = transaction._partition;
var _partitionMap = transaction._partitionMap;
var _reduceWithIndex = transaction._reduceWithIndex;
var _foldMapWithIndex = transaction._foldMapWithIndex;
var _reduceRightWithIndex = transaction._reduceRightWithIndex;
var _partitionMapWithIndex = transaction._partitionMapWithIndex;
var _partitionWithIndex = transaction._partitionWithIndex;
var _filterMapWithIndex = transaction._filterMapWithIndex;
var _filterWithIndex = transaction._filterWithIndex;
var _traverse = transaction._traverse;
var _sequence = transaction._sequence;
var _traverseWithIndex = function (O) {
    return function (F) {
        var keysO = keys_(O);
        return function (ta, f) {
            var ks = keysO(ta);
            if (ks.length === 0) {
                return F.of({});
            }
            var fr = F.of({});
            var _loop_1 = function (key) {
                fr = F.ap(F.map(fr, function (r) { return function (b) {
                    r[key] = b;
                    return r;
                }; }), f(key, ta[key]));
            };
            for (var _i = 0, ks_1 = ks; _i < ks_1.length; _i++) {
                var key = ks_1[_i];
                _loop_1(key);
            }
            return fr;
        };
    };
};
/**
 * Given a `Predicate`, it produces a new `Record` keeping only the entries with a
 * value that satisfies the provided predicate.
 *
 * @example
 * import { filter } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(filter((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo",
 *   b: "bar",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var filter = transaction.filter;
/**
 * Maps a `Record` with an iterating function that returns an `Option`
 * and it keeps only the `Some` values discarding the `None`s.
 *
 * @example
 * import { filterMap } from "fp-ts/Record"
 * import { option } from "fp-ts"
 *
 * const f = (s: string) => s.length < 4 ? option.some(`${s} is short`): option.none
 * assert.deepStrictEqual(filterMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   a: "foo is short",
 *   b: "bar is short",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var filterMap = transaction.filterMap;
/**
 * Partition a `Record` into two parts according to a `Predicate`.
 *
 * @example
 * import { partition } from "fp-ts/Record"
 *
 * assert.deepStrictEqual(partition((s: string) => s.length < 4)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left:{
 *     c: "verylong"
 *   },
 *   right: {
 *     a: "foo",
 *     b: "bar",
 *   },
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var partition = transaction.partition;
/**
 * Maps a `Record` with a function returning an `Either` and
 * partitions the resulting `Record` into `Left`s and `Right`s.
 *
 * @example
 * import { partitionMap } from "fp-ts/Record"
 * import { either } from "fp-ts"
 *
 * const f = (s: string) => (s.length < 4 ? either.right(`${s} is short`) : either.left(`${s} is not short`));
 * assert.deepStrictEqual(partitionMap(f)({ a: "foo", b: "bar", c: "verylong" }), {
 *   left: {
 *     c: "verylong is not short",
 *   },
 *   right: {
 *     a: "foo is short",
 *     b: "bar is short",
 *   },
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var partitionMap = transaction.partitionMap;
function reduce() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? transaction.reduce(args[0]) : transaction.reduce(transaction.Ord).apply(void 0, args);
}
function foldMap(O) {
    return 'compare' in O ? transaction.foldMap(O) : transaction.foldMap(transaction.Ord)(O);
}
function reduceRight() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.length === 1 ? transaction.reduceRight(args[0]) : transaction.reduceRight(transaction.Ord).apply(void 0, args);
}
/**
 * Compact a `Record` of `Option`s discarding the `None` values and
 * keeping the `Some` values.
 *
 * @example
 * import { compact } from 'fp-ts/Record'
 * import { option } from 'fp-ts'
 *
 * assert.deepStrictEqual(compact({ a: option.some("foo"), b: option.none, c: option.some("bar") }), {
 *   a: "foo",
 *   c: "bar",
 * });
 *
 * @category filtering
 * @since 2.0.0
 */
var compact$1 = transaction.compact;
/**
 * Separate a `Record` of `Either`s into `Left`s and `Right`s.
 *
 * @example
 * import { separate } from 'fp-ts/Record'
 * import { either } from 'fp-ts'
 *
 * assert.deepStrictEqual(
 *   separate({ a: either.right("foo"), b: either.left("bar"), c: either.right("baz") }),
 *   {
 *     right: {
 *       a: "foo",
 *       c: "baz",
 *     },
 *     left: {
 *       b: "bar",
 *     },
 *   }
 * );
 *
 * @category filtering
 * @since 2.0.0
 */
var separate = transaction.separate;
/**
 * @category type lambdas
 * @since 2.0.0
 */
var URI = 'Record';
function getShow(O) {
    return 'compare' in O ? transaction.getShow(O) : transaction.getShow(transaction.Ord)(O);
}
/**
 * Given an `Eq` for the base type, it produces an `Eq`
 * for a `Record` of that base type.
 *
 * @example
 * import { getEq } from "fp-ts/Record";
 * import { string } from "fp-ts";
 * import { Eq } from "fp-ts/Eq";
 *
 * const eq: Eq<Record<string, string>> = getEq(string.Eq);
 * assert.deepStrictEqual(eq.equals({ a: "foo" }, { b: "bar" }), false);
 * assert.deepStrictEqual(eq.equals({ a: "foo" }, { a: "foo" }), true);
 *
 * @category instances
 * @since 2.0.0
 */
var getEq = transaction.getEq;
/**
 * Returns a `Monoid` instance for `Record`s, given a `Semigroup`
 * instance for the base type.
 * The `Monoid` makes the union of two `Record`s comining the
 * overlapping entries with the provided `Semigroup`.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getMonoid } from 'fp-ts/Record'
 *
 * const M = getMonoid(SemigroupSum);
 * assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579 , bar: 234, baz: 567 });
 *
 * @category instances
 * @since 2.0.0
 */
var getMonoid = transaction.getMonoid;
/**
 * @category instances
 * @since 2.7.0
 */
var Functor = {
    URI: URI,
    map: _map
};
/**
 * Takes a value and a `Record` of functions and returns a
 * `Record` by applying each function to the input value.
 *
 * @example
 * import { flap } from "fp-ts/Record"
 *
 * const fab = { x: (n: number) => `${n} times 2`, y: (n: number) => `${n * 2}` };
 * assert.deepStrictEqual(flap(3)(fab), {
 *   x: "3 times 2",
 *   y: "6",
 * });
 *
 * @category mapping
 * @since 2.10.0
 */
var flap = /*#__PURE__*/ index.flap(Functor);
/**
 * @category instances
 * @since 2.7.0
 */
var FunctorWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex
};
/**
 * Produces a `Foldable` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category folding
 * @since 2.11.0
 */
var getFoldable = function (O) { return ({
    URI: URI,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O)
}); };
/**
 * Produces a `FoldableWithIndex1` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category folding
 * @since 2.11.0
 */
var getFoldableWithIndex = function (O) { return ({
    URI: URI,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    reduceWithIndex: _reduceWithIndex(O),
    foldMapWithIndex: _foldMapWithIndex(O),
    reduceRightWithIndex: _reduceRightWithIndex(O)
}); };
/**
 * @category instances
 * @since 2.7.0
 */
var Compactable = {
    URI: URI,
    compact: compact$1,
    separate: separate
};
/**
 * @category instances
 * @since 2.7.0
 */
var Filterable = {
    URI: URI,
    map: _map,
    compact: compact$1,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap
};
/**
 * @category instances
 * @since 2.7.0
 */
var FilterableWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    compact: compact$1,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex
};
/**
 * Produces a `Traversable` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category traversing
 * @since 2.11.0
 */
var getTraversable = function (O) { return ({
    URI: URI,
    map: _map,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    traverse: _traverse(O),
    sequence: _sequence(O)
}); };
/**
 * Produces a `TraversableWithIndex` instance for a `Record`, using the
 * provided `Ord` to sort the `Record`'s entries by key.
 *
 * @category traversing
 * @since 2.11.0
 */
var getTraversableWithIndex = function (O) { return ({
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: _reduce(O),
    foldMap: _foldMap(O),
    reduceRight: _reduceRight(O),
    reduceWithIndex: _reduceWithIndex(O),
    foldMapWithIndex: _foldMapWithIndex(O),
    reduceRightWithIndex: _reduceRightWithIndex(O),
    traverse: _traverse(O),
    sequence: _sequence(O),
    traverseWithIndex: _traverseWithIndex(O)
}); };
/**
 * @category filtering
 * @since 2.11.0
 */
var getWitherable = function (O) {
    var T = getTraversable(O);
    return {
        URI: URI,
        map: _map,
        reduce: _reduce(O),
        foldMap: _foldMap(O),
        reduceRight: _reduceRight(O),
        traverse: T.traverse,
        sequence: T.sequence,
        compact: compact$1,
        separate: separate,
        filter: _filter,
        filterMap: _filterMap,
        partition: _partition,
        partitionMap: _partitionMap,
        wither: index.witherDefault(T, Compactable),
        wilt: index.wiltDefault(T, Compactable)
    };
};
/**
 * Given a `Semigroup` in the base type, it produces a `Semigroup`
 * in the `Record` of the base type.
 * The resulting `Semigroup` concatenates two `Record`s by
 * `union`.
 *
 * @example
 * import { getUnionSemigroup } from "fp-ts/Record"
 * import { Semigroup } from "fp-ts/Semigroup"
 *
 * const sNumber: Semigroup<number> = { concat: (x, y) => x - y };
 * const sRecord: Semigroup<Record<string, number>> = getUnionSemigroup(sNumber);
 * assert.deepStrictEqual(sRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { a: 1, b: -1, c: 4 });
 *
 * @category instances
 * @since 2.11.0
 */
var getUnionSemigroup = function (S) {
    var unionS = union(S);
    return {
        concat: function (first, second) { return unionS(second)(first); }
    };
};
/**
 * Same as `getMonoid`.
 * Returns a `Monoid` instance for `Record`s given a `Semigroup`
 * instance for the base type.
 * The `Monoid` makes the union of two `Record`s combining the
 * entries that have the same key with the provided `Semigroup`.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { getUnionMonoid } from 'fp-ts/Record'
 *
 * const M = getUnionMonoid(SemigroupSum);
 * assert.deepStrictEqual(M.concat({ foo: 123, bar: 234 }, { foo: 456, baz: 567 }), { foo: 579 , bar: 234, baz: 567 });
 *
 * @category instances
 * @since 2.11.0
 */
var getUnionMonoid = function (S) { return ({
    concat: getUnionSemigroup(S).concat,
    empty: {}
}); };
/**
 * Given a `Semigroup` in the base type, it produces a `Semigroup`
 * in the `Record` of the base type.
 * The resulting `Semigroup` concatenates two `Record`s by
 * `intersection`.
 *
 * @example
 * import { getIntersectionSemigroup } from "fp-ts/Record"
 * import { Semigroup } from "fp-ts/Semigroup"
 *
 * const sNumber: Semigroup<number> = { concat: (x, y) => x - y };
 * const sRecord: Semigroup<Record<string, number>> = getIntersectionSemigroup(sNumber);
 * assert.deepStrictEqual(sRecord.concat({ a: 1, b: 2 }, { b: 3, c: 4 }), { b: -1 });
 *
 * @category instances
 * @since 2.11.0
 */
var getIntersectionSemigroup = function (S) {
    var intersectionS = intersection(S);
    return {
        concat: function (first, second) { return intersectionS(second)(first); }
    };
};
/**
 * Produces a `Magma` with a `concat` function that combines
 * two `Record`s by making the `difference`.
 *
 * @example
 * import { getDifferenceMagma, difference } from "fp-ts/Record"
 * import { Magma } from "fp-ts/Magma"
 *
 * const r1 = { a: 3, c: 3 };
 * const r2 = { a: 1, b: 2 };
 * const m: Magma<Record<string, number>> = getDifferenceMagma<number>();
 * assert.deepStrictEqual(m.concat(r1, r2), difference(r2)(r1));
 * assert.deepStrictEqual(m.concat(r1, r2), { c: 3, b: 2 });
 *
 * @category instances
 * @since 2.11.0
 */
var getDifferenceMagma = function () { return ({
    concat: function (first, second) { return difference(second)(first); }
}); };
// -------------------------------------------------------------------------------------
// deprecated
// -------------------------------------------------------------------------------------
/**
 * Use `getFoldable` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var Foldable = {
    URI: URI,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord)
};
/**
 * Use `getFoldableWithIndex` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var FoldableWithIndex = {
    URI: URI,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord),
    reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(transaction.Ord),
    foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(transaction.Ord),
    reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(transaction.Ord)
};
/**
 * Use `getTraversable` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var Traversable = {
    URI: URI,
    map: _map,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord),
    traverse: /*#__PURE__*/ _traverse(transaction.Ord),
    sequence: sequence
};
/**
 * Use the `getTraversableWithIndex` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var TraversableWithIndex = {
    URI: URI,
    map: _map,
    mapWithIndex: _mapWithIndex,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord),
    reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(transaction.Ord),
    foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(transaction.Ord),
    reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(transaction.Ord),
    traverse: /*#__PURE__*/ _traverse(transaction.Ord),
    sequence: sequence,
    traverseWithIndex: /*#__PURE__*/ _traverseWithIndex(transaction.Ord)
};
var _wither = /*#__PURE__*/ index.witherDefault(Traversable, Compactable);
var _wilt = /*#__PURE__*/ index.wiltDefault(Traversable, Compactable);
/**
 * Use `getWitherable` instead.
 *
 * @category zone of death
 * @since 2.7.0
 * @deprecated
 */
var Witherable = {
    URI: URI,
    map: _map,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord),
    traverse: /*#__PURE__*/ _traverse(transaction.Ord),
    sequence: sequence,
    compact: compact$1,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    wither: _wither,
    wilt: _wilt
};
/**
 * Use a new `{}` instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var empty = {};
/**
 * Use [`upsertAt`](#upsertat) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var insertAt = upsertAt;
/**
 * Use [`has`](#has) instead.
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var hasOwnProperty = transaction.hasOwnProperty;
/**
 * This instance is deprecated, use small, specific instances instead.
 * For example if a function needs a `Functor` instance, pass `R.Functor` instead of `R.record`
 * (where `R` is from `import R from 'fp-ts/Record'`)
 *
 * @category zone of death
 * @since 2.0.0
 * @deprecated
 */
var record = {
    URI: URI,
    map: _map,
    reduce: /*#__PURE__*/ _reduce(transaction.Ord),
    foldMap: /*#__PURE__*/ _foldMap(transaction.Ord),
    reduceRight: /*#__PURE__*/ _reduceRight(transaction.Ord),
    traverse: /*#__PURE__*/ _traverse(transaction.Ord),
    sequence: sequence,
    compact: compact$1,
    separate: separate,
    filter: _filter,
    filterMap: _filterMap,
    partition: _partition,
    partitionMap: _partitionMap,
    mapWithIndex: _mapWithIndex,
    reduceWithIndex: /*#__PURE__*/ _reduceWithIndex(transaction.Ord),
    foldMapWithIndex: /*#__PURE__*/ _foldMapWithIndex(transaction.Ord),
    reduceRightWithIndex: /*#__PURE__*/ _reduceRightWithIndex(transaction.Ord),
    filterMapWithIndex: _filterMapWithIndex,
    filterWithIndex: _filterWithIndex,
    partitionMapWithIndex: _partitionMapWithIndex,
    partitionWithIndex: _partitionWithIndex,
    traverseWithIndex: /*#__PURE__*/ _traverseWithIndex(transaction.Ord),
    wither: _wither,
    wilt: _wilt
};

var Record = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Compactable: Compactable,
  Filterable: Filterable,
  FilterableWithIndex: FilterableWithIndex,
  Foldable: Foldable,
  FoldableWithIndex: FoldableWithIndex,
  Functor: Functor,
  FunctorWithIndex: FunctorWithIndex,
  Traversable: Traversable,
  TraversableWithIndex: TraversableWithIndex,
  URI: URI,
  Witherable: Witherable,
  collect: collect,
  compact: compact$1,
  deleteAt: deleteAt,
  difference: difference,
  elem: elem,
  empty: empty,
  every: every,
  filter: filter,
  filterMap: filterMap,
  filterMapWithIndex: filterMapWithIndex,
  filterWithIndex: filterWithIndex,
  flap: flap,
  foldMap: foldMap,
  foldMapWithIndex: foldMapWithIndex,
  fromEntries: fromEntries,
  fromFoldable: fromFoldable,
  fromFoldableMap: fromFoldableMap,
  getDifferenceMagma: getDifferenceMagma,
  getEq: getEq,
  getFoldable: getFoldable,
  getFoldableWithIndex: getFoldableWithIndex,
  getIntersectionSemigroup: getIntersectionSemigroup,
  getMonoid: getMonoid,
  getShow: getShow,
  getTraversable: getTraversable,
  getTraversableWithIndex: getTraversableWithIndex,
  getUnionMonoid: getUnionMonoid,
  getUnionSemigroup: getUnionSemigroup,
  getWitherable: getWitherable,
  has: has$4,
  hasOwnProperty: hasOwnProperty,
  insertAt: insertAt,
  intersection: intersection,
  isEmpty: isEmpty,
  isSubrecord: isSubrecord,
  keys: keys,
  lookup: lookup,
  map: map,
  mapWithIndex: mapWithIndex,
  modifyAt: modifyAt,
  partition: partition,
  partitionMap: partitionMap,
  partitionMapWithIndex: partitionMapWithIndex,
  partitionWithIndex: partitionWithIndex,
  pop: pop,
  record: record,
  reduce: reduce,
  reduceRight: reduceRight,
  reduceRightWithIndex: reduceRightWithIndex,
  reduceWithIndex: reduceWithIndex,
  separate: separate,
  sequence: sequence,
  singleton: singleton,
  size: size,
  some: some,
  toArray: toArray,
  toEntries: toEntries,
  toUnfoldable: toUnfoldable,
  traverse: traverse,
  traverseWithIndex: traverseWithIndex,
  union: union,
  updateAt: updateAt,
  upsertAt: upsertAt,
  wilt: wilt,
  wither: wither
});

var require$$4 = /*@__PURE__*/index.getAugmentedNamespace(Record);

var require$$5 = /*@__PURE__*/index.getAugmentedNamespace(index.pipeable);

var jsonBigint = {exports: {}};

var stringify$2 = {exports: {}};

var bignumber = {exports: {}};

(function (module) {
(function (globalObject) {

	/*
	 *      bignumber.js v9.1.2
	 *      A JavaScript library for arbitrary-precision arithmetic.
	 *      https://github.com/MikeMcl/bignumber.js
	 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
	 *      MIT Licensed.
	 *
	 *      BigNumber.prototype methods     |  BigNumber methods
	 *                                      |
	 *      absoluteValue            abs    |  clone
	 *      comparedTo                      |  config               set
	 *      decimalPlaces            dp     |      DECIMAL_PLACES
	 *      dividedBy                div    |      ROUNDING_MODE
	 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
	 *      exponentiatedBy          pow    |      RANGE
	 *      integerValue                    |      CRYPTO
	 *      isEqualTo                eq     |      MODULO_MODE
	 *      isFinite                        |      POW_PRECISION
	 *      isGreaterThan            gt     |      FORMAT
	 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
	 *      isInteger                       |  isBigNumber
	 *      isLessThan               lt     |  maximum              max
	 *      isLessThanOrEqualTo      lte    |  minimum              min
	 *      isNaN                           |  random
	 *      isNegative                      |  sum
	 *      isPositive                      |
	 *      isZero                          |
	 *      minus                           |
	 *      modulo                   mod    |
	 *      multipliedBy             times  |
	 *      negated                         |
	 *      plus                            |
	 *      precision                sd     |
	 *      shiftedBy                       |
	 *      squareRoot               sqrt   |
	 *      toExponential                   |
	 *      toFixed                         |
	 *      toFormat                        |
	 *      toFraction                      |
	 *      toJSON                          |
	 *      toNumber                        |
	 *      toPrecision                     |
	 *      toString                        |
	 *      valueOf                         |
	 *
	 */


	  var BigNumber,
	    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
	    mathceil = Math.ceil,
	    mathfloor = Math.floor,

	    bignumberError = '[BigNumber Error] ',
	    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

	    BASE = 1e14,
	    LOG_BASE = 14,
	    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	    SQRT_BASE = 1e7,

	    // EDITABLE
	    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
	    MAX = 1E9;                                   // 0 to MAX_INT32


	  /*
	   * Create and return a BigNumber constructor.
	   */
	  function clone(configObject) {
	    var div, convertBase, parseNumeric,
	      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
	      ONE = new BigNumber(1),


	      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


	      // The default values below must be integers within the inclusive ranges stated.
	      // The values can also be changed at run-time using BigNumber.set.

	      // The maximum number of decimal places for operations involving division.
	      DECIMAL_PLACES = 20,                     // 0 to MAX

	      // The rounding mode used when rounding to the above decimal places, and when using
	      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
	      // UP         0 Away from zero.
	      // DOWN       1 Towards zero.
	      // CEIL       2 Towards +Infinity.
	      // FLOOR      3 Towards -Infinity.
	      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      ROUNDING_MODE = 4,                       // 0 to 8

	      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	      // The exponent value at and beneath which toString returns exponential notation.
	      // Number type: -7
	      TO_EXP_NEG = -7,                         // 0 to -MAX

	      // The exponent value at and above which toString returns exponential notation.
	      // Number type: 21
	      TO_EXP_POS = 21,                         // 0 to MAX

	      // RANGE : [MIN_EXP, MAX_EXP]

	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // Number type: -324  (5e-324)
	      MIN_EXP = -1e7,                          // -1 to -MAX

	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // Number type:  308  (1.7976931348623157e+308)
	      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	      MAX_EXP = 1e7,                           // 1 to MAX

	      // Whether to use cryptographically-secure random number generation, if available.
	      CRYPTO = false,                          // true or false

	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP        0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN      1 The remainder has the same sign as the dividend.
	      //             This modulo mode is commonly known as 'truncated division' and is
	      //             equivalent to (a % n) in JavaScript.
	      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	      //             The remainder is always positive.
	      //
	      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
	      // modes are commonly used for the modulus operation.
	      // Although the other rounding modes can also be used, they may not give useful results.
	      MODULO_MODE = 1,                         // 0 to 9

	      // The maximum number of significant digits of the result of the exponentiatedBy operation.
	      // If POW_PRECISION is 0, there will be unlimited significant digits.
	      POW_PRECISION = 0,                       // 0 to MAX

	      // The format specification used by the BigNumber.prototype.toFormat method.
	      FORMAT = {
	        prefix: '',
	        groupSize: 3,
	        secondaryGroupSize: 0,
	        groupSeparator: ',',
	        decimalSeparator: '.',
	        fractionGroupSize: 0,
	        fractionGroupSeparator: '\xA0',        // non-breaking space
	        suffix: ''
	      },

	      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
	      // '-', '.', whitespace, or repeated character.
	      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
	      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
	      alphabetHasNormalDecimalDigits = true;


	    //------------------------------------------------------------------------------------------


	    // CONSTRUCTOR


	    /*
	     * The BigNumber constructor and exported function.
	     * Create and return a new instance of a BigNumber object.
	     *
	     * v {number|string|BigNumber} A numeric value.
	     * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
	     */
	    function BigNumber(v, b) {
	      var alphabet, c, caseChanged, e, i, isNum, len, str,
	        x = this;

	      // Enable constructor call without `new`.
	      if (!(x instanceof BigNumber)) return new BigNumber(v, b);

	      if (b == null) {

	        if (v && v._isBigNumber === true) {
	          x.s = v.s;

	          if (!v.c || v.e > MAX_EXP) {
	            x.c = x.e = null;
	          } else if (v.e < MIN_EXP) {
	            x.c = [x.e = 0];
	          } else {
	            x.e = v.e;
	            x.c = v.c.slice();
	          }

	          return;
	        }

	        if ((isNum = typeof v == 'number') && v * 0 == 0) {

	          // Use `1 / n` to handle minus zero also.
	          x.s = 1 / v < 0 ? (v = -v, -1) : 1;

	          // Fast path for integers, where n < 2147483648 (2**31).
	          if (v === ~~v) {
	            for (e = 0, i = v; i >= 10; i /= 10, e++);

	            if (e > MAX_EXP) {
	              x.c = x.e = null;
	            } else {
	              x.e = e;
	              x.c = [v];
	            }

	            return;
	          }

	          str = String(v);
	        } else {

	          if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

	          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
	        }

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	        // Exponential form?
	        if ((i = str.search(/e/i)) > 0) {

	          // Determine exponent.
	          if (e < 0) e = i;
	          e += +str.slice(i + 1);
	          str = str.substring(0, i);
	        } else if (e < 0) {

	          // Integer.
	          e = str.length;
	        }

	      } else {

	        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	        intCheck(b, 2, ALPHABET.length, 'Base');

	        // Allow exponential notation to be used with base 10 argument, while
	        // also rounding to DECIMAL_PLACES as with other bases.
	        if (b == 10 && alphabetHasNormalDecimalDigits) {
	          x = new BigNumber(v);
	          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
	        }

	        str = String(v);

	        if (isNum = typeof v == 'number') {

	          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	          if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

	          x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

	          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
	            throw Error
	             (tooManyDigits + v);
	          }
	        } else {
	          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
	        }

	        alphabet = ALPHABET.slice(0, b);
	        e = i = 0;

	        // Check that str is a valid base b number.
	        // Don't use RegExp, so alphabet can contain special characters.
	        for (len = str.length; i < len; i++) {
	          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
	            if (c == '.') {

	              // If '.' is not the first character and it has not be found before.
	              if (i > e) {
	                e = len;
	                continue;
	              }
	            } else if (!caseChanged) {

	              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
	              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
	                  str == str.toLowerCase() && (str = str.toUpperCase())) {
	                caseChanged = true;
	                i = -1;
	                e = 0;
	                continue;
	              }
	            }

	            return parseNumeric(x, String(v), isNum, b);
	          }
	        }

	        // Prevent later check for length on converted number.
	        isNum = false;
	        str = convertBase(str, b, 10, x.s);

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
	        else e = str.length;
	      }

	      // Determine leading zeros.
	      for (i = 0; str.charCodeAt(i) === 48; i++);

	      // Determine trailing zeros.
	      for (len = str.length; str.charCodeAt(--len) === 48;);

	      if (str = str.slice(i, ++len)) {
	        len -= i;

	        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	        if (isNum && BigNumber.DEBUG &&
	          len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
	            throw Error
	             (tooManyDigits + (x.s * v));
	        }

	         // Overflow?
	        if ((e = e - i - 1) > MAX_EXP) {

	          // Infinity.
	          x.c = x.e = null;

	        // Underflow?
	        } else if (e < MIN_EXP) {

	          // Zero.
	          x.c = [x.e = 0];
	        } else {
	          x.e = e;
	          x.c = [];

	          // Transform base

	          // e is the base 10 exponent.
	          // i is where to slice str to get the first element of the coefficient array.
	          i = (e + 1) % LOG_BASE;
	          if (e < 0) i += LOG_BASE;  // i < 1

	          if (i < len) {
	            if (i) x.c.push(+str.slice(0, i));

	            for (len -= LOG_BASE; i < len;) {
	              x.c.push(+str.slice(i, i += LOG_BASE));
	            }

	            i = LOG_BASE - (str = str.slice(i)).length;
	          } else {
	            i -= len;
	          }

	          for (; i--; str += '0');
	          x.c.push(+str);
	        }
	      } else {

	        // Zero.
	        x.c = [x.e = 0];
	      }
	    }


	    // CONSTRUCTOR PROPERTIES


	    BigNumber.clone = clone;

	    BigNumber.ROUND_UP = 0;
	    BigNumber.ROUND_DOWN = 1;
	    BigNumber.ROUND_CEIL = 2;
	    BigNumber.ROUND_FLOOR = 3;
	    BigNumber.ROUND_HALF_UP = 4;
	    BigNumber.ROUND_HALF_DOWN = 5;
	    BigNumber.ROUND_HALF_EVEN = 6;
	    BigNumber.ROUND_HALF_CEIL = 7;
	    BigNumber.ROUND_HALF_FLOOR = 8;
	    BigNumber.EUCLID = 9;


	    /*
	     * Configure infrequently-changing library-wide settings.
	     *
	     * Accept an object with the following optional properties (if the value of a property is
	     * a number, it must be an integer within the inclusive range stated):
	     *
	     *   DECIMAL_PLACES   {number}           0 to MAX
	     *   ROUNDING_MODE    {number}           0 to 8
	     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
	     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
	     *   CRYPTO           {boolean}          true or false
	     *   MODULO_MODE      {number}           0 to 9
	     *   POW_PRECISION       {number}           0 to MAX
	     *   ALPHABET         {string}           A string of two or more unique characters which does
	     *                                       not contain '.'.
	     *   FORMAT           {object}           An object with some of the following properties:
	     *     prefix                 {string}
	     *     groupSize              {number}
	     *     secondaryGroupSize     {number}
	     *     groupSeparator         {string}
	     *     decimalSeparator       {string}
	     *     fractionGroupSize      {number}
	     *     fractionGroupSeparator {string}
	     *     suffix                 {string}
	     *
	     * (The values assigned to the above FORMAT object properties are not checked for validity.)
	     *
	     * E.g.
	     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	     *
	     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
	     *
	     * Return an object with the properties current values.
	     */
	    BigNumber.config = BigNumber.set = function (obj) {
	      var p, v;

	      if (obj != null) {

	        if (typeof obj == 'object') {

	          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            DECIMAL_PLACES = v;
	          }

	          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 8, p);
	            ROUNDING_MODE = v;
	          }

	          // EXPONENTIAL_AT {number|number[]}
	          // Integer, -MAX to MAX inclusive or
	          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, 0, p);
	              intCheck(v[1], 0, MAX, p);
	              TO_EXP_NEG = v[0];
	              TO_EXP_POS = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
	            }
	          }

	          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
	          if (obj.hasOwnProperty(p = 'RANGE')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, -1, p);
	              intCheck(v[1], 1, MAX, p);
	              MIN_EXP = v[0];
	              MAX_EXP = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              if (v) {
	                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
	              } else {
	                throw Error
	                 (bignumberError + p + ' cannot be zero: ' + v);
	              }
	            }
	          }

	          // CRYPTO {boolean} true or false.
	          // '[BigNumber Error] CRYPTO not true or false: {v}'
	          // '[BigNumber Error] crypto unavailable'
	          if (obj.hasOwnProperty(p = 'CRYPTO')) {
	            v = obj[p];
	            if (v === !!v) {
	              if (v) {
	                if (typeof crypto != 'undefined' && crypto &&
	                 (crypto.getRandomValues || crypto.randomBytes)) {
	                  CRYPTO = v;
	                } else {
	                  CRYPTO = !v;
	                  throw Error
	                   (bignumberError + 'crypto unavailable');
	                }
	              } else {
	                CRYPTO = v;
	              }
	            } else {
	              throw Error
	               (bignumberError + p + ' not true or false: ' + v);
	            }
	          }

	          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 9, p);
	            MODULO_MODE = v;
	          }

	          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            POW_PRECISION = v;
	          }

	          // FORMAT {object}
	          // '[BigNumber Error] FORMAT not an object: {v}'
	          if (obj.hasOwnProperty(p = 'FORMAT')) {
	            v = obj[p];
	            if (typeof v == 'object') FORMAT = v;
	            else throw Error
	             (bignumberError + p + ' not an object: ' + v);
	          }

	          // ALPHABET {string}
	          // '[BigNumber Error] ALPHABET invalid: {v}'
	          if (obj.hasOwnProperty(p = 'ALPHABET')) {
	            v = obj[p];

	            // Disallow if less than two characters,
	            // or if it contains '+', '-', '.', whitespace, or a repeated character.
	            if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
	              alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
	              ALPHABET = v;
	            } else {
	              throw Error
	               (bignumberError + p + ' invalid: ' + v);
	            }
	          }

	        } else {

	          // '[BigNumber Error] Object expected: {v}'
	          throw Error
	           (bignumberError + 'Object expected: ' + obj);
	        }
	      }

	      return {
	        DECIMAL_PLACES: DECIMAL_PLACES,
	        ROUNDING_MODE: ROUNDING_MODE,
	        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
	        RANGE: [MIN_EXP, MAX_EXP],
	        CRYPTO: CRYPTO,
	        MODULO_MODE: MODULO_MODE,
	        POW_PRECISION: POW_PRECISION,
	        FORMAT: FORMAT,
	        ALPHABET: ALPHABET
	      };
	    };


	    /*
	     * Return true if v is a BigNumber instance, otherwise return false.
	     *
	     * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
	     *
	     * v {any}
	     *
	     * '[BigNumber Error] Invalid BigNumber: {v}'
	     */
	    BigNumber.isBigNumber = function (v) {
	      if (!v || v._isBigNumber !== true) return false;
	      if (!BigNumber.DEBUG) return true;

	      var i, n,
	        c = v.c,
	        e = v.e,
	        s = v.s;

	      out: if ({}.toString.call(c) == '[object Array]') {

	        if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

	          // If the first element is zero, the BigNumber value must be zero.
	          if (c[0] === 0) {
	            if (e === 0 && c.length === 1) return true;
	            break out;
	          }

	          // Calculate number of digits that c[0] should have, based on the exponent.
	          i = (e + 1) % LOG_BASE;
	          if (i < 1) i += LOG_BASE;

	          // Calculate number of digits of c[0].
	          //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
	          if (String(c[0]).length == i) {

	            for (i = 0; i < c.length; i++) {
	              n = c[i];
	              if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
	            }

	            // Last element cannot be zero, unless it is the only element.
	            if (n !== 0) return true;
	          }
	        }

	      // Infinity/NaN
	      } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
	        return true;
	      }

	      throw Error
	        (bignumberError + 'Invalid BigNumber: ' + v);
	    };


	    /*
	     * Return a new BigNumber whose value is the maximum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.maximum = BigNumber.max = function () {
	      return maxOrMin(arguments, -1);
	    };


	    /*
	     * Return a new BigNumber whose value is the minimum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.minimum = BigNumber.min = function () {
	      return maxOrMin(arguments, 1);
	    };


	    /*
	     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	     * zeros are produced).
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
	     * '[BigNumber Error] crypto unavailable'
	     */
	    BigNumber.random = (function () {
	      var pow2_53 = 0x20000000000000;

	      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	      // Check if Math.random() produces more than 32 bits of randomness.
	      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	       ? function () { return mathfloor(Math.random() * pow2_53); }
	       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	         (Math.random() * 0x800000 | 0); };

	      return function (dp) {
	        var a, b, e, k, v,
	          i = 0,
	          c = [],
	          rand = new BigNumber(ONE);

	        if (dp == null) dp = DECIMAL_PLACES;
	        else intCheck(dp, 0, MAX);

	        k = mathceil(dp / LOG_BASE);

	        if (CRYPTO) {

	          // Browsers supporting crypto.getRandomValues.
	          if (crypto.getRandomValues) {

	            a = crypto.getRandomValues(new Uint32Array(k *= 2));

	            for (; i < k;) {

	              // 53 bits:
	              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	              //                                     11111 11111111 11111111
	              // 0x20000 is 2^21.
	              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

	              // Rejection sampling:
	              // 0 <= v < 9007199254740992
	              // Probability that v >= 9e15, is
	              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	              if (v >= 9e15) {
	                b = crypto.getRandomValues(new Uint32Array(2));
	                a[i] = b[0];
	                a[i + 1] = b[1];
	              } else {

	                // 0 <= v <= 8999999999999999
	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 2;
	              }
	            }
	            i = k / 2;

	          // Node.js supporting crypto.randomBytes.
	          } else if (crypto.randomBytes) {

	            // buffer
	            a = crypto.randomBytes(k *= 7);

	            for (; i < k;) {

	              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	              // 0x100000000 is 2^32, 0x1000000 is 2^24
	              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	              // 0 <= v < 9007199254740992
	              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
	                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
	                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

	              if (v >= 9e15) {
	                crypto.randomBytes(7).copy(a, i);
	              } else {

	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 7;
	              }
	            }
	            i = k / 7;
	          } else {
	            CRYPTO = false;
	            throw Error
	             (bignumberError + 'crypto unavailable');
	          }
	        }

	        // Use Math.random.
	        if (!CRYPTO) {

	          for (; i < k;) {
	            v = random53bitInt();
	            if (v < 9e15) c[i++] = v % 1e14;
	          }
	        }

	        k = c[--i];
	        dp %= LOG_BASE;

	        // Convert trailing digits to zeros according to dp.
	        if (k && dp) {
	          v = POWS_TEN[LOG_BASE - dp];
	          c[i] = mathfloor(k / v) * v;
	        }

	        // Remove trailing elements which are zero.
	        for (; c[i] === 0; c.pop(), i--);

	        // Zero?
	        if (i < 0) {
	          c = [e = 0];
	        } else {

	          // Remove leading elements which are zero and adjust exponent accordingly.
	          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

	          // Count the digits of the first element of c to determine leading zeros, and...
	          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

	          // adjust the exponent accordingly.
	          if (i < LOG_BASE) e -= LOG_BASE - i;
	        }

	        rand.e = e;
	        rand.c = c;
	        return rand;
	      };
	    })();


	    /*
	     * Return a BigNumber whose value is the sum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.sum = function () {
	      var i = 1,
	        args = arguments,
	        sum = new BigNumber(args[0]);
	      for (; i < args.length;) sum = sum.plus(args[i++]);
	      return sum;
	    };


	    // PRIVATE FUNCTIONS


	    // Called by BigNumber and BigNumber.prototype.toString.
	    convertBase = (function () {
	      var decimal = '0123456789';

	      /*
	       * Convert string of baseIn to an array of numbers of baseOut.
	       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
	       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
	       */
	      function toBaseOut(str, baseIn, baseOut, alphabet) {
	        var j,
	          arr = [0],
	          arrL,
	          i = 0,
	          len = str.length;

	        for (; i < len;) {
	          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

	          arr[0] += alphabet.indexOf(str.charAt(i++));

	          for (j = 0; j < arr.length; j++) {

	            if (arr[j] > baseOut - 1) {
	              if (arr[j + 1] == null) arr[j + 1] = 0;
	              arr[j + 1] += arr[j] / baseOut | 0;
	              arr[j] %= baseOut;
	            }
	          }
	        }

	        return arr.reverse();
	      }

	      // Convert a numeric string of baseIn to a numeric string of baseOut.
	      // If the caller is toString, we are converting from base 10 to baseOut.
	      // If the caller is BigNumber, we are converting from baseIn to base 10.
	      return function (str, baseIn, baseOut, sign, callerIsToString) {
	        var alphabet, d, e, k, r, x, xc, y,
	          i = str.indexOf('.'),
	          dp = DECIMAL_PLACES,
	          rm = ROUNDING_MODE;

	        // Non-integer.
	        if (i >= 0) {
	          k = POW_PRECISION;

	          // Unlimited precision.
	          POW_PRECISION = 0;
	          str = str.replace('.', '');
	          y = new BigNumber(baseIn);
	          x = y.pow(str.length - i);
	          POW_PRECISION = k;

	          // Convert str as if an integer, then restore the fraction part by dividing the
	          // result by its base raised to a power.

	          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
	           10, baseOut, decimal);
	          y.e = y.c.length;
	        }

	        // Convert the number as integer.

	        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
	         ? (alphabet = ALPHABET, decimal)
	         : (alphabet = decimal, ALPHABET));

	        // xc now represents str as an integer and converted to baseOut. e is the exponent.
	        e = k = xc.length;

	        // Remove trailing zeros.
	        for (; xc[--k] == 0; xc.pop());

	        // Zero?
	        if (!xc[0]) return alphabet.charAt(0);

	        // Does str represent an integer? If so, no need for the division.
	        if (i < 0) {
	          --e;
	        } else {
	          x.c = xc;
	          x.e = e;

	          // The sign is needed for correct rounding.
	          x.s = sign;
	          x = div(x, y, dp, rm, baseOut);
	          xc = x.c;
	          r = x.r;
	          e = x.e;
	        }

	        // xc now represents str converted to baseOut.

	        // THe index of the rounding digit.
	        d = e + dp + 1;

	        // The rounding digit: the digit to the right of the digit that may be rounded up.
	        i = xc[d];

	        // Look at the rounding digits and mode to determine whether to round up.

	        k = baseOut / 2;
	        r = r || d < 0 || xc[d + 1] != null;

	        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	               rm == (x.s < 0 ? 8 : 7));

	        // If the index of the rounding digit is not greater than zero, or xc represents
	        // zero, then the result of the base conversion is zero or, if rounding up, a value
	        // such as 0.00001.
	        if (d < 1 || !xc[0]) {

	          // 1^-dp or 0
	          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
	        } else {

	          // Truncate xc to the required number of decimal places.
	          xc.length = d;

	          // Round up?
	          if (r) {

	            // Rounding up may mean the previous digit has to be rounded up and so on.
	            for (--baseOut; ++xc[--d] > baseOut;) {
	              xc[d] = 0;

	              if (!d) {
	                ++e;
	                xc = [1].concat(xc);
	              }
	            }
	          }

	          // Determine trailing zeros.
	          for (k = xc.length; !xc[--k];);

	          // E.g. [4, 11, 15] becomes 4bf.
	          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

	          // Add leading zeros, decimal point and trailing zeros as required.
	          str = toFixedPoint(str, e, alphabet.charAt(0));
	        }

	        // The caller will add the sign.
	        return str;
	      };
	    })();


	    // Perform division in the specified base. Called by div and convertBase.
	    div = (function () {

	      // Assume non-zero x and k.
	      function multiply(x, k, base) {
	        var m, temp, xlo, xhi,
	          carry = 0,
	          i = x.length,
	          klo = k % SQRT_BASE,
	          khi = k / SQRT_BASE | 0;

	        for (x = x.slice(); i--;) {
	          xlo = x[i] % SQRT_BASE;
	          xhi = x[i] / SQRT_BASE | 0;
	          m = khi * xlo + xhi * klo;
	          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
	          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
	          x[i] = temp % base;
	        }

	        if (carry) x = [carry].concat(x);

	        return x;
	      }

	      function compare(a, b, aL, bL) {
	        var i, cmp;

	        if (aL != bL) {
	          cmp = aL > bL ? 1 : -1;
	        } else {

	          for (i = cmp = 0; i < aL; i++) {

	            if (a[i] != b[i]) {
	              cmp = a[i] > b[i] ? 1 : -1;
	              break;
	            }
	          }
	        }

	        return cmp;
	      }

	      function subtract(a, b, aL, base) {
	        var i = 0;

	        // Subtract b from a.
	        for (; aL--;) {
	          a[aL] -= i;
	          i = a[aL] < b[aL] ? 1 : 0;
	          a[aL] = i * base + a[aL] - b[aL];
	        }

	        // Remove leading zeros.
	        for (; !a[0] && a.length > 1; a.splice(0, 1));
	      }

	      // x: dividend, y: divisor.
	      return function (x, y, dp, rm, base) {
	        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	          yL, yz,
	          s = x.s == y.s ? 1 : -1,
	          xc = x.c,
	          yc = y.c;

	        // Either NaN, Infinity or 0?
	        if (!xc || !xc[0] || !yc || !yc[0]) {

	          return new BigNumber(

	           // Return NaN if either NaN, or both Infinity or 0.
	           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

	            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
	            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	         );
	        }

	        q = new BigNumber(s);
	        qc = q.c = [];
	        e = x.e - y.e;
	        s = dp + e + 1;

	        if (!base) {
	          base = BASE;
	          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
	          s = s / LOG_BASE | 0;
	        }

	        // Result exponent may be one less then the current value of e.
	        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	        for (i = 0; yc[i] == (xc[i] || 0); i++);

	        if (yc[i] > (xc[i] || 0)) e--;

	        if (s < 0) {
	          qc.push(1);
	          more = true;
	        } else {
	          xL = xc.length;
	          yL = yc.length;
	          i = 0;
	          s += 2;

	          // Normalise xc and yc so highest order digit of yc is >= base / 2.

	          n = mathfloor(base / (yc[0] + 1));

	          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
	          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
	          if (n > 1) {
	            yc = multiply(yc, n, base);
	            xc = multiply(xc, n, base);
	            yL = yc.length;
	            xL = xc.length;
	          }

	          xi = yL;
	          rem = xc.slice(0, yL);
	          remL = rem.length;

	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL; rem[remL++] = 0);
	          yz = yc.slice();
	          yz = [0].concat(yz);
	          yc0 = yc[0];
	          if (yc[1] >= base / 2) yc0++;
	          // Not necessary, but to prevent trial digit n > base, when using base 3.
	          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

	          do {
	            n = 0;

	            // Compare divisor and remainder.
	            cmp = compare(yc, rem, yL, remL);

	            // If divisor < remainder.
	            if (cmp < 0) {

	              // Calculate trial digit, n.

	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	              // n is how many times the divisor goes into the current remainder.
	              n = mathfloor(rem0 / yc0);

	              //  Algorithm:
	              //  product = divisor multiplied by trial digit (n).
	              //  Compare product and remainder.
	              //  If product is greater than remainder:
	              //    Subtract divisor from product, decrement trial digit.
	              //  Subtract product from remainder.
	              //  If product was less than remainder at the last compare:
	              //    Compare new remainder and divisor.
	              //    If remainder is greater than divisor:
	              //      Subtract divisor from remainder, increment trial digit.

	              if (n > 1) {

	                // n may be > base only when base is 3.
	                if (n >= base) n = base - 1;

	                // product = divisor * trial digit.
	                prod = multiply(yc, n, base);
	                prodL = prod.length;
	                remL = rem.length;

	                // Compare product and remainder.
	                // If product > remainder then trial digit n too high.
	                // n is 1 too high about 5% of the time, and is not known to have
	                // ever been more than 1 too high.
	                while (compare(prod, rem, prodL, remL) == 1) {
	                  n--;

	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
	                  prodL = prod.length;
	                  cmp = 1;
	                }
	              } else {

	                // n is 0 or 1, cmp is -1.
	                // If n is 0, there is no need to compare yc and rem again below,
	                // so change cmp to 1 to avoid it.
	                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                if (n == 0) {

	                  // divisor < remainder, so n must be at least 1.
	                  cmp = n = 1;
	                }

	                // product = divisor
	                prod = yc.slice();
	                prodL = prod.length;
	              }

	              if (prodL < remL) prod = [0].concat(prod);

	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);
	              remL = rem.length;

	               // If product was < remainder.
	              if (cmp == -1) {

	                // Compare divisor and new remainder.
	                // If divisor < new remainder, subtract divisor from remainder.
	                // Trial digit n too low.
	                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                while (compare(yc, rem, yL, remL) < 1) {
	                  n++;

	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yc, remL, base);
	                  remL = rem.length;
	                }
	              }
	            } else if (cmp === 0) {
	              n++;
	              rem = [0];
	            } // else cmp === 1 and n will be 0

	            // Add the next digit, n, to the result array.
	            qc[i++] = n;

	            // Update the remainder.
	            if (rem[0]) {
	              rem[remL++] = xc[xi] || 0;
	            } else {
	              rem = [xc[xi]];
	              remL = 1;
	            }
	          } while ((xi++ < xL || rem[0] != null) && s--);

	          more = rem[0] != null;

	          // Leading zero?
	          if (!qc[0]) qc.splice(0, 1);
	        }

	        if (base == BASE) {

	          // To calculate q.e, first get the number of digits of qc[0].
	          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

	          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

	        // Caller is convertBase.
	        } else {
	          q.e = e;
	          q.r = +more;
	        }

	        return q;
	      };
	    })();


	    /*
	     * Return a string representing the value of BigNumber n in fixed-point or exponential
	     * notation rounded to the specified decimal places or significant digits.
	     *
	     * n: a BigNumber.
	     * i: the index of the last digit required (i.e. the digit that may be rounded up).
	     * rm: the rounding mode.
	     * id: 1 (toExponential) or 2 (toPrecision).
	     */
	    function format(n, i, rm, id) {
	      var c0, e, ne, len, str;

	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);

	      if (!n.c) return n.toString();

	      c0 = n.c[0];
	      ne = n.e;

	      if (i == null) {
	        str = coeffToString(n.c);
	        str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
	         ? toExponential(str, ne)
	         : toFixedPoint(str, ne, '0');
	      } else {
	        n = round(new BigNumber(n), i, rm);

	        // n.e may have changed if the value was rounded up.
	        e = n.e;

	        str = coeffToString(n.c);
	        len = str.length;

	        // toPrecision returns exponential notation if the number of significant digits
	        // specified is less than the number of digits necessary to represent the integer
	        // part of the value in fixed-point notation.

	        // Exponential notation.
	        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

	          // Append zeros?
	          for (; len < i; str += '0', len++);
	          str = toExponential(str, e);

	        // Fixed-point notation.
	        } else {
	          i -= ne;
	          str = toFixedPoint(str, e, '0');

	          // Append zeros?
	          if (e + 1 > len) {
	            if (--i > 0) for (str += '.'; i--; str += '0');
	          } else {
	            i += e - len;
	            if (i > 0) {
	              if (e + 1 == len) str += '.';
	              for (; i--; str += '0');
	            }
	          }
	        }
	      }

	      return n.s < 0 && c0 ? '-' + str : str;
	    }


	    // Handle BigNumber.max and BigNumber.min.
	    // If any number is NaN, return NaN.
	    function maxOrMin(args, n) {
	      var k, y,
	        i = 1,
	        x = new BigNumber(args[0]);

	      for (; i < args.length; i++) {
	        y = new BigNumber(args[i]);
	        if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
	          x = y;
	        }
	      }

	      return x;
	    }


	    /*
	     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	     * Called by minus, plus and times.
	     */
	    function normalise(n, c, e) {
	      var i = 1,
	        j = c.length;

	       // Remove trailing zeros.
	      for (; !c[--j]; c.pop());

	      // Calculate the base 10 exponent. First get the number of digits of c[0].
	      for (j = c[0]; j >= 10; j /= 10, i++);

	      // Overflow?
	      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

	        // Infinity.
	        n.c = n.e = null;

	      // Underflow?
	      } else if (e < MIN_EXP) {

	        // Zero.
	        n.c = [n.e = 0];
	      } else {
	        n.e = e;
	        n.c = c;
	      }

	      return n;
	    }


	    // Handle values that fail the validity test in BigNumber.
	    parseNumeric = (function () {
	      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	        dotAfter = /^([^.]+)\.$/,
	        dotBefore = /^\.([^.]+)$/,
	        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

	      return function (x, str, isNum, b) {
	        var base,
	          s = isNum ? str : str.replace(whitespaceOrPlus, '');

	        // No exception on ±Infinity or NaN.
	        if (isInfinityOrNaN.test(s)) {
	          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	        } else {
	          if (!isNum) {

	            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	            s = s.replace(basePrefix, function (m, p1, p2) {
	              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	              return !b || b == base ? p1 : m;
	            });

	            if (b) {
	              base = b;

	              // E.g. '1.' to '1', '.1' to '0.1'
	              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
	            }

	            if (str != s) return new BigNumber(s, base);
	          }

	          // '[BigNumber Error] Not a number: {n}'
	          // '[BigNumber Error] Not a base {b} number: {n}'
	          if (BigNumber.DEBUG) {
	            throw Error
	              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
	          }

	          // NaN
	          x.s = null;
	        }

	        x.c = x.e = null;
	      }
	    })();


	    /*
	     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	     * If r is truthy, it is known that there are more digits after the rounding digit.
	     */
	    function round(x, sd, rm, r) {
	      var d, i, j, k, n, ni, rd,
	        xc = x.c,
	        pows10 = POWS_TEN;

	      // if x is not Infinity or NaN...
	      if (xc) {

	        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	        // n is a base 1e14 number, the value of the element of array x.c containing rd.
	        // ni is the index of n within x.c.
	        // d is the number of digits of n.
	        // i is the index of rd within n including leading zeros.
	        // j is the actual index of rd within n (if < 0, rd is a leading zero).
	        out: {

	          // Get the number of digits of the first element of xc.
	          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
	          i = sd - d;

	          // If the rounding digit is in the first element of xc...
	          if (i < 0) {
	            i += LOG_BASE;
	            j = sd;
	            n = xc[ni = 0];

	            // Get the rounding digit at index j of n.
	            rd = mathfloor(n / pows10[d - j - 1] % 10);
	          } else {
	            ni = mathceil((i + 1) / LOG_BASE);

	            if (ni >= xc.length) {

	              if (r) {

	                // Needed by sqrt.
	                for (; xc.length <= ni; xc.push(0));
	                n = rd = 0;
	                d = 1;
	                i %= LOG_BASE;
	                j = i - LOG_BASE + 1;
	              } else {
	                break out;
	              }
	            } else {
	              n = k = xc[ni];

	              // Get the number of digits of n.
	              for (d = 1; k >= 10; k /= 10, d++);

	              // Get the index of rd within n.
	              i %= LOG_BASE;

	              // Get the index of rd within n, adjusted for leading zeros.
	              // The number of leading zeros of n is given by LOG_BASE - d.
	              j = i - LOG_BASE + d;

	              // Get the rounding digit at index j of n.
	              rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
	            }
	          }

	          r = r || sd < 0 ||

	          // Are there any non-zero digits after the rounding digit?
	          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
	          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

	          r = rm < 4
	           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

	            // Check whether the digit to the left of the rounding digit is odd.
	            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
	             rm == (x.s < 0 ? 8 : 7));

	          if (sd < 1 || !xc[0]) {
	            xc.length = 0;

	            if (r) {

	              // Convert sd to decimal places.
	              sd -= x.e + 1;

	              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
	              x.e = -sd || 0;
	            } else {

	              // Zero.
	              xc[0] = x.e = 0;
	            }

	            return x;
	          }

	          // Remove excess digits.
	          if (i == 0) {
	            xc.length = ni;
	            k = 1;
	            ni--;
	          } else {
	            xc.length = ni + 1;
	            k = pows10[LOG_BASE - i];

	            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	            // j > 0 means i > number of leading zeros of n.
	            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
	          }

	          // Round up?
	          if (r) {

	            for (; ;) {

	              // If the digit to be rounded up is in the first element of xc...
	              if (ni == 0) {

	                // i will be the length of xc[0] before k is added.
	                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
	                j = xc[0] += k;
	                for (k = 1; j >= 10; j /= 10, k++);

	                // if i != k the length has increased.
	                if (i != k) {
	                  x.e++;
	                  if (xc[0] == BASE) xc[0] = 1;
	                }

	                break;
	              } else {
	                xc[ni] += k;
	                if (xc[ni] != BASE) break;
	                xc[ni--] = 0;
	                k = 1;
	              }
	            }
	          }

	          // Remove trailing zeros.
	          for (i = xc.length; xc[--i] === 0; xc.pop());
	        }

	        // Overflow? Infinity.
	        if (x.e > MAX_EXP) {
	          x.c = x.e = null;

	        // Underflow? Zero.
	        } else if (x.e < MIN_EXP) {
	          x.c = [x.e = 0];
	        }
	      }

	      return x;
	    }


	    function valueOf(n) {
	      var str,
	        e = n.e;

	      if (e === null) return n.toString();

	      str = coeffToString(n.c);

	      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	        ? toExponential(str, e)
	        : toFixedPoint(str, e, '0');

	      return n.s < 0 ? '-' + str : str;
	    }


	    // PROTOTYPE/INSTANCE METHODS


	    /*
	     * Return a new BigNumber whose value is the absolute value of this BigNumber.
	     */
	    P.absoluteValue = P.abs = function () {
	      var x = new BigNumber(this);
	      if (x.s < 0) x.s = 1;
	      return x;
	    };


	    /*
	     * Return
	     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	     *   0 if they have the same value,
	     *   or null if the value of either is NaN.
	     */
	    P.comparedTo = function (y, b) {
	      return compare(this, new BigNumber(y, b));
	    };


	    /*
	     * If dp is undefined or null or true or false, return the number of decimal places of the
	     * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
	     *
	     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.decimalPlaces = P.dp = function (dp, rm) {
	      var c, n, v,
	        x = this;

	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), dp + x.e + 1, rm);
	      }

	      if (!(c = x.c)) return null;
	      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

	      // Subtract the number of trailing zeros of the last number.
	      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
	      if (n < 0) n = 0;

	      return n;
	    };


	    /*
	     *  n / 0 = I
	     *  n / N = N
	     *  n / I = 0
	     *  0 / n = 0
	     *  0 / 0 = N
	     *  0 / N = N
	     *  0 / I = 0
	     *  N / n = N
	     *  N / 0 = N
	     *  N / N = N
	     *  N / I = N
	     *  I / n = I
	     *  I / 0 = I
	     *  I / N = N
	     *  I / I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.dividedBy = P.div = function (y, b) {
	      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
	    };


	    /*
	     * Return a new BigNumber whose value is the integer part of dividing the value of this
	     * BigNumber by the value of BigNumber(y, b).
	     */
	    P.dividedToIntegerBy = P.idiv = function (y, b) {
	      return div(this, new BigNumber(y, b), 0, 1);
	    };


	    /*
	     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
	     *
	     * If m is present, return the result modulo m.
	     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
	     *
	     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
	     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
	     *
	     * n {number|string|BigNumber} The exponent. An integer.
	     * [m] {number|string|BigNumber} The modulus.
	     *
	     * '[BigNumber Error] Exponent not an integer: {n}'
	     */
	    P.exponentiatedBy = P.pow = function (n, m) {
	      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
	        x = this;

	      n = new BigNumber(n);

	      // Allow NaN and ±Infinity, but not other non-integers.
	      if (n.c && !n.isInteger()) {
	        throw Error
	          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
	      }

	      if (m != null) m = new BigNumber(m);

	      // Exponent of MAX_SAFE_INTEGER is 15.
	      nIsBig = n.e > 14;

	      // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
	      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

	        // The sign of the result of pow when x is negative depends on the evenness of n.
	        // If +n overflows to ±Infinity, the evenness of n would be not be known.
	        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
	        return m ? y.mod(m) : y;
	      }

	      nIsNeg = n.s < 0;

	      if (m) {

	        // x % m returns NaN if abs(m) is zero, or m is NaN.
	        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

	        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

	        if (isModExp) x = x.mod(m);

	      // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
	      // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
	      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
	        // [1, 240000000]
	        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
	        // [80000000000000]  [99999750000000]
	        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

	        // If x is negative and n is odd, k = -0, else k = 0.
	        k = x.s < 0 && isOdd(n) ? -0 : 0;

	        // If x >= 1, k = ±Infinity.
	        if (x.e > -1) k = 1 / k;

	        // If n is negative return ±0, else return ±Infinity.
	        return new BigNumber(nIsNeg ? 1 / k : k);

	      } else if (POW_PRECISION) {

	        // Truncating each coefficient array to a length of k after each multiplication
	        // equates to truncating significant digits to POW_PRECISION + [28, 41],
	        // i.e. there will be a minimum of 28 guard digits retained.
	        k = mathceil(POW_PRECISION / LOG_BASE + 2);
	      }

	      if (nIsBig) {
	        half = new BigNumber(0.5);
	        if (nIsNeg) n.s = 1;
	        nIsOdd = isOdd(n);
	      } else {
	        i = Math.abs(+valueOf(n));
	        nIsOdd = i % 2;
	      }

	      y = new BigNumber(ONE);

	      // Performs 54 loop iterations for n of 9007199254740991.
	      for (; ;) {

	        if (nIsOdd) {
	          y = y.times(x);
	          if (!y.c) break;

	          if (k) {
	            if (y.c.length > k) y.c.length = k;
	          } else if (isModExp) {
	            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
	          }
	        }

	        if (i) {
	          i = mathfloor(i / 2);
	          if (i === 0) break;
	          nIsOdd = i % 2;
	        } else {
	          n = n.times(half);
	          round(n, n.e + 1, 1);

	          if (n.e > 14) {
	            nIsOdd = isOdd(n);
	          } else {
	            i = +valueOf(n);
	            if (i === 0) break;
	            nIsOdd = i % 2;
	          }
	        }

	        x = x.times(x);

	        if (k) {
	          if (x.c && x.c.length > k) x.c.length = k;
	        } else if (isModExp) {
	          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
	        }
	      }

	      if (isModExp) return y;
	      if (nIsNeg) y = ONE.div(y);

	      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
	     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
	     */
	    P.integerValue = function (rm) {
	      var n = new BigNumber(this);
	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);
	      return round(n, n.e + 1, rm);
	    };


	    /*
	     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isEqualTo = P.eq = function (y, b) {
	      return compare(this, new BigNumber(y, b)) === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is a finite number, otherwise return false.
	     */
	    P.isFinite = function () {
	      return !!this.c;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isGreaterThan = P.gt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

	    };


	    /*
	     * Return true if the value of this BigNumber is an integer, otherwise return false.
	     */
	    P.isInteger = function () {
	      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isLessThan = P.lt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isLessThanOrEqualTo = P.lte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is NaN, otherwise return false.
	     */
	    P.isNaN = function () {
	      return !this.s;
	    };


	    /*
	     * Return true if the value of this BigNumber is negative, otherwise return false.
	     */
	    P.isNegative = function () {
	      return this.s < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is positive, otherwise return false.
	     */
	    P.isPositive = function () {
	      return this.s > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
	     */
	    P.isZero = function () {
	      return !!this.c && this.c[0] == 0;
	    };


	    /*
	     *  n - 0 = n
	     *  n - N = N
	     *  n - I = -I
	     *  0 - n = -n
	     *  0 - 0 = 0
	     *  0 - N = N
	     *  0 - I = -I
	     *  N - n = N
	     *  N - 0 = N
	     *  N - N = N
	     *  N - I = N
	     *  I - n = I
	     *  I - 0 = I
	     *  I - N = N
	     *  I - I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	     * BigNumber(y, b).
	     */
	    P.minus = function (y, b) {
	      var i, j, t, xLTy,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	      if (a != b) {
	        y.s = -b;
	        return x.plus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Either Infinity?
	        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

	           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	           ROUNDING_MODE == 3 ? -0 : 0);
	        }
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Determine which is the bigger number.
	      if (a = xe - ye) {

	        if (xLTy = a < 0) {
	          a = -a;
	          t = xc;
	        } else {
	          ye = xe;
	          t = yc;
	        }

	        t.reverse();

	        // Prepend zeros to equalise exponents.
	        for (b = a; b--; t.push(0));
	        t.reverse();
	      } else {

	        // Exponents equal. Check digit by digit.
	        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

	        for (a = b = 0; b < j; b++) {

	          if (xc[b] != yc[b]) {
	            xLTy = xc[b] < yc[b];
	            break;
	          }
	        }
	      }

	      // x < y? Point xc to the array of the bigger number.
	      if (xLTy) {
	        t = xc;
	        xc = yc;
	        yc = t;
	        y.s = -y.s;
	      }

	      b = (j = yc.length) - (i = xc.length);

	      // Append zeros to xc if shorter.
	      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	      if (b > 0) for (; b--; xc[i++] = 0);
	      b = BASE - 1;

	      // Subtract yc from xc.
	      for (; j > a;) {

	        if (xc[--j] < yc[j]) {
	          for (i = j; i && !xc[--i]; xc[i] = b);
	          --xc[i];
	          xc[j] += BASE;
	        }

	        xc[j] -= yc[j];
	      }

	      // Remove leading zeros and adjust exponent accordingly.
	      for (; xc[0] == 0; xc.splice(0, 1), --ye);

	      // Zero?
	      if (!xc[0]) {

	        // Following IEEE 754 (2008) 6.3,
	        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	        y.s = ROUNDING_MODE == 3 ? -1 : 1;
	        y.c = [y.e = 0];
	        return y;
	      }

	      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	      // for finite x and y.
	      return normalise(y, xc, ye);
	    };


	    /*
	     *   n % 0 =  N
	     *   n % N =  N
	     *   n % I =  n
	     *   0 % n =  0
	     *  -0 % n = -0
	     *   0 % 0 =  N
	     *   0 % N =  N
	     *   0 % I =  0
	     *   N % n =  N
	     *   N % 0 =  N
	     *   N % N =  N
	     *   N % I =  N
	     *   I % n =  N
	     *   I % 0 =  N
	     *   I % N =  N
	     *   I % I =  N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	     */
	    P.modulo = P.mod = function (y, b) {
	      var q, s,
	        x = this;

	      y = new BigNumber(y, b);

	      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	      if (!x.c || !y.s || y.c && !y.c[0]) {
	        return new BigNumber(NaN);

	      // Return x if y is Infinity or x is zero.
	      } else if (!y.c || x.c && !x.c[0]) {
	        return new BigNumber(x);
	      }

	      if (MODULO_MODE == 9) {

	        // Euclidian division: q = sign(y) * floor(x / abs(y))
	        // r = x - qy    where  0 <= r < abs(y)
	        s = y.s;
	        y.s = 1;
	        q = div(x, y, 0, 3);
	        y.s = s;
	        q.s *= s;
	      } else {
	        q = div(x, y, 0, MODULO_MODE);
	      }

	      y = x.minus(q.times(y));

	      // To match JavaScript %, ensure sign of zero is sign of dividend.
	      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

	      return y;
	    };


	    /*
	     *  n * 0 = 0
	     *  n * N = N
	     *  n * I = I
	     *  0 * n = 0
	     *  0 * 0 = 0
	     *  0 * N = N
	     *  0 * I = N
	     *  N * n = N
	     *  N * 0 = N
	     *  N * N = N
	     *  N * I = N
	     *  I * n = I
	     *  I * 0 = N
	     *  I * N = N
	     *  I * I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
	     * of BigNumber(y, b).
	     */
	    P.multipliedBy = P.times = function (y, b) {
	      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	        base, sqrtBase,
	        x = this,
	        xc = x.c,
	        yc = (y = new BigNumber(y, b)).c;

	      // Either NaN, ±Infinity or ±0?
	      if (!xc || !yc || !xc[0] || !yc[0]) {

	        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
	          y.c = y.e = y.s = null;
	        } else {
	          y.s *= x.s;

	          // Return ±Infinity if either is ±Infinity.
	          if (!xc || !yc) {
	            y.c = y.e = null;

	          // Return ±0 if either is ±0.
	          } else {
	            y.c = [0];
	            y.e = 0;
	          }
	        }

	        return y;
	      }

	      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
	      y.s *= x.s;
	      xcL = xc.length;
	      ycL = yc.length;

	      // Ensure xc points to longer array and xcL to its length.
	      if (xcL < ycL) {
	        zc = xc;
	        xc = yc;
	        yc = zc;
	        i = xcL;
	        xcL = ycL;
	        ycL = i;
	      }

	      // Initialise the result array with zeros.
	      for (i = xcL + ycL, zc = []; i--; zc.push(0));

	      base = BASE;
	      sqrtBase = SQRT_BASE;

	      for (i = ycL; --i >= 0;) {
	        c = 0;
	        ylo = yc[i] % sqrtBase;
	        yhi = yc[i] / sqrtBase | 0;

	        for (k = xcL, j = i + k; j > i;) {
	          xlo = xc[--k] % sqrtBase;
	          xhi = xc[k] / sqrtBase | 0;
	          m = yhi * xlo + xhi * ylo;
	          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
	          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
	          zc[j--] = xlo % base;
	        }

	        zc[j] = c;
	      }

	      if (c) {
	        ++e;
	      } else {
	        zc.splice(0, 1);
	      }

	      return normalise(y, zc, e);
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber negated,
	     * i.e. multiplied by -1.
	     */
	    P.negated = function () {
	      var x = new BigNumber(this);
	      x.s = -x.s || null;
	      return x;
	    };


	    /*
	     *  n + 0 = n
	     *  n + N = N
	     *  n + I = I
	     *  0 + n = n
	     *  0 + 0 = 0
	     *  0 + N = N
	     *  0 + I = I
	     *  N + n = N
	     *  N + 0 = N
	     *  N + N = N
	     *  N + I = N
	     *  I + n = I
	     *  I + 0 = I
	     *  I + N = N
	     *  I + I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	     * BigNumber(y, b).
	     */
	    P.plus = function (y, b) {
	      var t,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	       if (a != b) {
	        y.s = -b;
	        return x.minus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Return ±Infinity if either ±Infinity.
	        if (!xc || !yc) return new BigNumber(a / 0);

	        // Either zero?
	        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	      if (a = xe - ye) {
	        if (a > 0) {
	          ye = xe;
	          t = yc;
	        } else {
	          a = -a;
	          t = xc;
	        }

	        t.reverse();
	        for (; a--; t.push(0));
	        t.reverse();
	      }

	      a = xc.length;
	      b = yc.length;

	      // Point xc to the longer array, and b to the shorter length.
	      if (a - b < 0) {
	        t = yc;
	        yc = xc;
	        xc = t;
	        b = a;
	      }

	      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	      for (a = 0; b;) {
	        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
	        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
	      }

	      if (a) {
	        xc = [a].concat(xc);
	        ++ye;
	      }

	      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	      // ye = MAX_EXP + 1 possible
	      return normalise(y, xc, ye);
	    };


	    /*
	     * If sd is undefined or null or true or false, return the number of significant digits of
	     * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
	     * If sd is true include integer-part trailing zeros in the count.
	     *
	     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
	     *                     boolean: whether to count integer-part trailing zeros: true or false.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.precision = P.sd = function (sd, rm) {
	      var c, n, v,
	        x = this;

	      if (sd != null && sd !== !!sd) {
	        intCheck(sd, 1, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), sd, rm);
	      }

	      if (!(c = x.c)) return null;
	      v = c.length - 1;
	      n = v * LOG_BASE + 1;

	      if (v = c[v]) {

	        // Subtract the number of trailing zeros of the last element.
	        for (; v % 10 == 0; v /= 10, n--);

	        // Add the number of digits of the first element.
	        for (v = c[0]; v >= 10; v /= 10, n++);
	      }

	      if (sd && x.e + 1 > n) n = x.e + 1;

	      return n;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	     *
	     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
	     */
	    P.shiftedBy = function (k) {
	      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
	      return this.times('1e' + k);
	    };


	    /*
	     *  sqrt(-n) =  N
	     *  sqrt(N) =  N
	     *  sqrt(-I) =  N
	     *  sqrt(I) =  I
	     *  sqrt(0) =  0
	     *  sqrt(-0) = -0
	     *
	     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.squareRoot = P.sqrt = function () {
	      var m, n, r, rep, t,
	        x = this,
	        c = x.c,
	        s = x.s,
	        e = x.e,
	        dp = DECIMAL_PLACES + 4,
	        half = new BigNumber('0.5');

	      // Negative/NaN/Infinity/zero?
	      if (s !== 1 || !c || !c[0]) {
	        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
	      }

	      // Initial estimate.
	      s = Math.sqrt(+valueOf(x));

	      // Math.sqrt underflow/overflow?
	      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	      if (s == 0 || s == 1 / 0) {
	        n = coeffToString(c);
	        if ((n.length + e) % 2 == 0) n += '0';
	        s = Math.sqrt(+n);
	        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

	        if (s == 1 / 0) {
	          n = '5e' + e;
	        } else {
	          n = s.toExponential();
	          n = n.slice(0, n.indexOf('e') + 1) + e;
	        }

	        r = new BigNumber(n);
	      } else {
	        r = new BigNumber(s + '');
	      }

	      // Check for zero.
	      // r could be zero if MIN_EXP is changed after the this value was created.
	      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	      // coeffToString to throw.
	      if (r.c[0]) {
	        e = r.e;
	        s = e + dp;
	        if (s < 3) s = 0;

	        // Newton-Raphson iteration.
	        for (; ;) {
	          t = r;
	          r = half.times(t.plus(div(x, t, dp, 1)));

	          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

	            // The exponent of r may here be one less than the final result exponent,
	            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	            // are indexed correctly.
	            if (r.e < e) --s;
	            n = n.slice(s - 3, s + 1);

	            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	            // iteration.
	            if (n == '9999' || !rep && n == '4999') {

	              // On the first iteration only, check to see if rounding up gives the
	              // exact result as the nines may infinitely repeat.
	              if (!rep) {
	                round(t, t.e + DECIMAL_PLACES + 2, 0);

	                if (t.times(t).eq(x)) {
	                  r = t;
	                  break;
	                }
	              }

	              dp += 4;
	              s += 4;
	              rep = 1;
	            } else {

	              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	              // result. If not, then there are further digits and m will be truthy.
	              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	                // Truncate to the first rounding digit.
	                round(r, r.e + DECIMAL_PLACES + 2, 1);
	                m = !r.times(r).eq(x);
	              }

	              break;
	            }
	          }
	        }
	      }

	      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in exponential notation and
	     * rounded using ROUNDING_MODE to dp fixed decimal places.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toExponential = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp++;
	      }
	      return format(this, dp, rm, 1);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounding
	     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	     * but e.g. (-0.00001).toFixed(0) is '-0'.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toFixed = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp = dp + this.e + 1;
	      }
	      return format(this, dp, rm);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounded
	     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	     * of the format or FORMAT object (see BigNumber.set).
	     *
	     * The formatting object may contain some or all of the properties shown below.
	     *
	     * FORMAT = {
	     *   prefix: '',
	     *   groupSize: 3,
	     *   secondaryGroupSize: 0,
	     *   groupSeparator: ',',
	     *   decimalSeparator: '.',
	     *   fractionGroupSize: 0,
	     *   fractionGroupSeparator: '\xA0',      // non-breaking space
	     *   suffix: ''
	     * };
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     * [format] {object} Formatting options. See FORMAT pbject above.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     * '[BigNumber Error] Argument not an object: {format}'
	     */
	    P.toFormat = function (dp, rm, format) {
	      var str,
	        x = this;

	      if (format == null) {
	        if (dp != null && rm && typeof rm == 'object') {
	          format = rm;
	          rm = null;
	        } else if (dp && typeof dp == 'object') {
	          format = dp;
	          dp = rm = null;
	        } else {
	          format = FORMAT;
	        }
	      } else if (typeof format != 'object') {
	        throw Error
	          (bignumberError + 'Argument not an object: ' + format);
	      }

	      str = x.toFixed(dp, rm);

	      if (x.c) {
	        var i,
	          arr = str.split('.'),
	          g1 = +format.groupSize,
	          g2 = +format.secondaryGroupSize,
	          groupSeparator = format.groupSeparator || '',
	          intPart = arr[0],
	          fractionPart = arr[1],
	          isNeg = x.s < 0,
	          intDigits = isNeg ? intPart.slice(1) : intPart,
	          len = intDigits.length;

	        if (g2) {
	          i = g1;
	          g1 = g2;
	          g2 = i;
	          len -= i;
	        }

	        if (g1 > 0 && len > 0) {
	          i = len % g1 || g1;
	          intPart = intDigits.substr(0, i);
	          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
	          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
	          if (isNeg) intPart = '-' + intPart;
	        }

	        str = fractionPart
	         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
	          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
	           '$&' + (format.fractionGroupSeparator || ''))
	          : fractionPart)
	         : intPart;
	      }

	      return (format.prefix || '') + str + (format.suffix || '');
	    };


	    /*
	     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
	     * fraction with an integer numerator and an integer denominator.
	     * The denominator will be a positive non-zero value less than or equal to the specified
	     * maximum denominator. If a maximum denominator is not specified, the denominator will be
	     * the lowest value necessary to represent the number exactly.
	     *
	     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
	     *
	     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
	     */
	    P.toFraction = function (md) {
	      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
	        x = this,
	        xc = x.c;

	      if (md != null) {
	        n = new BigNumber(md);

	        // Throw if md is less than one or is not an integer, unless it is Infinity.
	        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
	          throw Error
	            (bignumberError + 'Argument ' +
	              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
	        }
	      }

	      if (!xc) return new BigNumber(x);

	      d = new BigNumber(ONE);
	      n1 = d0 = new BigNumber(ONE);
	      d1 = n0 = new BigNumber(ONE);
	      s = coeffToString(xc);

	      // Determine initial denominator.
	      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	      e = d.e = s.length - x.e - 1;
	      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
	      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

	      exp = MAX_EXP;
	      MAX_EXP = 1 / 0;
	      n = new BigNumber(s);

	      // n0 = d1 = 0
	      n0.c[0] = 0;

	      for (; ;)  {
	        q = div(n, d, 0, 1);
	        d2 = d0.plus(q.times(d1));
	        if (d2.comparedTo(md) == 1) break;
	        d0 = d1;
	        d1 = d2;
	        n1 = n0.plus(q.times(d2 = n1));
	        n0 = d2;
	        d = n.minus(q.times(d2 = d));
	        n = d2;
	      }

	      d2 = div(md.minus(d0), d1, 0, 1);
	      n0 = n0.plus(d2.times(n1));
	      d0 = d0.plus(d2.times(d1));
	      n0.s = n1.s = x.s;
	      e = e * 2;

	      // Determine which fraction is closer to x, n0/d0 or n1/d1
	      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
	          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

	      MAX_EXP = exp;

	      return r;
	    };


	    /*
	     * Return the value of this BigNumber converted to a number primitive.
	     */
	    P.toNumber = function () {
	      return +valueOf(this);
	    };


	    /*
	     * Return a string representing the value of this BigNumber rounded to sd significant digits
	     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	     * necessary to represent the integer part of the value in fixed-point notation, then use
	     * exponential notation.
	     *
	     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.toPrecision = function (sd, rm) {
	      if (sd != null) intCheck(sd, 1, MAX);
	      return format(this, sd, rm, 2);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	     * TO_EXP_NEG, return exponential notation.
	     *
	     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
	     *
	     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	     */
	    P.toString = function (b) {
	      var str,
	        n = this,
	        s = n.s,
	        e = n.e;

	      // Infinity or NaN?
	      if (e === null) {
	        if (s) {
	          str = 'Infinity';
	          if (s < 0) str = '-' + str;
	        } else {
	          str = 'NaN';
	        }
	      } else {
	        if (b == null) {
	          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	           ? toExponential(coeffToString(n.c), e)
	           : toFixedPoint(coeffToString(n.c), e, '0');
	        } else if (b === 10 && alphabetHasNormalDecimalDigits) {
	          n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
	          str = toFixedPoint(coeffToString(n.c), n.e, '0');
	        } else {
	          intCheck(b, 2, ALPHABET.length, 'Base');
	          str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
	        }

	        if (s < 0 && n.c[0]) str = '-' + str;
	      }

	      return str;
	    };


	    /*
	     * Return as toString, but do not accept a base argument, and include the minus sign for
	     * negative zero.
	     */
	    P.valueOf = P.toJSON = function () {
	      return valueOf(this);
	    };


	    P._isBigNumber = true;

	    if (configObject != null) BigNumber.set(configObject);

	    return BigNumber;
	  }


	  // PRIVATE HELPER FUNCTIONS

	  // These functions don't need access to variables,
	  // e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


	  function bitFloor(n) {
	    var i = n | 0;
	    return n > 0 || n === i ? i : i - 1;
	  }


	  // Return a coefficient array as a string of base 10 digits.
	  function coeffToString(a) {
	    var s, z,
	      i = 1,
	      j = a.length,
	      r = a[0] + '';

	    for (; i < j;) {
	      s = a[i++] + '';
	      z = LOG_BASE - s.length;
	      for (; z--; s = '0' + s);
	      r += s;
	    }

	    // Determine trailing zeros.
	    for (j = r.length; r.charCodeAt(--j) === 48;);

	    return r.slice(0, j + 1 || 1);
	  }


	  // Compare the value of BigNumbers x and y.
	  function compare(x, y) {
	    var a, b,
	      xc = x.c,
	      yc = y.c,
	      i = x.s,
	      j = y.s,
	      k = x.e,
	      l = y.e;

	    // Either NaN?
	    if (!i || !j) return null;

	    a = xc && !xc[0];
	    b = yc && !yc[0];

	    // Either zero?
	    if (a || b) return a ? b ? 0 : -j : i;

	    // Signs differ?
	    if (i != j) return i;

	    a = i < 0;
	    b = k == l;

	    // Either Infinity?
	    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

	    // Compare exponents.
	    if (!b) return k > l ^ a ? 1 : -1;

	    j = (k = xc.length) < (l = yc.length) ? k : l;

	    // Compare digit by digit.
	    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

	    // Compare lengths.
	    return k == l ? 0 : k > l ^ a ? 1 : -1;
	  }


	  /*
	   * Check that n is a primitive number, an integer, and in range, otherwise throw.
	   */
	  function intCheck(n, min, max, name) {
	    if (n < min || n > max || n !== mathfloor(n)) {
	      throw Error
	       (bignumberError + (name || 'Argument') + (typeof n == 'number'
	         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
	         : ' not a primitive number: ') + String(n));
	    }
	  }


	  // Assumes finite n.
	  function isOdd(n) {
	    var k = n.c.length - 1;
	    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
	  }


	  function toExponential(str, e) {
	    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
	     (e < 0 ? 'e' : 'e+') + e;
	  }


	  function toFixedPoint(str, e, z) {
	    var len, zs;

	    // Negative exponent?
	    if (e < 0) {

	      // Prepend zeros.
	      for (zs = z + '.'; ++e; zs += z);
	      str = zs + str;

	    // Positive exponent
	    } else {
	      len = str.length;

	      // Append zeros.
	      if (++e > len) {
	        for (zs = z, e -= len; --e; zs += z);
	        str += zs;
	      } else if (e < len) {
	        str = str.slice(0, e) + '.' + str.slice(e);
	      }
	    }

	    return str;
	  }


	  // EXPORT


	  BigNumber = clone();
	  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

	  // AMD.
	  if (module.exports) {
	    module.exports = BigNumber;

	  // Browser.
	  } else {
	    if (!globalObject) {
	      globalObject = typeof self != 'undefined' && self ? self : window;
	    }

	    globalObject.BigNumber = BigNumber;
	  }
	})(index.commonjsGlobal); 
} (bignumber));

var bignumberExports = bignumber.exports;

(function (module) {
	var BigNumber = bignumberExports;

	/*
	    json2.js
	    2013-05-26

	    Public Domain.

	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

	    See http://www.JSON.org/js.html


	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html

	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.


	    This file creates a global JSON object containing two methods: stringify
	    and parse.

	        JSON.stringify(value, replacer, space)
	            value       any JavaScript value, usually an object or array.

	            replacer    an optional parameter that determines how object
	                        values are stringified for objects. It can be a
	                        function or an array of strings.

	            space       an optional parameter that specifies the indentation
	                        of nested structures. If it is omitted, the text will
	                        be packed without extra whitespace. If it is a number,
	                        it will specify the number of spaces to indent at each
	                        level. If it is a string (such as '\t' or '&nbsp;'),
	                        it contains the characters used to indent at each level.

	            This method produces a JSON text from a JavaScript value.

	            When an object value is found, if the object contains a toJSON
	            method, its toJSON method will be called and the result will be
	            stringified. A toJSON method does not serialize: it returns the
	            value represented by the name/value pair that should be serialized,
	            or undefined if nothing should be serialized. The toJSON method
	            will be passed the key associated with the value, and this will be
	            bound to the value

	            For example, this would serialize Dates as ISO strings.

	                Date.prototype.toJSON = function (key) {
	                    function f(n) {
	                        // Format integers to have at least two digits.
	                        return n < 10 ? '0' + n : n;
	                    }

	                    return this.getUTCFullYear()   + '-' +
	                         f(this.getUTCMonth() + 1) + '-' +
	                         f(this.getUTCDate())      + 'T' +
	                         f(this.getUTCHours())     + ':' +
	                         f(this.getUTCMinutes())   + ':' +
	                         f(this.getUTCSeconds())   + 'Z';
	                };

	            You can provide an optional replacer method. It will be passed the
	            key and value of each member, with this bound to the containing
	            object. The value that is returned from your method will be
	            serialized. If your method returns undefined, then the member will
	            be excluded from the serialization.

	            If the replacer parameter is an array of strings, then it will be
	            used to select the members to be serialized. It filters the results
	            such that only members with keys listed in the replacer array are
	            stringified.

	            Values that do not have JSON representations, such as undefined or
	            functions, will not be serialized. Such values in objects will be
	            dropped; in arrays they will be replaced with null. You can use
	            a replacer function to replace those with JSON values.
	            JSON.stringify(undefined) returns undefined.

	            The optional space parameter produces a stringification of the
	            value that is filled with line breaks and indentation to make it
	            easier to read.

	            If the space parameter is a non-empty string, then that string will
	            be used for indentation. If the space parameter is a number, then
	            the indentation will be that many spaces.

	            Example:

	            text = JSON.stringify(['e', {pluribus: 'unum'}]);
	            // text is '["e",{"pluribus":"unum"}]'


	            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
	            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

	            text = JSON.stringify([new Date()], function (key, value) {
	                return this[key] instanceof Date ?
	                    'Date(' + this[key] + ')' : value;
	            });
	            // text is '["Date(---current time---)"]'


	        JSON.parse(text, reviver)
	            This method parses a JSON text to produce an object or array.
	            It can throw a SyntaxError exception.

	            The optional reviver parameter is a function that can filter and
	            transform the results. It receives each of the keys and values,
	            and its return value is used instead of the original value.
	            If it returns what it received, then the structure is not modified.
	            If it returns undefined then the member is deleted.

	            Example:

	            // Parse the text. Values that look like ISO date strings will
	            // be converted to Date objects.

	            myData = JSON.parse(text, function (key, value) {
	                var a;
	                if (typeof value === 'string') {
	                    a =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	                    if (a) {
	                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	                            +a[5], +a[6]));
	                    }
	                }
	                return value;
	            });

	            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	                var d;
	                if (typeof value === 'string' &&
	                        value.slice(0, 5) === 'Date(' &&
	                        value.slice(-1) === ')') {
	                    d = new Date(value.slice(5, -1));
	                    if (d) {
	                        return d;
	                    }
	                }
	                return value;
	            });


	    This is a reference implementation. You are free to copy, modify, or
	    redistribute.
	*/

	/*jslint evil: true, regexp: true */

	/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
	    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/


	// Create a JSON object only if one does not already exist. We create the
	// methods in a closure to avoid creating global variables.

	var JSON = module.exports;

	(function () {

	    var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;


	    function quote(string) {

	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.

	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string'
	                ? c
	                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }


	    function str(key, holder) {

	// Produce a string from holder[key].

	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key],
	            isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));

	// If the value has a toJSON method, call it to obtain a replacement value.

	        if (value && typeof value === 'object' &&
	                typeof value.toJSON === 'function') {
	            value = value.toJSON(key);
	        }

	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.

	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }

	// What happens next depends on the value's type.

	        switch (typeof value) {
	        case 'string':
	            if (isBigNumber) {
	                return value;
	            } else {
	                return quote(value);
	            }

	        case 'number':

	// JSON numbers must be finite. Encode non-finite numbers as null.

	            return isFinite(value) ? String(value) : 'null';

	        case 'boolean':
	        case 'null':
	        case 'bigint':

	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.

	            return String(value);

	// If the type is 'object', we might be dealing with an object or an array or
	// null.

	        case 'object':

	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.

	            if (!value) {
	                return 'null';
	            }

	// Make an array to hold the partial results of stringifying this object value.

	            gap += indent;
	            partial = [];

	// Is the value an array?

	            if (Object.prototype.toString.apply(value) === '[object Array]') {

	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.

	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }

	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.

	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                    : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }

	// If the replacer is an array, use it to select the members to be stringified.

	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {

	// Otherwise, iterate through all of the keys in the object.

	                Object.keys(value).forEach(function(k) {
	                    var v = str(k, value);
	                    if (v) {
	                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                    }
	                });
	            }

	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.

	            v = partial.length === 0
	                ? '{}'
	                : gap
	                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }

	// If the JSON object does not yet have a stringify method, give it one.

	    if (typeof JSON.stringify !== 'function') {
	        JSON.stringify = function (value, replacer, space) {

	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.

	            var i;
	            gap = '';
	            indent = '';

	// If the space parameter is a number, make an indent string containing that
	// many spaces.

	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }

	// If the space parameter is a string, it will be used as the indent string.

	            } else if (typeof space === 'string') {
	                indent = space;
	            }

	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.

	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }

	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.

	            return str('', {'': value});
	        };
	    }
	}()); 
} (stringify$2));

var stringifyExports = stringify$2.exports;

var BigNumber = null;

// regexpxs extracted from
// (c) BSD-3-Clause
// https://github.com/fastify/secure-json-parse/graphs/contributors and https://github.com/hapijs/bourne/graphs/contributors

const suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
const suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;

/*
    json_parse.js
    2012-06-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    This file creates a json_parse function.
    During create you can (optionally) specify some behavioural switches

        require('json-bigint')(options)

            The optional options parameter holds switches that drive certain
            aspects of the parsing process:
            * options.strict = true will warn about duplicate-key usage in the json.
              The default (strict = false) will silently ignore those and overwrite
              values for keys that are in duplicate use.

    The resulting function follows this signature:
        json_parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = json_parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

    This is a reference implementation. You are free to copy, modify, or
    redistribute.

    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
*/

/*members "", "\"", "\/", "\\", at, b, call, charAt, f, fromCharCode,
    hasOwnProperty, message, n, name, prototype, push, r, t, text
*/

var json_parse$1 = function (options) {

  // This is a function that can parse a JSON text, producing a JavaScript
  // data structure. It is a simple, recursive descent parser. It does not use
  // eval or regular expressions, so it can be used as a model for implementing
  // a JSON parser in other languages.

  // We are defining the function inside of another function to avoid creating
  // global variables.

  // Default options one can override by passing options to the parse()
  var _options = {
    strict: false, // not being strict means do not generate syntax errors for "duplicate key"
    storeAsString: false, // toggles whether the values should be stored as BigNumber (default) or a string
    alwaysParseAsBig: false, // toggles whether all numbers should be Big
    useNativeBigInt: false, // toggles whether to use native BigInt instead of bignumber.js
    protoAction: 'error',
    constructorAction: 'error',
  };

  // If there are options, then use them to override the default _options
  if (options !== undefined && options !== null) {
    if (options.strict === true) {
      _options.strict = true;
    }
    if (options.storeAsString === true) {
      _options.storeAsString = true;
    }
    _options.alwaysParseAsBig =
      options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
    _options.useNativeBigInt =
      options.useNativeBigInt === true ? options.useNativeBigInt : false;

    if (typeof options.constructorAction !== 'undefined') {
      if (
        options.constructorAction === 'error' ||
        options.constructorAction === 'ignore' ||
        options.constructorAction === 'preserve'
      ) {
        _options.constructorAction = options.constructorAction;
      } else {
        throw new Error(
          `Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`
        );
      }
    }

    if (typeof options.protoAction !== 'undefined') {
      if (
        options.protoAction === 'error' ||
        options.protoAction === 'ignore' ||
        options.protoAction === 'preserve'
      ) {
        _options.protoAction = options.protoAction;
      } else {
        throw new Error(
          `Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`
        );
      }
    }
  }

  var at, // The index of the current character
    ch, // The current character
    escapee = {
      '"': '"',
      '\\': '\\',
      '/': '/',
      b: '\b',
      f: '\f',
      n: '\n',
      r: '\r',
      t: '\t',
    },
    text,
    error = function (m) {
      // Call error when something is wrong.

      throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text,
      };
    },
    next = function (c) {
      // If a c parameter is provided, verify that it matches the current character.

      if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
      }

      // Get the next character. When there are no more characters,
      // return the empty string.

      ch = text.charAt(at);
      at += 1;
      return ch;
    },
    number = function () {
      // Parse a number value.

      var number,
        string = '';

      if (ch === '-') {
        string = '-';
        next('-');
      }
      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
      if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
          string += ch;
        }
      }
      if (ch === 'e' || ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
          string += ch;
          next();
        }
        while (ch >= '0' && ch <= '9') {
          string += ch;
          next();
        }
      }
      number = +string;
      if (!isFinite(number)) {
        error('Bad number');
      } else {
        if (BigNumber == null) BigNumber = bignumberExports;
        //if (number > 9007199254740992 || number < -9007199254740992)
        // Bignumber has stricter check: everything with length > 15 digits disallowed
        if (string.length > 15)
          return _options.storeAsString
            ? string
            : _options.useNativeBigInt
            ? BigInt(string)
            : new BigNumber(string);
        else
          return !_options.alwaysParseAsBig
            ? number
            : _options.useNativeBigInt
            ? BigInt(number)
            : new BigNumber(number);
      }
    },
    string = function () {
      // Parse a string value.

      var hex,
        i,
        string = '',
        uffff;

      // When parsing for string values, we must look for " and \ characters.

      if (ch === '"') {
        var startAt = at;
        while (next()) {
          if (ch === '"') {
            if (at - 1 > startAt) string += text.substring(startAt, at - 1);
            next();
            return string;
          }
          if (ch === '\\') {
            if (at - 1 > startAt) string += text.substring(startAt, at - 1);
            next();
            if (ch === 'u') {
              uffff = 0;
              for (i = 0; i < 4; i += 1) {
                hex = parseInt(next(), 16);
                if (!isFinite(hex)) {
                  break;
                }
                uffff = uffff * 16 + hex;
              }
              string += String.fromCharCode(uffff);
            } else if (typeof escapee[ch] === 'string') {
              string += escapee[ch];
            } else {
              break;
            }
            startAt = at;
          }
        }
      }
      error('Bad string');
    },
    white = function () {
      // Skip whitespace.

      while (ch && ch <= ' ') {
        next();
      }
    },
    word = function () {
      // true, false, or null.

      switch (ch) {
        case 't':
          next('t');
          next('r');
          next('u');
          next('e');
          return true;
        case 'f':
          next('f');
          next('a');
          next('l');
          next('s');
          next('e');
          return false;
        case 'n':
          next('n');
          next('u');
          next('l');
          next('l');
          return null;
      }
      error("Unexpected '" + ch + "'");
    },
    value, // Place holder for the value function.
    array = function () {
      // Parse an array value.

      var array = [];

      if (ch === '[') {
        next('[');
        white();
        if (ch === ']') {
          next(']');
          return array; // empty array
        }
        while (ch) {
          array.push(value());
          white();
          if (ch === ']') {
            next(']');
            return array;
          }
          next(',');
          white();
        }
      }
      error('Bad array');
    },
    object = function () {
      // Parse an object value.

      var key,
        object = Object.create(null);

      if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
          next('}');
          return object; // empty object
        }
        while (ch) {
          key = string();
          white();
          next(':');
          if (
            _options.strict === true &&
            Object.hasOwnProperty.call(object, key)
          ) {
            error('Duplicate key "' + key + '"');
          }

          if (suspectProtoRx.test(key) === true) {
            if (_options.protoAction === 'error') {
              error('Object contains forbidden prototype property');
            } else if (_options.protoAction === 'ignore') {
              value();
            } else {
              object[key] = value();
            }
          } else if (suspectConstructorRx.test(key) === true) {
            if (_options.constructorAction === 'error') {
              error('Object contains forbidden constructor property');
            } else if (_options.constructorAction === 'ignore') {
              value();
            } else {
              object[key] = value();
            }
          } else {
            object[key] = value();
          }

          white();
          if (ch === '}') {
            next('}');
            return object;
          }
          next(',');
          white();
        }
      }
      error('Bad object');
    };

  value = function () {
    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

    white();
    switch (ch) {
      case '{':
        return object();
      case '[':
        return array();
      case '"':
        return string();
      case '-':
        return number();
      default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
  };

  // Return the json_parse function. It will have access to all of the above
  // functions and variables.

  return function (source, reviver) {
    var result;

    text = source + '';
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
      error('Syntax error');
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function'
      ? (function walk(holder, key) {
          var v,
            value = holder[key];
          if (value && typeof value === 'object') {
            Object.keys(value).forEach(function (k) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            });
          }
          return reviver.call(holder, key, value);
        })({ '': result }, '')
      : result;
  };
};

var parse$2 = json_parse$1;

var json_stringify = stringifyExports.stringify;
var json_parse     = parse$2;

jsonBigint.exports = function(options) {
    return  {
        parse: json_parse(options),
        stringify: json_stringify
    }
};
//create the default method members with no options applied for backwards compatibility
jsonBigint.exports.parse = json_parse();
jsonBigint.exports.stringify = json_stringify;

var jsonBigintExports = jsonBigint.exports;

var utils$3 = {};

Object.defineProperty(utils$3, "__esModule", { value: true });
utils$3.takeUntil = void 0;
/**
 * @since 1.1.0
 */
/* eslint-disable @typescript-eslint/array-type */
var takeUntil = function (predicate) {
    return function (as) {
        var init = [];
        // eslint-disable-next-line unicorn/no-for-loop
        for (var i = 0; i < as.length; i++) {
            init[i] = as[i];
            if (predicate(as[i])) {
                return init;
            }
        }
        return init;
    };
};
utils$3.takeUntil = takeUntil;

(function (exports) {
	var __createBinding = (index.commonjsGlobal && index.commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (index.commonjsGlobal && index.commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (index.commonjsGlobal && index.commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (index.commonjsGlobal && index.commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.reporter = exports.formatValidationErrors = exports.formatValidationError = exports.TYPE_MAX_LEN = void 0;
	/**
	 * An [io-ts Reporter](https://gcanti.github.io/io-ts/modules/Reporter.ts.html#reporter-interface).
	 *
	 * @example
	 *
	 * import * as t from 'io-ts';
	 * import Reporter from 'io-ts-reporters';
	 *
	 * const User = t.interface({ name: t.string });
	 *
	 * assert.deepEqual(
	 *   Reporter.report(User.decode({ nam: 'Jane' })),
	 *   ['Expecting string at name but instead got: undefined'],
	 * )
	 * assert.deepEqual( Reporter.report(User.decode({ name: 'Jane' })), [])
	 *
	 * @since 1.2.0
	 */
	var A = __importStar(require$$0$1);
	var E = __importStar(require$$1);
	var NEA = __importStar(require$$2);
	var O = __importStar(require$$3);
	var R = __importStar(require$$4);
	var pipeable_1 = require$$5;
	var t = __importStar(withdrawal.require$$3);
	var json_bigint_1 = __importDefault(jsonBigintExports);
	var utils_1 = utils$3;
	var jsonAlwayAndOnlyBigInt = (0, json_bigint_1.default)({ alwaysParseAsBig: true, useNativeBigInt: true });
	var isUnionType = function (_a) {
	    var type = _a.type;
	    return type instanceof t.UnionType;
	};
	var jsToString = function (value) {
	    return value === undefined ? 'undefined' : jsonAlwayAndOnlyBigInt.stringify(value);
	};
	var keyPath = function (ctx) {
	    // The context entry with an empty key is the original
	    // type ("default context"), not a type error.
	    return ctx
	        .map(function (c) { return c.key; })
	        .filter(Boolean)
	        .join('.');
	};
	// The actual error is last in context
	var getErrorFromCtx = function (validation) {
	    // https://github.com/gcanti/fp-ts/pull/544/files
	    return A.last(validation.context);
	};
	var getValidationContext = function (validation) {
	    // https://github.com/gcanti/fp-ts/pull/544/files
	    return (validation.context);
	};
	/**
	 * @category internals
	 * @since 1.2.1
	 */
	exports.TYPE_MAX_LEN = 160; // Two lines of 80-col text
	var truncateType = function (type, options) {
	    if (options === void 0) { options = {}; }
	    var _a = options.truncateLongTypes, truncateLongTypes = _a === void 0 ? true : _a;
	    if (truncateLongTypes && type.length > exports.TYPE_MAX_LEN) {
	        return "".concat(type.slice(0, exports.TYPE_MAX_LEN - 3), "...");
	    }
	    return type;
	};
	var errorMessageSimple = function (expectedType, path, error, options) {
	    // https://github.com/elm-lang/core/blob/18c9e84e975ed22649888bfad15d1efdb0128ab2/src/Native/Json.js#L199
	    return [
	        "Expecting ".concat(truncateType(expectedType, options)),
	        path === '' ? '' : "at ".concat(path),
	        "but instead got: ".concat(jsToString(error.value)),
	        error.message ? "(".concat(error.message, ")") : '',
	    ]
	        .filter(Boolean)
	        .join(' ');
	};
	var errorMessageUnion = function (expectedTypes, path, value, options) {
	    // https://github.com/elm-lang/core/blob/18c9e84e975ed22649888bfad15d1efdb0128ab2/src/Native/Json.js#L199
	    return [
	        'Expecting one of:\n',
	        expectedTypes
	            .map(function (type) { return "    ".concat(truncateType(type, options)); })
	            .join('\n'),
	        path === '' ? '\n' : "\nat ".concat(path, " "),
	        "but instead got: ".concat(jsToString(value)),
	    ]
	        .filter(Boolean)
	        .join('');
	};
	// Find the union type in the list of ContextEntry
	// The next ContextEntry should be the type of this branch of the union
	var findExpectedType = function (ctx) {
	    return (0, pipeable_1.pipe)(ctx, A.findIndex(isUnionType), O.chain(function (n) { return A.lookup(n + 1, ctx); }));
	};
	var formatValidationErrorOfUnion = function (path, errors, options) {
	    var expectedTypes = (0, pipeable_1.pipe)(errors, A.map(getValidationContext), A.map(findExpectedType), A.compact);
	    var value = (0, pipeable_1.pipe)(expectedTypes, A.head, O.map(function (v) { return v.actual; }), O.getOrElse(function () { return undefined; }));
	    var expected = expectedTypes.map(function (_a) {
	        var type = _a.type;
	        return type.name;
	    });
	    return expected.length > 0
	        ? O.some(errorMessageUnion(expected, path, value, options))
	        : O.none;
	};
	var formatValidationCommonError = function (path, error, options) {
	    return (0, pipeable_1.pipe)(error, getErrorFromCtx, O.map(function (errorContext) {
	        return errorMessageSimple(errorContext.type.name, path, error, options);
	    }));
	};
	var groupByKey = NEA.groupBy(function (error) {
	    return (0, pipeable_1.pipe)(error.context, (0, utils_1.takeUntil)(isUnionType), keyPath);
	});
	var format = function (path, errors, options) {
	    return NEA.tail(errors).length > 0
	        ? formatValidationErrorOfUnion(path, errors, options)
	        : formatValidationCommonError(path, NEA.head(errors), options);
	};
	/**
	 * Format a single validation error.
	 *
	 * @category formatters
	 * @since 1.0.0
	 */
	var formatValidationError = function (error, options) { return formatValidationCommonError(keyPath(error.context), error, options); };
	exports.formatValidationError = formatValidationError;
	/**
	 * Format validation errors (`t.Errors`).
	 *
	 * @example
	 * import * as E from 'fp-ts/Either'
	 * import * as t from 'io-ts'
	 * import { formatValidationErrors } from 'io-ts-reporters'
	 *
	 * const result = t.string.decode(123)
	 *
	 * assert.deepEqual(
	 *   E.mapLeft(formatValidationErrors)(result),
	 *   E.left(['Expecting string but instead got: 123'])
	 * )
	 *
	 * @category formatters
	 * @since 1.2.0
	 */
	var formatValidationErrors = function (errors, options) {
	    return (0, pipeable_1.pipe)(errors, groupByKey, R.mapWithIndex(function (path, errors) { return format(path, errors, options); }), R.compact, R.toArray, A.map(function (_a) {
	        _a[0]; var error = _a[1];
	        return error;
	    }));
	};
	exports.formatValidationErrors = formatValidationErrors;
	/**
	 * Deprecated, use the default export instead.
	 *
	 * @category deprecated
	 * @deprecated
	 * @since 1.0.0
	 */
	var reporter = function (validation, options) {
	    return (0, pipeable_1.pipe)(validation, E.mapLeft(function (errors) { return (0, exports.formatValidationErrors)(errors, options); }), E.fold(function (errors) { return errors; }, function () { return []; }));
	};
	exports.reporter = reporter;
	var prettyReporter = { report: exports.reporter };
	exports.default = prettyReporter;
	
} (src$1));

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = shams;

var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

var test = {
	foo: {}
};

var $Object = Object;

var hasProto$1 = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr$1 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$1.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var implementation = implementation$1;

var functionBind = Function.prototype.bind || implementation;

var bind$1 = functionBind;

var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);

var undefined$1;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError$1();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = hasSymbols$1();
var hasProto = hasProto$1();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%Symbol%': hasSymbols ? Symbol : undefined$1,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError$1,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = functionBind;
var hasOwn$1 = src;
var $concat$1 = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace$1 = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace$1(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace$1(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn$1(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$1('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$1('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat$1([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined$1;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn$1(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var callBind$1 = {exports: {}};

(function (module) {

	var bind = functionBind;
	var GetIntrinsic = getIntrinsic;

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	} 
} (callBind$1));

var callBindExports = callBind$1.exports;

var GetIntrinsic$1 = getIntrinsic;

var callBind = callBindExports;

var $indexOf = callBind(GetIntrinsic$1('String.prototype.indexOf'));

var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$1(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _nodeResolve_empty
});

var require$$0 = /*@__PURE__*/index.getAugmentedNamespace(_nodeResolve_empty$1);

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
// ie, `has-tostringtag/shams
var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol')
    ? Symbol.toStringTag
    : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;

var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
    [].__proto__ === Array.prototype // eslint-disable-line no-proto
        ? function (O) {
            return O.__proto__; // eslint-disable-line no-proto
        }
        : null
);

function addNumericSeparator(num, str) {
    if (
        num === Infinity
        || num === -Infinity
        || num !== num
        || (num && num > -1000 && num < 1000)
        || $test.call(/e/, str)
    ) {
        return str;
    }
    var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof num === 'number') {
        var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
        if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
        }
    }
    return $replace.call(str, sepRegex, '$&_');
}

var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has$3(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has$3(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$3(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
    }

    if (
        has$3(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    }
    if (has$3(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    }
    var numericSeparator = opts.numericSeparator;

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
    }
    if (typeof obj === 'bigint') {
        var bigIntStr = String(obj) + 'n';
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray$3(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has$3(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function' && !isRegExp$1(obj)) { // in older engines, regexes are callable
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
    }
    if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
        return s;
    }
    if (isArray$3(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + $join.call(xs, ', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
            return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
        }
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
            mapForEach.call(obj, function (value, key) {
                mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
            });
        }
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
            setForEach.call(obj, function (value) {
                setParts.push(inspect(value, obj));
            });
        }
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isWeakRef(obj)) {
        return weakCollectionOf('WeakRef');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp$1(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? '' : 'null prototype';
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
        var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
        if (ys.length === 0) { return tag + '{}'; }
        if (indent) {
            return tag + '{' + indentedJoin(ys, indent) + '}';
        }
        return tag + '{ ' + $join.call(ys, ', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return $replace.call(String(s), /"/g, '&quot;');
}

function isArray$3(obj) { return toStr(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isDate(obj) { return toStr(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isRegExp$1(obj) { return toStr(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isError(obj) { return toStr(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isString(obj) { return toStr(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isNumber(obj) { return toStr(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
function isSymbol(obj) {
    if (hasShammedSymbols) {
        return obj && typeof obj === 'object' && obj instanceof Symbol;
    }
    if (typeof obj === 'symbol') {
        return true;
    }
    if (!obj || typeof obj !== 'object' || !symToString) {
        return false;
    }
    try {
        symToString.call(obj);
        return true;
    } catch (e) {}
    return false;
}

function isBigInt(obj) {
    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
        return false;
    }
    try {
        bigIntValueOf.call(obj);
        return true;
    } catch (e) {}
    return false;
}

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has$3(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakRef(x) {
    if (!weakRefDeref || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakRefDeref.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = $replace.call($replace.call(str, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b',
        9: 't',
        10: 'n',
        12: 'f',
        13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), ' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray$3(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has$3(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
    var symMap;
    if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
            symMap['$' + syms[k]] = syms[k];
        }
    }

    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has$3(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    if (typeof gOPS === 'function') {
        for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
            }
        }
    }
    return xs;
}

var GetIntrinsic = getIntrinsic;
var callBound = callBound$1;
var inspect = objectInspect;

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);

/*
 * This function traverses the list returning the node corresponding to the
 * given key.
 *
 * That node is also moved to the head of the list, so that if it's accessed
 * again we don't need to traverse the whole list. By doing so, all the recently
 * used nodes can be accessed relatively quickly.
 */
var listGetNode = function (list, key) { // eslint-disable-line consistent-return
	for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
		if (curr.key === key) {
			prev.next = curr.next;
			curr.next = list.next;
			list.next = curr; // eslint-disable-line no-param-reassign
			return curr;
		}
	}
};

var listGet = function (objects, key) {
	var node = listGetNode(objects, key);
	return node && node.value;
};
var listSet = function (objects, key, value) {
	var node = listGetNode(objects, key);
	if (node) {
		node.value = value;
	} else {
		// Prepend the new node to the beginning of the list
		objects.next = { // eslint-disable-line no-param-reassign
			key: key,
			next: objects.next,
			value: value
		};
	}
};
var listHas = function (objects, key) {
	return !!listGetNode(objects, key);
};

var sideChannel = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return listHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					/*
					 * Initialize the linked list as an empty node, so that we don't have
					 * to special-case handling of the first node: we can always refer to
					 * it as (previous node).next, instead of something like (list).head
					 */
					$o = { key: {}, next: null };
				}
				listSet($o, key, value);
			}
		}
	};
	return channel;
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var formats$3 = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};

var formats$2 = formats$3;

var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$2(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray$2(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray$2(target) && !isArray$2(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray$2(target) && isArray$2(source)) {
        source.forEach(function (item, i) {
            if (has$2.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats$2.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray$2(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

var utils$2 = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};

var getSideChannel = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray$1 = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats$1['default'];
var defaults$1 = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils$1.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats$1.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var sentinel = {};

var stringify$1 = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    commaRoundTrip,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset,
    sideChannel
) {
    var obj = object;

    var tmpSc = sideChannel;
    var step = 0;
    var findFlag = false;
    while ((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag) {
        // Where object last appeared in the ref tree
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== 'undefined') {
            if (pos === step) {
                throw new RangeError('Cyclic object value');
            } else {
                findFlag = true; // Break while
            }
        }
        if (typeof tmpSc.get(sentinel) === 'undefined') {
            step = 0;
        }
    }

    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        obj = utils$1.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        // we need to join elements in
        if (encodeValuesOnly && encoder) {
            obj = utils$1.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray$1(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    var adjustedPrefix = commaRoundTrip && isArray$1(obj) && obj.length === 1 ? prefix + '[]' : prefix;

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray$1(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix
            : adjustedPrefix + (allowDots ? '.' + key : '[' + key + ']');

        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            strictNullHandling,
            skipNulls,
            generateArrayPrefix === 'comma' && encodeValuesOnly && isArray$1(obj) ? null : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults$1;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults$1.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats$1['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has$1.call(formats$1.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats$1.formatters[format];

    var filter = defaults$1.filter;
    if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray$1(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
    if (opts && 'commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
        throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
    }
    var commaRoundTrip = generateArrayPrefix === 'comma' && opts && opts.commaRoundTrip;

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    var sideChannel = getSideChannel();
    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify$1(
            obj[key],
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

var utils = utils$2;

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    allowSparse: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = { __proto__: null };

    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

var parse$1 = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    if (options.allowSparse === true) {
        return obj;
    }

    return utils.compact(obj);
};

var stringify = stringify_1;
var parse = parse$1;
var formats = formats$3;

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

const ContractsRange$1 = transaction.fromNewtype(index.lib.string);
const unContractsRange$1 = transaction.iso().unwrap;
transaction.iso().wrap;
const roleToParameter = (roleToken) => `${runtimeCore.unPolicyId(roleToken.policyId)}.${roleToken.assetName}`;
const contractIdToParameter = (contractId) => runtimeCore.unContractId(contractId);
const statusOptionToParameter = (statusOption) => index._function.pipe(statusOption, withdrawal.Option.match(() => "", (a) => `status=${a}&`));
const getHeadersByRangeViaAxios$3 = (axiosInstance) => (rangeOption) => (contractIds) => (roles) => (statusOption) => index._function.pipe({
    url: "/payouts?" +
        statusOptionToParameter(statusOption) +
        lib.stringify({
            contractId: contractIds.map(contractIdToParameter),
            roleToken: roles.map(roleToParameter),
        }, { indices: false }),
    configs: index._function.pipe(rangeOption, withdrawal.Option.match(() => ({}), (range) => ({ headers: { Range: unContractsRange$1(range) } }))),
}, ({ url, configs }) => HTTP__namespace.GetWithDataAndHeaders(axiosInstance)(url, configs), TaskEither.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETByRangeRawResponse$3.decode(data)))), TaskEither.map((rawResponse) => ({
    headers: index._function.pipe(rawResponse.data.results, _Array.map((result) => result.resource)),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const GETByRangeRawResponse$3 = index.lib.type({
    data: index.lib.type({
        results: index.lib.array(index.lib.type({ links: index.lib.type({ payout: index.lib.string }), resource: withdrawal.PayoutHeader })),
    }),
    previousRange: withdrawal.optionFromNullable(ContractsRange$1),
    nextRange: withdrawal.optionFromNullable(ContractsRange$1),
});
index.lib.type({
    headers: index.lib.array(withdrawal.PayoutHeader),
    previousRange: withdrawal.optionFromNullable(ContractsRange$1),
    nextRange: withdrawal.optionFromNullable(ContractsRange$1),
});

const Tokens = index.lib.record(index.lib.string, index.lib.record(index.lib.string, index.lib.bigint));
const Assets = index.lib.type({ lovelace: runtimeCore.AssetQuantity, tokens: Tokens });
const PayoutDetails = index.lib.type({
    payoutId: runtimeCore.PayoutId,
    contractId: runtimeCore.ContractId,
    withdrawalId: withdrawal.optionFromNullable(runtimeCore.WithdrawalId),
    role: runtimeCore.AssetId,
    payoutValidatorAddress: runtimeCore.AddressBech32,
    status: withdrawal.PayoutStatus,
    assets: Assets,
});

const GETPayload$2 = index.lib.type({ links: index.lib.type({}), resource: PayoutDetails });
const getViaAxios$4 = (axiosInstance) => (contractId) => index._function.pipe(HTTP__namespace.Get(axiosInstance)(contractEndpoint$1(contractId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETPayload$2.decode(data)))), TaskEither.map((payload) => payload.resource));
const contractEndpoint$1 = (payoutId) => `/payouts/${encodeURIComponent(runtimeCore.unPayoutId(payoutId))}`;

const getViaAxios$3 = (axiosInstance) => (withdrawalId) => index._function.pipe(HTTP__namespace.Get(axiosInstance)(endpointURI$1(withdrawalId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(withdrawal.WithdrawalDetails.decode(data)))));
const putViaAxios$2 = (axiosInstance) => (withdrawalId, hexTransactionWitnessSet) => index._function.pipe(HTTP__namespace.Put(axiosInstance)(endpointURI$1(withdrawalId), runtimeCore.transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const endpointURI$1 = (withdrawalId) => `/withdrawals/${encodeURIComponent(runtimeCore.unWithdrawalId(withdrawalId))}`;

const WithdrawalsRange = transaction.fromNewtype(index.lib.string);
const unWithdrawalsRange = transaction.iso().unwrap;
transaction.iso().wrap;
const getHeadersByRangeViaAxios$2 = (axiosInstance) => (rangeOption) => index._function.pipe(HTTP__namespace.GetWithDataAndHeaders(axiosInstance)("/withdrawals", index._function.pipe(rangeOption, withdrawal.Option.match(() => ({}), (range) => ({ headers: { Range: unWithdrawalsRange(range) } })))), TaskEither.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETByRangeRawResponse$2.decode(data)))), TaskEither.map((rawResponse) => ({
    headers: index._function.pipe(rawResponse.data.results, _Array.map((result) => result.resource)),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const GETByRangeRawResponse$2 = index.lib.type({
    data: index.lib.type({
        results: index.lib.array(index.lib.type({
            links: index.lib.type({ contract: index.lib.string, transactions: index.lib.string }),
            resource: withdrawal.WithdrawalHeader,
        })),
    }),
    previousRange: withdrawal.optionFromNullable(WithdrawalsRange),
    nextRange: withdrawal.optionFromNullable(WithdrawalsRange),
});
index.lib.type({
    headers: index.lib.array(withdrawal.WithdrawalHeader),
    previousRange: withdrawal.optionFromNullable(WithdrawalsRange),
    nextRange: withdrawal.optionFromNullable(WithdrawalsRange),
});
const WithdrawalTextEnvelope = index.lib.type({
    withdrawalId: runtimeCore.WithdrawalId,
    tx: runtimeCore.TextEnvelope,
});
const PostResponse$2 = index.lib.type({
    links: index.lib.type({}),
    resource: WithdrawalTextEnvelope,
});
const postViaAxios$2 = (axiosInstance) => (payoutIds, addressesAndCollaterals) => index._function.pipe(HTTP__namespace.Post(axiosInstance)("/withdrawals", { payouts: payoutIds }, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.withdraw-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": runtimeCore.unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": index._function.pipe(addressesAndCollaterals.usedAddresses, _Array.map(runtimeCore.unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": index._function.pipe(addressesAndCollaterals.collateralUTxOs, _Array.map(runtimeCore.unTxOutRef), (a) => a.join(",")),
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(PostResponse$2.decode(data)))), TaskEither.map((payload) => payload.resource));

const RoleName = index.lib.string;
const UsePolicy = languageCoreV1.PolicyId;
const RoleTokenSimple = runtimeCore.AddressBech32;
const TokenMetadataFile = index.lib.type({
    name: index.lib.string,
    src: index.lib.string,
    mediaType: index.lib.string,
});
const TokenMetadata = index.lib.type({
    name: withdrawal.optionFromNullable(index.lib.string),
    image: withdrawal.optionFromNullable(index.lib.string),
    mediaType: index.lib.string,
    description: index.lib.string,
    files: index.lib.array(TokenMetadataFile),
});
const RoleTokenAdvanced = index.lib.type({
    address: runtimeCore.AddressBech32,
    metadata: TokenMetadata,
});
const RoleTokenConfig = index.lib.union([RoleTokenSimple, RoleTokenAdvanced]);
const Mint = index.lib.record(RoleName, RoleTokenConfig);
const RolesConfig = index.lib.union([UsePolicy, Mint]);

const Payout = index.lib.type({ payoutId: runtimeCore.TxOutRef, role: RoleName });
const ContractDetails = index.lib.type({
    contractId: runtimeCore.ContractId,
    roleTokenMintingPolicyId: runtimeCore.PolicyId,
    version: version.MarloweVersion,
    status: withdrawal.TxStatus,
    block: withdrawal.optionFromNullable(runtimeCore.BlockHeader),
    metadata: runtimeCore.Metadata,
    initialContract: languageCoreV1.Contract,
    currentContract: withdrawal.optionFromNullable(languageCoreV1.Contract),
    state: withdrawal.optionFromNullable(state.MarloweState),
    txBody: withdrawal.optionFromNullable(runtimeCore.TextEnvelope),
    utxo: withdrawal.optionFromNullable(runtimeCore.TxOutRef),
    unclaimedPayouts: index.lib.array(Payout),
});

const GETPayload$1 = index.lib.type({ links: index.lib.type({}), resource: ContractDetails });
const getViaAxios$2 = (axiosInstance) => (contractId) => index._function.pipe(HTTP__namespace.Get(axiosInstance)(contractEndpoint(contractId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETPayload$1.decode(data)))), TaskEither.map((payload) => payload.resource));
const putViaAxios$1 = (axiosInstance) => (contractId, hexTransactionWitnessSet) => index._function.pipe(HTTP__namespace.Put(axiosInstance)(contractEndpoint(contractId), runtimeCore.transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const contractEndpoint = (contractId) => `/contracts/${encodeURIComponent(runtimeCore.unContractId(contractId))}`;

const Header$1 = index.lib.type({
    contractId: runtimeCore.ContractId,
    roleTokenMintingPolicyId: runtimeCore.PolicyId,
    version: version.MarloweVersion,
    status: withdrawal.TxStatus,
    block: withdrawal.optionFromNullable(runtimeCore.BlockHeader),
    metadata: runtimeCore.Metadata,
    tags: runtimeCore.Tags,
});

const ContractsRange = transaction.fromNewtype(index.lib.string);
const unContractsRange = transaction.iso().unwrap;
transaction.iso().wrap;
const getHeadersByRangeViaAxios$1 = (axiosInstance) => (rangeOption) => (tags) => index._function.pipe({
    url: "/contracts?" + lib.stringify({ tag: tags }, { indices: false }),
    configs: index._function.pipe(rangeOption, withdrawal.Option.match(() => ({}), (range) => ({ headers: { Range: unContractsRange(range) } }))),
}, ({ url, configs }) => HTTP__namespace.GetWithDataAndHeaders(axiosInstance)(url, configs), TaskEither.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETByRangeRawResponse$1.decode(data)))), TaskEither.map((rawResponse) => ({
    headers: index._function.pipe(rawResponse.data.results, _Array.map((result) => result.resource), _Array.filter((header) => eqSetString(new Set(Object.keys(header.tags)), new Set(tags)))),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const eqSetString = (xs, ys) => xs.size === ys.size && [...xs].every((x) => ys.has(x));
const GETByRangeRawResponse$1 = index.lib.type({
    data: index.lib.type({
        results: index.lib.array(index.lib.type({
            links: index.lib.type({ contract: index.lib.string, transactions: index.lib.string }),
            resource: Header$1,
        })),
    }),
    previousRange: withdrawal.optionFromNullable(ContractsRange),
    nextRange: withdrawal.optionFromNullable(ContractsRange),
});
index.lib.type({
    headers: index.lib.array(Header$1),
    previousRange: withdrawal.optionFromNullable(ContractsRange),
    nextRange: withdrawal.optionFromNullable(ContractsRange),
});
index.lib.intersection([
    index.lib.type({
        contract: languageCoreV1.Contract,
        version: version.MarloweVersion,
        tags: runtimeCore.Tags,
        metadata: runtimeCore.Metadata,
        minUTxODeposit: index.lib.number,
    }),
    index.lib.partial({ roles: RolesConfig }),
]);
const ContractTextEnvelope = index.lib.type({
    contractId: runtimeCore.ContractId,
    tx: runtimeCore.TextEnvelope,
});
const PostResponse$1 = index.lib.type({
    links: index.lib.type({ contract: index.lib.string }),
    resource: ContractTextEnvelope,
});
const postViaAxios$1 = (axiosInstance) => (postContractsRequest, addressesAndCollaterals) => index._function.pipe(HTTP__namespace.Post(axiosInstance)("/contracts", postContractsRequest, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.contract-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": runtimeCore.unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": index._function.pipe(addressesAndCollaterals.usedAddresses, _Array.map(runtimeCore.unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": index._function.pipe(addressesAndCollaterals.collateralUTxOs, _Array.map(runtimeCore.unTxOutRef), (a) => a.join(",")),
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(PostResponse$1.decode(data)))), TaskEither.map((payload) => payload.resource));

const Details = index.lib.type({
    contractId: runtimeCore.ContractId,
    transactionId: transaction.TransactionId,
    continuations: withdrawal.optionFromNullable(languageCoreV1.BuiltinByteString),
    tags: runtimeCore.Tags,
    metadata: runtimeCore.Metadata,
    status: withdrawal.TxStatus,
    block: withdrawal.optionFromNullable(runtimeCore.BlockHeader),
    inputUtxo: runtimeCore.TxOutRef,
    inputs: index.lib.array(languageCoreV1.Input),
    outputUtxo: withdrawal.optionFromNullable(runtimeCore.TxOutRef),
    outputContract: withdrawal.optionFromNullable(languageCoreV1.Contract),
    outputState: withdrawal.optionFromNullable(state.MarloweState),
    consumingTx: withdrawal.optionFromNullable(runtimeCore.TxId),
    invalidBefore: time.ISO8601,
    invalidHereafter: time.ISO8601,
    txBody: withdrawal.optionFromNullable(runtimeCore.TextEnvelope),
});

const GETPayload = index.lib.type({ links: index.lib.type({}), resource: Details });
const getViaAxios$1 = (axiosInstance) => (contractId, transactionId) => index._function.pipe(HTTP__namespace.Get(axiosInstance)(endpointURI(contractId, transactionId), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETPayload.decode(data)))), TaskEither.map((payload) => payload.resource));
const putViaAxios = (axiosInstance) => (contractId, transactionId, hexTransactionWitnessSet) => index._function.pipe(HTTP__namespace.Put(axiosInstance)(endpointURI(contractId, transactionId), runtimeCore.transactionWitnessSetTextEnvelope(hexTransactionWitnessSet), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}));
const endpointURI = (contractId, transactionId) => `/contracts/${index._function.pipe(contractId, runtimeCore.unContractId, encodeURIComponent)}/transactions/${index._function.pipe(transactionId, transaction.unTransactionId, encodeURIComponent)}`;

const Header = index.lib.type({
    contractId: runtimeCore.ContractId,
    transactionId: transaction.TransactionId,
    continuations: withdrawal.optionFromNullable(languageCoreV1.BuiltinByteString),
    tags: runtimeCore.Tags,
    metadata: runtimeCore.Metadata,
    status: withdrawal.TxStatus,
    block: withdrawal.optionFromNullable(runtimeCore.BlockHeader),
    utxo: withdrawal.optionFromNullable(runtimeCore.TxOutRef),
});

const TransactionsRange = transaction.fromNewtype(index.lib.string);
const unTransactionsRange = transaction.iso().unwrap;
transaction.iso().wrap;
const getHeadersByRangeViaAxios = (axiosInstance) => (contractId, rangeOption) => index._function.pipe(HTTP__namespace.GetWithDataAndHeaders(axiosInstance)(transactionsEndpoint(contractId), index._function.pipe(rangeOption, withdrawal.Option.match(() => ({}), (range) => ({ headers: { Range: unTransactionsRange(range) } })))), TaskEither.map(([headers, data]) => ({
    data: data,
    previousRange: headers["prev-range"],
    nextRange: headers["next-range"],
})), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(GETByRangeRawResponse.decode(data)))), TaskEither.map((rawResponse) => ({
    headers: index._function.pipe(rawResponse.data.results, _Array.map((result) => result.resource)),
    previousRange: rawResponse.previousRange,
    nextRange: rawResponse.nextRange,
})));
const GETByRangeRawResponse = index.lib.type({
    data: index.lib.type({
        results: index.lib.array(index.lib.type({ links: index.lib.type({}), resource: Header })),
    }),
    previousRange: withdrawal.optionFromNullable(TransactionsRange),
    nextRange: withdrawal.optionFromNullable(TransactionsRange),
});
index.lib.type({
    headers: index.lib.array(Header),
    previousRange: withdrawal.optionFromNullable(TransactionsRange),
    nextRange: withdrawal.optionFromNullable(TransactionsRange),
});
const TransactionTextEnvelope = index.lib.type({
    contractId: runtimeCore.ContractId,
    transactionId: transaction.TransactionId,
    tx: runtimeCore.TextEnvelope,
});
const postViaAxios = (axiosInstance) => (contractId, postTransactionsRequest, addressesAndCollaterals) => index._function.pipe(HTTP__namespace.Post(axiosInstance)(transactionsEndpoint(contractId), postTransactionsRequest, {
    headers: {
        Accept: "application/vendor.iog.marlowe-runtime.apply-inputs-tx-json",
        "Content-Type": "application/json",
        "X-Change-Address": runtimeCore.unAddressBech32(addressesAndCollaterals.changeAddress),
        "X-Address": index._function.pipe(addressesAndCollaterals.usedAddresses, _Array.map(runtimeCore.unAddressBech32), (a) => a.join(",")),
        "X-Collateral-UTxO": index._function.pipe(addressesAndCollaterals.collateralUTxOs, _Array.map(runtimeCore.unTxOutRef), (a) => a.join(",")),
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(PostResponse.decode(data)))), TaskEither.map((payload) => payload.resource));
index.lib.intersection([
    index.lib.type({
        version: version.MarloweVersion,
        inputs: index.lib.array(languageCoreV1.Input),
        metadata: runtimeCore.Metadata,
        tags: runtimeCore.Tags,
    }),
    index.lib.partial({ invalidBefore: time.ISO8601 }),
    index.lib.partial({ invalidHereafter: time.ISO8601 }),
]);
const PostResponse = index.lib.type({
    links: index.lib.type({ transaction: index.lib.string }),
    resource: TransactionTextEnvelope,
});
const transactionsEndpoint = (contractId) => `/contracts/${encodeURIComponent(runtimeCore.unContractId(contractId))}/transactions`;

const getViaAxios = (axiosInstance) => (contractId) => (environment) => (parties) => index._function.pipe(HTTP__namespace.Get(axiosInstance)(contractNextEndpoint(contractId) +
    `?validityStart=${environment.validityStart}&validityEnd=${environment.validityEnd}` +
    lib.stringify({ party: parties }, { indices: false }), {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
}), TaskEither.chainW((data) => TaskEither.fromEither(index.Either.mapLeft(src$1.formatValidationErrors)(next.Next.decode(data)))));
const contractNextEndpoint = (contractId) => `/contracts/${encodeURIComponent(runtimeCore.unContractId(contractId))}/next`;

const mkRestClient = (baseURL) => index._function.pipe(axios$1.create({
    baseURL: baseURL,
    transformRequest: codec.MarloweJSONCodec.encode,
    transformResponse: codec.MarloweJSONCodec.decode,
}), 
//  , (axiosInstance) => {curlirize(axiosInstance) ;return axiosInstance }
(axiosInstance) => ({
    healthcheck: () => HTTP__namespace.Get(axiosInstance)("/healthcheck"),
    payouts: {
        getHeadersByRange: getHeadersByRangeViaAxios$3(axiosInstance),
        get: getViaAxios$4(axiosInstance),
    },
    withdrawals: {
        getHeadersByRange: getHeadersByRangeViaAxios$2(axiosInstance),
        post: postViaAxios$2(axiosInstance),
        withdrawal: {
            get: getViaAxios$3(axiosInstance),
            put: putViaAxios$2(axiosInstance),
        },
    },
    contracts: {
        getHeadersByRange: getHeadersByRangeViaAxios$1(axiosInstance),
        post: postViaAxios$1(axiosInstance),
        contract: {
            get: getViaAxios$2(axiosInstance),
            put: putViaAxios$1(axiosInstance),
            next: getViaAxios(axiosInstance),
            transactions: {
                getHeadersByRange: getHeadersByRangeViaAxios(axiosInstance),
                post: postViaAxios(axiosInstance),
                transaction: {
                    get: getViaAxios$1(axiosInstance),
                    put: putViaAxios(axiosInstance),
                },
            },
        },
    },
}));

exports.Available = withdrawal.Available;
exports.PayoutHeader = withdrawal.PayoutHeader;
exports.PayoutStatus = withdrawal.PayoutStatus;
exports.WithdrawalDetails = withdrawal.WithdrawalDetails;
exports.WithdrawalHeader = withdrawal.WithdrawalHeader;
exports.Withdrawn = withdrawal.Withdrawn;
exports.Assets = Assets;
exports.ContractDetails = ContractDetails;
exports.Header = Header$1;
exports.Mint = Mint;
exports.Payout = Payout;
exports.PayoutDetails = PayoutDetails;
exports.RoleName = RoleName;
exports.RoleTokenAdvanced = RoleTokenAdvanced;
exports.RoleTokenConfig = RoleTokenConfig;
exports.RoleTokenSimple = RoleTokenSimple;
exports.RolesConfig = RolesConfig;
exports.TokenMetadata = TokenMetadata;
exports.TokenMetadataFile = TokenMetadataFile;
exports.Tokens = Tokens;
exports.UsePolicy = UsePolicy;
exports.mkRestClient = mkRestClient;
