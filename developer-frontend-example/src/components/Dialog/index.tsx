import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    closeWalletDialog, setMyWallet, dialogStatus
} from '../../actions';

import './style.css';
import { WALLET_FROM, my_wallet, MY_NANO_PHP_SEED2KEYPAIR } from '../../utils/wallet_interface';
import { my_nano_php_open_encrypted_seed, my_nano_php_extract_key_pair_from_nano_seed } from '../../service';

function Dialog(props: any) {

    useEffect(

        () => {
            console.log( props.nano_wallet );
        },
        [
            props.nano_wallet
        ]

    );

    function extractPrivateKeyFromOrigin( props: any ) {

        let obj: any;
        let password: string;

        if (props.nano_wallet.origin === WALLET_FROM.FROM_ENCRYPTED_FILE) {

            obj = document.getElementById('origin-enc-file-password');
            password = obj.value.trim();

            if (password === "") {

                alert("Password to decrypt file stream must be not null");
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

                            props.dialogStatus("send");

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

        }

    }

    function OriginSelection(props: any) {
    
        switch (props.wallet.origin) {

            case WALLET_FROM.FROM_ENCRYPTED_FILE:
                return (
                    <div className="origin-enc-file-password-container">
                        <input

                            type="password"
                            id="origin-enc-file-password"
                            placeholder="Type your password to decrypt file"

                        />
                    </div>
                );

            default:
                return (
                    <div>
                        default testing
                    </div>
                );

        }

    }
    return ((props.dialogVisible)?(
        <div className="dialog-container">
            <div className="dialog-window">
                <div className="dialog-button-container">
                    <OriginSelection wallet = { props.nano_wallet }/>
                    <button
                        className = "dialog-button-cancel"
                        onClick = { props.closeMyDialog } 
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
    dialogVisible: state.openTransactionDialog

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    closeMyDialog: () => dispatch(closeWalletDialog()),
    setMyWallet: (param: my_wallet) => dispatch(setMyWallet(param)),
    dialogStatus: (param: string) => dispatch(dialogStatus(param))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);