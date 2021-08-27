import PoolItem from '../top-list/PoolItem'

function CreatorList() {
    const listOfCreators = [
        {creatorName: 'Creator 1', poolVolume: '100 eth'},
        {creatorName: 'Creator 2', poolVolume: '108 eth'},
        {creatorName: 'Creator 3', poolVolume: '101 eth'},
        {creatorName: 'Creator 4', poolVolume: '100 eth'},
        {creatorName: 'Creator 5', poolVolume: '108 eth'},
        {creatorName: 'Creator 6', poolVolume: '101 eth'},
        {creatorName: 'Creator 7', poolVolume: '100 eth'},
        {creatorName: 'Creator 8', poolVolume: '108 eth'},
        {creatorName: 'Creator 9', poolVolume: '101 eth'}
    ]
  return (
      <>
        <div className="container mx-auto p-10">
          <div className="mx-auto text-center">
            <span className="font-light text-white opacity-70 text-lg">List of Creators</span>
            <div>
                    {listOfCreators.map(i =>                 
                        <div  className="m-8" key={i.creatorName} >
                            <PoolItem creatorName={i.creatorName} poolValue={i.poolVolume} />
                        </div>)
                    }
            </div>
          </div>
        </div>
      </>
  )
}

export default CreatorList;