"use strict";
var chai = require("chai");
const BN = web3.utils.BN; // big number
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

module.exports = chai;