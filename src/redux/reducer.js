import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';

export const inintialState= {
    dishes:DISHES,
    promotions:PROMOTIONS,
    leaders:LEADERS,
    comments:COMMENTS
};

export const Reducer= (state = inintialState, action)=>{
    return state;
};