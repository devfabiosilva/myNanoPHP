import { combineReducers, createStore} from 'redux';
import { wallet } from './wallet_state';
import { lang } from './lang_interface';

import {

    openTransactionDialog,
    transactionDialogStatus 
    
} from './dialog_state';

const nano_wallet_rootReducer = combineReducers(

    { 
        wallet,
        lang,
        openTransactionDialog,
        transactionDialogStatus
    }

);

export const store = createStore(nano_wallet_rootReducer);