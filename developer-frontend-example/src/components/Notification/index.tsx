import React from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';

import {

    Container,
    Message,
    Content,
    Life,
    Button 

} from './styled';

import { X } from 'react-feather';

import { 

    setLanguage, 
    setNotifyMessage 

} from '../../actions';

import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';

export function Notify(props: any) {

    //const config = { duration: 6000, tension: 125, friction: 20, precision: 0.1 };
    const transition = useTransition(props.notifications, item => item.key, {
        from: { opacity: 0, height: 0, life: '100%' } as any, 
        enter: { opacity: 1, life: '0%', height: 200 } as any,
        leave: { opacity: 0, height: 0 } as any,
        onRest: (item: any) => {console.log(item)},
        config: { duration: 6000 } as any

    });

    return (
        <div>
            <Container>
                { transition.map(({ key, item, props }) => (
                        <Message key={item.key}>
                            <Content>
                                <Life style={{ right: (props as any).life}} />
                                    { item.msg }
                                <Button>
                                    <X size={18} />
                                </Button>
                            </Content>
                        </Message>
                    ))
                }
            </Container>
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({
    notifications: state.notifyEvt
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    modifyLang: (lang: any) => dispatch(setLanguage(lang)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
