import React from 'react';
import { connect } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';
import { setTokenAndWindow } from '../../actions';
import { TOKENIZER } from '../../reducers/tokenizer';
import './style.css';

export function TokenMsg(props: any) {

    function openWalletAfterToken() {

        props.closeTokenWindow();

    }

    return (

        <div

            className="token-containter"
            style={{

                display: ((props.token as TOKENIZER).showWindow)?"flex":"none"

            }}
        
        >
            <div className="token-window">
                <div className="token-title">
                    { props.language.your_token_msg }
                </div>
                <div 

                    className="token-msg"
                    title={ props.language.your_token_msg }

                >
                    { (props.token as TOKENIZER).token }
                </div>

                <button 

                    onClick={ () => openWalletAfterToken() }
                    className="proceed-button"
                    title={ props.language.proceed }

                >
                    { props.language.proceed }<FiArrowRight size={18} style={{marginLeft: "4px"}}/>
                </button>
            </div>
        </div>

    )

}

const mapStateToProps = (state: any, ownProps: any) => ({

    language: state.lang,
    token: state.tokenState

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    closeTokenWindow: () => dispatch(setTokenAndWindow({showWindow: false, token: ""}))

});

export default connect(mapStateToProps, mapDispatchToProps)(TokenMsg);
