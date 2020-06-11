import { 

    combineReducers, 
    createStore

} from 'redux';

import { wallet } from './wallet_state';
import { lang } from './lang_interface';

import {

    openTransactionDialog,
    transactionDialogStatus 
    
} from './dialog_state';

import { monitore_pending_amount } from './monitore_pending_amount';
import { setBackGroundMode } from './backgroundmode';

const nano_wallet_rootReducer = combineReducers(

    { 
        wallet,
        lang,
        openTransactionDialog,
        transactionDialogStatus,
        monitore_pending_amount,
        setBackGroundMode
    }

);

export const store = createStore(nano_wallet_rootReducer);