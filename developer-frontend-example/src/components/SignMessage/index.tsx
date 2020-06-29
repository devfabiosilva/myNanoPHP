import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    
    FiCheck, 
    FiEdit3, 
    FiX, 
    FiCheckCircle,
    FiXCircle

} from 'react-icons/fi';

import { 
    
    my_wallet, 
    NOTIFY_MESSAGE, 
    SIGNATURE_VERIFY,
    MY_NANO_PHP_ERROR,
    MY_NANO_PHP_SEED2KEYPAIR,
    SIGNED_MESSAGE

} from '../../utils/wallet_interface';

import { 
    
    changeSignVerifyWindow, 
    setNotifyMessage 

} from '../../actions';

import { 
    
    my_nano_php_verify_message_sig, 
    my_nano_php_encrypted_stream_to_key_pair, 
    my_nano_php_sign_message

} from '../../service';

import { 
    
    NOTIFY_TYPE,
    MY_NANO_PHP_VERIFY_SIG_HASH,
    MY_NANO_PHP_VERIFY_SIG_MSG

} from '../../utils';

import './style.css';

const SIG_UNSET = 0;
const VALID_SIG = 1;
const INVALID_SIG = 2;

export function SignMessage(props: any) {

    const [ walletPublicKeyValue, setWalletPublicKeyValue ] = useState("");
    const [ messageHash, setMessageHash ] = useState("");
    const [ signature, setSignature ] = useState("");
    const [ tokenPasswordBox, setTokenPasswordBox ] = useState(false);
    const [ tokenPasswordInput, setTokenPasswordInput ] = useState("");
    const [ sigStatus, setSigStatus ] = useState(SIG_UNSET);
    
    useEffect(
        () => {

            if (props.isSignedVerifyWindowClosed) {

                setWalletPublicKeyValue("");
                setSignature("");
                setMessageHash("");
                setSigStatus(SIG_UNSET);

            } else
                setWalletPublicKeyValue((props.wallet as my_wallet).wallet as string);

        }, [ props.isSignedVerifyWindowClosed, props.wallet ]
    )

    function ShowSigStatus() {

        if (sigStatus === VALID_SIG)
            return (
                <div className="signature-success">
                    <FiCheckCircle size={18} style={{marginRight: "6px"}} />{ props.language.msg_valid_signature }
                </div>
            );

        if (sigStatus === INVALID_SIG)
            return (
                <div className="signature-fail">
                    <FiXCircle size={18} style={{marginRight: "6px"}} />{ props.language.msg_invalid_signature }
                </div>
            );
        
        return null;

    }

    function signThisMessage() {
        let privateKey: string;
        let isHash: any;

        if (messageHash === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.msg_missing_message,
                timeout: 3000

            } as NOTIFY_MESSAGE);

            return;

        }

        if (tokenPasswordInput === "") {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: props.language.empty_password,
                timeout: 3000

            } as NOTIFY_MESSAGE);

            return;

        }

        isHash = document.getElementById('sign-is-hash-id');

        props.newNotification({

            msg: props.language.msg_opening_enc_block,
            timeout: 600

        } as NOTIFY_MESSAGE);

        my_nano_php_encrypted_stream_to_key_pair(

            (props.wallet as my_wallet).wallet_number as number, 
            tokenPasswordInput,
            (props.wallet as my_wallet).encrypted_block as string

        ).then(
            (privKey: any) => {

                privateKey = `${(privKey as MY_NANO_PHP_SEED2KEYPAIR).key_pair.private_key}${(privKey as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key}`;

                props.newNotification({

                    msg: props.language.msg_signing_message,
                    timeout: 2000

                } as NOTIFY_MESSAGE);

                my_nano_php_sign_message(
                    
                    messageHash,
                    privateKey, 
                    (isHash.checked)?MY_NANO_PHP_VERIFY_SIG_HASH:MY_NANO_PHP_VERIFY_SIG_MSG
                
                ).then(
                    (signedMessageSuccess: any) => {

                        setSignature((signedMessageSuccess as SIGNED_MESSAGE).signature as string);
                        setTokenPasswordInput("");
                        setWalletPublicKeyValue((props.wallet as my_wallet).wallet as string);
                        setTokenPasswordBox(false);
                        props.newNotification({

                            msg: props.language.msg_message_signed,
                            timeout:3000

                        } as NOTIFY_MESSAGE);

                    },
                    (signedMessageError: any) => {

                        setTokenPasswordInput("");
                        props.newNotification({

                            notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                            msg: `${(signedMessageError as MY_NANO_PHP_ERROR).error} ${(signedMessageError as MY_NANO_PHP_ERROR).reason}`,
                            timeout:3000

                        } as NOTIFY_MESSAGE);

                    }
                );

            },
            (privKeyError: any) => props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: `${(privKeyError as MY_NANO_PHP_ERROR).error} ${(privKeyError as MY_NANO_PHP_ERROR).reason}`,
                timeout: 4000

            } as NOTIFY_MESSAGE)
        );

    }

    function SignPasswordBox() {
        return (
            <div

                className="sign-password-box-container"
                style={{ display: (tokenPasswordBox)?"flex":"none" }}

            >
                <div className="sign-password-box">
                    <div className="sign-password-box-title">
                        { props.language.msg_title_password_token }
                    </div>
                    <div className="sign-password-input-box">
                        <input 
                            
                            type="password" 
                            className="sign-password-input"
                            value={ tokenPasswordInput }
                            onChange={ ( e ) => setTokenPasswordInput( e.target.value ) }
                            placeholder={ props.language.msg_title_password_token }
                            title={ props.language.msg_title_password_token }
                        
                        />
                    </div>
                    <div className="sign-password-button-box">
                        <button 

                            className="sign-password-cancel-btn"
                            onClick={ () => {
                                
                                setTokenPasswordInput("");
                                setTokenPasswordBox(false);

                            }}
                            title={ props.language.cancel_button }
                        
                        >
                            { props.language.cancel_button }
                        </button>
                        <button 
                            
                            className="sign-password-ok-btn"
                            onClick={ () => signThisMessage() }
                            title="Ok"
                        
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function verifyMessageHash() {

        let isHash: any = document.getElementById('sign-is-hash-id');

        setSigStatus(SIG_UNSET);

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
            (sign_res: any) => {
                if ((sign_res as SIGNATURE_VERIFY).valid === "1") {
                    setSigStatus(VALID_SIG);
                    props.newNotification({

                        msg: props.language.msg_valid_signature,
                        timeout: 1000
            
                    } as NOTIFY_MESSAGE);
                } else {
                    setSigStatus(INVALID_SIG);
                    props.newNotification({

                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: props.language.msg_invalid_signature,
                        timeout: 1000
            
                    } as NOTIFY_MESSAGE);
                }
            }, (sign_err) => 
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
            <SignPasswordBox />
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
                    <ShowSigStatus />
                </div>
                <div className="button-box">
                    <button 

                        className="sign-msg-btn"
                        onClick={ () => {

                            setSigStatus(SIG_UNSET);
                            setTokenPasswordBox(true);
                        
                        }}
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
