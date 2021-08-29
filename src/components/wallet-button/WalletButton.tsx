import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'

interface Props {
  account: string
}

function WalletButton(props: Props) {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const ens = useLookupAddress()


    return(
      <div>
        {!account && <button className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300" onClick={() => activateBrowserWallet()}>Connect Wallet</button>}
        {account && 
          <>
            <button className="py-2 px-2 font-medium text-white bg-green-700 rounded hover:bg-green-600 transition duration-300" onClick={deactivate}> Disconnect {ens ?? shortenAddress(account)} </button>
          </>
        } 
      </div>
    );
}

export default WalletButton;