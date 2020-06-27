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
export const QR_CODE_BG_DARK = "#244c54";
export const QR_CODE_FG_DARK = "#e9f6fb";
export const QR_CODE_BG_LIGHT = "#f5f6f8";
export const QR_CODE_FG_LIGHT = "#696969";
export const DEFAULT_NOTIFY_TIMEOUT = 5000; // in milliseconds
export const MY_NANO_PHP_DARK_MODE = "myNanoPHPDarkMode";
export const MY_NANO_PHP_VERIFY_SIG_HASH = "hash";
export const MY_NANO_PHP_VERIFY_SIG_MSG = "msg";

export const NOTIFY_TYPE = {

    NOTIFY_TYPE_INFO: 0,
    NOTIFY_TYPE_ALERT: 1,
    NOTIFY_TYPE_ERROR: 2
    
}

export function changeToNanoPrefix(wallet: string): string {

    if ( wallet.indexOf(XRB_PREFIX) > -1 )
        return NANO_PREFIX+wallet.substr(4);

    return wallet;

}

export function getKey() {

    return Math.random().toString(36).substring(2);

}

export function saveToBinaryEncryptedStream(encrypted_stream: string) {

    let binary_blob: any;
    let a: any;
    let pseudo_url: any;

    binary_blob = new Blob(

        [Buffer.from(encrypted_stream, 'hex')],
        { type: 'application/octet-stream' }
    
    );

    a = document.createElement('a');
    a.style = 'display: none';
    document.body.appendChild(a);
    pseudo_url=window.URL.createObjectURL(binary_blob);

    a.href = pseudo_url;
    a.download = "myEncryptedNanoSeed.nse";
    a.click();
    window.URL.revokeObjectURL(pseudo_url);
    document.body.removeChild(a);

}

export function getBackgroundFromLocalStorage() {

    let darkMode: any = localStorage.getItem(MY_NANO_PHP_DARK_MODE);

    if ( ( darkMode === null ) || ( darkMode === undefined ) ) {

        localStorage.setItem(MY_NANO_PHP_DARK_MODE, BACKGROUND_DARK);
        darkMode = localStorage.getItem(MY_NANO_PHP_DARK_MODE) as string;

    }

    return darkMode;

}

export function setBackgroundToLocalStorage(mode: string) {

    localStorage.setItem(MY_NANO_PHP_DARK_MODE, mode);

    return localStorage.getItem(MY_NANO_PHP_DARK_MODE);

}
