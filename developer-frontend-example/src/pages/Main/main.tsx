import React, { useEffect } from 'react';
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

import { 
    
    setLanguage, 
    changeBackgroundMode,

} from '../../actions';

import { getLanguageFromLocalStorage } from '../../utils/language';

import LanguageTool from '../../components/LanguageTool';
import DarkModeTool from '../../components/DarkModeTool';
import { Brand } from '../../components/Brand';
import './style.css';
import Welcome from '../../components/Welcome';
import Notify from '../../components/Notification';
import About from '../../components/About';

export function MainContainer( props: any) {

    return (
        <div className="body-container">
            <div className="main-container">
                <div className="main-header">
                    <Brand />
                    <LanguageTool />
                    <DarkModeTool />
                </div>
                <div className="main-content">
                    { props.children }
                </div>
            </div>
            <Notify />
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

    if (props.about)
        return (

            <MainContainer myParent={ props }>
                <About />
            </MainContainer>

        );

    if ((props.nano_wallet_state as NANO_KEY_PAIR).public_key === "")
        switch ((props.nano_wallet_state as my_wallet).origin) {

            case WALLET_FROM.FROM_SEED:
                return (
                    <MainContainer myParent={ props }>
                        <OpenSeed />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_BIP39:
                return (
                    <MainContainer myParent={ props }>
                        <OpenSeed bip39 />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_KEY_PAIR:
                return (
                    <MainContainer myParent={ props }>
                        <OpenSeed keyPair />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_PUBLIC_KEY:
                return (
                    <MainContainer myParent={ props }>
                        <OpenSeed publicKey />
                    </MainContainer>
                );
            
            case WALLET_FROM.FROM_ENCRYPTED_FILE:
                return (
                    <MainContainer myParent={ props }>
                        <OpenEncryptedWalletFile />
                    </MainContainer>
                );

            case WALLET_FROM.FROM_GENERATING_SEED:
                return (
                    <MainContainer myParent={ props }>
                        <GenerateSeed />
                    </MainContainer>
                )

            case WALLET_FROM.FROM_BRAINWALLET:
                return (
                    <MainContainer myParent={ props }>
                        <Brainwallet />
                    </MainContainer>
                );
            
            default:
                return (
                    <MainContainer myParent={ props }>
                        <Welcome />
                        <SelectWallet />
                        <Notify />
                    </MainContainer>
                );

        }
    else
        return (
            <MainContainer myParent={ props }>
                <Wallet />
            </MainContainer>
        );
}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet_state: state.wallet,
    backgroundMode: state.setBackGroundMode,
    language: state.lang,
    about: state.showAboutMode

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    modifyLang: (lang: any) => dispatch(setLanguage(lang)),
    changeBackMode: (mode: string) => dispatch(changeBackgroundMode(mode))

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
