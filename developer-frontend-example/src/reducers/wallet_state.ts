import { NANO_WALLET_ACTIONS } from '../actions';
import { 
    
    my_wallet, 
    WALLET_FROM 

} from '../utils/wallet_interface';

const INITIAL_WALLET: my_wallet = {

    origin: WALLET_FROM.SELECT_OPTION,
    public_key: ""

}

export function wallet( state: my_wallet = INITIAL_WALLET,  action: any) {

    switch (action.type) {

        case NANO_WALLET_ACTIONS.EXTRACT_PUBLIC_KEY:
            return action.public_key;

        case NANO_WALLET_ACTIONS.EXTRACT_ADDRESS_FROM_PUBLIC_KEY:
            return Object.assign(state, { wallet: action.address });
        
        case NANO_WALLET_ACTIONS.SET_MY_WALLET_PARAM:
            return Object.assign(state, action.wallet_param);

        case NANO_WALLET_ACTIONS.RESET_WALLET:
            return INITIAL_WALLET;

        default:
            return state;
    
    }

}

