'use strict';

var assert = require('assert');
var path = require('path');

var driverPath = path.join(__dirname, '..');
var runner = require('ruff-driver-runner');

require('t');

describe('Button GPIO Driver', function () {
    var button;
    var gpio;

    before(function (done) {
        runner.run(driverPath, function (device, context) {
            button = device;
            gpio = context.arg('gpio');
            done();
        });
    });

    afterEach(function (done) {
        setTimeout(function () {
            button.removeAllListeners();
            done();
        }, 10);
    });

    describe('Events', function () {
        it('should emit `push` event', function (done) {
            button.once('push', function () {
                done();
            });

            gpio.emit('interrupt', 0 /* pushed */);
        });

        it('should emit `release` event', function (done) {
            button.once('release', function () {
                done();
            });

            gpio.emit('interrupt', 1 /* released */);
        });

        it('should not emit `push` event continuously', function (done) {
            button.on('push', function () {
                done();
            });

            gpio.emit('interrupt', 0 /* pushed */);
            gpio.emit('interrupt', 0 /* pushed */);
        });

        it('should not emit `release` event continuously', function (done) {
            button.on('release', function () {
                done();
            });

            gpio.emit('interrupt', 1 /* released */);
            gpio.emit('interrupt', 1 /* released */);
        });
    });

    describe('States', function () {
        /* eslint-disable no-console, no-unreachable */
        console.warn('SKIPPING STATES TEST');
        return;

        it('should be pushed after `push` event', function (done) {
            button.once('push', function () {
                assert(button.pushed);
                done();
            });

            gpio.emit('interrupt', 0 /* pushed */);
        });

        it('should be released after `release` event', function (done) {
            button.once('release', function () {
                assert(button.released);
                done();
            });

            gpio.emit('interrupt', 1 /* released */);
        });
    });
});
