import { Contract } from 'ethers';
import { useFormik } from 'formik';
import { useState } from 'react';
import fanPool from "../../abis/Fanpool.json";
import { requestAccount, getContract } from '../../utils/common';
import {address} from '../../constants'
import Loader from '../loader';
import {useHistory} from 'react-router-dom';
import {useCallback} from 'react';

declare global {
  interface Window {
    ethereum: any;
  }
}

interface Props {
  account: string;
}

 

function OnBoardCreator(props: Props) {
  const [recievedReceipt, setRecievedReceipt] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const goHome = useCallback(() => history.push('/'), [history]);


  const onBoardUser = async (username: string, social: string) => {
    if (typeof window?.ethereum != undefined) {
      await requestAccount();
      const fanpoolContract: Contract = getContract(address, fanPool);
      try {
        setLoading((state) => !state);
        let transaction = await fanpoolContract.onBoardCreator(username, social)
        let receipt = await transaction.wait();
        setRecievedReceipt(() => receipt);
        setLoading((state) => !state)
        formik.resetForm()
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      social: ''
    },
    onSubmit: values => {
      onBoardUser(values.name, values.social);
    },
  });

return (
  <>
  {loading && <Loader fullScreen={true}/>}
    <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
            <div className="font-bold text-white text-center opacity-70 text-xl" onClick={goHome}>Creator! Welcome to FanPool!</div> 
            <div className="font-light text-white text-center opacity-70 text-mg">Fill in the form to creator your own FANPOOL.</div>                  

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="block text-sm font-medium text-white text-opacity-80">Name</label>
              <input id="name" name="name" type="text" onChange={formik.handleChange} value={formik.values.name} className="appearance-none relative block w-full mt-2 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm" placeholder="Creator name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white text-opacity-80">Social</label>
              <input id="social" name="social" type="text" onChange={formik.handleChange} value={formik.values.social} className="appearance-none relative block w-full mt-2 mb-2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm" placeholder="Creator social" />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-900">
              Save
            </button>
            <div className="text-grey-900 mt-10 bg-white bg-opacity-70 p-6 rounded-md w-fill">
              <div className="font-bold items-center text-black text-opacity-70">Transaction details </div>
            <div className="text-xs pt-2 pb-2 break-all">To: {recievedReceipt ? recievedReceipt?.to  : ''}</div>
            <div className="text-xs pt-2 pb-2 break-all">From: {recievedReceipt ? recievedReceipt?.from  : ''}</div>
            <div className="text-xs pt-2 pb-2 break-all">Hash: {recievedReceipt ? recievedReceipt?.transactionHash  : ''}</div>
            </div>
            
          </div>
        </form>
      </div>
    </div>
    
  </>
)
}

export default OnBoardCreator;


/*
<form onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="name"
                  name="Name"
                  className="rounded text-pink-500"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />

                <button type="submit">Submit</button>
              </form>



              <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={formik.handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>





              */