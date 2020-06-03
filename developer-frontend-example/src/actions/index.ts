import { my_wallet } from '../utils/wallet_interface';

const ACTION_NONE = 0;
const EXTRACT_PUBLIC_KEY = 1;
const EXTRACT_ADDRESS_FROM_PUBLIC_KEY = 2;
const SET_MY_WALLET_PARAM = 3;
const SET_LANGUAGE = 4;

export const NANO_WALLET_ACTIONS = {

    ACTION_NONE,
    EXTRACT_PUBLIC_KEY,
    EXTRACT_ADDRESS_FROM_PUBLIC_KEY,
    SET_MY_WALLET_PARAM,
    SET_LANGUAGE
    
}

export function setPublicKey(public_key: my_wallet) {
    return { type: EXTRACT_PUBLIC_KEY, public_key };
}

export function setMyWallet(wallet_param: my_wallet) {
    return { type: SET_MY_WALLET_PARAM, wallet_param };
}

export function setLanguage(language: number){
    return { type: SET_LANGUAGE, language }
}
