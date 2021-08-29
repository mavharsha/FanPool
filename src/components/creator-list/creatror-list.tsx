import { useState, useEffect } from 'react';
import PoolItem from '../top-list/PoolItem'
import fanPool from "../../abis/Fanpool.json";
import {getContract } from '../../utils/common';
import { Contract, BigNumber } from 'ethers';
import {address} from '../../constants'

function CreatorList() {
  const [creators, setCreators] = useState<{creatorName: string, creatorAddress: string, poolValue: string}[]>([]);

  useEffect(() => {
    const fetchAllPools = async () => {
      if (typeof window?.ethereum != undefined) {  
        const fanpoolContract: Contract = getContract(address, fanPool);
        try {
          let listOfAllPools: string[] = await fanpoolContract.getAllPools();
          console.log(listOfAllPools)
          const listOfPromisses = listOfAllPools.map((creatorAddress) => fanpoolContract.getPoolByCreator(creatorAddress));
          Promise.all(listOfPromisses).then((data) => {
            const d = data.map((e) => {return {creatorName: e.name, poolValue: `${BigNumber.from(e.totalDeposits).add(e.totalYieldPaid).toString()} gwei`, creatorAddress: e.cAddress}})
            console.log(d);
            setCreators(d);
          });
        }
        catch (err) {
          console.log(err);
        }
      }
    }
     fetchAllPools()
  }, [])

  return (
      <>
        <div className="container mx-auto p-10">
          <div className="mx-auto text-center">
            <span className="font-light text-white opacity-70 text-lg">List of Creators</span>
            <div>
                    {creators.map(i =>                 
                        <div  className="m-8" key={i.creatorName} >
                            <PoolItem creatorName={i.creatorName} poolValue={i.poolValue} creatorAddress={i.creatorAddress} />
                        </div>)
                    }
            </div>
          </div>
        </div>
      </>
  )
}

export default CreatorList;