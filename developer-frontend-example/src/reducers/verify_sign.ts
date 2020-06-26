import { NANO_WALLET_ACTIONS } from '../actions';



export function verifySignWindowState(state: boolean = true, action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.CHANGE_VERIFY_SIGN_WINDOW:
            return action.isClosed;

        default:
            return state;

    }

}
