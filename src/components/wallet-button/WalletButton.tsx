import { useState } from "react";
import { requestAccount } from '../../utils/common'

interface Props {
  account: string
  onAccountAdded: (account: string) => void;
}

function WalletButton(props: Props) {
  const [account, setAccount] = useState('')
  async function handleConnect() {
    requestAccount().then((accounts) => {
      setAccount(accounts[0]);
      props.onAccountAdded(accounts[0])
    })
      
  }
    return(
      <div>
        {!account && <button className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300" onClick={() => handleConnect()}>Connect Wallet</button>}
        {account && 
          <>
            <span className="py-2 px-2 font-medium text-white bg-green-700 rounded hover:bg-green-600 transition duration-300"> { `${account?.slice(0, 5)}...${account?.slice(-4)}`} </span>
          </>
        } 
      </div>
    );
}

export default WalletButton;