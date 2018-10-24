import * as React from 'react';

import '../styles/ApproveSwap.css';

import btc from '../styles/images/btc.svg';
import eth from '../styles/images/eth.svg';
import swap from '../styles/images/swap.svg';
import { IPartialSwapRequest } from './App';

interface IApproveSwapProps {
    swapDetails: IPartialSwapRequest;
    onAccept: () => void;
}

class ApproveSwap extends React.Component<IApproveSwapProps> {

    public render() {
        const { swapDetails, onAccept } = this.props;
        return (
            <div className="approve-swap">
                <header className="swap-header">
                    <div className="swap-header--icons">
                        <img style={{ margin: "0 0.5rem" }} src={swap} />
                    </div>
                    <div className="swap-header--row-list">
                        <div className="swap-header--row">
                            <img className="swap-header--row-img" src={btc} />
                            <div className="swap-header--row-body">
                                <div className="swap-header--row-title">Send</div><div>{swapDetails.sendAmount} BTC</div>
                            </div>
                        </div>
                        <div className="swap-header--row">
                            <img className="swap-header--row-img" src={eth} />
                            <div className="swap-header--row-body">
                                <div className="swap-header--row-title">Receive</div><div>{swapDetails.receiveAmount} ETH</div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="button-list">
                    <div className="button retro--blue" onClick={onAccept}>Accept</div>
                    <div className="button retro--grey">Reject</div>
                </div>
            </div>
        );
    }
}

export default ApproveSwap;
