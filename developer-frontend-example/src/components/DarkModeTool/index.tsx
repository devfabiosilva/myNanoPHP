import React from 'react';
import { connect } from 'react-redux';
import { changeBackgroundMode, setNotifyMessage } from '../../actions';
import './style.css';

import { 
    
    BACKGROUND_LIGHT, 
    BACKGROUND_DARK 

} from '../../utils';

import { 
    
    FaSun, 
    FaMoon

} from 'react-icons/fa';
import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';

export function DarkModeTool(props: any) {

    return (
        <div className="bg-mode-toggle">
            <div className="toggle"
                style={
                        {
                            transform:( props.backgroundMode === BACKGROUND_LIGHT )?"none":"translateX(100%)"
                        }
                }
            >
            </div>
            <div className="toggle-name">
                <div 
                    className="light-name" 
                    onClick={() => {
                        
                            props.changeBackMode(BACKGROUND_LIGHT);
                            props.newNotification({
                                msg: props.language.notification_light_mode_changed
                            } as NOTIFY_MESSAGE)

                        }
                    }
                    title={ props.language.light_mode_title }
                >
                    <div className="light-name-icon-container"><FaSun /></div><div>{ props.language.light_toggle_txt }</div>

                </div>
                <div 
                    className="dark-name" 
                    onClick={() => {

                            props.changeBackMode(BACKGROUND_DARK);
                            props.newNotification({
                                msg: props.language.notification_dark_mode_changed
                            } as NOTIFY_MESSAGE);

                        }
                    }
                    title={ props.language.dark_mode_title }
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

    changeBackMode: (mode: string) => dispatch(changeBackgroundMode(mode)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))

});

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeTool);