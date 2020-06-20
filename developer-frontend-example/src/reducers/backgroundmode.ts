import { NANO_WALLET_ACTIONS } from "../actions";
import { BACKGROUND_DARK } from "../utils";

export function setBackGroundMode(state: string = BACKGROUND_DARK , action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SET_BACKGROUND_MODE:
            return action.mode;

        default:
            return state;

    }

}
