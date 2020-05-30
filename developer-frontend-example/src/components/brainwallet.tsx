import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 

    my_nano_php_open_brainwallet,
    my_nano_php_seed2keypair

} from '../service';

import {

    BRAINWALLET_RESPONSE, 
    MY_NANO_PHP_ERROR, 
    NANO_KEY_PAIR, 
    my_wallet 

} from '../utils/wallet_interface';

import { setPublicKey } from '../actions';

export function Brainwallet(props: any) {

    const [ warningMsg, setWarningMsg ] = useState("");

    function openBrainWallet() {

        let brainwallet: any = document.getElementById("word-phrases-id");
        let salt: any = document.getElementById("salt-id");

        if (brainwallet.value.trim() === "") {

            setWarningMsg( props.language.msg_brainwallet_empty );
            return;

        }

        if (salt.value.trim() === "" ) {

            setWarningMsg( props.language.msg_salt_empty );
            return;

        }

        if (warningMsg!=="")
            setWarningMsg("");

        my_nano_php_open_brainwallet(brainwallet.value, salt.value).then(
            (result) => {

                setWarningMsg(

                    `${(result as BRAINWALLET_RESPONSE).extracted.warning_msg}
                    ${(result as BRAINWALLET_RESPONSE).warning}`

                );
    
                my_nano_php_seed2keypair(0, (result as BRAINWALLET_RESPONSE).extracted.result.seed).then(
                    (seed2keypair: any) => {
                        console.log((seed2keypair.key_pair as NANO_KEY_PAIR));

                        props.wallet_public_key(
                            {
                                public_key: (seed2keypair.key_pair as NANO_KEY_PAIR).public_key,
                                wallet_number: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet_number,
                                wallet: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet
                            }
                        );
                    },
                    (seed2keypair_error) => {
                        console.log(seed2keypair_error);
                    }
                );
            },
            (error) => {

                setWarningMsg(
                    (error as MY_NANO_PHP_ERROR).reason
                );

            }
        )

    }

    return (
        <div className="brainwallet-container">
            <div className="word-phrases-container">
                <div className="word-phrases-title">
                    { props.language.brainwallet }
                </div>
                <input
                    type="text"
                    className="word-phrases"
                    id="word-phrases-id"
                />
            </div>
            <div className="salt-container">
                <div className="salt-title">
                    { props.language.salt }
                </div>
                <input
                    type="text"
                    className="salt"
                    id="salt-id"
                />
            </div>
            <button 
                className="open-brainwallet-btn"
                onClick={ openBrainWallet }
            >
                { props.language.open_brainwallet }
            </button>
            <div
                className="warning-msg-container"
            >
                { warningMsg }
            </div>
        </div>
    )

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet: state.wallet,
    language: state.lang
});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Brainwallet);
