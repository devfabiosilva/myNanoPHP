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
import { setLanguage, changeBackgroundMode } from '../../actions';
import { getLanguageFromLocalStorage } from '../../utils/language';

import { 
    
    BACKGROUND_LIGHT,
    BACKGROUND_DARK 

} from '../../utils';

import './style.css';

export function MainContainer( props: any) {

    return (
        <div className={`main-container ${ props.myParent.backgroundMode }`}>
            <div className="bg-mode-toggle">
                <div className="toggle"
                    style={
                            {
                                transform:( props.myParent.backgroundMode === BACKGROUND_LIGHT )?"none":"translateX(100%)"
                            }
                    }
                ></div>
                <div className="toggle-name">
                    <div 
                        className="light-name" 
                        onClick={() => props.myParent.changeBackMode(BACKGROUND_LIGHT)}
                    >
                        { props.myParent.language.light_toggle_txt }

                    </div>
                    <div 
                        className="dark-name" 
                        onClick={() => props.myParent.changeBackMode(BACKGROUND_DARK)}
                    >
                        { props.myParent.language.dark_toggle_txt }

                    </div>
                </div>
            </div>

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
                        <SelectWallet />
                    </MainContainer>
                );

        }
    else
        return (
            <MainContainer myParent={ props }>
                <Wallet />
            </MainContainer>
        )

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet_state: state.wallet,
    backgroundMode: state.setBackGroundMode,
    language: state.lang
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    modifyLang: (lang: any) => dispatch(setLanguage(lang)),
    changeBackMode: (mode: string) => dispatch(changeBackgroundMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
