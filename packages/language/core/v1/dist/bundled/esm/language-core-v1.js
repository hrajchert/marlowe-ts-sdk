import { l as lib, g as getDefaultExportFromCjs, _ as _function } from './index-ca7ac053.js';
import { C as Close } from './close-76c8b0ab.js';
export { c as close } from './close-76c8b0ab.js';
import { O as Observation, V as ValueId, a as Value, A as AccountId, C as ChoiceId } from './account-c787daee.js';
export { b as Accounts } from './account-c787daee.js';
import { C as Choice } from './choice-630ae815.js';
import { P as Party } from './party-2b7ee6d1.js';
import { T as Token } from './token-e1a1eafb.js';
export { P as PolicyId, a as TokenName, b as token, t as tokenToString } from './token-e1a1eafb.js';
export { TokenValue, adaValue, tokenValue } from './tokenValue.js';

const Assert = lib.recursion("Assert", () => lib.type({ assert: Observation, then: Contract }));

const If = lib.recursion("If", () => lib.type({ if: Observation, then: Contract, else: Contract }));

const Let = lib.recursion("Let", () => lib.type({ let: ValueId, be: Value, then: Contract }));

const Payee = lib.union([
    lib.type({ account: AccountId }),
    lib.type({ party: Party }),
]);

const Pay = lib.recursion("Pay", () => lib.type({
    pay: Value,
    token: Token,
    from_account: AccountId,
    to: Payee,
    then: Contract,
}));

const Deposit = lib.recursion("Deposit", () => lib.type({
    party: Party,
    deposits: Value,
    of_token: Token,
    into_account: AccountId,
}));

const Notify = lib.recursion("Notify", () => lib.type({ notify_if: Observation }));

const Action = lib.recursion("Action", () => lib.union([Deposit, Choice, Notify]));

var getUnixTime$1 = {exports: {}};

var getTime = {exports: {}};

var toDate = {exports: {}};

var requiredArgs = {exports: {}};

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = requiredArgs;

	function requiredArgs(required, args) {
	  if (args.length < required) {
	    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
	  }
	}

	module.exports = exports.default; 
} (requiredArgs, requiredArgs.exports));

var requiredArgsExports = requiredArgs.exports;

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toDate;

	var _index = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	/**
	 * @name toDate
	 * @category Common Helpers
	 * @summary Convert the given argument to an instance of Date.
	 *
	 * @description
	 * Convert the given argument to an instance of Date.
	 *
	 * If the argument is an instance of Date, the function returns its clone.
	 *
	 * If the argument is a number, it is treated as a timestamp.
	 *
	 * If the argument is none of the above, the function returns Invalid Date.
	 *
	 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	 *
	 * @param {Date|Number} argument - the value to convert
	 * @returns {Date} the parsed date in the local time zone
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Clone the date:
	 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
	 * //=> Tue Feb 11 2014 11:30:30
	 *
	 * @example
	 * // Convert the timestamp to date:
	 * const result = toDate(1392098430000)
	 * //=> Tue Feb 11 2014 11:30:30
	 */
	function toDate(argument) {
	  (0, _index.default)(1, arguments);
	  var argStr = Object.prototype.toString.call(argument); // Clone the date

	  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || argStr === '[object Number]') {
	    return new Date(argument);
	  } else {
	    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
	      // eslint-disable-next-line no-console
	      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

	      console.warn(new Error().stack);
	    }

	    return new Date(NaN);
	  }
	}

	module.exports = exports.default; 
} (toDate, toDate.exports));

var toDateExports = toDate.exports;

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getTime;

	var _index = _interopRequireDefault(toDateExports);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name getTime
	 * @category Timestamp Helpers
	 * @summary Get the milliseconds timestamp of the given date.
	 *
	 * @description
	 * Get the milliseconds timestamp of the given date.
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the timestamp
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Get the timestamp of 29 February 2012 11:45:05.123:
	 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
	 * //=> 1330515905123
	 */
	function getTime(dirtyDate) {
	  (0, _index2.default)(1, arguments);
	  var date = (0, _index.default)(dirtyDate);
	  var timestamp = date.getTime();
	  return timestamp;
	}

	module.exports = exports.default; 
} (getTime, getTime.exports));

var getTimeExports = getTime.exports;

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getUnixTime;

	var _index = _interopRequireDefault(getTimeExports);

	var _index2 = _interopRequireDefault(requiredArgsExports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @name getUnixTime
	 * @category Timestamp Helpers
	 * @summary Get the seconds timestamp of the given date.
	 *
	 * @description
	 * Get the seconds timestamp of the given date.
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the timestamp
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Get the timestamp of 29 February 2012 11:45:05 CET:
	 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
	 * //=> 1330512305
	 */
	function getUnixTime(dirtyDate) {
	  (0, _index2.default)(1, arguments);
	  return Math.floor((0, _index.default)(dirtyDate) / 1000);
	}

	module.exports = exports.default; 
} (getUnixTime$1, getUnixTime$1.exports));

var getUnixTimeExports = getUnixTime$1.exports;
var getUnixTime = /*@__PURE__*/getDefaultExportFromCjs(getUnixTimeExports);

const When = lib.recursion("When", () => lib.type({
    when: lib.array(Case),
    timeout: Timeout,
    timeout_continuation: Contract,
}));
const Case = lib.recursion("Case", () => lib.type({ case: Action, then: Contract }));
const Timeout = lib.bigint;
const datetoTimeout = (date) => _function.pipe(date, getUnixTime, (a) => a * 1000, BigInt, (a) => a.valueOf());

const Contract = lib.recursion("Contract", () => lib.union([Close, Pay, If, When, Let, Assert]));

const inputNotify = "input_notify";
const InputNotify = lib.literal("input_notify");

const ChosenNum = lib.bigint;
const InputChoice = lib.type({
    for_choice_id: ChoiceId,
    input_that_chooses_num: ChosenNum,
});

const InputDeposit = lib.type({
    input_from_party: Party,
    that_deposits: lib.bigint,
    of_token: Token,
    into_account: AccountId,
});

const BuiltinByteString = lib.string;
const InputContent = lib.union([InputDeposit, InputChoice, InputNotify]);
const NormalInput = InputContent;
const MerkleizedInput = lib.intersection([
    InputContent,
    lib.partial({
        continuation_hash: BuiltinByteString,
        merkleized_continuation: Contract,
    }),
]);
const Input = lib.union([NormalInput, MerkleizedInput]);

export { Action, Assert, BuiltinByteString, Close, Contract, If, Input, Let, Pay, Token, Value, When, datetoTimeout, inputNotify };
