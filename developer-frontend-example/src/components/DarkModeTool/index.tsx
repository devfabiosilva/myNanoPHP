import React from 'react';
import { connect } from 'react-redux';
import { changeBackgroundMode } from '../../actions';
import './style.css';

import { 
    
    BACKGROUND_LIGHT, 
    BACKGROUND_DARK 

} from '../../utils';

import { 
    
    FaSun, 
    FaMoon

} from 'react-icons/fa';

export function DarkModeTool(props: any) {

    return (
        <div className="bg-mode-toggle">
            <div className="toggle"
                style={
                        {
                            transform:( props.backgroundMode === BACKGROUND_LIGHT )?"none":"translateX(100%)"
                        }
                }
            ></div>
            <div className="toggle-name">
                <div 
                    className="light-name" 
                    onClick={() => props.changeBackMode(BACKGROUND_LIGHT)}
                >
                    <div className="light-name-icon-container"><FaSun /></div><div>{ props.language.light_toggle_txt }</div>

                </div>
                <div 
                    className="dark-name" 
                    onClick={() => props.changeBackMode(BACKGROUND_DARK)}
                >
                    <div className="dark-name-icon-container"><FaMoon /></div><div>{ props.language.dark_toggle_txt }</div>

                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state: any, ownProps: any) => ({
    backgroundMode: state.setBackGroundMode,
    language: state.lang
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    changeBackMode: (mode: string) => dispatch(changeBackgroundMode(mode))
});

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeTool);