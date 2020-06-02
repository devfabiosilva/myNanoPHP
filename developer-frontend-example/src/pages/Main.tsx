import React from 'react';
import { connect } from 'react-redux';
import OpenEncryptedWalletFile from '../components/openencfile';
import {

    NANO_KEY_PAIR,
    WALLET_FROM,
    my_wallet

} from '../utils/wallet_interface';

import Wallet from '../components/wallet';
import Brainwallet from '../components/brainwallet';
import OpenSeed from '../components/openseed';
import SelectWallet from '../components/walletoption';
import GenerateSeed from '../components/generate_seed';

//dom 2020 05 24 20:30
export function Main(props: any) {

    if ((props.nano_wallet_state as NANO_KEY_PAIR).public_key === "")
        switch ((props.nano_wallet_state as my_wallet).origin) {

            case WALLET_FROM.FROM_SEED:
                return (
                    <OpenSeed />
                );

            case WALLET_FROM.FROM_BIP39:
                return (
                    <OpenSeed bip39 />
                );

            case WALLET_FROM.FROM_ENCRYPTED_FILE:
                return (
                    <OpenEncryptedWalletFile />
                );

            case WALLET_FROM.FROM_GENERATING_SEED:
                return (
                    <GenerateSeed />
                )

            case WALLET_FROM.FROM_BRAINWALLET:
                return (
                    <Brainwallet />
                );
            
            default:
                return (
                    <SelectWallet />
                );

        }
    else
        return (
            <Wallet />
        )

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet_state: state.wallet
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);