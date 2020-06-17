import React from 'react';
import { connect } from 'react-redux';
import { useTransition } from 'react-spring';

import {

    Container,
    Message,
    Content,
    NotificationIconContainer,
    NotificationTextContainer

} from './styled';

import { 

    setLanguage, 
    setNotifyMessage, 
    removeNotifyMessage

} from '../../actions';

import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';

import { 

    getKey, 
    NOTIFY_TYPE 

} from '../../utils';

import { 
    
    FiAlertTriangle, 
    FiInfo, 
    FiXCircle 

} from 'react-icons/fi';

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
            return (state === 'leave')?[{ duration: 10000 }, config]: config;
        }) as any
    });

    function NotificationType(props: any) {

        if (props.myProps) {

            if (props.myProps.notify_type) {

                switch (props.myProps.notify_type) {

                    case NOTIFY_TYPE.NOTIFY_TYPE_ALERT:
                        return (
                            <>
                                <NotificationIconContainer key={getKey()}>
                                    <FiAlertTriangle key={getKey()} size={36} />
                                </NotificationIconContainer>
                                <NotificationTextContainer key={getKey()}>
                                    { (props.myProps.msg)?props.myProps.msg:"" }
                                </NotificationTextContainer>
                            </>
                        );

                    case NOTIFY_TYPE.NOTIFY_TYPE_ERROR:
                        return (
                            <>
                                <NotificationIconContainer key={getKey()}>
                                    <FiXCircle key={getKey()} size={36} />
                                </NotificationIconContainer>
                                <NotificationTextContainer key={getKey()}>
                                    { (props.myProps.msg)?props.myProps.msg:"" }
                                </NotificationTextContainer>
                            </>
                        );

                }

            }

            return (
                <>
                    <NotificationIconContainer key={getKey()}>
                        <FiInfo key={getKey()} size={36} />
                    </NotificationIconContainer>
                    <NotificationTextContainer key={getKey()}>
                        { (props.myProps.msg)?props.myProps.msg:"" }
                    </NotificationTextContainer>
                </>
            );

        }

        return null;

    }
    

   return (
        <Container>
            { transition.map(({ key, item, props: { ...style}, }) => (
                    <Message key={(item)?item.key:"key"} style={style as any}>
                        <Content key={getKey()} notf={(item)?(item.notify_type)?item.notify_type:null:null} >
                            <NotificationType myProps={item} />
                        </Content>
                    </Message>
                ))
            }
        </Container>
    );

/*
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
*/
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
