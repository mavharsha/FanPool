import { useEthers } from "@usedapp/core";

function WalletButton() {
  const { activateBrowserWallet, account, deactivate } = useEthers();

    return(
      <div>
        {!account && <button className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300" onClick={() => activateBrowserWallet()}>Connect Wallet</button>}
        {account && 
          <>
            <button className="py-2 px-2 font-medium text-white bg-green-700 rounded hover:bg-green-600 transition duration-300" onClick={() => deactivate()}>Disconnect { `${account?.slice(0, 5)}...${account?.slice(-4)}`} </button>
          </>
        } 
      </div>
    );
}

export default WalletButton;