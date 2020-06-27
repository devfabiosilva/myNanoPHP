import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    
    FiCheck, 
    FiEdit3, 
    FiX 

} from 'react-icons/fi';

import { 
    
    my_wallet, 
    NOTIFY_MESSAGE, 
    SIGNATURE_VERIFY,
    MY_NANO_PHP_ERROR

} from '../../utils/wallet_interface';

import { 
    
    changeSignVerifyWindow, 
    setNotifyMessage 

} from '../../actions';

import { my_nano_php_verify_message_sig } from '../../service';

import { 
    
    NOTIFY_TYPE,
    MY_NANO_PHP_VERIFY_SIG_HASH,
    MY_NANO_PHP_VERIFY_SIG_MSG

} from '../../utils';

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

    function verifyMessageHash() {

        let isHash: any = document.getElementById('sign-is-hash-id');

        if (walletPublicKeyValue === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_requires_nano_wallet_pk,
                timeout: 1000

            } as NOTIFY_MESSAGE);

            return;

        }

        if (messageHash === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_missing_message_or_hash,
                timeout: 1000

            } as NOTIFY_MESSAGE);

            return;

        }

        if (signature === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_missing_signature,
                timeout: 1000

            } as NOTIFY_MESSAGE);

            return;

        }

        props.newNotification({

            msg: props.language.msg_checking_signature,
            timeout: 600

        } as NOTIFY_MESSAGE);

        my_nano_php_verify_message_sig(signature, messageHash, walletPublicKeyValue, (isHash.checked)?MY_NANO_PHP_VERIFY_SIG_HASH:MY_NANO_PHP_VERIFY_SIG_MSG).then(
            (sign_res: any) =>
                ((sign_res as SIGNATURE_VERIFY).valid === "1")?
                props.newNotification({

                    msg: props.language.msg_valid_signature,
                    timeout: 1000
        
                } as NOTIFY_MESSAGE):
                props.newNotification({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: props.language.msg_invalid_signature,
                    timeout: 1000
        
                } as NOTIFY_MESSAGE),
            (sign_err) => 
                props.newNotification({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: `${(sign_err as MY_NANO_PHP_ERROR).error} ${(sign_err as MY_NANO_PHP_ERROR).reason}`,
                    timeout: 1000
    
                } as NOTIFY_MESSAGE)

        )

    }

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
                                id="sign-is-hash-id"
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
                        onClick={ () => verifyMessageHash() }
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

    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    closeSignVerifyWindow: () => dispatch(changeSignVerifyWindow())

});
  
export default connect(mapStateToProps, mapDispatchToProps)(SignMessage);
