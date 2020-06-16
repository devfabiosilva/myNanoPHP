import React from 'react';
import { connect } from 'react-redux';

import { 

    my_wallet, 
    WALLET_FROM

} from '../../utils/wallet_interface';

import { 

    FaKey, 
    FaSeedling, 
    FaBook, 
    FaLock, 
    FaBrain,
    FaPlus,
    FaWallet,
    FaAddressCard

} from 'react-icons/fa'

import { setPublicKey } from '../../actions';
import './style.css';

export function SelectWallet(props: any) {

    function setOptions(origin: string) {

        props.wallet_public_key({
            public_key: "",
            origin
        });
        
    }

    return (
        <div className="option-container">
            <div className="wallet-panel">
                <div className="option-container-row">
                    <div

                        onClick={() => setOptions(WALLET_FROM.FROM_SEED)}
                        className="option-container-tag"

                    >
                        <p className="option-container-icon">
                            <FaSeedling size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_with_seed }
                        </p>
                    </div>
                    <div 
                        
                        onClick={() => setOptions(WALLET_FROM.FROM_BIP39)}
                        className="option-container-tag"

                    >
                        <p className="option-container-icon">
                            <FaBook size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_with_bip39 }
                        </p>
                    </div>
                    <div 

                        onClick={() => setOptions(WALLET_FROM.FROM_ENCRYPTED_FILE)}
                        className="option-container-tag"

                    >
                        <p className="option-container-icon">
                            <FaLock size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_with_encrypted_file }
                        </p>
                    </div>
                    <div
                        
                        onClick={() => setOptions(WALLET_FROM.FROM_BRAINWALLET)}
                        className="option-container-tag"

                    >
                        <p className="option-container-icon">
                            <FaBrain size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_with_brainwallet }
                        </p>
                    </div>
                    </div>
                <div className="option-container-row">
                    <div
                     
                        onClick={() => setOptions(WALLET_FROM.FROM_GENERATING_SEED)}
                        className="option-container-tag"
                    
                    >
                        <p className="option-container-icon">
                            <FaPlus size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_gen_new_seed }
                        </p>
                    </div>
                    <div
                        
                        onClick={() => setOptions(WALLET_FROM.FROM_KEY_PAIR)}
                        className="option-container-tag"
                    
                    >
                        <p className="option-container-icon">
                            <FaKey size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_keypair }
                        </p>
                    </div>
                    <div
                        
                        onClick={() => setOptions(WALLET_FROM.FROM_PUBLIC_KEY)}
                        className="option-container-tag"
                        
                    >
                        <p className="option-container-icon">
                            <FaWallet size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.open_from_public_key }
                        </p>
                    </div>
                    <div 
                        
                        onClick={() => alert("Testing about in development ...")}
                        className="option-container-tag"
                    
                    >
                        <p className="option-container-icon">
                            <FaAddressCard size={32} />
                        </p>
                        <p className="option-container-text">
                            { props.language.about_author }
                        </p>
                    </div>
                </div>
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
});
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectWallet);