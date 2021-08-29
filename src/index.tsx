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
import {fetchAllPools, fetchSubscribedPools} from './api'
import { Pool } from './interfaces';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {
  const [account, setAccount] = useState('');
  const [creatorPools, setCreatorPools] = useState<Pool[]>([]);
  const [subscribedPools, setSubscribedPools] = useState<Pool[]>([])


  useEffect(() => {
    if(account !== '') {
      fetchAllPools().then(d => setCreatorPools(d as Pool[]));
      fetchSubscribedPools().then(d => setSubscribedPools(d as Pool[]));
     }
  }, [account]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-400">
      <div className="container">
        <NavBar account={account} onAccountAdded={ (account) => {console.log('account details', account); setAccount(account)} }/>
        <Router>
        <Switch>
          <Route path="/onboard">
            <OnBoardCreator account={account}/>
          </Route>
          <Route path="/pools">
            <CreatorList account={account} creatorPools={creatorPools} subscribedPools={subscribedPools}/>
          </Route>
          <Route path="/">
            <LandingPage account={account} creatorPools={creatorPools} subscribedPools={subscribedPools}/>
          </Route>
        </Switch>
        </Router>
      </div>
  </div>
  );
}

export default App;