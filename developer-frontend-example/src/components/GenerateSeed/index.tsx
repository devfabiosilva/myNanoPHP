import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 

    my_wallet,
    ENTROPY_TYPE,
    GENERATED_ENCRYPTED_SEED,
    MY_NANO_PHP_ERROR,
    SEED_AND_BIP39,
    WALLET_FROM,
    OPEN_ENCRYPTED_SEED_RESPONSE,
    NOTIFY_MESSAGE,

} from '../../utils/wallet_interface';

import { 

    my_nano_php_generate_encrypted_seed, 
    my_nano_php_open_encrypted_seed 

} from '../../service';

import { 

    setPublicKey, 
    setMyWallet, 
    setNotifyMessage

} from '../../actions';

export function GenerateSeed(props: any) {

    const [ myconsole, setMyConsole ] = useState("");
    const [ encryptedBlock, setEncryptedBlock ] = useState("");
    const [ seedAndBip39, setSeedAndBip39 ] = useState({ } as SEED_AND_BIP39);

    useEffect(
        () => {

            if (seedAndBip39.seed) {
                props.wallet_public_key(
                    {
                        origin: WALLET_FROM.FROM_GENERATING_SEED,
                        public_key: "",
                        encrypted_block: encryptedBlock
                    }
                );

                setMyConsole(
                    props.language.msg_done_seed_and_bip39.replace(/%d/, seedAndBip39.seed).replace(/%e/, seedAndBip39.bip39)
                );
                setSeedAndBip39({}); //Forget Seed and Bip39 Immediatelly
            }
        },
        [
            seedAndBip39,
            encryptedBlock,
            props
        ]
    );

    function genSeed() {

        let options: any;
        let password: any = document.getElementById('gen-seed-password-id');
        let password_value: string = password.value.trim();

        if (!password_value) {

            props.newNotification({
                msg: props.language.empty_password
            } as NOTIFY_MESSAGE);

            setMyConsole(props.language.empty_password);
            return;

        }

        options = document.getElementById('gen-seed-options-id');
        setMyConsole(props.language.msg_gen_random_seed.replace(/%d/, options.value));
        my_nano_php_generate_encrypted_seed(options.value, password_value).then(
            (res: any) => {

                setEncryptedBlock((res as GENERATED_ENCRYPTED_SEED).encrypted_seed);
                setMyConsole(`${props.language.msg_seed_success} ${props.language.msg_opening_enc_block}`);

                my_nano_php_open_encrypted_seed((res as GENERATED_ENCRYPTED_SEED).encrypted_seed, password_value).then(
                    (result: any) => {

                        setSeedAndBip39((result as OPEN_ENCRYPTED_SEED_RESPONSE).result);
                        setMyWallet(props.language.msg_done);

                    },
                    (error: any) => {

                        ((error as MY_NANO_PHP_ERROR).error)?
                            setMyConsole(`Error: ${(error as MY_NANO_PHP_ERROR).error.toString()} reason: ${(error as MY_NANO_PHP_ERROR).reason}`):
                            setMyConsole(props.language.msg_unknown_server_error);

                    }
                );

            },
            (err) => {
                ((err as MY_NANO_PHP_ERROR).error)?
                    setMyConsole(`Error: ${(err as MY_NANO_PHP_ERROR).error.toString()} reason: ${(err as MY_NANO_PHP_ERROR).reason}`):
                    setMyConsole(props.language.msg_unknown_server_error);
            }
        );

    }

    return (
        <div>
            <div className="gen-seed-options-title">
                { props.language.gen_select_new_seed_title }
            </div>
            <input
                id="gen-seed-password-id"
                type="password"
                placeholder={ props.language.passwd_create_file }
            />
            <select
                className="gen-seed-options"
                id="gen-seed-options-id"
            >
                <option defaultValue = { ENTROPY_TYPE.PARANOIC } value={ ENTROPY_TYPE.PARANOIC }>
                    { props.language.gen_opt_paranoic }
                </option>
                <option value = { ENTROPY_TYPE.EXCELENT}>
                    { props.language.gen_opt_excelent }
                </option>
                <option value = { ENTROPY_TYPE.GOOD }>
                    { props.language.gen_opt_good }
                </option>
                <option value = { ENTROPY_TYPE.NOT_ENOUGH }>
                    { props.language.gen_opt_not_enough}
                </option>
                <option value = { ENTROPY_TYPE.NOT_RECOMMENDED }>
                    { props.language.gen_opt_not_recommended }
                </option>
            </select>
            <button
                className = "generate-seed-btn"
                onClick = { genSeed }
            >
                { props.language.gen_btn }
            </button>
            <div className="seed-and-bip39-container">
                <div className="seed-and-bip39-container-txt">
                    { myconsole }
                </div>
                <button className="save-to-encrypted-file-btn">
                    { props.language.save_to_enc_btn }
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang,

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GenerateSeed);
