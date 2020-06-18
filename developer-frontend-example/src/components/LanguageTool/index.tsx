import React, { useState } from 'react';

import { 
 
    PORTUGUESE_LANGUAGE, 
    ENGLISH_LANGUAGE,
    getLanguageFromLocalStorage

} from '../../utils/language';

import { setLanguage, setNotifyMessage } from '../../actions';
import { connect } from 'react-redux';
import brazilFlag from '../../assets/brzl@25.png';
import usaFlag from '../../assets/usa@25.png';
import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';
import './style.css';

export function LanguageTool(props: any) {
    const [ languageName, setLanguageName ] = useState(getLanguageFromLocalStorage());

    return (
        <div className="lang-tool-container">
            <div className="bg-mode-lang-toggle">
                <div className="lang-toggle"
                    style={
                        {
                            transform: ( languageName === PORTUGUESE_LANGUAGE )?"translateX(100%)":"none"
                        }
                    }
                >
                </div>
                <div className="lang-toggle-name">
                    <div className="lang-en-us-name"
                        onClick={ () => {

                                props.modifyLang(ENGLISH_LANGUAGE);
                                setLanguageName(ENGLISH_LANGUAGE);
                                props.newNotification({
                                    msg: props.language.notification_language_changed
                                } as NOTIFY_MESSAGE);

                            }
                        }
                        title = "Click here to change to English language"
                    >
                        <img className="language-icon" src={usaFlag} alt="english language" />
                        English
                    </div>
                    <div className="lang-pt-br-name"
                        onClick={ () => {

                                props.modifyLang(PORTUGUESE_LANGUAGE);
                                setLanguageName(PORTUGUESE_LANGUAGE);
                                props.newNotification({
                                    msg: props.language.notification_language_changed
                                } as NOTIFY_MESSAGE);

                            }
                        }
                        title = "Clique aqui para mudar para o Português"
                    >
                        <img className="language-icon" src={brazilFlag} alt="portuguese language"/>
                        Português
                    </div>
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
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LanguageTool);
