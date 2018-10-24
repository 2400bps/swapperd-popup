import * as React from 'react';

// import axios from 'axios';

import '../styles/App.css';

import ApproveSwap from './ApproveSwap';

export interface IPartialSwapRequest {
    id: string,
    sendToken: string,
    receiveToken: string,

    // SendAmount and ReceiveAmount are hex encoded.
    sendAmount: string,
    receiveAmount: string,

    sendTo: string,
    receiveFrom: string,
    timeLock: number,
    secretHash: string,
    shouldInitiateFirst: boolean,
}

interface IAppState {
    swapDetails: IPartialSwapRequest | null;
}

class App extends React.Component<{}, IAppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            swapDetails: null,
        }
    }

    public componentDidMount() {
        chrome.runtime.sendMessage({ method: 'getswapDetails' }, (response) => {
            this.setState({ swapDetails: response.swapDetails });
        });
    }

    public render() {
        const { swapDetails } = this.state;
        return (
            <div className="app">
                {swapDetails === null ?
                    <div>
                        <h1>Listening for swaps...</h1>
                    </div> :
                    <ApproveSwap swapDetails={swapDetails} onAccept={this.onAccept} />
                }
            </div>
        );
    }

    private onAccept() {
        chrome.runtime.sendMessage({ method: 'approvedSwap' }, console.log);

        // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        //     chrome.tabs.executeScript(
        //         tabs[0].id || 0,
        //         { code: 'Atomic swap complete!' });
        // });
        // axios.post("http://localhost:18516/swaps", {

        // });
    }
}

export default App;
