import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import OpenEncryptedWalletFile from '../../components/OpenEncryptedFile';

import {

    NANO_KEY_PAIR,
    WALLET_FROM,
    my_wallet

} from '../../utils/wallet_interface';

import Wallet from '../../components/Wallet';
import Brainwallet from '../../components/Brainwallet';
import OpenSeed from '../../components/OpenSeed';
import SelectWallet from '../../components/WalletOptions';
import GenerateSeed from '../../components/GenerateSeed';
import { setLanguage } from '../../actions';
import { getLanguageFromLocalStorage } from '../../utils/language';
import './style.css';

export function MainContainer( props: any ) {
    const [ backgroundMode, setBackgroundMode ] = useState("dark");
    return (
        <div className={`main-container ${ backgroundMode }`}>
            <button
                onClick={ () => {(backgroundMode==="light")?setBackgroundMode("dark"):setBackgroundMode("light")}}
            >
                OK
            </button>
            { props.children }
        </div>
    );
}
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
                    <MainContainer>
                        <OpenSeed />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_BIP39:
                return (
                    <MainContainer>
                        <OpenSeed bip39 />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_KEY_PAIR:
                return (
                    <MainContainer>
                        <OpenSeed keyPair />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_PUBLIC_KEY:
                return (
                    <MainContainer>
                        <OpenSeed publicKey />
                    </MainContainer>
                );
            
            case WALLET_FROM.FROM_ENCRYPTED_FILE:
                return (
                    <MainContainer>
                        <OpenEncryptedWalletFile />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_GENERATING_SEED:
                return (
                    <MainContainer>
                        <GenerateSeed />
                    </MainContainer>
                )

            case WALLET_FROM.FROM_BRAINWALLET:
                return (
                    <MainContainer>
                        <Brainwallet />
                    </MainContainer>
                );
            
            default:
                return (
                    <MainContainer>
                        <SelectWallet />
                    </MainContainer>
                );

        }
    else
        return (
            <MainContainer>
                <Wallet />
            </MainContainer>
        )

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet_state: state.wallet
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    modifyLang: (lang: any) => dispatch(setLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
