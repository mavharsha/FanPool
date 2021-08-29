import { useState, useEffect } from 'react';
import PoolItem from '../top-list/PoolItem'


interface Props {
  account: string;
  subscribedPools: any;
  creatorPools: any;
}

function CreatorList(props: Props) {
  const [creators, setCreators] = useState<{creatorName: string, creatorAddress: string, poolValue: string}[]>(props.creatorPools);

  useEffect(() => {
    if(props.account !== '') {
      setCreators(props.creatorPools)
     
    }    }, [props])

  return (
      <>
        <div className="container mx-auto p-10">
          <div className="mx-auto text-center">
            <span className="font-light text-white opacity-70 text-lg">List of Creators</span>
            <div>
                    {creators.map(i =>                 
                        <div  className="m-8" key={i.creatorName} >
                            <PoolItem currentAddress={props.account} creatorName={i.creatorName} poolValue={i.poolValue} creatorAddress={i.creatorAddress} />
                        </div>)
                    }
            </div>
          </div>
        </div>
      </>
  )
}

export default CreatorList;