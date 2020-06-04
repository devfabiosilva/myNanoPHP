import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';

import {

  nano_rpc_account_balance,
  my_nano_php_raw2real

} from '../../service';

import { 

  UNDEFINED, MAX_FEE,

} from '../../utils';

import { setMyWallet } from '../../actions';
import { my_wallet } from '../../utils/wallet_interface';
import LanguageTool from '../LanguageTool';

export function Wallet(props: any) {

  const [ balance, setBalance] = useState("");
  const [ pendingAccount, setPendingAccount ] = useState("");
  const [ fee, setFee ] = useState(true);
  //const [ feeValue, setFeeValue ] = useState(MAX_FEE);

  useEffect(
    () => {
      console.log(props.state);
      nano_rpc_account_balance(props.state.wallet).then(
        (data: any) => {
          (data)?
            (data.balance)?
              my_nano_php_raw2real(data.balance).then(
                (d: any) => {
                  my_nano_php_raw2real(data.pending).then(
                    (pending_balance: any) => {
                      props.setMyWallet({
                        balance: d.real_balance,
                        pending: pending_balance.real_balance
                      });
                      setBalance(props.state.balance);
                      setPendingAccount(props.state.pending);
                    },
                    (error: any) => console.log(error)
                  );
                },
                (e: any) => {
                  props.setMyWallet({
                    balance: e.reason
                  });
                }
              )
            :props.setMyWallet(
              {
                balance:UNDEFINED
              }
            )
          :props.setMyWallet(
            {
              balance:UNDEFINED
            }
          );
        },
        (error) => {
          console.log(error)
        }
      );
    },
    [
      props
    ]
  );

  return (
    <div className="wallet-container">
      <LanguageTool />
      <div className="wallet-number-container">
        <div className="wallet-number-title">{ props.language.wallet_number }:</div>
        <div className="wallet-number">
          { props.state.wallet_number }
        </div>
      </div>
      <div className="wallet">
        { props.language.wallet }: { props.state.wallet }
      </div>
      <div className="wallet-public-key">
        { props.language.pk } { props.state.public_key }
      </div>
      <div className="balance">
        { props.language.balance }: { (balance)?balance:props.language.loading_balance }
      </div>
      <div className="pending-account">
        { props.language.pending_account }: { (pendingAccount)?pendingAccount:props.language.loading_pending }
      </div>
      <div className="fee-container">
        <label>{ props.language.label_allow_p2pow_dpow_label }</label>
        <input type="checkbox" checked={ fee } onChange={() => setFee(!fee)} />
        <div className="fee-label-value-container" style={{display:(fee)?"inline-block":"none"}}>
          <label>{ props.language.label_fee }</label>
          <input type="text" defaultValue={ MAX_FEE } />
        </div>
      </div>
      <div className="button-container">
        <button className="send-button">
          { props.language.send }
        </button>
      </div>
      <div className="qr-code-container">
        <QRCode value={ props.state.wallet }/>
      </div>

    </div>
  );

}

const mapStateToProps = (state: any, ownProps: any) => ({

  state: state.wallet,
  language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  setMyWallet: (param: my_wallet) => dispatch(setMyWallet(param))

});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
