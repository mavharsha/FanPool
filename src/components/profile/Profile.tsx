import { useState, useEffect } from 'react';
import { Pool } from '../../interfaces';
import PoolItem from '../top-list/PoolItem'


interface Props {
  account: string;
  subscribedPools: Pool[];
}

function Profile(props: Props) {
  const [subscribedPools, setSubscribedPools] = useState<Pool[]>([]);

  useEffect(() => {
    setSubscribedPools(props.subscribedPools)
  }, [props])

  return (
      <>
        <div className="container mx-auto p-10">
          <div className="mx-auto text-center">
            <span className="font-light text-white opacity-70 text-lg">List of Creators</span>
            <div>
                    {subscribedPools.map(i =>                 
                      <div  className="m-8" key={i.creatorName} >
                                  <PoolItem currentAddress={props.account} 
                                            creatorName={i.creatorName} 
                                            poolValue={i.poolValue} 
                                            creatorAddress={i.creatorAddress} 
                                            withdrawable={true}
                                            depositable={true}/>

                        </div>)
                    }
            </div>
          </div>
        </div>
      </>
  )
}

export default Profile;