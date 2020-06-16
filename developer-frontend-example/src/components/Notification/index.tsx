import React from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';

import {

    Container,
    Message,
    Content

} from './styled';

import { 

    setLanguage, 
    setNotifyMessage, 
    removeNotifyMessage

} from '../../actions';

import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';
import { getKey } from '../../utils';

export function Notify(props: any) {

    const config = { tension: 125, friction: 20, precision: 0.1 };
    const transition = useTransition(props.notifications, item => (item)?item.key:null, {
        from: { opacity: 0, life: '100%', height: 0 } as any,
        enter: ((item: any) => async (next: (param: any) => any) => {
            if (item)
                await next({ opacity: 1, height: 120 });
        }) as any,
        leave: ((item: any) => async (next: (param: any) => any, cancel: (param: any) => any) => {
                if (item) {

                    await next( { opacity: 0 } );
                    await next( { height: 0 } );
                }
                
            }
        ) as any,
        onRest: (item: any, state: any) => {
            props.removeNotification(item.key)
            
        },
        config: ((item: any, state: any) => { 
            return (state === 'leave')?[{ duration: 2500 }, config]: config;
        }) as any
    });

    return (
        <Container>
            { transition.map(({ key, item, props: { ...style}, }) => (
                    <Message key={(item)?item.key:"key"} style={style as any}>
                        <Content key={getKey()} notf={(item)?(item.notify_type)?item.notify_type:null:null} >
                            { (item)?item.msg:"" }
                        </Content>
                    </Message>
                ))
            }
        </Container>
    );
}

const mapStateToProps = (state: any, ownProps: any) => ({
    notifications: state.notifyEvt
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    modifyLang: (lang: any) => dispatch(setLanguage(lang)),
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    removeNotification: (key: number) => dispatch(removeNotifyMessage(key))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
