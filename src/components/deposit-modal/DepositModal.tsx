import { useFormik } from 'formik';
import * as yup from 'yup';
import { Contract, ethers } from 'ethers';
import {getContract} from '../../utils/common';
import {address, compoundAddress} from '../../constants';
import fanPool from '../../abis/Fanpool.json'
import {useState} from 'react';
import Loader from '../loader';

interface Props {
  creator: string;
  creatorAddress: string;
  onDismiss: () => void
}

function DepositModal(props: Props) {
  // eslint-disable-next-line
  const [recievedReceipt, setRecievedReceipt] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const depositSchema = yup.object().shape({
    deposit: yup.number().positive('Only positive numbers').required('Deposit is required'),
  });

  const formik = useFormik({
    initialValues: {
      deposit: '',
    },
    validationSchema: depositSchema,
    onSubmit: values => {
      
      const depositEth = async () => {
        if (typeof window?.ethereum != undefined) {  
          const fanpoolContract: Contract = getContract(address, fanPool);
          let overrides = {
            // To convert Ether to Wei:
            value: ethers.utils.parseEther(values.deposit)     // ether in this case MUST be a string
        
            // Or you can use Wei directly if you have that:
            // value: someBigNumber
            // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
            // value: "1234567890"
            // value: "0x1234"
        
            // Or, promises are also supported:
            // value: provider.getBalance(addr)
        };

        console.log(overrides);

          try {
            console.log('creator', props.creatorAddress, overrides)
            console.log('compound', compoundAddress, overrides)
            console.log(overrides)
            setLoading((state) => !state);
            let transaction = await fanpoolContract.deposit(props.creatorAddress, compoundAddress, overrides);
            let receipt = await transaction.wait();
            console.log(recievedReceipt)
            setRecievedReceipt(() => receipt);
            setLoading((state) => !state);
            
          } catch (err){
            console.log(err);
          }
        }
      }
      depositEth();
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
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Deposit eth to {props.creator}
                </h3>
                  {!loading && 
                    <form className="mt-8 p-2 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity in eth.</label>
                        <input id="deposit" name="deposit" type="text" onChange={formik.handleChange} value={formik.values.deposit} className="appearance-none relative block w-full mt-2 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm" placeholder="Eth quantity" />
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {formik.errors.deposit}
                        </span>
                      </div>
                    </div>
                    <div>
                    </div>
                  </form>
                  
                  }
                  {loading && <div className="flex content-evenly"><Loader fullScreen={false}/></div>}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={() => formik.handleSubmit()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Deposit
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

export default DepositModal;