import { combineReducers, createStore} from 'redux';
import { wallet } from './wallet_state';
import { lang } from './lang_interface';

const nano_wallet_rootReducer = combineReducers(

        { 
            wallet,
            lang
        }
);

export const store = createStore(nano_wallet_rootReducer);