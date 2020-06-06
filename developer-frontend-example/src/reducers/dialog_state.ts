import { NANO_WALLET_ACTIONS } from "../actions";

export function openTransactionDialog(state: boolean = false, action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.OPEN_WALLET_DIALOG:
            return true;
        
        case NANO_WALLET_ACTIONS.CLOSE_WALLET_DIALOG:
            return false;

        default:
            return state;

    }

}

export function transactionDialogStatus(state: string = "", action: any) {
 
    switch (action.type) {

        case NANO_WALLET_ACTIONS.DIALOG_STATUS:
            return action.status;

        default:
            return state;

    }

}