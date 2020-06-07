import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import Dialog from '../Dialog';

import {

  nano_rpc_account_balance,
  my_nano_php_raw2real,
  nano_rpc_account_representative,
  nano_rpc_account_frontier,
  my_nano_php_send_receive_money,

} from '../../service';

import { 

  UNDEFINED, MAX_FEE,
  DEFAULT_REPRESENTATIVE,

} from '../../utils';

import { 
  
  setMyWallet, 
  openWalletDialog, 
  dialogStatus 

} from '../../actions';
import { my_wallet } from '../../utils/wallet_interface';
import LanguageTool from '../LanguageTool';

export function Wallet(props: any) {

  const [ balance, setBalance] = useState("");
  const [ pendingAccount, setPendingAccount ] = useState("");
  const [ fee, setFee ] = useState(true);
  const [ representative, setRepresentative ] = useState("");
  const [ walletReady, setWalletReady ] = useState(false);

  useEffect(
    () => {

      let obj_dest_wallet: any;
      let obj_amount_to_send_receive: any;
      let dest_wallet: string;
      let amount_to_send_receive: string;

      if (props.dialog_status === "send") {

        obj_amount_to_send_receive = document.getElementById('value-to-send-id');

        if (( amount_to_send_receive = obj_amount_to_send_receive.value.trim() ) === "") {

          alert("Amount is empty");
          props.dialogStatus();
          return;

        }

        obj_dest_wallet = document.getElementById('destination-wallet-id');

        if (( dest_wallet = obj_dest_wallet.value.trim() ) === "") {

          alert("Destination wallet is empty");
          props.dialogStatus();
          return;

        }

        my_nano_php_send_receive_money(props.state as my_wallet, dest_wallet, amount_to_send_receive, "send").then(
          (transaction_result: any) => {
            console.log("RESULTADO")
            console.log(transaction_result);
            props.dialogStatus();
          },
          (transaction_result_error: any) => {
            console.log("ERRO");
            console.log(transaction_result_error);
            props.dialogStatus();
          }
        );

      }

      if (!walletReady)
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
        ).then(
          () => {
            nano_rpc_account_representative(props.state.wallet).then(
              (data: any) => {
                console.log(data);
                if (data) {
                  if (data.representative) {
                    props.setMyWallet({
                      wallet_representative: data.representative
                    });
                    setRepresentative(props.state.wallet_representative);
                    setWalletReady(true);
                  } else {
                    //setRepresentative("No representative found");
                    props.setMyWallet({
                      wallet_representative: DEFAULT_REPRESENTATIVE
                    });
                  }
                  
                } else
                  setRepresentative("Unknown Nano RPC JSON data");

              },
              (e) => {

                if (e) {
                  if (e.error) {

                    props.setMyWallet({
                      wallet_representative: DEFAULT_REPRESENTATIVE
                    });

                    setRepresentative(DEFAULT_REPRESENTATIVE);
                    setWalletReady(true);
                  } else
                    setRepresentative("Unknown Error");
                } else {
                  setRepresentative("Unknown response");
                }

              }
            );
          }
        ).then(
          () => {
            nano_rpc_account_frontier(props.state.wallet).then(
              (data: any) => {
                if (data.frontiers) {
                  if (data.frontiers[props.state.wallet])
                    props.setMyWallet({
                      frontier: data.frontiers[props.state.wallet]
                    });
                }

                if (props.state.frontier === undefined)
                  props.setMyWallet({
                    frontier: ""
                  });

              },
              () => {
                props.setMyWallet({
                  frontier: ""
                });
              }
            )
          }
        );
    },
    [
      props,
      walletReady,
    ]
  );

  return (
    <div className="wallet-container">
      <Dialog dialogVisible = { false } />
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
      <div className="representative-wallet-container">
        <div className="prepresentative-label">
          { props.language.representative_title }:
        </div>
        <div className="representative-wallet" >
          { representative }
        </div>
      </div>
      <div className="balance">
        { props.language.balance }: { (balance)?balance:props.language.loading_balance }
      </div>
      <div className="pending-account">
        { props.language.pending_account }: { (pendingAccount)?pendingAccount:props.language.loading_pending }
      </div>
      <div className="destination-wallet-container">
        <label>{ props.language.destination_wallet_label }: </label>
        <input 

          type = "text" 
          id = "destination-wallet-id"
          className = "destination-wallet" 

        />
      </div>
      <div className="value-to-send">
        <label>{ props.language.amount }: </label>
        <input 

          type = "text"
          id = "value-to-send-id"
          className = "value-to-send" 

        />
      </div>
      <div className="fee-container">
        <label>{ props.language.label_allow_p2pow_dpow_label }</label>
        <input type="checkbox" checked={ fee } onChange={() => setFee(!fee)} />
        <div className="fee-label-value-container" style={{display:(fee)?"inline-block":"none"}}>
          <label>{ props.language.label_fee }</label>
          <input type="text" defaultValue={ MAX_FEE } />
        </div>
      </div>
      <div className="button-container"
        style={{display:(walletReady)?"inline-block":"none"}}
      >
        <button 
          className="send-button"
          onClick={ () => props.openDialog() }
        >
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
  language: state.lang,
  dialog_status: state.transactionDialogStatus

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  setMyWallet: (param: my_wallet) => dispatch(setMyWallet(param)),
  openDialog: () => dispatch(openWalletDialog()),
  dialogStatus: (param: string) => dispatch(dialogStatus(param))

});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
