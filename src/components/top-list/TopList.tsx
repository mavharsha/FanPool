import PoolItem from "./PoolItem";

function TopList() {
    const listOfTopPools = [
        {creatorName: 'Creator 1', poolVolume: '100 eth'},
        {creatorName: 'Creator 2', poolVolume: '108 eth'},
        {creatorName: 'Creator 3', poolVolume: '101 eth'}
    ]

    return (<>
        <div className="container mx-auto p-10">
        <div className="mx-auto text-center">
            <span className="font-normal text-white opacity-70 text-xl">Fanpool's Top Creators</span>
        </div>
        <div>
            {listOfTopPools.map(i =>                 
                <div  className="m-8" key={i.creatorName} >
                    <PoolItem creatorName={i.creatorName} poolValue={i.poolVolume} />
                </div>)
            }
        </div>
        </div>
    </>)
}
export default TopList;