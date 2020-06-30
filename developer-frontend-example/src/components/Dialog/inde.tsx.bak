import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { 

    closeWalletDialog,
    setMyWallet,
    dialogStatus,
    setNotifyMessage

} from '../../actions';

import { 

    WALLET_FROM, 
    my_wallet, 
    MY_NANO_PHP_SEED2KEYPAIR, 
    NOTIFY_MESSAGE

} from '../../utils/wallet_interface';

import { 

    my_nano_php_open_encrypted_seed,
    my_nano_php_extract_key_pair_from_nano_seed,
    my_nano_php_seed2keypair,
    my_nano_php_extract_key_pair_from_bip39,
    my_nano_php_brainwallet_to_keypair

} from '../../service';

import { 

    UNKNOWN_MY_NANO_PHP_SERVER_ERROR, 
    SEND_COMMAND,
    OPEN_BLOCK_TO_RECEIVE,
    RECEIVE_COMMAND,
    NOTIFY_TYPE

} from '../../utils';

import './style.css';

function Dialog(props: any) {

    useEffect(
        () => {
            console.log(props.nano_wallet);
        },
        [ props ]
    )

    function closeDialog() {

        props.dialogStatus();
        props.closeMyDialog();

    }

    // WARNING FOR DEVELOPERS
    // SENSIBLE DATA HERE !!!!
    // -----------------------
    // KEY PAIR, SEED, BIP39, Brainwallet, Salt, Passwords
    // 1- They are ALWAYS stored in a temporary variable and discarded after assign a block to send/receive money
    // 2- They are ALWAYS request when perform transaction or open a block in Nano Blockchain
    // 3- REMEMBER: KEEP THESE DATA SAFE !!!

    /**
     * @description This function extracts Private Key to assign given block (send/receive money). This application NEVER stores this sensive data permanently
     * @param props Parent objects
     */
    function extractPrivateKeyFromOrigin( props: any ) {
        
        let obj: any
        let obj_seed: any
        let obj_salt: any;
        let password: string;
        let seed: string;
        let bip39: string;
        let brainwallet: string;
        let salt: string;
        let keypair: string;

        if (props.nano_wallet.origin === WALLET_FROM.FROM_ENCRYPTED_FILE) {

            obj = document.getElementById('origin-enc-file-password');
            password = obj.value.trim();

            if (password === "") {

                props.newNotification(
                    {
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: props.language.dialog_password_empty
                    } as NOTIFY_MESSAGE
                )
                return;

            }

            my_nano_php_open_encrypted_seed(props.nano_wallet.encrypted_block as string, password).then(
                (res: any) => {

                    my_nano_php_extract_key_pair_from_nano_seed(props.nano_wallet.wallet_number as number, res.result.seed).then(
                        (keypair_res) => {

                            props.setMyWallet({

                                private_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,
                                public_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key

                            } as my_wallet);

                            if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE )
                                props.dialogStatus(RECEIVE_COMMAND);
                            else
                                props.dialogStatus(SEND_COMMAND);

                        },
                        (error_keypair) => {
                            console.log(error_keypair)
                        }
                    )
                },
                (seed_error: any) => {
                    console.log(seed_error);
                }
            );

        } else if ( (props.nano_wallet.origin === WALLET_FROM.FROM_SEED) || (props.nano_wallet.origin === WALLET_FROM.FROM_GENERATING_SEED) ) {

            obj_seed = document.getElementById('origin-seed-value-id');

            if ((seed = obj_seed.value.trim()) === "") {

                alert( props.language.dialog_seed_empty );
                return;

            }

            my_nano_php_seed2keypair((props.nano_wallet as my_wallet).wallet_number as number, seed).then(
                (keypair_res: any) => {
                    if (keypair_res) {
                        if ((keypair_res as MY_NANO_PHP_SEED2KEYPAIR).error === "0") {

                            props.setMyWallet({

                                private_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,
                                public_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key

                            } as my_wallet);

                            if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE )
                                props.dialogStatus(RECEIVE_COMMAND);
                            else
                                props.dialogStatus(SEND_COMMAND);

                        } else
                            console.log(keypair_res);
                    } else
                        console.log(UNKNOWN_MY_NANO_PHP_SERVER_ERROR);
                },
                (key_pair_error) => {
                    console.log(key_pair_error);
                }
            );

        } else if (props.nano_wallet.origin === WALLET_FROM.FROM_BIP39) {

            obj = document.getElementById('origin-bip39-value-id');

            if ((bip39 = obj.value.trim()) === "") {

                alert( props.language.dialog_bip39_required )
                return;

            }

            my_nano_php_extract_key_pair_from_bip39((props.nano_wallet as my_wallet).wallet_number as number, bip39).then(
                (keypair_res: any) => {
                    if (keypair_res) {
                        if ((keypair_res as MY_NANO_PHP_SEED2KEYPAIR).error === "0") {

                            props.setMyWallet({

                                private_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,
                                public_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key

                            } as my_wallet);

                            if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE )
                                props.dialogStatus(RECEIVE_COMMAND);
                            else
                                props.dialogStatus(SEND_COMMAND);

                        } else
                            console.log(keypair_res);
                    } else
                        console.log(UNKNOWN_MY_NANO_PHP_SERVER_ERROR);
                },
                (key_pair_error) => {
                    console.log(key_pair_error);
                }
            );

        } else if (props.nano_wallet.origin === WALLET_FROM.FROM_BRAINWALLET) {

            obj = document.getElementById('origin-brainwallet-id');

            if ( (brainwallet = obj.value.trim()) === "") {

                alert( props.language.dialog_brainwallet_empty );
                return;

            }

            obj_salt = document.getElementById('origin-salt-id');

            if ( (salt = obj_salt.value.trim() ) === "" ) {

                alert( props.language.dialog_salt_empty );
                return;

            }

            my_nano_php_brainwallet_to_keypair((props.nano_wallet as my_wallet).wallet_number as number, brainwallet, salt).then(
                (keypair_res: any) => {
                    if (keypair_res) {
                        if ((keypair_res as MY_NANO_PHP_SEED2KEYPAIR).error === "0") {

                            props.setMyWallet({

                                private_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,
                                public_key: (keypair_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key

                            } as my_wallet);

                            if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE )
                                props.dialogStatus(RECEIVE_COMMAND);
                            else
                                props.dialogStatus(SEND_COMMAND);

                        } else
                            console.log(keypair_res);
                    } else
                        console.log(UNKNOWN_MY_NANO_PHP_SERVER_ERROR);
                },
                (key_pair_error) => {
                    console.log(key_pair_error);
                }  
            );

        } else if ( props.nano_wallet.origin === WALLET_FROM.FROM_KEY_PAIR ) {
            
            obj = document.getElementById('origin-keypair-value-id');

            if ( ( keypair = obj.value.trim() ) === "" ) {

                alert( props.language.dialog_missing_keypair );
                return;

            }

            if (keypair.length !== 128) {

                alert( props.language.dialog_wrong_keypair_length );
                return;

            }

            props.setMyWallet({

                private_key: keypair.substr(0, 64),
                public_key: keypair.substr(64, 64)

            });

            if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE )
                props.dialogStatus(RECEIVE_COMMAND);
            else
                props.dialogStatus(SEND_COMMAND);

        }

    }

    function OriginSelection(props: any, lang: any) {
    
        switch (props.wallet.origin) {

            case WALLET_FROM.FROM_ENCRYPTED_FILE:
                return (
                    <div className="origin-enc-file-password-container">
                        <input

                            type="password"
                            id="origin-enc-file-password"
                            placeholder = { lang.send_enc_file_passwd_placeholder }

                        />
                    </div>
                );

            case WALLET_FROM.FROM_GENERATING_SEED:
            case WALLET_FROM.FROM_SEED:
                return (
                    <div className="origin-seed-container">
                        <input

                            type="text"
                            id="origin-seed-value-id"
                            className="origin-number-value"

                        />
                    </div>
                );

            case WALLET_FROM.FROM_BIP39:
                return (
                    <div className="origin-bip39-container">
                        <input

                            type="text"
                            id="origin-bip39-value-id"
                            className="origin-bip39-value"

                        />
                    </div>
                );

            case WALLET_FROM.FROM_BRAINWALLET:
                return (
                    <div className="origin-brainwallet-container">

                        <input

                            type="text"
                            id="origin-brainwallet-id"
                            className="origin-brainwallet"

                        />
                        <input

                            type="text"
                            id="origin-salt-id"
                            className="origin-salt"
                        />

                    </div>
                );

            case WALLET_FROM.FROM_KEY_PAIR:
                return (
                    <div className="origin-keypair-container">
                        <input

                            id="origin-keypair-value-id"
                            type="password"
                            className="origin-keypair-value"

                        />
                    </div>
                );

            default:
                return (
                    <div>
                        Something went wrong. It would never should happen
                    </div>
                );

        }

    }
    return ((props.dialogVisible)?(
        <div className="dialog-container">
            <div className="dialog-window">
                <div className="dialog-button-container">
                    <OriginSelection wallet = { props.nano_wallet } lang = { props.language } />
                    <button
                        className = "dialog-button-cancel"
                        onClick = { closeDialog } 
                    >
                        { props.language.cancel_button }
                    </button>
                    <button 
                        className = "dialog-button-ok"
                        onClick = { () => extractPrivateKeyFromOrigin( props ) }
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    ):null);

}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang,
    dialogVisible: state.openTransactionDialog,
    transaction_command: state.transactionDialogStatus

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    closeMyDialog: () => dispatch(closeWalletDialog()),
    setMyWallet: (param: my_wallet) => dispatch(setMyWallet(param)),
    dialogStatus: (param: string) => dispatch(dialogStatus(param)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
