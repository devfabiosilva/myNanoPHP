import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {

  nano_rpc_account_balance,
  my_nano_php_raw2real

} from '../service';

import { 
  UNDEFINED, 
} from '../utils';

import { setMyWallet } from '../actions';
import { my_wallet } from '../utils/wallet_interface';

export function Wallet(props: any) {
  const [balance, setBalance] = useState("Loading balance ...");
  const [pendingAccount, setPendingAccount ] = useState("Loading pending account ...");

  useEffect(
    () => {
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
        { props.language.balance }: { balance }
      </div>
      <div className="pending-account">
        { props.language.pending_account }: { pendingAccount }
      </div>
      <div className="button-container">
        <button className="send-button">
          { props.language.send }
        </button>
      </div>

    </div>
  );

}

const mapStateToProps = (state: any, ownProps: any) => ({
  //nano_wallet_state: state.wallet
  state: state.wallet,
  language: state.lang
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

  setMyWallet: (param: my_wallet) => dispatch(setMyWallet(param))

});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
