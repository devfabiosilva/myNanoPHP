import { NOTIFY_MESSAGE } from "../utils/wallet_interface";
import { NANO_WALLET_ACTIONS } from "../actions";
import { getKey } from "../utils";


export function notifyEvt(state: NOTIFY_MESSAGE[] = [{
    key: '1',
    life: '50%',
    msg: "Mensagem"
},
{
    key: '2',
    life: '70%',
    msg: "Mensagem 2"
}
] , action: any) {

    let notify_tmp: NOTIFY_MESSAGE = {};

    switch (action.type) {

        case NANO_WALLET_ACTIONS.SET_NOTIFY_MESSAGE:
            return [...state, Object.assign(notify_tmp, action.msg, { key: getKey() })];

        case NANO_WALLET_ACTIONS.GET_NOTIFY_MESSAGE:
        default:
            return state;

    }

}