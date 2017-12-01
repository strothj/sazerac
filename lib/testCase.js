'use strict';

exports.__esModule = true;
exports.newTestCase = undefined;

var _actions = require('./reducers/actions');

var _actions2 = _interopRequireDefault(_actions);

var _expectationTypes = require('./expectationTypes');

var _expectationTypes2 = _interopRequireDefault(_expectationTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Creates a new test case object */
var newTestCase = function newTestCase(caseIndex) {
  return {
    ___caseIndex: caseIndex,

    /**
     * Defines the expected return value for this test case. 
     * Uses http://chaijs.com, assert.deepEqual() to assert
     * that the expected return value equals the actual
     * return value.
     * 
     * @param {object} expectation - The expected return value
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case object
     */
    expect: testCaseFn({ caseIndex: caseIndex, expectationType: _expectationTypes2.default.VALUE }, 'setCaseExpectation', ['expectation', 'message']),

    /**
     * Defines an expected error to be thrown when this test case is executed.
     * 
     * @param {object} expectation - The expected message from the error thrown
     * @param {string} message - A message to describe the test case expectation
     *
     * @returns {object} A test case object
     */
    expectError: testCaseFn({ caseIndex: caseIndex, expectationType: _expectationTypes2.default.ERROR }, 'setCaseExpectation', ['expectation', 'message']),

    /**
     * Defines the "describe" message for this test case.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    describe: testCaseFn({ caseIndex: caseIndex }, 'setCaseDescribeMessage', 'message'),

    /**
     * Defines the "should" message for this test case. This is
     * passed to the `it` function when executing the test.
     * 
     * @param {string} message
     *
     * @returns {object} A test case object
     */
    should: testCaseFn({ caseIndex: caseIndex }, 'setCaseShouldMessage', 'message'),

    /**
     * Defines a custom assertion function for this test case
     * 
     * @param {string} message - A message describing the assertion
     * @param {function} assertFn - The custom assert function. Receives
     *                              the actual return value of the function
     *                              being tested as its only argument
     *
     * @returns {object} A test case object
     */
    assert: testCaseFn({ caseIndex: caseIndex }, 'addCaseAssertion', ['message', 'assertFn']),

    /**
     * Adds a function to run before test case is executed
     * 
     * @param {function} beforeFn
     *
     * @returns {object} A test case object
     */
    before: testCaseFn({ caseIndex: caseIndex }, 'addCaseBeforeFn', 'beforeFn'),

    /**
     * Adds a function to run after test case is executed
     * 
     * @param {function} afterFn
     *
     * @returns {object} A test case object
     */
    after: testCaseFn({ caseIndex: caseIndex }, 'addCaseAfterFn', 'afterFn')
  };
};

var testCaseFn = function testCaseFn(actionArgs, action, paramNames) {
  var args = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  paramNames = Array.isArray(paramNames) ? paramNames : [paramNames];
  var caseIndex = actionArgs.caseIndex;

  return function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    paramNames.forEach(function (n, i) {
      actionArgs[n] = params[i];
    });
    _actions2.default[action](actionArgs);
    return newTestCase(caseIndex);
  };
};

exports.newTestCase = newTestCase;
exports.default = newTestCase;