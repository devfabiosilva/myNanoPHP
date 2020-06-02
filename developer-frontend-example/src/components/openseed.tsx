import React from 'react';
import { connect } from 'react-redux';

import { 

    my_nano_php_seed2keypair,
    my_nano_php_extract_key_pair_from_bip39

} from '../service';

import { setPublicKey } from '../actions';
import { 

    my_wallet,
    NANO_KEY_PAIR,
    WALLET_FROM

} from '../utils/wallet_interface';

export function OpenSeed(props: any) {

    function openNanoSeed() {

        let seed: any = document.getElementById('seed-input-id');
        let seed_value: string;

        if ((seed_value = seed.value.trim()) === "") {

            alert(props.language.msg_empty_seed);

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
                    console.log(error);
                }
            )
        else
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

                },
                (error_seed2keypair) => {
                    console.log(error_seed2keypair);
                }
            );

    }

    return (
        <div>
            <div>
                { (props.bip39)?props.language.your_bip39:props.language.your_seed }
            </div>
            <input

                className="seed-input"
                id="seed-input-id"
                placeholder={ (props.bip39)?props.language.type_your_bip39_here:props.language.type_your_seed_here }

            />
            <button

                className="open-seed-btn"
                onClick={ openNanoSeed }

            >
                { (props.bip39)?props.language.open_nano_bip39:props.language.open_nano_seed }
            </button>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(OpenSeed);
