import axios from 'axios';

import {

    NANO_NODE_URL

} from '../utils/secret';

import {

    NANO_PREFIX, UNKNOWN_MY_NANO_PHP_SERVER_ERROR

} from '../utils';

import { 

    PUBLIC_KEY2ADDRESS, 
    MY_NANO_PHP_ERROR, 
    BRAINWALLET_RESPONSE, 
    MY_NANO_PHP_SEED2KEYPAIR,
    GENERATED_ENCRYPTED_SEED,
    PUBLIC_KEY_TO_WALLET_RESPONSE,
    my_wallet,
    //BLOCK_RESPONSE

} from '../utils/wallet_interface';

const MY_NANO_PHP_URL = 'http://localhost';

const api = axios.create({
    baseURL: MY_NANO_PHP_URL,
    headers:    {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
    validateStatus: function () {
        return true;
    }
});

const api_rpc = axios.create(
    {
        baseURL: NANO_NODE_URL,
        headers:    {
                        'Content-Type': 'application/json'
                    },
        validateStatus: function() {
            return true;
        }
    }
)

export async function my_nano_php_api(send: any, function_name: string) {
    let data: any;

    await api.post('/template.php', send).then(
        (res) => data = res.data,
    );

    return (data)?(data.error)?data:{error: "-2", reason: "Unexpected format"}:
        {error: "-1", reason: "Something went wrong with " + function_name};

}

export async function my_nano_php_extract_key_pair_from_nano_seed
(
    wallet_number: number,
    seed: string, 
    prefix: string|null=null
) 
{
    return await my_nano_php_api(`command=seed2key_pair&seed=${seed}&wallet_number=${wallet_number.toString()}${(prefix)?"&prefix="+prefix:""}`, "my_nano_php_extract_key_pair_from_nano_seed");
}

export async function my_nano_php_extract_key_pair_from_bip39
(
    wallet_number: number,
    bip39: string, 
    prefix: string|null=null
) 
{
    let data: MY_NANO_PHP_SEED2KEYPAIR|MY_NANO_PHP_ERROR;
    data = await my_nano_php_api(`command=bip39_2_key_pair&bip39=${bip39}&wallet_number=${wallet_number.toString()}${(prefix)?"&prefix="+prefix:""}`, "my_nano_php_extract_key_pair_from_bip39");

    return new Promise((res, error) => {
        
        return (data.error === "0")?res(data as MY_NANO_PHP_SEED2KEYPAIR):error(data as MY_NANO_PHP_ERROR);

    });

}

export async function my_nano_php_nano2pk(wallet: string) {

    let data: any;

    data = await my_nano_php_api(`command=nano2pk&wallet=${wallet}`, "my_nano_php_nano2pk");

    return new Promise((res, error) => {

        return (data.error === "0")?res(data):error(data);

    });

}

export async function my_nano_php_raw2real(balance: string) {
 
    let data: any;

    data = await my_nano_php_api(`command=raw2real&balance=${balance}`, "my_nano_php_raw2real");

    return new Promise((res, error) => {

        return (data.error === "0")?res(data):error(data);

    });

}

export async function my_nano_php_open_encrypted_seed(block: string, password: string)
{
    let data: any;

    data = await my_nano_php_api(`command=encrypted_stream_to_seed&block=${block}&password=${password}`, "my_nano_php_open_encrypted_seed");

    return new Promise((res, error) => {

        return (data.error === "0")?res(data):error(data);

    });
}

export async function my_nano_php_seed2keypair(wallet_number: number, seed: string, prefix:string = NANO_PREFIX)
{
    let data: MY_NANO_PHP_SEED2KEYPAIR|MY_NANO_PHP_ERROR;

    data = await my_nano_php_api(`command=seed2key_pair&seed=${seed}&wallet_number=${wallet_number.toString()}&prefix=${prefix}`, "my_nano_php_seed2keypair");

    return new Promise((res, error) => {
        
        return (data.error === "0")?res(data as MY_NANO_PHP_SEED2KEYPAIR):error(data as MY_NANO_PHP_ERROR);

    });
}

export async function my_nano_php_public_key2address(public_key: string, prefix:string = NANO_PREFIX)
{
    let data: PUBLIC_KEY2ADDRESS|MY_NANO_PHP_ERROR;

    data = await my_nano_php_api(`command=pk2nano&seed&pk=${public_key}&prefix=${prefix}`, "my_nano_php_public_key2address");

    return new Promise((res, error) => {
        
        return (data.error === "0")?res(data as PUBLIC_KEY2ADDRESS):error(data as MY_NANO_PHP_ERROR);

    });
}

export async function my_nano_php_open_brainwallet(text: string, salt:string)
{
    let data: BRAINWALLET_RESPONSE|MY_NANO_PHP_ERROR;

    data = await my_nano_php_api(`command=brainwallet&text=${text}&salt=${salt}`, "my_nano_php_open_brainwallet");

    return new Promise((res, error) => {
        
        return (data.error === "0")?res(data as BRAINWALLET_RESPONSE):error(data as MY_NANO_PHP_ERROR);

    });
}

export async function my_nano_php_generate_encrypted_seed(entropy: string, password: string)
{
    let data: GENERATED_ENCRYPTED_SEED|MY_NANO_PHP_ERROR

    data = await my_nano_php_api(`command=gen_seed_to_encrypted_stream&entropy=${entropy}&password=${password}`, "my_nano_php_generate_encrypted_seed");

    return new Promise((res, error) => {

        return (data.error === "0")?res(data):error(data);

    });
}


export async function my_nano_php_public_key_to_wallet(public_key:string, prefix: string = NANO_PREFIX)
{
    let data: PUBLIC_KEY_TO_WALLET_RESPONSE|MY_NANO_PHP_ERROR

    data = await my_nano_php_api(`command=pk2nano&pk=${public_key}&prefix=${prefix}`, "my_nano_php_public_key_to_wallet");

    return new Promise((res, error) => {

        return (data.error === "0")?res(data):error(data);

    });
}

export async function my_nano_php_send_receive_money(
    wallet: my_wallet, 
    destination_wallet: string, 
    amount_to_send: string,
    direction: string
)
{

    //let data: any;
    ///let has_fee: boolean;
    let private_key: string = `${(wallet.private_key as string)}${wallet.public_key as string}`;

    if ((wallet.fee !== undefined) && (wallet.fee !== "")) {
        my_nano_php_api(`command=create_block&account=${wallet.wallet}&previous=${wallet.frontier}&representative=${wallet.wallet_representative}&balance=${wallet.balance}&val_send_rec=${amount_to_send}&link=${destination_wallet}&direction=${direction}`, "my_nano_php_send_money").then(
            (d: any) => {
                if (d.error === "0") {
                    if (d.block){
                        my_nano_php_api(`command=block_to_p2pow&block=${d.block}&wallet=${wallet.worker_wallet}&fee=${wallet.fee}`, "my_nano_php_send_money").then(
                            (worker: any) => {
                                if (worker.error === "0") {
                                    if (worker.block) {
                                        my_nano_php_api(`command=sign_p2pow_block&block=${worker.block}&private_key=${private_key}`, "my_nano_php_send_money").then(
                                            (signed_p2pow_block: any) => {
                                                if (signed_p2pow_block.error === "0") {
                                                    if (signed_p2pow_block.block) {
                                                        my_nano_php_api(`command=p2pow_to_json&block=${signed_p2pow_block.block}`, "my_nano_php_send_money").then(
                                                            (p2pow_to_json: any) => {
                                                                if (p2pow_to_json.error === "0") 
                                                                    return new Promise((res) => res(p2pow_to_json));
                                                                    //data = p2pow_to_json;
                                                                else if (p2pow_to_json.error)
                                                                    return new Promise((res, err) => err(p2pow_to_json));
                                                                else
                                                                    return new Promise((res, err) => err({error:"-16", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                                            }
                                                        )
                                                    } else
                                                        return new Promise((res, err) => err({error:"-15", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                                } else if (signed_p2pow_block.error)
                                                    return new Promise((res, err) => err(signed_p2pow_block))
                                                else
                                                    return new Promise((res, err) => err({error:"-14", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                            }
                                        );
                                    } else
                                        return new Promise((res, err) => err({error:"-13", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));

                                } else if (worker.error)
                                    return new Promise((res, err) => err(worker));
                                else
                                    return new Promise((res, err) =>  err({error:"-12", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                            }
                        );
                    } else
                        return new Promise((res, err) => err({error:"-11", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                } else if (d.error) {
                    return new Promise((res, err) => err(d));
                } else
                    return new Promise((res, err) => err({error:"-10", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}))
            }
        );
    } else
        my_nano_php_api(`command=create_block&account=${wallet.wallet}&previous=${wallet.frontier}&representative=${wallet.wallet_representative}&balance=${wallet.balance}&val_send_rec=${amount_to_send}&link=${destination_wallet}&direction=${direction}`, "my_nano_php_send_money").then(
            (d: any) => {
                if (d.error === "0") {
                    if (d.block)
                        my_nano_php_api(`command=sign_block&block=${d.block}&private_key=${private_key}`, "my_nano_php_send_money").then(
                            (signed_block: any) => {
                                if (signed_block.error === "0") {
                                    if (signed_block.block) {
                                        my_nano_php_api(`command=calculate_work_from_block&block=${signed_block.block}&n_thr=4`, "my_nano_php_send_money").then(
                                            (proof_of_work: any) => {
                                                if (proof_of_work.error === "0") {
                                                    console.log("Trabalho");
                                                    console.log(proof_of_work);
                                                    if (proof_of_work.block)
                                                        my_nano_php_api(`command=block_to_json&block=${proof_of_work.block}`, "my_nano_php_send_money").then(
                                                            (block_to_json: any) => {
                                                                console.log("Bloco em JSON")
                                                                console.log(block_to_json)
                                                                if (block_to_json.error === "0")
                                                                    return new Promise((res) => res(block_to_json));
                                                                    //data = block_to_json as BLOCK_RESPONSE;
                                                                else if (block_to_json.error)
                                                                    return new Promise((res, err) => err(block_to_json));
                                                                else
                                                                    return new Promise((res, err) => err({error:"-7", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                                            }
                                                        )
                                                    else
                                                        return new Promise((res, err) => err({error:"-6", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                                } else if (proof_of_work.error)
                                                    return new Promise((res, err) => err(proof_of_work));
                                                else
                                                    return new Promise((res, err) => err({error:"-5", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                                            }
                                        );
                                    } else
                                        return new Promise((res, err) => { 
                                            return err({error:"-4", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR})
                                        });
                                } else
                                    return new Promise((res, err) => {
                                        return err({error:"-3", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR});
                                    });
                            }
                        )
                    else
                        return new Promise((res, err) => err({error:"-2", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
                } else if (d.error)
                    return new Promise((res, err) => err(d));
                else
                    return new Promise((res, err) => err({error:"-1", reason: UNKNOWN_MY_NANO_PHP_SERVER_ERROR}));
            }
        );

    //if (has_fee)
    //    return new Promise((res) => res(data));

    //return await nano_rpc_account_send_signed_block(data.block);
    //return new Promise((res) => res(data));

}

////// nano rpc
///https://docs.nano.org/commands/rpc-protocol/

export async function nano_rpc_account_balance(account: string) {
    let data: any = null, err: any;

    await api_rpc.post('/', {
        action: "account_balance",
        account 
    }).then(
        (d) => data = d.data,
        (e) => err = e.data
    );
    
    return new Promise((resolve, reject) => (data)?(data.error)?reject({error: data.error}):resolve(data):reject(err));
}

export async function nano_rpc_account_representative(account: string) {
    let data: any = null, err: any;

    await api_rpc.post('/', {
        action: "account_representative",
        account
    }).then(
        (d) => data = d.data,
        (e) => err = e.data
    );

    return new Promise((resolve, reject) => (data)?(data.error)?reject({error: data.error}):resolve(data):reject(err));

}

export async function nano_rpc_account_frontier(account: string) {
    let data: any = null, err: any;

    await api_rpc.post('/', {
        action: "accounts_frontiers",
        accounts: [ account ]
    }).then(
        (d) => data = d.data,
        (e) => err = e.data
    );
    
    return new Promise((resolve, reject) => (data)?(data.error)?reject({error: data.error}):resolve(data):reject(err));

}

export async function nano_rpc_account_send_signed_block(block: any) {
    let data: any = null, err: any;

    await api_rpc.post('/', block).then(
        (d) => data = d.data,
        (e) => err = e.data
    );
    
    return new Promise((resolve, reject) => (data)?(data.error)?reject({error: data.error}):resolve(data):reject(err));

}

///// p2pow server

/// Will be implemented