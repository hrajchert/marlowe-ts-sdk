'use strict';

var index = require('./index-d60f2db2.js');
var close = require('./close-d47808f5.js');
var account = require('./account-4a932762.js');
var choice = require('./choice-44bccdc2.js');
var party = require('./party-f41b74ec.js');
var token = require('./token-84874636.js');
var tokenValue = require('./tokenValue.js');

const Assert = index.lib.recursion("Assert", () => index.lib.type({ assert: account.Observation, then: Contract }));

const If = index.lib.recursion("If", () => index.lib.type({ if: account.Observation, then: Contract, else: Contract }));

const Let = index.lib.recursion("Let", () => index.lib.type({ let: account.ValueId, be: account.Value, then: Contract }));

const Payee = index.lib.union([
    index.lib.type({ account: account.AccountId }),
    index.lib.type({ party: party.Party }),
]);

const Pay = index.lib.recursion("Pay", () => index.lib.type({
    pay: account.Value,
    token: token.Token,
    from_account: account.AccountId,
    to: Payee,
    then: Contract,
}));

const Deposit = index.lib.recursion("Deposit", () => index.lib.type({
    party: party.Party,
    deposits: account.Value,
    of_token: token.Token,
    into_account: account.AccountId,
}));

const Notify = index.lib.recursion("Notify", () => index.lib.type({ notify_if: account.Observation }));

const Action = index.lib.recursion("Action", () => index.lib.union([Deposit, choice.Choice, Notify]));

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
var getUnixTime = /*@__PURE__*/index.getDefaultExportFromCjs(getUnixTimeExports);

const When = index.lib.recursion("When", () => index.lib.type({
    when: index.lib.array(Case),
    timeout: Timeout,
    timeout_continuation: Contract,
}));
const Case = index.lib.recursion("Case", () => index.lib.type({ case: Action, then: Contract }));
const Timeout = index.lib.bigint;
const datetoTimeout = (date) => index._function.pipe(date, getUnixTime, (a) => a * 1000, BigInt, (a) => a.valueOf());

const Contract = index.lib.recursion("Contract", () => index.lib.union([close.Close, Pay, If, When, Let, Assert]));

const inputNotify = "input_notify";
const InputNotify = index.lib.literal("input_notify");

const ChosenNum = index.lib.bigint;
const InputChoice = index.lib.type({
    for_choice_id: account.ChoiceId,
    input_that_chooses_num: ChosenNum,
});

const InputDeposit = index.lib.type({
    input_from_party: party.Party,
    that_deposits: index.lib.bigint,
    of_token: token.Token,
    into_account: account.AccountId,
});

const BuiltinByteString = index.lib.string;
const InputContent = index.lib.union([InputDeposit, InputChoice, InputNotify]);
const NormalInput = InputContent;
const MerkleizedInput = index.lib.intersection([
    InputContent,
    index.lib.partial({
        continuation_hash: BuiltinByteString,
        merkleized_continuation: Contract,
    }),
]);
const Input = index.lib.union([NormalInput, MerkleizedInput]);

exports.Close = close.Close;
exports.close = close.close;
exports.Accounts = account.Accounts;
exports.Value = account.Value;
exports.PolicyId = token.PolicyId;
exports.Token = token.Token;
exports.TokenName = token.TokenName;
exports.token = token.token;
exports.tokenToString = token.tokenToString;
exports.TokenValue = tokenValue.TokenValue;
exports.adaValue = tokenValue.adaValue;
exports.tokenValue = tokenValue.tokenValue;
exports.Action = Action;
exports.Assert = Assert;
exports.BuiltinByteString = BuiltinByteString;
exports.Contract = Contract;
exports.If = If;
exports.Input = Input;
exports.Let = Let;
exports.Pay = Pay;
exports.When = When;
exports.datetoTimeout = datetoTimeout;
exports.inputNotify = inputNotify;
