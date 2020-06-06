import React from 'react';
import { connect } from 'react-redux';
import './style.css';
import { closeWalletDialog } from '../../actions';

function Dialog(props: any) {

    return ((props.dialogVisible)?(
        <div className="dialog-container">
            <div className="dialog-window">
                <div className="dialog-button-container">
                    <button
                        className="dialog-button-cancel"
                        onClick={ props.closeMyDialog } 
                    >
                        { props.language.cancel_button }
                    </button>
                    <button 
                        className="dialog-button-ok"
                    >
                        Ok
                    </button>
                </div>
            </div>
        </div>
    ):null);

}

const mapStateToProps = (state: any, ownProps: any) => ({

    nano_wallet: state.wallet,
    language: state.lang,
    dialogVisible: state.openTransactionDialog

});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    closeMyDialog: () => dispatch(closeWalletDialog())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);