import { useEffect, useState } from "react";
import PoolItem from "./PoolItem";
import fanPool from "../../abis/Fanpool.json";
import {getContract } from '../../utils/common';
import { Contract, BigNumber } from 'ethers';
import {address} from '../../constants'

function TopList() {
    const [topPools, setTopPools] = useState<{creatorName: string, creatorAddress: string, poolValue: string}[]>([])
    const listOfTopPools = [
        {creatorName: 'Creator 1', poolVolume: '100 eth'},
        {creatorName: 'Creator 2', poolVolume: '108 eth'},
        {creatorName: 'Creator 3', poolVolume: '101 eth'}
    ]

    useEffect(() => {
        const fetchAllPools = async () => {
          if (typeof window?.ethereum != undefined) {  
            const fanpoolContract: Contract = getContract(address, fanPool);
            try {
              let listOfAllPools: string[] = await fanpoolContract.getAllPools();
              console.log(listOfAllPools)
              const listOfPromisses = listOfAllPools.map((creatorAddress) => fanpoolContract.getPoolByCreator(creatorAddress));
              Promise.all(listOfPromisses).then((data) => {
                let d = data.map((e) => {return {creatorName: e.name, poolValue: `${BigNumber.from(e.totalDeposits).add(e.totalYieldPaid).toString()} gwei`, creatorAddress: e.cAddress}})
                d = d.sort((a, b) => (a.poolValue > b.poolValue) ? 1 : -1).filter((value, index) => index < 4);
                setTopPools(d);
              });
            }
            catch (err) {
              console.log(err);
            }
          }
        }
         fetchAllPools()
      }, [])

    return (<>
        <div className="container mx-auto p-10">
        <div className="mx-auto text-center">
            <span className="font-normal text-white opacity-70 text-xl">Fanpool's Top Creators</span>
        </div>
        <div>
            {topPools.map(i =>                 
                <div  className="m-8" key={i.creatorName} >
                    <PoolItem creatorName={i.creatorName} poolValue={i.poolValue} creatorAddress={i.creatorAddress}/>
                </div>)
            }
        </div>
        </div>
    </>)
}
export default TopList;