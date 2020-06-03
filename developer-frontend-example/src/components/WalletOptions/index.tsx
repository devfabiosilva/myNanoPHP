import React from 'react';
import { connect } from 'react-redux';

import { 

    my_wallet, 
    WALLET_FROM

} from '../../utils/wallet_interface';

import { setPublicKey } from '../../actions';

export function SelectWallet(props: any) {

    function setOptions() {

        let option: any = document.getElementById('options-id');
        let origin: number = option.value;

        props.wallet_public_key({
            public_key: "",
            origin
        });
        console.log(props.nano_wallet)

    }

    return (
        <div
            className="option-container"
        >
            <select
                className="options"
                id="options-id"
            >

                <option defaultValue = { WALLET_FROM.FROM_SEED } value={ WALLET_FROM.FROM_SEED }>
                    { props.language.open_with_seed }
                </option>
                <option value = { WALLET_FROM.FROM_BIP39 }>
                    { props.language.open_with_bip39 }
                </option>
                <option value = { WALLET_FROM.FROM_ENCRYPTED_FILE }>
                    { props.language.open_with_encrypted_file }
                </option>
                <option value = { WALLET_FROM.FROM_BRAINWALLET }>
                    { props.language.open_with_brainwallet }
                </option>
                <option value = { WALLET_FROM.FROM_GENERATING_SEED }>
                    { props.language.open_gen_new_seed }
                </option>
                <option value = { WALLET_FROM.FROM_KEY_PAIR }>
                    { props.language.open_keypair }
                </option>
                <option value = { WALLET_FROM.FROM_PUBLIC_KEY }>
                    { props.language.open_from_public_key }
                </option>
            </select>
            <button 
                className="open-selected-btn"
                onClick={ setOptions }
            >
                { props.language.open_selected }
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
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectWallet);