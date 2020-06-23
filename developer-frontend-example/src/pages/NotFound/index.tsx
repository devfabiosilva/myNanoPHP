import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {

    changeBackgroundMode,
    setLanguage 

} from '../../actions';

import { getBackgroundFromLocalStorage } from '../../utils';
import { FiFrown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getLanguageFromLocalStorage } from '../../utils/language';
import './style.css';

export function NotFound(props: any) {

    useEffect(
        () => {

            props.changeBackgroundMode();
            props.modifyLang(getLanguageFromLocalStorage());

        },
        [ props ]
    );

    return (
        <div className="not-found-page-container">
            <div className="not-found-box">
                <div className="not-found-content">
                    <FiFrown size={98} style={{ marginRight: "14px" }} /> { props.language.not_found }
                </div>
                <div className="go-home-container">
                    <Link className="link-to-home" to="/">{ props.language.go_home }</Link>
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({

    language: state.lang

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    modifyLang: (lang: any) => dispatch(setLanguage(lang)),
    changeBackgroundMode: () => dispatch(changeBackgroundMode(getBackgroundFromLocalStorage() as string))
  
});
  
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
