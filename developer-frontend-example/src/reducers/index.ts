import { combineReducers, createStore} from 'redux';
import test from './test';

const nano_wallet_rootReducer = combineReducers(

        { 
            test
        }

    );

export const store = createStore(nano_wallet_rootReducer);