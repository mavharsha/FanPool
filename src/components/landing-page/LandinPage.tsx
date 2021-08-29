import { Pool } from '../../interfaces';
import HeroBanner from '../hero-banner'
import TopList from '../top-list';

interface Props {
    account: string;
    subscribedPools: Pool[];
    creatorPools: Pool[];
}

function LandingPage(props: Props) {

    return (
        <>
        <HeroBanner title="Are you a creator? Click to onboard." message="Fans can support their favourite artists by staking their eth."/>
        <TopList account={props.account} creatorPools={props.creatorPools} subscribedPools={props.subscribedPools}/>
        </>
    );
  }
  
  export default LandingPage;
  