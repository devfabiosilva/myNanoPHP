import React from 'react';
import { connect } from 'react-redux';
import OpenEncryptedWalletFile from '../components/openencfile';
import { NANO_KEY_PAIR } from '../utils/wallet_interface';
import Wallet from '../components/wallet';

//dom 2020 05 24 20:30
export function Main(props: any) {

    if ((props.nano_wallet_state as NANO_KEY_PAIR).public_key === "")
        return (
            <div>
                <OpenEncryptedWalletFile />
            </div>
        )
    else
        return (
            <div>
                <Wallet />
            </div>
        )

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet_state: state.wallet
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);