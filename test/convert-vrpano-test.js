/**
 * Created by KIMSEONHO on 2015-09-17.
 */
var assert = require('assert');
var vrpano = require('../modules/convert-vrpano');

suite('convert-vrpano', function() {
    suiteSetup(function() {
        // excuted before test suite
    });

    suiteTeardown(function() {
        // excuted after test suite
    });

    setup(function() {
        // excuted before every test
    });

    teardown(function() {
        // excuted before every test
    });

    suite('vrpano()', function() {
        test('should return 0 when convert success', function() {
            // write test logic
            var imagePath = './test/resources/20150914155834.jpg';
            assert.equal(vrpano(imagePath), 0);
        });

		test('should return 1 when imagePath null', function() {
            // write test logic
            var imagePath;
            assert.equal(vrpano(imagePath), 1);
        });
    });
});