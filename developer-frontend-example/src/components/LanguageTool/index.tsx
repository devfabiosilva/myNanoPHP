import React from 'react';

import { 

    getLanguageFromLocalStorage, 
    PORTUGUESE_LANGUAGE, 
    ENGLISH_LANGUAGE

} from '../../utils/language';

import { setLanguage } from '../../actions';
import { connect } from 'react-redux';

export function LanguageTool(props: any) {

    return (
        <div>
            <button
                onClick={() => {

                        (getLanguageFromLocalStorage() === PORTUGUESE_LANGUAGE)?
                            props.modifyLang(ENGLISH_LANGUAGE):
                            props.modifyLang(PORTUGUESE_LANGUAGE);

                    }
                }
            >
                Language/Idioma
            </button>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    modifyLang: (lang: any) => dispatch(setLanguage(lang))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(LanguageTool);
  