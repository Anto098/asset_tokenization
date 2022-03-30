const Token = artifacts.require("MyToken.sol");
const TokenSale = artifacts.require("MyTokenSale.sol");
const KycContract = artifacts.require("KycContract.sol");

const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path:"../.env"}); // this require will make the object that was required accessible via `process.env`


contract("TokenSale Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts; // javascript will automatically take the first 3 elements
    
    it("the deployerAccount should not hold any tokens", async() => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the tokenSale Smart Contract by default", async () => {
        let instance = await Token.deployed();
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    });

    it("Should be possible to buy tokens", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        await kycInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        await expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return await expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });


})