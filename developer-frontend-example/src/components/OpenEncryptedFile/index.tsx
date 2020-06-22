import React, { useState } from 'react';

import { connect } from 'react-redux';

import { 

  setPublicKey,
  resetWallet,
  setNotifyMessage

} from '../../actions';

import {

  MY_NANO_PHP_ERROR, 
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

import { FiSkipBack } from 'react-icons/fi';
import { NOTIFY_TYPE } from '../../utils';
import './style.css';

export function OpenEncryptedWalletFile(props: any) {

  const [ passwordReady, setPasswordReady ] = useState(false);

/*
  function loadFile() {

    let password:any = document.getElementById('file-password');
    let reader = new FileReader();
    let fileUploader:any = document.getElementById('file-uploader-id');
    let encrypted_data: string;

    reader.onloadend = function () {

      if (password.value !== "") {
        encrypted_data = Buffer.from(reader.result as any).toString('hex');
        my_nano_php_open_encrypted_seed(encrypted_data, password.value).then(
          (d: any) =>
          {
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
                  (error) => console.log(error)
                )
                
              },
              (key_pair_err) => {
                console.log(key_pair_err as MY_NANO_PHP_ERROR);
              }
            );
          },
          (e) => {
            
            props.newNotification({

              notify_type: NOTIFY_TYPE.NOTIFY_TYPE_ERROR,
              msg: `${e.error} ${e.reason}`

            } as NOTIFY_MESSAGE);
            fileUploader.value = '';

          }
        );
      } else {

        alert(props.language.msg_missing_file_password.replace(/%d/, fileUploader.files[0].name));
        fileUploader.value = '';
        
      }
    }

    if (fileUploader)
      if (fileUploader.files[0])
        reader.readAsArrayBuffer(fileUploader.files[0]);

  }
 
  function openFile() {

    var myfile: any = document.getElementById('file-uploader-id');

    if (myfile)
      myfile.click();

  }
*/
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

  return (
    <div className="open-encrypted-file-container">
      <div className="open-encrypted-file-content">
        <input 

          type="file" 
          id="file-uploader-id"
          className="file-uploader"
          onChange={ () => loadFile()}

        />
        <input 

          type="password"
          id="file-password"
          className="password-input"
          style={{
            display: (passwordReady)?"inline":"none"
          }}
          placeholder={ props.language.type_your_password }

        />
        <button
          onClick={ () => openFile()}
          style={{
            display: (passwordReady)?"none":"inline"
          }}
        >
          { props.language.open_enc_file }
        </button>
        <button

          onClick={ () => clearAndGoBack()}
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
