import { my_wallet } from '../utils/wallet_interface';


const ACTION_NONE = 0;
const EXTRACT_PUBLIC_KEY = 1;
const EXTRACT_ADDRESS_FROM_PUBLIC_KEY = 2;
const SET_MY_WALLET_PARARAM = 3;

export const NANO_WALLET_ACTIONS = {
    ACTION_NONE,
    EXTRACT_PUBLIC_KEY,
    EXTRACT_ADDRESS_FROM_PUBLIC_KEY,
    SET_MY_WALLET_PARARAM
}

export function setPublicKey(public_key: my_wallet) {
    return { type: EXTRACT_PUBLIC_KEY, public_key };
}

export function setMyWallet(wallet_param: my_wallet) {
    return { type: SET_MY_WALLET_PARARAM, wallet_param };
}
/*
export function extract_address_from_public_key(address: string) {

    return { type: EXTRACT_ADDRESS_FROM_PUBLIC_KEY, address }
   
}
*/