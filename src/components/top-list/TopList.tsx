import { useEffect, useState } from "react";
import PoolItem from "./PoolItem";
import { Pool } from "../../interfaces";

interface Props {
  account: string;
  subscribedPools: Pool[];
  creatorPools: Pool[];
}

function TopList(props: Props) {
    const [topPools, setTopPools] = useState<{creatorName: string, creatorAddress: string, poolValue: string}[]>([]);

    useEffect(() => {
      if(props.account !== '') {
        setTopPools(props.creatorPools.sort((a: any, b: any) => (a.poolValue > b.poolValue) ? 1 : -1).slice(0, 3))
      }    
    }, [props.account, props.creatorPools])

    return (<>
        <div className="container mx-auto p-10">
        <div className="mx-auto text-center">
            <span className="font-normal text-white opacity-70 text-xl">Fanpool's Top Creators</span>
        </div>
        <div>
            {topPools.map(i =>                 
                <div  className="m-8" key={i.creatorName} >
                    <PoolItem currentAddress={props.account} creatorName={i.creatorName} poolValue={i.poolValue} creatorAddress={i.creatorAddress}/>
                </div>)
            }
        </div>
        </div>
    </>)
}
export default TopList;