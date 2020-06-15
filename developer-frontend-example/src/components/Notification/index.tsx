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
    setNotifyMessage, 
    removeNotifyMessage

} from '../../actions';

import { NOTIFY_MESSAGE } from '../../utils/wallet_interface';


export function Notify(props: any) {

    const config = { tension: 125, friction: 20, precision: 0.1 };
    const transition = useTransition(props.notifications, item => (item)?item.key:null, {
        from: { opacity: 0, life: '100%', height: 0, } as any, 
        enter: ((item: any) => async (next: (param: any) => any) => {
            if (item)
                await next({ opacity: 1, height: 70 });
        }
        ) as any,
        leave: ((item: any) => async (next: (param: any) => any) => {
                if (item) {
                    await next( { life: '0%' } );
                    await next( { opacity: 0 } );
                    await next( { height: 0 });
                }
            }
        ) as any,
        onRest: (item: any) => props.removeNotification(item.key),
        config: ((item: any, state: any) => { 
            
           return (state === 'leave')?[{ duration: 3000 }, config, config]: config;
        }) as any
    });

    return (
        <div>
            <Container>
                { transition.map(({ key, item, props, props: {...style} }) => (
                        <Message key={(item)?item.key:null} style={style as any}>
                            <Content>
                                <Life style={{ right: (props as any).life}} />
                                    { (item)?item.msg:"" }
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
    newNotification: (msg: NOTIFY_MESSAGE) => dispatch(setNotifyMessage(msg)),
    removeNotification: (key: number) => dispatch(removeNotifyMessage(key))
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Notify);
