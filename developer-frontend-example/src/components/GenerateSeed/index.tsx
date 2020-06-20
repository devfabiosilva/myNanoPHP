import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 

    ENTROPY_TYPE,
    GENERATED_ENCRYPTED_SEED,
    MY_NANO_PHP_ERROR,
    SEED_AND_BIP39,
    OPEN_ENCRYPTED_SEED_RESPONSE,
    NOTIFY_MESSAGE,

} from '../../utils/wallet_interface';

import { 

    my_nano_php_generate_encrypted_seed, 
    my_nano_php_open_encrypted_seed 

} from '../../service';

import { 

    setNotifyMessage,
    resetWallet

} from '../../actions';

import { FiSkipBack } from 'react-icons/fi';
import { NOTIFY_TYPE } from '../../utils';
import './style.css';

export function GenerateSeed(props: any) {

    const [ myconsole, setMyConsole ] = useState("");
    const [ encryptedBlock, setEncryptedBlock ] = useState("");
    const [ seedAndBip39, setSeedAndBip39 ] = useState({ } as SEED_AND_BIP39);

    useEffect(
        () => {

            if (seedAndBip39.seed) {

                setMyConsole(
                    props.language.msg_done_seed_and_bip39.replace(/%d/, seedAndBip39.seed).replace(/%e/, seedAndBip39.bip39)
                );
                setSeedAndBip39({}); //Forget Seed and Bip39 Immediatelly. These sensible data are stored now in encryptedBlock state encrypted with password
            }
        },
        [
            seedAndBip39,
            encryptedBlock,
            props
        ]
    );

    function saveToFile() {

        let binary_blob: any;
        let a: any;
        let pseudo_url: any;

        if (encryptedBlock === "") {

            setMyConsole(props.language.encrypted_block_not_found_msg);
            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.encrypted_block_not_found_msg,
                timeout: 7000

            } as NOTIFY_MESSAGE);

            return;

        }

        binary_blob = new Blob(

            [Buffer.from(encryptedBlock, 'hex')],
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

    function genSeed() {

        let options: any;
        let password: any = document.getElementById('gen-seed-password-id');
        let password_value: string = password.value.trim();
        let notification_tmp: string;

        if (!password_value) {

            props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                msg: props.language.empty_password,
                timeout: 600

            } as NOTIFY_MESSAGE);

            setMyConsole(props.language.empty_password);
            return;

        }

        options = document.getElementById('gen-seed-options-id');
        notification_tmp = props.language.msg_gen_random_seed.replace(/%d/, options.value);
        setMyConsole(notification_tmp);
        props.newNotification({

            msg: notification_tmp,
            timeout: 8000

        } as NOTIFY_MESSAGE);
        my_nano_php_generate_encrypted_seed(options.value, password_value).then(
            (res: any) => {

                setEncryptedBlock((res as GENERATED_ENCRYPTED_SEED).encrypted_seed);
                props.newNotification({

                    msg: `${props.language.msg_seed_success} ${props.language.msg_opening_enc_block}`,
                    timeout: 6000

                } as NOTIFY_MESSAGE);

                my_nano_php_open_encrypted_seed((res as GENERATED_ENCRYPTED_SEED).encrypted_seed, password_value).then(
                    (result: any) => {

                        setSeedAndBip39((result as OPEN_ENCRYPTED_SEED_RESPONSE).result);
                        props.newNotification({

                            notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ALERT,
                            msg: props.language.keep_safe_msg,
                            timeout: 20000

                        } as NOTIFY_MESSAGE);
                        props.newNotification({

                            msg: props.language.msg_done,
                            timeout:3000

                        } as NOTIFY_MESSAGE);

                    },
                    (error: any) => {

                        ((error as MY_NANO_PHP_ERROR).error)?
                            setMyConsole(`Error: ${(error as MY_NANO_PHP_ERROR).error.toString()} reason: ${(error as MY_NANO_PHP_ERROR).reason}`):
                            setMyConsole(props.language.msg_unknown_server_error);

                    }
                );

            },
            (err) => {

                if ((err as MY_NANO_PHP_ERROR).error) {

                    notification_tmp = `Error: ${(err as MY_NANO_PHP_ERROR).error} reason: ${(err as MY_NANO_PHP_ERROR).reason}`;

                    if (err.info)
                        notification_tmp=`${notification_tmp} Server info: ${err.info}`;

                    setMyConsole(notification_tmp);
                    props.newNotification({

                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: notification_tmp,
                        timeout: 15000

                    } as NOTIFY_MESSAGE);

                } else {

                    setMyConsole(props.language.msg_unknown_server_error);
                    props.newNotification({

                        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                        msg: props.language.msg_unknown_server_error,
                        timeout: 6000

                    } as NOTIFY_MESSAGE);

                }
            }
        );

    }

    return (
        <div className="create-seed-and-bip39-container">
            <div className="create-seed-and-bip39-box">
                <div className="gen-seed-options-title">
                    { props.language.gen_select_new_seed_title }
                </div>
                <div className="gen-seed-password-box">
                    <div className="gen-seed-password-title" style={{marginRight: "4px"}}>
                        { props.language.password_txt }
                    </div>
                    <input

                        id="gen-seed-password-id"
                        className="gen-seed-password"
                        type="password"
                        placeholder={ props.language.passwd_create_file }
                        
                    />
                </div>
                <div className="gen-seed-option-content">
                    <div className="gen-seed-selection-title" style={{marginRight: "4px"}}>
                        { props.language.entropy_type_title }
                    </div>
                    <select

                        className="gen-seed-options"
                        id="gen-seed-options-id"
                        defaultValue={ ENTROPY_TYPE.EXCELENT }

                    >
                        <option value={ ENTROPY_TYPE.PARANOIC }>
                            { props.language.gen_opt_paranoic }
                        </option>
                        <option value = { ENTROPY_TYPE.EXCELENT} >
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
                </div>
                <div className="seed-and-bip39-container-box">
                    <div className="seed-and-bip39-container-txt">
                        { (myconsole)?myconsole:"Console" }
                    </div>
                </div>
                <button

                    className = "generate-seed-btn"
                    onClick = { genSeed }

                >
                    { props.language.gen_btn }
                </button>
                <div className="seed-and-bip39-container">
                    <button 

                        className="save-to-encrypted-file-btn"
                        onClick={() => saveToFile()}

                    >
                        { props.language.save_to_enc_btn }
                    </button>
                </div>
                <button

                    className="go-back-gen-seed-btn"
                    onClick={ () => props.goBack() }
                    title={ props.language.go_back }

                >
                    <FiSkipBack size={20} style={{paddingRight: "4px"}} /> { props.language.go_back }
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

    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    goBack: () => dispatch(resetWallet())

});
  
export default connect(mapStateToProps, mapDispatchToProps)(GenerateSeed);
