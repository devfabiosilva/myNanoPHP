import axios from 'axios';

import {
    NANO_NODE_URL
} from '../utils/secret';
import { NANO_PREFIX } from '../utils';
import { PUBLIC_KEY2ADDRESS, MY_NANO_PHP_ERROR } from '../utils/wallet_interface';

export interface MY_NANO_PHP_SEED2KEYPAIR {
    error: string|number,
    reason: string,
    key_pair: {
        private_key: string,
        public_key: string,
        wallet_number: number|string,
        wallet: string
    }
}

export interface MY_NANO_PHP_PK2ADDRESS {
    error: string|number,
    reason: string,
    wallet: string,
    public_key: string
}

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

export async function my_nano_php_seed2keypair(wallet_number: number, seed: string)
{
    let data: MY_NANO_PHP_SEED2KEYPAIR|MY_NANO_PHP_ERROR;

    data = await my_nano_php_api(`command=seed2key_pair&seed=${seed}&wallet_number=${wallet_number.toString()}`, "my_nano_php_seed2keypair");

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

////// nano rpc

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