import * as React from 'react';

import axios from 'axios';

import './App.css';

import btc from './btc.svg';
import eth from './eth.svg';
import swap from './swap.svg';

class App extends React.Component {

  public render() {
    return (
      <div className="app">
        <header className="swap-header">
          <div className="swap-header--icons">
            <img style={{ margin: "0 0.5rem" }} src={swap} />
          </div>
          <div className="swap-header--row-list">
            <div className="swap-header--row">
              <img className="swap-header--row-img" src={btc} />
              <div className="swap-header--row-body">
                <div className="swap-header--row-title">Send</div><div>1.00 BTC</div>
              </div>
            </div>
            <div className="swap-header--row">
              <img className="swap-header--row-img" src={eth} />
              <div className="swap-header--row-body">
                <div className="swap-header--row-title">Receive</div><div>10.00 ETH</div>
              </div>
            </div>
          </div>
        </header>

        <div className="button-list">
          <div className="button retro--blue" onClick={this.onAccept}>Accept</div>
          <div className="button retro--grey">Reject</div>
        </div>
      </div>
    );
  }

  private onAccept() {
    axios.post("http://localhost:18516/swaps", {

    });
  }
}

export default App;
