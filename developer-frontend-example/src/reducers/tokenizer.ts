import { NANO_WALLET_ACTIONS } from "../actions";

export interface TOKENIZER {

    showWindow: boolean,
    token: string

}

export function tokenState(
    
    state: TOKENIZER = { 

        showWindow: false, 
        token: "" 

    },
    action: any
)
{

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SET_TOKEN:
            return Object.assign(state, { token: action.token });

        case NANO_WALLET_ACTIONS.SET_WINDOW_VISIBILITY:
            return Object.assign(state, { showWindow: action.visible });

        case NANO_WALLET_ACTIONS.SET_WINDOW_AND_TOKEN:
            return action.tokenizer;

        default:
            return state;

    }
}