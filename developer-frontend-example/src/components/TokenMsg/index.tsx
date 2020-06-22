
import React from 'react';
import { connect } from 'react-redux';

import './style.css';

export function TokenMsg(props: any) {

    return (

        <div className="token-containter">
            <div className="token-window">
                To be implemented ...
            </div>
        </div>

    )

}

const mapStateToProps = (state: any, ownProps: any) => ({

    language: state.lang

});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({


});

export default connect(mapStateToProps, mapDispatchToProps)(TokenMsg);
