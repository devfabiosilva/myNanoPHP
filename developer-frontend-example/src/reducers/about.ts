import { NANO_WALLET_ACTIONS } from "../actions";

export function showAboutMode(state: boolean = false , action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SHOW_ABOUT:
            return action.show;

        default:
            return state;

    }

}