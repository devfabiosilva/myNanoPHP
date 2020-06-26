import React from 'react';
import { connect } from 'react-redux';

import { 

    my_nano_php_public_key_to_wallet,
    my_nano_php_bip39_to_encrypted_stream,
    my_nano_php_encrypted_stream_to_key_pair,
    my_nano_php_seed_to_encrypted_stream

} from '../../service';

import { 

    setPublicKey,
    setNotifyMessage,
    resetWallet,
    setTokenAndWindow

} from '../../actions';

import { 

    my_wallet,
    NANO_KEY_PAIR,
    WALLET_FROM,
    PUBLIC_KEY_TO_WALLET_RESPONSE,
    NOTIFY_MESSAGE,
    ENCRYPTED_STREAM_RESULT,
    MY_NANO_PHP_ERROR,
    MY_NANO_PHP_SEED2KEYPAIR

} from '../../utils/wallet_interface';

import { 
    
    NOTIFY_TYPE, 
    getKey 

} from '../../utils';

import { TOKENIZER } from '../../reducers/tokenizer';
import { FiSkipBack } from 'react-icons/fi';
import './style.css';

export function OpenSeed(props: any) {

    function openNanoSeed() {

        let seed: any = document.getElementById('seed-input-id');
        let seed_value: string;
        let token: string = "";

        if ((seed_value = seed.value.trim()) === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.msg_empty_seed

            } as NOTIFY_MESSAGE);

            return;

        }

        if (!props.publicKey) {

            props.newNotification({

                msg: props.language.msg_generating_token,
                timeout: 400

            } as NOTIFY_MESSAGE);

            token = `@1A${getKey()}${getKey()}`;
    
        }

        if (props.bip39) {
            my_nano_php_bip39_to_encrypted_stream(seed_value, token).then(
                (result: any) => {

                    props.newNotification({

                        msg: props.language.msg_bip39_encrypted_success,
                        timeout: 300

                    } as NOTIFY_MESSAGE);

                    my_nano_php_encrypted_stream_to_key_pair(0, token, (result as ENCRYPTED_STREAM_RESULT).encrypted_stream as string).then(
                        (res: any) => {
                        
                            props.newNotification({

                                msg: props.language.msg_opening_wallet,
                                timeout: 300
        
                            } as NOTIFY_MESSAGE);

                            props.wallet_public_key({
        
                                wallet_number: 0,
                                encrypted_block: (result as ENCRYPTED_STREAM_RESULT).encrypted_stream as string,
                                origin: WALLET_FROM.FROM_KEY_PAIR,
                                public_key: (res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key,
                                wallet: (res as MY_NANO_PHP_SEED2KEYPAIR).key_pair.wallet
        
                            } as my_wallet);

                            props.openAndSetTokenWindow({ 

                                showWindow: true,
                                token

                             } as TOKENIZER);

                        },
                        (err: any) =>
                            props.newNotification({
                        
                                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                                msg: `${(err as MY_NANO_PHP_ERROR).error} ${(err as MY_NANO_PHP_ERROR).reason}`,
                                timeout: 800
        
                            } as NOTIFY_MESSAGE)
                    );
                },
                (error: any) =>
                    props.newNotification({
                        
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(error as MY_NANO_PHP_ERROR).error} ${(error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 800

                    } as NOTIFY_MESSAGE)
            );
        } else if (props.keyPair) {

            if (seed_value.length!==128) {

                props.newNotification({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: props.language.msg_invalid_keypair_size,
                    timeout: 1000

                } as NOTIFY_MESSAGE);

                return;

            }

            props.newNotification({

                msg: props.language.msg_encrypting_private_key_with_token,
                timeout: 400

            } as NOTIFY_MESSAGE);

            my_nano_php_seed_to_encrypted_stream(seed_value.substr(0, 64), token).then(
                (encrypted_seed_res: any) => {

                    props.newNotification({

                        msg: props.language.msg_extracting_public_key,
                        timeout: 400
        
                    } as NOTIFY_MESSAGE);

                    my_nano_php_public_key_to_wallet(seed_value.substr(64)).then(
                        (public_key_to_wallet_res: any) => {
                            props.wallet_public_key({
        
                                encrypted_block: (encrypted_seed_res as ENCRYPTED_STREAM_RESULT).encrypted_stream as string,
                                origin: WALLET_FROM.FROM_KEY_PAIR,
                                public_key: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).public_key,
                                wallet_number: 0,
                                wallet: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).wallet
        
                            } as my_wallet);

                            props.openAndSetTokenWindow({ 

                                showWindow: true,
                                token

                             } as TOKENIZER);

                        },
                        (public_key_to_wallet_error: any) =>
                            props.newNotification({
                        
                                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                                msg: `${(public_key_to_wallet_error as MY_NANO_PHP_ERROR).error} ${(public_key_to_wallet_error as MY_NANO_PHP_ERROR).reason}`,
                                timeout: 800
    
                            } as NOTIFY_MESSAGE)
                    );
                },
                (encrypted_seed_res_error: any) =>
                    props.newNotification({
                        
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(encrypted_seed_res_error as MY_NANO_PHP_ERROR).error} ${(encrypted_seed_res_error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 800

                    } as NOTIFY_MESSAGE)
            );

        } else if (props.publicKey) {

            if (seed_value.length!==64) {

                props.newNotification({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: props.language.msg_invalid_public_key_size,
                    timeout: 1000

                } as NOTIFY_MESSAGE);

                return;

            }

            my_nano_php_public_key_to_wallet(seed_value).then(
                (public_key_to_wallet_res: any) => {

                    props.newNotification({

                        msg: props.language.msg_extracting_public_key,
                        timeout: 400
        
                    } as NOTIFY_MESSAGE);

                    props.wallet_public_key({

                        origin: WALLET_FROM.FROM_PUBLIC_KEY,
                        public_key: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).public_key,
                        wallet_number: 0,
                        wallet: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).wallet

                    });

                    props.openAndSetTokenWindow({ 

                        showWindow: false,
                        token: ""

                     } as TOKENIZER);

                },
                (public_key_to_wallet_error: any) =>
                    props.newNotification({
                        
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(public_key_to_wallet_error as MY_NANO_PHP_ERROR).error} ${(public_key_to_wallet_error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 800

                    } as NOTIFY_MESSAGE)
            );

        } else {

            props.newNotification({

                msg: props.language.msg_extracting_seed,
                timeout: 400

            } as NOTIFY_MESSAGE);

            my_nano_php_seed_to_encrypted_stream(seed_value, token).then(
                (encrypted_stream_result: any) => {

                    props.newNotification({

                        msg: props.language.msg_extracting_keypair_from_encrypted_block,
                        timeout: 400
        
                    } as NOTIFY_MESSAGE);
        
                    my_nano_php_encrypted_stream_to_key_pair(0, token, (encrypted_stream_result as ENCRYPTED_STREAM_RESULT).encrypted_stream as string).then(
                        (seed2keypair: any) => {

                            props.wallet_public_key({

                                encrypted_block: (encrypted_stream_result as ENCRYPTED_STREAM_RESULT).encrypted_stream as string,
                                origin: WALLET_FROM.FROM_SEED,
                                public_key: (seed2keypair.key_pair as NANO_KEY_PAIR).public_key,
                                wallet_number: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet_number,
                                wallet: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet

                            } as my_wallet);

                            props.newNotification({

                                msg: props.language.opening_wallet_from_seed

                            } as NOTIFY_MESSAGE);

                            props.openAndSetTokenWindow({ 

                                showWindow: true,
                                token

                             } as TOKENIZER);


                        },
                        (error_seed2keypair) => 
                            props.newNotification({

                                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                                msg: `${error_seed2keypair.error} ${error_seed2keypair.reason}`
                                
                            } as NOTIFY_MESSAGE)
                    );
                },
                (encrypted_stream_error: any) =>
                    props.newNotification({
                        
                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: `${(encrypted_stream_error as MY_NANO_PHP_ERROR).error} ${(encrypted_stream_error as MY_NANO_PHP_ERROR).reason}`,
                        timeout: 800

                    } as NOTIFY_MESSAGE)
            
            );
        }

    }

    return (
        <div className="open-seed-container">
            <div className="open-seed-content-box">
                <div className="open-seed-title">

                    {

                        (props.bip39)?props.language.your_bip39:
                        (props.keyPair)?props.language.your_keypair:
                        (props.publicKey)?props.language.your_public_key:
                        props.language.your_seed

                    }

                </div>
                <input

                    className = "seed-input"
                    id = "seed-input-id"
                    type="text"
                    title= {

                        (props.bip39)?props.language.type_your_bip39_here:
                        (props.keyPair)?props.language.type_your_keypair_here:
                        (props.publicKey)?props.language.type_your_public_key_here:
                        props.language.type_your_seed_here

                    }
                    placeholder = {

                        (props.bip39)?props.language.type_your_bip39_here:
                        (props.keyPair)?props.language.type_your_keypair_here:
                        (props.publicKey)?props.language.type_your_public_key_here:
                        props.language.type_your_seed_here

                    }

                />
                <button

                    className="open-seed-btn"
                    onClick={ openNanoSeed }
                    title= {

                        (props.bip39)?props.language.open_nano_bip39:
                        (props.keyPair)?props.language.open_keypair:
                        (props.publicKey)?props.language.open_public_key:
                        props.language.open_nano_seed

                    }

                >
                    {
                        (props.bip39)?props.language.open_nano_bip39:
                        (props.keyPair)?props.language.open_keypair:
                        (props.publicKey)?props.language.open_public_key:
                        props.language.open_nano_seed
                    }
                </button>
                <button

                    className="go-back-open-seed-btn"
                    onClick={ () => props.goBack() }
                    title={ props.language.go_back }

                >
                    <FiSkipBack size={20} style={{paddingRight: "4px"}} /> { props.language.go_back }
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    goBack: () => dispatch(resetWallet()),
    openAndSetTokenWindow: (tokenizer: TOKENIZER) => dispatch(setTokenAndWindow(tokenizer))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(OpenSeed);
