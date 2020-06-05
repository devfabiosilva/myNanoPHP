import { 
    NANO_WALLET_ACTIONS
} from '../actions';

import { 

    ENGLISH_LANGUAGE,
    LANG_EN_US,
    LANG_PT_BR,
    setLanguageToLocalStorage

} from '../utils/language';

export function lang(state: any = LANG_EN_US, action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SET_LANGUAGE:
            return ((setLanguageToLocalStorage(action.language)===ENGLISH_LANGUAGE)?LANG_EN_US:LANG_PT_BR);

        default:
            return state;

    }

}