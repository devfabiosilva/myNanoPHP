export const UNDEFINED = "UNDEFINED";
export const NANO_PREFIX = "nano_";
export const XRB_PREFIX = "xrb_";
export const MAX_FEE = "0.0001"; // In real (human readable)
export const DEFAULT_REPRESENTATIVE = "nano_3ngt59dc7hbsjd1dum1bw9wbb87mbtuj4qkwcruididsb5rhgdt9zb4w7kb9";
export const UNKNOWN_MY_NANO_PHP_SERVER_ERROR = "Unknown myNanoPHP server error";
export const SEND_COMMAND = "send";
export const RECEIVE_COMMAND = "receive";
export const OPEN_BLOCK_TO_RECEIVE = "open_block";
export const BACKGROUND_DARK = "dark";
export const BACKGROUND_LIGHT = "light";

export function changeToNanoPrefix(wallet: string): string {

    if ( wallet.indexOf(XRB_PREFIX) > -1 )
        return NANO_PREFIX+wallet.substr(4);

    return wallet;

}

