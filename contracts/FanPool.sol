// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface CEth {
    function mint() external payable;

    function exchangeRateCurrent() external returns (uint256);

    function supplyRatePerBlock() external returns (uint256);

    function redeem(uint256) external returns (uint256);

    function redeemUnderlying(uint256) external returns (uint256);
}

contract FanPool {
    struct Creator {
        string Name;
        uint256 TotalDeposits;
    }

    event MyLog(string, uint256);
    mapping(address => Creator) public creators;
    mapping(address => mapping(address => uint256)) public creatorPool;

    function onBoardCreators(string memory name) public returns (bool) {
        Creator memory newCreator = Creator(name, 0);
        creators[msg.sender] = newCreator;
        return true;
    }

    function deposit(address creatorAddress, address payable _cEtherContract)
        public
        payable
        returns (bool)
    {
        creatorPool[creatorAddress][msg.sender] += msg.value;
        return supplyEthToCompound(_cEtherContract, msg.value);
    }

    function withdraw(
        address creatorAddress,
        uint256 amount,
        address payable _cEtherContract
    ) public {
        creatorPool[creatorAddress][msg.sender] -= amount;
        redeemCEth(amount, false, _cEtherContract);
        address payable to = payable(msg.sender);
        to.transfer(amount);
    }

    function checkPoolBalanceByUser(address creatorAddress)
        public
        view
        returns (uint256)
    {
        return creatorPool[creatorAddress][msg.sender];
    }

    function checkPoolBalanceByCreator(address creatorAddress)
        public
        view
        returns (uint256)
    {
        return creatorPool[creatorAddress][msg.sender];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function supplyEthToCompound(
        address payable _cEtherContract,
        uint256 amount
    ) private returns (bool) {
        CEth cToken = CEth(_cEtherContract);

        // Amount of current exchange rate from cToken to underlying
        uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
        emit MyLog("Exchange Rate (scaled up by 1e18): ", exchangeRateMantissa);

        // Amount added to you supply balance this block
        uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
        emit MyLog("Supply Rate: (scaled up by 1e18)", supplyRateMantissa);

        cToken.mint{value: amount, gas: 250000}();
        return true;
    }

    function redeemCEth(
        uint256 amount,
        bool redeemType,
        address _cEtherContract
    ) private returns (bool) {
        CEth cToken = CEth(_cEtherContract);

        // `amount` is scaled up by 1e18 to avoid decimals
        uint256 redeemResult;

        if (redeemType == true) {
            // Retrieve your asset based on a cToken amount
            redeemResult = cToken.redeem(amount);
        } else {
            // Retrieve your asset based on an amount of the asset
            redeemResult = cToken.redeemUnderlying(amount);
        }

        // Error codes are listed here:
        // https://compound.finance/docs/ctokens#ctoken-error-codes
        emit MyLog("If this is not 0, there was an error", redeemResult);

        return true;
    }

    fallback() external payable {}

    // This is needed to receive ETH to wallet
    receive() external payable {}
}
