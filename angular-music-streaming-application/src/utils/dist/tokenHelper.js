"use strict";
exports.__esModule = true;
exports.generateToken = void 0;
exports.generateToken = function () {
    var charsForTokenConstruction = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var tokenArray = [];
    for (var i = 0; i < 32; i++) {
        var randomCharacterIndex = (Math.random() * (charsForTokenConstruction.length - 1)).toFixed(0);
        tokenArray[i] = charsForTokenConstruction[randomCharacterIndex];
    }
    return tokenArray.join("");
};
