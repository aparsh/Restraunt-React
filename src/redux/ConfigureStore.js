import {createStore} from 'redux';
import {Reducer , inintialState} from './reducer';

export const ConfigureStore = ()=>{
    const store = createStore(
        Reducer, inintialState
    );

    return store;
}