import { NANO_WALLET_ACTIONS } from '../actions';
import { my_wallet } from '../utils/wallet_interface';

export function wallets(state: my_wallet = {public_key: ""}, action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.EXTRACT_PUBLIC_KEY:
            return action.public_key;

        case NANO_WALLET_ACTIONS.EXTRACT_ADDRESS_FROM_PUBLIC_KEY:
            return Object.assign(state, { wallet: action.address });

        default:
            return state;
    
    }

}

