'use strict';

var EventEmitter = require('events');
var assert = require('assert');
var mock = require('ruff-mock');

var Device = require('../');

var ButtonState = {
    pushed: 0,
    released: 1
};

require('t');

describe('Button GPIO Driver', function () {
    var button;
    var gpio;

    before(function () {
        gpio = mock(new EventEmitter());
        button = new Device({
            gpio: gpio
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

            gpio.emit('interrupt', ButtonState.pushed);
        });

        it('should emit `release` event', function (done) {
            button.once('release', function () {
                done();
            });

            gpio.emit('interrupt', ButtonState.released);
        });

        it('should not emit `push` event continuously', function (done) {
            button.on('push', function () {
                done();
            });

            gpio.emit('interrupt', ButtonState.pushed);
            gpio.emit('interrupt', ButtonState.pushed);
        });

        it('should not emit `release` event continuously', function (done) {
            button.on('release', function () {
                done();
            });

            gpio.emit('interrupt', ButtonState.released);
            gpio.emit('interrupt', ButtonState.released);
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

            gpio.emit('interrupt', ButtonState.pushed);
        });

        it('should be released after `release` event', function (done) {
            button.once('release', function () {
                assert(button.released);
                done();
            });

            gpio.emit('interrupt', ButtonState.released);
        });
    });
});
