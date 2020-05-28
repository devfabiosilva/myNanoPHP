import { combineReducers, createStore} from 'redux';
import { wallets } from './wallet_state';

const nano_wallet_rootReducer = combineReducers(

        { 
            wallets
        }

    );

export const store = createStore(nano_wallet_rootReducer);