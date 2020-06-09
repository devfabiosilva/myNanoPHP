import React from 'react';
import { connect } from 'react-redux';

export function NotFound(props: any) {

    return (
        <div>
            { props.language.not_found }
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({
    language: state.lang
});
  
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  
});
  
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);