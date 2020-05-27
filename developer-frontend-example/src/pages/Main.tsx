import React from 'react';
import { connect } from 'react-redux';
import { testAction } from '../actions';
import Wallet from '../components/wallet';
//dom 2020 05 24 20:30
export function Main(props: any) {

    return (
        <div>
            <Wallet />
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({
    nano_wallet_state: state.test
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

    m_test: (val: string) => dispatch(testAction(val))

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);