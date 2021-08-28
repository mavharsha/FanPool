import React, {useState} from 'react';
import HeroBanner from '../hero-banner'
import NavBar from '../nav-bar/NavBar';
import OnBoardCreator from '../on-board-creator';
import TopList from '../top-list';

function LandingPage() {
	const [selectedItem, setSelectedItem] = useState('home');

    return (
        <>
            <NavBar selectedItem={selectedItem} setSelectedItem={(value) => setSelectedItem(value)}/>
            {selectedItem === 'home' && (<> <HeroBanner title="Are you a creator? Click to onboard." message="Fans can support their favourite artists by staking their eth."/><TopList/></>)}
            {selectedItem === 'creators' && (<TopList/>)}
            {selectedItem === 'onBoard' && (<OnBoardCreator/>)}
        </>
    );
  }
  
  export default LandingPage;
  