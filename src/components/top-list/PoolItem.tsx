import { useState } from "react";
import DepositModal from "../deposit-modal";
import WithdrawModal from "../withdraw-modal";
import {ethers, BigNumber} from 'ethers';

interface PoolItemProps {
    creatorName: string;
    poolValue: string;
    creatorAddress: string;
    currentAddress: string
    withdrawable: boolean;
    depositable: boolean;
    maxFanCanWithdraw: string;
}

function PoolItem(props: PoolItemProps) {
    const [selectedPool, setSelectedPool] = useState('');
    const [modalType, setModalType] = useState('');
    const randomNumber = Math.floor(Math.random() * 8) + 1;
     const value = BigNumber.from(props.poolValue);



    return(
        <div className="bg-white mx-auto max-w-md shadow-2xl rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
            <img className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src={`https://randomuser.me/api/portraits/lego/${randomNumber}.jpg`} alt="" />
            <div className="text-center justify-center sm:text-left sm:flex-grow">
            <div className="mb-4">
                <p className="text-xl leading-tight">{props.creatorName}</p>
                <p className="text-sm leading-tight text-grey-dark">Pool value: {ethers.utils.formatEther(value)} ETH</p>
            </div>
            <div className="flex flex-row-reverse">
                {
                    props.currentAddress && 
                    (
                    <>
                        { props.withdrawable  && <button onClick={() => {setSelectedPool(props.creatorName); setModalType('withdraw')}} className="items-end text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-green-500 hover:text-white">Withdraw</button> }
                        { props.depositable &&  <button onClick={() => { setSelectedPool(props.creatorName); setModalType('deposit')}} className="items-end text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-green-500 hover:text-white">Join pool</button> }
                    </>
                    )              
                }
           </div>
            </div>
        </div>
        {selectedPool === props.creatorName 
        && modalType === 'deposit'
        && <DepositModal creator={props.creatorName} onDismiss={() =>{ setSelectedPool(''); setModalType('')}}creatorAddress={props.creatorAddress}/>}
        {selectedPool === props.creatorName 
        && modalType === 'withdraw'
        && <WithdrawModal creator={props.creatorName} onDismiss={() => { setSelectedPool(''); setModalType('')}} creatorAddress={props.creatorAddress} maxFanCanWithdraw={props.maxFanCanWithdraw}/>}

        </div>
    );
}

export default PoolItem;

/*

    <figure className="md:flex bg-gray-100 rounded-xl mb-3 p-8 md:p-0">
        <img className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="https://avatars.githubusercontent.com/u/10434952?v=4" alt="" width="384" height="512"/>
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
            <blockquote>
            <p className="text-lg font-semibold text-cyan-600">
                {props.creatorName}'s poolValue is {props.poolValue}
            </p>
            </blockquote>
        </div>
    </figure>




*/


/*

        <div className="container">
            <figure className="md:flex bg-gray-100 rounded-xl lg: p-8 md:p-0 shadow-2xl">
                <img className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full md:mx-auto" src="https://avatars.githubusercontent.com/u/10434952?v=4" alt="" width="384" height="512"/>
                <div className="pt-6 md:p-8 text-center md:text-right space-y-4">
                    <blockquote>
                    <p className="text-lg font-semibold text-purple-700">
                        {props.creatorName}'s poolValue is {props.poolValue}
                    </p>
                    </blockquote>
                </div>
            </figure>
        </div>




                    <figure className="md:flex bg-gray-100 rounded-xl lg: p-8 md:p-0 shadow-2xl">
                <img className="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full md:mx-auto" src="https://avatars.githubusercontent.com/u/10434952?v=4" alt="" width="384" height="512"/>
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                    <p className="text-lg font-semibold text-purple-700">
                        {props.creatorName}'s poolValue is {props.poolValue}
                    </p>
                    </blockquote>
                </div>
            </figure>

*/