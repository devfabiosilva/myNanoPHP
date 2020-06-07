import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OpenEncryptedWalletFile from '../components/OpenEncryptedFile';

import {

    NANO_KEY_PAIR,
    WALLET_FROM,
    my_wallet

} from '../utils/wallet_interface';

import Wallet from '../components/Wallet';
import Brainwallet from '../components/Brainwallet';
import OpenSeed from '../components/OpenSeed';
import SelectWallet from '../components/WalletOptions';
import GenerateSeed from '../components/GenerateSeed';
import { setLanguage } from '../actions';
import { getLanguageFromLocalStorage } from '../utils/language';

//sun 2020 05 24 20:30
export function Main(props: any) {

    useEffect(
        () => {
            props.modifyLang(getLanguageFromLocalStorage());
        },
        [
            props
        ]
    );

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

            case WALLET_FROM.FROM_KEY_PAIR:
                return (
                    <OpenSeed keyPair />
                );

            case WALLET_FROM.FROM_PUBLIC_KEY:
                return (
                    <OpenSeed publicKey />
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
    modifyLang: (lang: any) => dispatch(setLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
