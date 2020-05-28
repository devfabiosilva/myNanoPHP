import React from 'react';
import {
  my_nano_php_open_encrypted_seed
} from '../service';

export default function OpenWalletFile(props: any) {

  function teste(e: any) {
    console.log(e);
    /*
    if (e==="Enter") {
      console.log("Aqui")
      setWalletNumber(inputWalletNumber);
    }
    */
    var password:any = document.getElementById('file-password');
    var reader = new FileReader();
    var fileUploader:any = document.getElementById('file-uploader-id');
    var txt: any;
    //var res: any;

    reader.onloadend = function () {
      txt = reader.result;
      console.log(txt);
      console.log(Buffer.from(txt).toString('hex'));
      my_nano_php_open_encrypted_seed(Buffer.from(txt).toString('hex'), password.value).then(
        (d) => console.log(d),
        (e) => console.log(e)
      );
    }

    if (fileUploader)
      if (fileUploader.files[0])
        reader.readAsArrayBuffer(fileUploader.files[0]);


  }
 
  function openFile() {

    var myfile = document.getElementById('file-uploader-id');

    if (myfile)
      myfile.click();

  }

  return (
    <div>
      <input 
        type="file" 
        id="file-uploader-id"
        onChange={ () => teste('')}
      />
      <input 
        type="password" 
        id="file-password" 
        placeholder="Type your password to open file"
      />
      <button
        onClick={ () => openFile()}
      >
        Clique para abrir arq criptografado
      </button>
    </div>
  );
}
/*
const mapStateToProps = (state: any, ownProps: any) => ({
  nano_wallet_state: state.test
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  m_test: (val: string) => dispatch(testAction(val))

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
*/