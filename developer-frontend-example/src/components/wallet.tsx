import React, { useEffect, useState } from 'react';
//import { connect } from 'react-redux';
import {

  //extract_key_pair_from_nano_seed,
  nano_rpc_account_balance,
  my_nano_php_nano2pk,
  my_nano_php_raw2real

} from '../service';

import { 
  //NANO_SEED, 
  UNDEFINED, 
} from '../utils';

import {
  ACCOUNT_TEST
} from '../utils/secret';

export default function Wallet(props: any) {

  const [ wallet, setWallet ] = useState('Internal error');
  const [ walletNumber, setWalletNumber ] = useState("0");
  const [ publicKey, setPublicKey ] = useState("");
  const [ pendingAccount, setPendingAccount ] = useState("0");
  const [ balance, setBalance ] = useState("0.0");

  useEffect(
    () => {
      nano_rpc_account_balance(ACCOUNT_TEST).then(
        (data: any) => {
          (data)?my_nano_php_nano2pk(ACCOUNT_TEST).then(
            (d: any) => (d.public_key)?setPublicKey(d.public_key):setPublicKey(UNDEFINED),
            (e) => setPublicKey(e.reason)
          ):setPublicKey(UNDEFINED);
          setWallet(ACCOUNT_TEST);
          (data.pending)?setPendingAccount(data.pending):setPendingAccount(UNDEFINED);
          (data.balance)?my_nano_php_raw2real(data.balance).then(
            (d: any) => setBalance(d.real_balance),
            (e) => setBalance(e.reason)
          ):setBalance(UNDEFINED);
          setWalletNumber("1");
        },
        (e) => console.log(e)
      );
    }
  );

  return (
    <div className="wallet-container">
      <div className="wallet-number">
        Número da carteira: <input type="text" className="wallet-number-input" defaultValue={ walletNumber } />
      </div>
      <div className="wallet">
        Carteira: { wallet }
      </div>
      <div className="wallet-public-key">
        Chave pública { publicKey }
      </div>
      <div className="balance">
        Balanço: { balance }
      </div>
      <div className="pending-account">
        Contas pendentes: { pendingAccount }
      </div>
      <div className="button-container">
        <button className="send-button">Enviar</button>
      </div>

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