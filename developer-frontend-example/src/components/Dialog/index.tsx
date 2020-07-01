import React from 'react';
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
    NOTIFY_MESSAGE,
    MY_NANO_PHP_ERROR

} from '../../utils/wallet_interface';

import { my_nano_php_encrypted_stream_to_key_pair } from '../../service';

import { 

    SEND_COMMAND,
    OPEN_BLOCK_TO_RECEIVE,
    RECEIVE_COMMAND,
    NOTIFY_TYPE,
    NOTIFICATION_TIME

} from '../../utils';

import './style.css';

function Dialog(props: any) {

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
    function extractPrivateKeyFromOrigin() {

        let password: any = document.getElementById('dialog-password-input-id');

        if (password.value === "") {
            props.newNotification(
                {

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: props.language.dialog_password_empty

                } as NOTIFY_MESSAGE
            );
            return;
        }

        props.newNotification(
            {

                msg: props.language.msg_opening_enc_block,
                timeout: 400

            } as NOTIFY_MESSAGE
        );

        my_nano_php_encrypted_stream_to_key_pair((props.nano_wallet as my_wallet).wallet_number as number, password.value, (props.nano_wallet as my_wallet).encrypted_block as string).then(
            (encrypted_block_res: any) => {

                props.newNotification(
                    {
        
                        msg: props.language.msg_extracting_keypair_from_encrypted_block,
                        timeout: 400
        
                    } as NOTIFY_MESSAGE
                );
        
                if ( props.nano_wallet.origin === WALLET_FROM.FROM_KEY_PAIR )
                    props.setMyWallet({

                        private_key: (encrypted_block_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,

                    } as my_wallet);
                else
                    props.setMyWallet({

                        private_key: (encrypted_block_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key,
                        public_key: (encrypted_block_res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key

                    } as my_wallet);

                if ( props.transaction_command === OPEN_BLOCK_TO_RECEIVE ) {

                    props.dialogStatus(RECEIVE_COMMAND);
                    props.newNotification({

                        msg: props.language.msg_opening_block,
                        timeout: NOTIFICATION_TIME.TIME_VERY_SLOW

                    } as NOTIFY_MESSAGE);

                } else {

                    props.dialogStatus(SEND_COMMAND);
                    props.newNotification({

                        msg: props.language.msg_sending_amount,
                        timeout: NOTIFICATION_TIME.TIME_VERY_SLOW

                    } as NOTIFY_MESSAGE);

                }

            },
            (encrypted_block_error: any) => {
                props.newNotification(
                    {
                        
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(encrypted_block_error as MY_NANO_PHP_ERROR).error} ${(encrypted_block_error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 2000
        
                    } as NOTIFY_MESSAGE
                );
            }
        );

    }

    return ((props.dialogVisible)?(
        <div className="dialog-container">
            <div className="dialog-window">
                <div className="dialog-password-box-title">
                    { props.language.msg_title_password_token }
                </div>
                <div className="dialog-password-container">
                    <input

                        id="dialog-password-input-id"
                        type="password" 
                        className="dialog-password-input"
                        placeholder={ props.language.msg_title_password_token }
                        disabled={(props.transaction_command === RECEIVE_COMMAND)||(props.transaction_command === SEND_COMMAND)}

                    />
                </div>
                <div className="dialog-button-container">
                    <button

                        id = "dialog-button-cancel-id"
                        className = "dialog-button-cancel"
                        onClick = { closeDialog } 
                        placeholder={ props.language.cancel_button }
                        disabled={(props.transaction_command === RECEIVE_COMMAND)||(props.transaction_command === SEND_COMMAND)}

                    >
                        { props.language.cancel_button }
                    </button>
                    <button 

                        id = "dialog-button-ok-id"
                        className = "dialog-button-ok"
                        onClick = { () => extractPrivateKeyFromOrigin() }
                        placeholder="Ok"
                        disabled={(props.transaction_command === RECEIVE_COMMAND)||(props.transaction_command === SEND_COMMAND)}

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
