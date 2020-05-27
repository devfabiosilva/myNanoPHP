import axios from 'axios';

import {
    NANO_NODE_URL
} from '../utils/secret';

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

////// nano rpc
/*
{
    "action": "account_balance",
    "account": "nano_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpi00000000"
  }
*/

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