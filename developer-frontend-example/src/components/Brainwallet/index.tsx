import React from 'react';
import { connect } from 'react-redux';

import { 

    my_nano_php_open_brainwallet,
    my_nano_php_seed2keypair,
    my_nano_php_seed_to_encrypted_stream

} from '../../service';

import {

    BRAINWALLET_RESPONSE, 
    MY_NANO_PHP_ERROR, 
    NANO_KEY_PAIR, 
    my_wallet, 
    WALLET_FROM,
    NOTIFY_MESSAGE,
    ENCRYPTED_STREAM_RESULT

} from '../../utils/wallet_interface';

import { 
    
    setPublicKey, 
    resetWallet, 
    setNotifyMessage,
    setTokenAndWindow

} from '../../actions';

import {
    
    NOTIFY_TYPE,
    generateToken 

} from '../../utils';

import { FiSkipBack } from 'react-icons/fi';
import { TOKENIZER } from '../../reducers/tokenizer';
import './style.css';

export function Brainwallet(props: any) {

    function openBrainWallet() {

        let brainwallet: any = document.getElementById("word-phrases-id");
        let salt: any = document.getElementById("salt-id");
        let braiwallet_value: string;
        let salt_value: string;
        let token: string;

        if ((braiwallet_value = brainwallet.value.trim()) === "") {

            props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_brainwallet_empty,
                timeout: 1000

            } as NOTIFY_MESSAGE);
            return;

        }

        if ((salt_value = salt.value.trim()) === "") {

            props.setNotifyMessage({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_salt_empty

            } as NOTIFY_MESSAGE);
            return;

        }

        props.setNotifyMessage({

            msg: props.language.msg_generating_token,
            timeout: 400

        } as NOTIFY_MESSAGE);

        token = generateToken();

        props.setNotifyMessage({

            msg: props.language.msg_extracting_seed_from_brainwallet,
            timeout: 400

        } as NOTIFY_MESSAGE);

        my_nano_php_open_brainwallet(braiwallet_value, salt_value).then(
            (result) => {

                props.setNotifyMessage({

                    msg: `${(result as BRAINWALLET_RESPONSE).extracted.warning_msg} ${(result as BRAINWALLET_RESPONSE).warning}`,
                    timeout: 5000

                } as NOTIFY_MESSAGE);

                my_nano_php_seed2keypair(0, (result as BRAINWALLET_RESPONSE).extracted.result.seed).then(
                    (seed2keypair: any) => {
                        
                        props.setNotifyMessage({

                            msg: props.language.msg_encrypting_brainwallet_seed,
                            timeout: 400
                
                        } as NOTIFY_MESSAGE);

                        my_nano_php_seed_to_encrypted_stream((result as BRAINWALLET_RESPONSE).extracted.result.seed as string, token).then(
                            (encypted_stream_result: any) => {
                                props.wallet_public_key(
                                    {

                                        origin: WALLET_FROM.FROM_BRAINWALLET,
                                        encrypted_block: ((encypted_stream_result as ENCRYPTED_STREAM_RESULT).encrypted_stream as string),
                                        wallet_number: 0,
                                        public_key: (seed2keypair.key_pair as NANO_KEY_PAIR).public_key,
                                        wallet: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet

                                    } as my_wallet
                                );

                                props.openAndSetTokenWindow({

                                    showWindow: true,
                                    token

                                } as TOKENIZER);

                            },
                            (encrypted_stream_error) =>
                                props.setNotifyMessage({

                                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                                    msg: `${(encrypted_stream_error as MY_NANO_PHP_ERROR).error} ${(encrypted_stream_error as MY_NANO_PHP_ERROR).reason}`,
                                    timeout: 10000
                
                                } as NOTIFY_MESSAGE)
                        );
                    },
                    (seed2keypair_error) =>                 
                        props.setNotifyMessage({

                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(seed2keypair_error as MY_NANO_PHP_ERROR).error} ${(seed2keypair_error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 10000
    
                    } as NOTIFY_MESSAGE)
                );
            },
            (error) =>
                props.setNotifyMessage({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: `${(error as MY_NANO_PHP_ERROR).error} ${(error as MY_NANO_PHP_ERROR).reason}`,
                    timeout: 10000

                } as NOTIFY_MESSAGE)
        )

    }

    return (
        <div className="brainwallet-container">
            <div className="brainwallet-box">
                <div className="word-phrases-container">
                    <div className="word-phrases-title">
                        { props.language.brainwallet }
                    </div>
                    <input

                        type="text"
                        className="word-phrases"
                        id="word-phrases-id"
                        title={ props.language.placehold_type_brainwallet }
                        placeholder={ props.language.placehold_type_brainwallet }
                        style={
                            {
                                height: "80px"
                            }
                        }

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
                        title={ props.language.placehold_type_salt }
                        placeholder={ props.language.placehold_type_salt }
                        
                    />
                </div>
                <button 

                    className="open-brainwallet-btn"
                    onClick={ openBrainWallet }
                    title={ props.language.open_brainwallet }

                >
                    { props.language.open_brainwallet }
                </button>
                <button

                    className="go-back-open-brainwallet-btn"
                    onClick={ () => props.goBack() }
                    title={ props.language.go_back }

                >
                    <FiSkipBack size={20} style={{paddingRight: "4px"}} /> { props.language.go_back }
                </button>

            </div>
        </div>
    )

}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key)),
    setNotifyMessage: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    goBack: () => dispatch(resetWallet()),
    openAndSetTokenWindow: (tokenizer: TOKENIZER) => dispatch(setTokenAndWindow(tokenizer))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(Brainwallet);
