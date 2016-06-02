/*!
 * Copyright (c) 2016 Nanchao Inc.
 * All rights reserved.
 */

'use strict';

var driver = require('ruff-driver');
var util = require('util');

var ButtonState = {
    pushed: 0,
    released: 1
};

var prototype = {
    isPressed: util.deprecate(function () {
        return ButtonState.pushed === this._state;
    }, 'Method `isPressed()` is deprecated, use property `pushed` instead.')
};

Object.defineProperties(prototype, {
    pushed: {
        get: function () {
            return this._state === ButtonState.pushed;
        }
    },
    released: {
        get: function () {
            return this._state === ButtonState.released;
        }
    }
});

module.exports = driver({
    attach: function (inputs) {
        var that = this;

        this._gpio = inputs.getRequired('gpio');
        this._state = ButtonState.released;

        this._gpio.on('interrupt', function (state) {
            if (that._state === state) {
                return;
            }

            that._state = state;

            if (state === ButtonState.pushed) {
                that.emit('push');
            } else {
                that.emit('release');
            }
        });
    },
    exports: prototype
});
