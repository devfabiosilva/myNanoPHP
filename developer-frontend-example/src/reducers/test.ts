import { TEST_ACTION } from '../actions';

export default function test(state: string|null = "Fabio Pereira", action: any) {

    switch (action.type) {

        case TEST_ACTION.ACTION_A:
            return action.data;

        default:
            return state;
    
    }
}
