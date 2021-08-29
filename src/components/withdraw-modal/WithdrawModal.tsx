import { useFormik } from 'formik';
import * as yup from 'yup';
import { Contract, ethers, BigNumber } from 'ethers';
import {getContract} from '../../utils/common';
import {address, compoundAddress} from '../../constants';
import fanPool from '../../abis/Fanpool.json'
import {useState} from 'react';
import Loader from '../loader';
import {useEthers} from '@usedapp/core'
import { useEffect } from 'react';


interface Props {
  creator: string;
  creatorAddress: string;
  onDismiss: () => void;
  maxFanCanWithdraw: string;
}

function WithdrawModal(props: Props) {
    const { account } = useEthers();
    const [accountType, setAccountType] = useState('Fan');
    const [recievedReceipt, setRecievedReceipt] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const value = BigNumber.from(props.maxFanCanWithdraw);


  const withDrawSchema = yup.object().shape({
    withdraw: yup.number().positive('Only positive numbers').required('Withdraw is required'),
  });

  useEffect(() => {
    let accountType = props.creatorAddress === account ? 'Creator' : 'Fan';
    setAccountType(accountType);
  }, [account, accountType, props.creatorAddress]) 

  const formik = useFormik({
    initialValues: {
      withdraw: '',
    },
    validationSchema: withDrawSchema,
    onSubmit: values => {
      const withDrawEth = async () => {
        if (typeof window?.ethereum != undefined) {  
          const fanpoolContract: Contract = getContract(address, fanPool);

          try {
            console.log('creator', props.creatorAddress, fanpoolContract)
            console.log('compound', compoundAddress)
            setLoading((state) => !state);
            let transaction = await fanpoolContract.withdraw(props.creatorAddress, ethers.utils.parseEther(values.withdraw), compoundAddress);
            let receipt = await transaction.wait();
            setRecievedReceipt(() => receipt);
            console.log(receipt)
            setLoading((state) => !state);
            props.onDismiss();
          } catch (err){
            console.log(err);
          }
        }
      }
      withDrawEth();
    },
  });

  return (
    <>
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center  sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-md leading-6 font-medium text-gray-900" id="modal-title">
                    {accountType === 'Fan' ? `Withdrawing your from ${props.creator}'s pool: Max: ${ethers.utils.formatEther(value)} ETH` : `Withdrawing yeild for your pool`}
                </h3>
                  {!loading && 
                    <form className="mt-8 p-2 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity in eth.</label>
                        <input id="withdraw" name="withdraw" type="text" onChange={formik.handleChange} value={formik.values.withdraw} className="appearance-none relative block w-full mt-2 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm" placeholder="Eth quantity" />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formik.errors.withdraw}
                        </span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </form>
                  }
                  {loading && <div className="flex"><div className="flex-1 justify-center"><Loader fullScreen={false}/></div></div>}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={() => formik.handleSubmit()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              {accountType} Withdraw
            </button>
            <button type="button" onClick={props.onDismiss} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default WithdrawModal;