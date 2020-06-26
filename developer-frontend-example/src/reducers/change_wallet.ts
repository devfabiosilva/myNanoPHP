import { NANO_WALLET_ACTIONS } from "../actions";

export function changeWalletWindowState(state: boolean = true, action: any ) {

    switch (action.type) {
        case NANO_WALLET_ACTIONS.CHANGE_WALLET_WINDOW:
            return action.isClosed;

        default:
            return state;

    }

}

export function walletNumberHasChangedState(state: boolean = false, action: any) {

    switch (action.type) {
        case NANO_WALLET_ACTIONS.WALLET_NUMBER_HAS_CHANGED:
            return action.changed;

        default:
            return state;

    }

}
