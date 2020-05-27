const ACTION_A = 1;
const ACTION_B = 2;

export const TEST_ACTION = {
    ACTION_A,
    ACTION_B
}

export function testAction(data: string) {
    return { type: ACTION_A, data };
}