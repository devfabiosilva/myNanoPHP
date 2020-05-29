export interface MY_NANO_PHP_ERROR {
    error: string|number,
    reason: string
}

export interface my_wallet {
    seed?: string; // SECURITY: Fire and forget. Extract public key from encrypted file|brainwallet|Bip39 and forget SEED immediately
    public_key: string|null;
    private_key?: string; //SECURITY: Fire and forget. Extract public key from (encrypted file|brainwallet|Bip39) and forget private key immediately
    wallet_number?: number;
    wallet_representative?: string,
    wallet?: string,
    pending?: string,
    balance?: string
}

export interface NANO_KEY_PAIR {
    private_key?: string,
    public_key: string,
    wallet_number?: number|string,
    wallet?: string,
    representative?: string
}

export interface PUBLIC_KEY2ADDRESS {
    error: string|number,
    reason: string
    wallet: string,
    public_key: string,
}
