import { NOTIFY_MESSAGE } from "../utils/wallet_interface";
import { NANO_WALLET_ACTIONS } from "../actions";
import { getKey } from "../utils";


export function notifyEvt(state: NOTIFY_MESSAGE[] = [{
    key: '1',
    msg: "Mensagem"
},
{
    key: '2',
    msg: "Mensagem 2"
},
{
    key: '3',
    msg: "Mensagem 4"
},
{
    key: '4',
    msg: "Mensagem 5"
}
] , action: any) {

    let notify_tmp: NOTIFY_MESSAGE = {};

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SET_NOTIFY_MESSAGE:
            /*console.log(action.msg)
            Object.assign(notify_tmp, action.msg, { key: getKey() });
            console.log(notify_tmp);
            return notify_tmp;*/
            return [...state, Object.assign(notify_tmp, action.msg, { key: getKey() })];

        case NANO_WALLET_ACTIONS.REMOVE_NOTIFY_MESSAGE:
            return state.filter((index) => index.key !== action.key);

        case NANO_WALLET_ACTIONS.GET_NOTIFY_MESSAGE:
        default:
            return state;

    }

}