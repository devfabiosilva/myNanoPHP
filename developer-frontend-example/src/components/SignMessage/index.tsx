import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    
    FiCheck, 
    FiEdit3, 
    FiX 

} from 'react-icons/fi';

import { my_wallet } from '../../utils/wallet_interface';
import { changeSignVerifyWindow } from '../../actions';
import './style.css';

export function SignMessage(props: any) {

    const [ walletPublicKeyValue, setWalletPublicKeyValue ] = useState("");
    const [ messageHash, setMessageHash ] = useState("");
    const [ signature, setSignature ] = useState("");
    
    useEffect(
        () => {

            if (!props.isSignedVerifyWindowClosed)
                setWalletPublicKeyValue((props.wallet as my_wallet).wallet as string);

        }, [ props.isSignedVerifyWindowClosed, props.wallet ]
    )

    return (
        <div 
            
            className="sign-message-container"
            style={ { display: (props.isSignedVerifyWindowClosed)?"none":"flex" } }

        >
            <div className="sign-message-window">
                <div className="sign-box-title">
                    { props.language.sign_verify_message_title }
                </div>
                <div className="sign-box">
                    <div className="sign-message-title">
                        <div className="sub-sign-message-title">
                            { props.language.msg_message_or_hash }
                        </div>
                        <div className="sub-sign-message">
                            <input 

                                type="checkbox" 
                                className="sign-is-hash"
                                title={ props.language.msg_is_blk_hash }

                            />
                            <label htmlFor="sign-is-hash">
                                { props.language.msg_is_blk_hash }
                            </label>
                        </div>
                    </div>
                    <div className="sign-message-box">
                        <input
                            
                            type="text" 
                            className="sign-message-input"
                            value={messageHash}
                            onChange={ (e) => setMessageHash(e.target.value) }
                            style={{height: "80px"}}
                            placeholder={ props.language.msg_sign_verify_message_hash }
                            title={ props.language.msg_sign_verify_message_hash }

                        />
                    </div>
                    <div className="sign-public-key-title">
                        { props.language.pk_or_nano_wallet_title }
                    </div>
                    <div className="sign-public-key-box">
                        <input
                            
                            type="text" 
                            className="sign-public-key-input"
                            value={ walletPublicKeyValue }
                            onChange={ (e) => { setWalletPublicKeyValue(e.target.value) } }
                            placeholder={ props.language.pk_or_nano_wallet_title }
                            title={ props.language.pk_or_nano_wallet_title }

                        />
                    </div>
                    <div className="sign-signature-title">
                        { props.language.signature_title }
                    </div>
                    <div className="sign-signature-box">
                        <input 

                            type="text" 
                            className="sign-signature-input" 
                            value={ signature }
                            onChange={ (e) => setSignature(e.target.value) }
                            style={ { height: "60px" } }
                            placeholder={ props.language.signature_title }
                            title={ props.language.signature_title }
                        
                        />
                    </div>
                </div>
                <div className="action-box">
                    Caixa de ação
                </div>
                <div className="button-box">
                    <button 

                        className="sign-msg-btn"
                        placeholder={ props.language.sign_title }
                        title={ props.language.sign_title }

                    >
                        <FiEdit3 size={22} style={ { marginRight: "4px" } }/>{ props.language.sign_title }
                    </button>
                    <button 
                    
                        className="sign-verify-btn"
                        placeholder={ props.language.verify_title }
                        title={ props.language.verify_title }
        
                    >
                        <FiCheck size={22} style={ { marginRight: "4px" } } />{ props.language.verify_title }
                    </button>
                    <button 
                    
                        className="sign-close-btn"
                        onClick={ () => props.closeSignVerifyWindow() }
                        title={ props.language.title_close }
                        
                    >
                        <FiX size={22} style={ { marginRight: "4px" } } />{ props.language.title_close }
                    </button>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({

    wallet: state.wallet,
    language: state.lang,
    isSignedVerifyWindowClosed: state.verifySignWindowState

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    closeSignVerifyWindow: () => dispatch(changeSignVerifyWindow())

});
  
export default connect(mapStateToProps, mapDispatchToProps)(SignMessage);
