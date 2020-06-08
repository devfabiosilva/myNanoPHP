import { NANO_WALLET_ACTIONS } from "../actions";

const REFRESH_INTERVAL = 3000;

export function monitore_pending_amount(
    state: any = {
        pending_function: null
    },
    action: any
)
{

    switch (action.type) {
        
        case NANO_WALLET_ACTIONS.SET_PENDING_AMOUNT:
            return { pending_function: (state.pending_function)?state.pending_function:setInterval( action.func,  REFRESH_INTERVAL) }

        case NANO_WALLET_ACTIONS.CLEAR_PENDING_AMOUNT:

            if (state.pending_function !== null) {
                clearInterval( state.pending_function );
                return { pending_function: null };
            }

            return state;

        default:
            return state;

    }

}
