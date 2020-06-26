import React from 'react';
import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';
import { setNotifyMessage } from '../../actions';
import { connect } from 'react-redux';
import './style.css';

export function ChangeWallet(props: any) {

    return (
        <>
        </>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    setNotifyMessage: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))

});
  
export default connect(mapStateToProps, mapDispatchToProps)(ChangeWallet);
