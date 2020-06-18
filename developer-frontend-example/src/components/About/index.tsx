import React from 'react';
import { connect } from "react-redux";
import { showAbout } from '../../actions';
import { FiSkipBack } from 'react-icons/fi';

export function About(props: any) {
    return (
        <div className="about-container">
            To be implemented ...
            <button onClick={ props.goBack }>
                <FiSkipBack size={16} /> Go back
            </button>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({
    language: state.lang
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    goBack: () => dispatch(showAbout(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
