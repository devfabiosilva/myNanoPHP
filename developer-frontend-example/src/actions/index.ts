import { my_wallet } from '../utils/wallet_interface';

const ACTION_NONE = 0;
const EXTRACT_PUBLIC_KEY = 1;
const EXTRACT_ADDRESS_FROM_PUBLIC_KEY = 2;
const SET_MY_WALLET_PARAM = 3;
const SET_LANGUAGE = 4;
const OPEN_WALLET_DIALOG = 5;
const CLOSE_WALLET_DIALOG = 6;
const DIALOG_STATUS = 7;

export const NANO_WALLET_ACTIONS = {

    ACTION_NONE,
    EXTRACT_PUBLIC_KEY,
    EXTRACT_ADDRESS_FROM_PUBLIC_KEY,
    SET_MY_WALLET_PARAM,
    SET_LANGUAGE,
    OPEN_WALLET_DIALOG,
    CLOSE_WALLET_DIALOG,
    DIALOG_STATUS
    
}

export function setPublicKey(public_key: my_wallet) {
    return { type: EXTRACT_PUBLIC_KEY, public_key };
}

export function setMyWallet(wallet_param: my_wallet) {
    return { type: SET_MY_WALLET_PARAM, wallet_param };
}

export function setLanguage(language: string) {
    return { type: SET_LANGUAGE, language }
}

export function openWalletDialog() {
    return { type: OPEN_WALLET_DIALOG }
}

export function closeWalletDialog() {
    return { type: CLOSE_WALLET_DIALOG }
}

export function dialogStatus(status: string = ""){
    return { type: DIALOG_STATUS, status }
}
