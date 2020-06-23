import React, { useState } from 'react';

import { connect } from 'react-redux';

import { 

  setPublicKey,
  resetWallet,
  setNotifyMessage,

} from '../../actions';

import {
 
  PUBLIC_KEY2ADDRESS, 
  my_wallet,
  WALLET_FROM,
  MY_NANO_PHP_SEED2KEYPAIR,
  NOTIFY_MESSAGE

} from '../../utils/wallet_interface';

import {

  my_nano_php_open_encrypted_seed,
  my_nano_php_seed2keypair,
  my_nano_php_public_key2address,

} from '../../service';

import { FiSkipBack, FiFile, FiUnlock } from 'react-icons/fi';
import { NOTIFY_TYPE } from '../../utils';
import './style.css';

export function OpenEncryptedWalletFile(props: any) {

  const [ passwordReady, setPasswordReady ] = useState(false);

  function loadFile() {

    let fileUploader:any = document.getElementById('file-uploader-id');
    let password: any = document.getElementById('file-password');

    if (fileUploader.files[0]) {

      password.value = "";
      setPasswordReady(true);

    }

  }

  function openFile() {

    let myfile: any = document.getElementById('file-uploader-id');

    if (myfile)
      myfile.click();

  }

  function clearAndGoBack() {

    let fileUploader:any = document.getElementById('file-uploader-id');
    let password: any = document.getElementById('file-password');

    fileUploader.value = '';
    password.value = '';
    props.goBack();

  }

  function openWallet() {

    let password:any = document.getElementById('file-password');
    let reader = new FileReader();
    let fileUploader:any = document.getElementById('file-uploader-id');
    let encrypted_data: string;

    if (password.value === "") {

      props.newNotification({

        notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
        msg: props.language.msg_missing_file_password.replace(/%d/, fileUploader.files[0].name),
        timeout: 3000

      } as NOTIFY_MESSAGE);

      return;

    }

    reader.onloadend = function () {
      encrypted_data = Buffer.from(reader.result as any).toString('hex');

      my_nano_php_open_encrypted_seed(encrypted_data, password.value).then(
        (d: any) => {
          my_nano_php_seed2keypair(0, d.result.seed).then(
            (key_pair) => {

              my_nano_php_public_key2address((key_pair as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key).then(
                (wallet_address) => {

                  props.wallet_public_key(
                    {

                      origin: WALLET_FROM.FROM_ENCRYPTED_FILE,
                      wallet: (wallet_address as PUBLIC_KEY2ADDRESS).wallet,
                      public_key: (key_pair as MY_NANO_PHP_SEED2KEYPAIR).key_pair.public_key,
                      wallet_number: 0,
                      encrypted_block: encrypted_data

                    }
                  );

                  fileUploader.value='';

                },
                (error) => {

                  props.newNotification({

                    notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                    msg: `${error.error} ${error.reason}`

                  } as NOTIFY_MESSAGE);
                
                });
            },
            (key_pair_err) => {
              props.newNotification({

                notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
                msg: `${key_pair_err.error} ${key_pair_err.reason}`

              } as NOTIFY_MESSAGE);
            }
          );
        },
        (e) => {
          
          props.newNotification({

            notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
            msg: `${e.error} ${e.reason}`

          } as NOTIFY_MESSAGE);

        }
      );

    }

    if (fileUploader.files[0])
      reader.readAsArrayBuffer(fileUploader.files[0]);

  }

  function ButtonAction() {

    if (passwordReady)
      return (
        <>
          <FiUnlock size={22} style={{ marginRight: "4px" }}/>{ props.language.decrypt_wallet }
        </>
      );

    return (
      <>
        <FiFile size={22} style={{ marginRight: "4px" }}/>{props.language.open_enc_file}
      </>
    );

  }

  return (
    <div className="open-encrypted-file-container">
      <div className="open-encrypted-file-content">
        <input 

          type="file" 
          id="file-uploader-id"
          className="file-uploader"
          onChange={ () => loadFile()}

        />
        <div className="password-container">
          <input 

            type="password"
            id="file-password"
            className="password-input"
            style={{

              display: (passwordReady)?"inline":"none"

            }}
            placeholder={ props.language.type_your_password }
            title={ props.language.type_your_password }

          />
          <button 

            className="action-button"
            onClick={ () => (passwordReady)?openWallet():openFile() }
            title={ (passwordReady)?props.language.decrypt_wallet:props.language.open_enc_file }
            style={{ width: (passwordReady)?"35%":"80%" }}

          >
            <ButtonAction />
          </button>
        </div>
        <button

          className="open-file-go-back-btn"
          onClick={ () => clearAndGoBack() }
          title={ props.language.go_back }

        >
          <FiSkipBack size={20} style={{paddingRight: "4px"}} />{ props.language.go_back}
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => ({

  nano_wallet: state.wallet,
  language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  wallet_public_key: (public_key: my_wallet) => dispatch(setPublicKey(public_key)),
  goBack: () => dispatch(resetWallet()),
  newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))

});

export default connect(mapStateToProps, mapDispatchToProps)(OpenEncryptedWalletFile);
