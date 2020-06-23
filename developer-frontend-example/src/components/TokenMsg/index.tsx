
import React from 'react';
import { connect } from 'react-redux';

import './style.css';
import { getKey } from '../../utils';
import { FiArrowRight } from 'react-icons/fi';

export function TokenMsg(props: any) {

    function openWalletWithAfterToken() {

        let window: any = document.getElementById('token-containter-id');

        window.style.display="none";

    }

    return (

        <div className="token-containter" id="token-containter-id">
            <div className="token-window">
                <div className="token-title">
                    { props.language.your_token_msg }
                </div>
                <div 

                    className="token-msg"
                    title={ props.language.your_token_msg }

                >
                    @1A{ getKey() }{ getKey() }
                </div>

                <button 

                    onClick={ () => openWalletWithAfterToken() }
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

    language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({


});

export default connect(mapStateToProps, mapDispatchToProps)(TokenMsg);
