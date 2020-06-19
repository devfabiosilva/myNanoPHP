import React from 'react';
import { connect } from 'react-redux';

import { 

    my_nano_php_seed2keypair,
    my_nano_php_extract_key_pair_from_bip39,
    my_nano_php_public_key_to_wallet

} from '../../service';

import { 

    setPublicKey, setNotifyMessage, resetWallet

} from '../../actions';

import { 

    my_wallet,
    NANO_KEY_PAIR,
    WALLET_FROM,
    PUBLIC_KEY_TO_WALLET_RESPONSE,
    NOTIFY_MESSAGE

} from '../../utils/wallet_interface';

import { NOTIFY_TYPE } from '../../utils';
import { FiSkipBack } from 'react-icons/fi';
import './style.css';

export function OpenSeed(props: any) {

    function openNanoSeed() {

        let seed: any = document.getElementById('seed-input-id');
        let seed_value: string;

        if ((seed_value = seed.value.trim()) === "") {

            //alert(props.language.msg_empty_seed);
            props.newNotification({
                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.msg_empty_seed
            } as NOTIFY_MESSAGE);

            return;

        }

        if (props.bip39)
            my_nano_php_extract_key_pair_from_bip39(0, seed_value).then(
                (bip39result: any) => {

                    props.wallet_public_key(

                        {
                            origin: WALLET_FROM.FROM_BIP39,
                            public_key: (bip39result.key_pair as NANO_KEY_PAIR).public_key,
                            wallet_number: (bip39result.key_pair as NANO_KEY_PAIR).wallet_number,
                            wallet: (bip39result.key_pair as NANO_KEY_PAIR).wallet
                        }

                    );

                },
                (error) => {
                    if (error.error) {
                        props.newNotification({
                            notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                            msg: `${error.error} ${error.reason}`
                        } as NOTIFY_MESSAGE);
                    }
                }
            );
        else if (props.keyPair) {

            if (seed_value.length!==128) {

                alert(props.language.msg_invalid_keypair_size);
                return;

            }

            my_nano_php_public_key_to_wallet(seed_value.substr(64)).then(
                (public_key_to_wallet_res: any) => {
                    console.log(public_key_to_wallet_res);
                    props.wallet_public_key(

                        {

                            origin: WALLET_FROM.FROM_KEY_PAIR,
                            public_key: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).public_key,
                            wallet_number: 0,
                            wallet: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).wallet

                        }

                    );

                },
                (public_key_to_wallet_error: any) => {
                    console.log(public_key_to_wallet_error);
                }
            );

        } else if (props.publicKey) {

            if (seed_value.length!==64) {

                alert(props.language.msg_invalid_public_key_size);
                return;

            }

            my_nano_php_public_key_to_wallet(seed_value).then(
                (public_key_to_wallet_res: any) => {
                    console.log(public_key_to_wallet_res);
                    props.wallet_public_key(

                        {

                            origin: WALLET_FROM.FROM_PUBLIC_KEY,
                            public_key: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).public_key,
                            wallet_number: 0,
                            wallet: (public_key_to_wallet_res as PUBLIC_KEY_TO_WALLET_RESPONSE).wallet

                        }

                    );

                },
                (public_key_to_wallet_error: any) => {
                    console.log(public_key_to_wallet_error);
                }
            );

        } else
            my_nano_php_seed2keypair(0, seed_value).then(
                (seed2keypair: any) => {

                    props.wallet_public_key(

                        {
                            origin: WALLET_FROM.FROM_SEED,
                            public_key: (seed2keypair.key_pair as NANO_KEY_PAIR).public_key,
                            wallet_number: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet_number,
                            wallet: (seed2keypair.key_pair as NANO_KEY_PAIR).wallet
                        }

                    );
                    props.newNotification({
                        msg: props.language.opening_wallet_from_seed
                    } as NOTIFY_MESSAGE);
                },
                (error_seed2keypair) => {
                    //console.log(error_seed2keypair);
                    if (error_seed2keypair.error) {
                        props.newNotification({
                            notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                            msg: `${error_seed2keypair.error} ${error_seed2keypair.reason}`
                        } as NOTIFY_MESSAGE);
                    }
                }
            );

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
    goBack: () => dispatch(resetWallet())

});
  
export default connect(mapStateToProps, mapDispatchToProps)(OpenSeed);
