import { useState, useEffect } from 'react';
import { Pool } from '../../interfaces';
import PoolItem from '../top-list/PoolItem'


interface Props {
  account: string;
  subscribedPools: Pool[];
  creatorPools: Pool[];
  commonPools: string[];
}

function CreatorList(props: Props) {
  const [creators, setCreators] = useState<{ creatorName: string, creatorAddress: string, poolValue: string }[]>([]);

  useEffect(() => {
    setCreators(props.creatorPools)
  }, [props])

  return (
    <>
      {
        props.account &&
        (
          <div className="container mx-auto p-10">
            <div className="mx-auto text-center">
              <span className="font-light text-white opacity-70 text-lg">List of Creators</span>
              <div>
                {creators.map(i =>
                  <div className="m-8" key={i.creatorName} >
                    <PoolItem currentAddress={props.account}
                      creatorName={i.creatorName}
                      poolValue={i.poolValue}
                      creatorAddress={i.creatorAddress}
                      withdrawable={props.commonPools.includes(i.creatorAddress.toUpperCase())}
                      depositable={props.account.toLocaleUpperCase() !== i.creatorAddress.toUpperCase()} />

                  </div>)
                }
              </div>
            </div>
          </div>)}
    </>
  )
}

export default CreatorList;