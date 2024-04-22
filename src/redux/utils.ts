import { Action } from 'redux';
type ActionHandlers<S> = {
    [key: string]: (state: S, action: any) => S;
};
export interface ActionWidthPayload<T> extends Action {
    payload: T;
}
function createReducer<TState>(
    initialState: TState,
    handlers: ActionHandlers<TState>
) {
    return function (state: TState, action: Action) {
        state ??= initialState;
        const handler = handlers[action.type];

        if (handler) {
            return handler(state, action);
        }
        return state;
    };
}
export default createReducer;
