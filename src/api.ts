import fanPool from "./abis/Fanpool.json";
import { getContract } from './utils/common';
import { Contract, BigNumber } from 'ethers';
import { address } from './constants'

export const fetchAllPools = async () => {
    if (typeof window?.ethereum != undefined) {
      const fanpoolContract: Contract = getContract(address, fanPool);
      try {
        let listOfAllPools: string[] = await fanpoolContract.getAllPools();
        console.log(listOfAllPools)
        const listOfPromisses = listOfAllPools.map((creatorAddress) => fanpoolContract.getPoolByCreator(creatorAddress));
        const poolData = await Promise.all(listOfPromisses)
        return poolData.map((e) => { return { creatorName: e.name, poolValue: `${BigNumber.from(e.totalDeposits).add(e.totalYieldPaid).toString()} gwei`, creatorAddress: e.cAddress } })
      }
      catch (err) {
        console.log(err);
      }
    }
}

// d = d.sort((a, b) => (a.poolValue > b.poolValue) ? 1 : -1).slice(0, 3);



export const fetchSubscribedPools = async () => {
  if (typeof window?.ethereum != undefined) {
    const fanpoolContract: Contract = getContract(address, fanPool);
    try {
      let subPools: string[] = await fanpoolContract.getPoolsSubscribedByUser();
      console.log(subPools)
      const listOfPromisses = subPools.map((creatorAddress) => fanpoolContract.getPoolByCreator(creatorAddress));
      const poolData = await Promise.all(listOfPromisses)
      return poolData.map((e) => { return { creatorName: e.name, poolValue: `${BigNumber.from(e.totalDeposits).add(e.totalYieldPaid).toString()} gwei`, creatorAddress: e.cAddress } })
    }
    catch (err) {
      console.log(err);
    }
  }
}