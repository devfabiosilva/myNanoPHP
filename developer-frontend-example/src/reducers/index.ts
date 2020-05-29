import { combineReducers, createStore} from 'redux';
import { wallet } from './wallet_state';

const nano_wallet_rootReducer = combineReducers(

        { 
            wallet
        }

    );

export const store = createStore(nano_wallet_rootReducer);