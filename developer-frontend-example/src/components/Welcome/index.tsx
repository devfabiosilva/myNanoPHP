import React from 'react';
import { connect } from 'react-redux';
import './style.css';

export function Welcome(props: any) {
    return (
        <div className="typewriter">
            <div className="typewriter-text">
                { props.language.welcome_msg }
            </div>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({
    language: state.lang
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({

});
  
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);