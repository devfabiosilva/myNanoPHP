import React, { useState } from 'react';
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

    const [ walletPublicKeyValue, setWalletPublicKeyValue ] = useState((props.wallet as my_wallet).wallet as string);
    
    return (
        <div 
            
            className="sign-message-container"
            style={ { display: (props.isSignedVerifyWindowClosed)?"none":"flex" } }

        >
            <div className="sign-message-window">
                <div className="sign-box-title">
                    Assinar/verificar mensagem ou hash
                </div>
                <div className="sign-box">
                    <div className="sign-message-title">
                        <div className="sub-sign-message-title">
                            Mensagem ou hash
                        </div>
                        <div className="sub-sign-message">
                            <input type="checkbox" className="sign-is-hash" />
                            <label htmlFor="sign-is-hash">É hash do bloco?</label>
                        </div>
                    </div>
                    <div className="sign-message-box">
                        <input type="text" className="sign-message-input" style={{height: "80px"}}/>
                    </div>
                    <div className="sign-public-key-title">
                        Chave pública ou carteira Nano
                    </div>
                    <div className="sign-public-key-box">
                        <input
                            
                            type="text" 
                            className="sign-public-key-input"
                            value={ walletPublicKeyValue } 
                            onChange={ (e) => { setWalletPublicKeyValue(e.target.value) } }

                        />
                    </div>
                    <div className="sign-signature-title">
                        Assinatura
                    </div>
                    <div className="sign-signature-box">
                        <input 

                            type="text" 
                            className="sign-signature-input" 
                            style={ { height: "60px" } }
                        
                        />
                    </div>
                </div>
                <div className="action-box">
                    Caixa de ação
                </div>
                <div className="button-box">
                    <button className="sign-msg-btn">
                        <FiEdit3 size={22} style={ { marginRight: "4px" } }/>Assinar
                    </button>
                    <button className="sign-verify-btn">
                        <FiCheck size={22} style={ { marginRight: "4px" } } />Verificar
                    </button>
                    <button 
                    
                        className="sign-close-btn"
                        onClick={ () => props.closeSignVerifyWindow() }
                        
                    >
                        <FiX size={22} style={ { marginRight: "4px" } } />Fechar
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
