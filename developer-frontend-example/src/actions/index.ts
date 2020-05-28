import { NANO_KEY_PAIR } from '../utils/wallet_interface';


const ACTION_NONE = 0;
const EXTRACT_PUBLIC_KEY = 1;
const EXTRACT_ADDRESS_FROM_PUBLIC_KEY = 2;

export const NANO_WALLET_ACTIONS = {
    ACTION_NONE,
    EXTRACT_PUBLIC_KEY,
    EXTRACT_ADDRESS_FROM_PUBLIC_KEY,
}

export function setPublicKey(public_key: NANO_KEY_PAIR) {
    return { type: EXTRACT_PUBLIC_KEY, public_key };
}

export function extract_address_from_public_key(address: string) {

    return { type: EXTRACT_ADDRESS_FROM_PUBLIC_KEY, address }
   
}