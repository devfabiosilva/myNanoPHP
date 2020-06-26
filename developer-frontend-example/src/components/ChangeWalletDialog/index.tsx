import React, { useEffect } from 'react';

import { 

    NOTIFY_MESSAGE, 
    my_wallet, 
    MY_NANO_PHP_ERROR, 
    MY_NANO_PHP_SEED2KEYPAIR 

} from '../../utils/wallet_interface';

import { 
    
    setNotifyMessage, 
    changeWalletWindow, 
    setMyWallet,
    walletNumberhasChanged

} from '../../actions';

import { connect } from 'react-redux';
import { NOTIFY_TYPE } from '../../utils';
import { my_nano_php_encrypted_stream_to_key_pair } from '../../service';
import './style.css';

export function ChangeWallet(props: any) {

    useEffect(
        () => {
            
            let token_password: any = document.getElementById('change-wallet-token-password-input-id');
            let wallet_number: any = document.getElementById('change-wallet-input-id');

            token_password.value = "";
            wallet_number.value = ""

        }
    )

    function changeAndClose() {

        let token_password: any = document.getElementById('change-wallet-token-password-input-id');
        let wallet_number: any = document.getElementById('change-wallet-input-id');
        let number_str: string;
        let password_str: string;
        let num: number;

        number_str = wallet_number.value.trim()

        if ( ( number_str ) === "" ) {

            props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.msg_empty_wallet_number,
                timeout: 700

            } as NOTIFY_MESSAGE);

            return;

        }

        num = Number.parseFloat(number_str);

        if ( isNaN( num ) ) {

            props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_wallet_num_is_nan,
                timeout: 700

            } as NOTIFY_MESSAGE);

            return;

        }

        password_str = token_password.value.trim();

        if ( password_str === "" ) {

            props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.empty_password,
                timeout: 700

            } as NOTIFY_MESSAGE);

            return;

        }

        my_nano_php_encrypted_stream_to_key_pair(num, password_str, (props.wallet as my_wallet).encrypted_block as string).then(

            (keyPairResult: any) => {

                props.changeMyWallet({

                    wallet_number: Number.parseFloat((keyPairResult as MY_NANO_PHP_SEED2KEYPAIR).key_pair.wallet_number as string),
                    public_key: (keyPairResult as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key,
                    wallet: (keyPairResult as MY_NANO_PHP_SEED2KEYPAIR).key_pair.wallet,
                    balance: "",
                    frontier: "",
                    bip39: "",
                    seed: "",
                    fee: "",
                    pending: "",
                    private_key: ""

                } as my_wallet);

                props.walletNumberhasChanged();
                props.closeChangeWallet();

            },
            (keyPairError: any) =>
                props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: `${(keyPairError as MY_NANO_PHP_ERROR).error} ${(keyPairError as MY_NANO_PHP_ERROR).reason}`,
                timeout: 1200

            } as NOTIFY_MESSAGE)

        )

    }

    return (
        <div

            className="change-wallet-container"
            style={ { display:(props.closeWalletState)?"none":"flex" } }

        >
            <div className="change-wallet-window">
                <div className="change-wallet-title">
                    { props.language.change_wallet_number }
                </div>
                <div className="change-wallet-input-box">
                    <div className="change-wallet-input-title">
                        { props.language.title_wallet_number }
                    </div>
                    <input

                        type="text"
                        className="change-wallet-input"
                        id="change-wallet-input-id"
                        title={ props.language.title_wallet_number }
                        placeholder={ props.language.title_wallet_number }

                    />
                </div>
                <div className="change-wallet-token-password-box">
                    <div className="change-wallet-token-password-title">

                        { props.language.password_msg }/Token

                    </div>
                    <input 

                        type="password" 
                        className="change-wallet-token-password-input"
                        id="change-wallet-token-password-input-id"
                        title={`${ props.language.password_msg }/Token`}
                        placeholder={`${ props.language.password_msg }/Token`}

                    />
                </div>
                <div className="change-wallet-btn-box">
                    <button
                        
                        className="change-wallet-close-btn"
                        onClick={ () => props.closeChangeWallet() }
                        title={ props.language.title_close }

                    >
                        { props.language.title_close }
                    </button>
                    <button
                    
                        className="change-wallet-change-btn"
                        title={ props.language.title_change }
                        onClick={ () => changeAndClose() }

                    >
                        { props.language.title_change }
                    </button>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({

    wallet: state.wallet,
    language: state.lang,
    closeWalletState: state.changeWalletWindowState

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    setNotifyMessage: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    closeChangeWallet: () => dispatch(changeWalletWindow()),
    changeMyWallet: (wallet: any) => dispatch(setMyWallet(wallet)),
    walletNumberhasChanged: () => dispatch(walletNumberhasChanged(true))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(ChangeWallet);
