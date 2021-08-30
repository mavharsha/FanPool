import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './components/landing-page';
import NavBar from './components/nav-bar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";import OnBoardCreator from './components/on-board-creator';
import CreatorList from './components/creator-list';
import Profile from './components/profile';

import {fetchAllPools, fetchSubscribedPools} from './api'
import { Pool } from './interfaces';
import {DAppProvider} from '@usedapp/core'
import { useEthers } from '@usedapp/core'


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {
  const { account } = useEthers();
  const [creatorPools, setCreatorPools] = useState<Pool[]>([]);
  const [subscribedPools, setSubscribedPools] = useState<Pool[]>([]);
  const [commonPools, setCommonPools] = useState<string[]>([]);


  useEffect(() => {
      fetchAllPools().then(d => setCreatorPools(d as Pool[]));
      fetchSubscribedPools().then(d => setSubscribedPools(d as Pool[]));
  }, [account]);


  useEffect(()=> {
    const intersection = creatorPools ? creatorPools.filter(item1 => subscribedPools.some(item2 => item1.creatorAddress === item2.creatorAddress)).map(i => i.creatorAddress.toUpperCase()) : [];
    setCommonPools(intersection);
  }, [creatorPools, subscribedPools]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-400">
      <div className="container">
        <Router>
        <NavBar account={account || ''} />
        <Switch>
          <Route path="/onboard">
            <OnBoardCreator account={account || '' }/>
          </Route>
          <Route path="/pools">
            <CreatorList account={account || ''} creatorPools={creatorPools || []} subscribedPools={subscribedPools} commonPools={commonPools}/>
          </Route>
          <Route path="/profile">
            <Profile account={account || ''} subscribedPools={subscribedPools || []}/>
          </Route>
          <Route path="/">
            <LandingPage account={account || ''} creatorPools={creatorPools || []} subscribedPools={subscribedPools} commonPools={commonPools}/>
          </Route>
        </Switch>
        </Router>
      </div>
  </div>
  );
}

export default App;