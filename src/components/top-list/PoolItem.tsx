import { useState } from "react";
import DepositModal from "../deposit-modal";

interface PoolItemProps {
    creatorName: string;
    poolValue: string;
    creatorAddress: string;
}

function PoolItem(props: PoolItemProps) {
    const [selectedPool, setSelectedPool] = useState('');
    return(
        <div className="bg-white mx-auto max-w-lg shadow-2xl rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
            <img className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src='https://avatars.githubusercontent.com/u/10434952?v=4' alt="" />
            <div className="text-center justify-center sm:text-left sm:flex-grow">
            <div className="mb-4">
                <p className="text-xl leading-tight">{props.creatorName}</p>
                <p className="text-sm leading-tight text-grey-dark">Pool value: {props.poolValue}</p>
            </div>
            <div className="flex flex-row-reverse">
                <button onClick={() => setSelectedPool(props.creatorName)} className="items-end text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-green-500 hover:text-white">Withdraw</button>
                <button onClick={() => setSelectedPool(props.creatorName)} className="items-end text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-green-500 hover:text-white">Join pool</button>
            </div>
            </div>
        </div>
        {selectedPool === props.creatorName && <DepositModal creator={props.creatorName} onDismiss={() => setSelectedPool('')} creatorAddress={props.creatorAddress}/>}
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