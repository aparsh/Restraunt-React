import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method:  'POST',
        body: JSON.stringify(newComment),
        headers:{
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var err = new Error('Error ' + response.status + ' : ' + response.statusText);
            err.response=response;
            throw err;
        }
    }, error => {
        var errormsg = new Error(error.message);
        throw errormsg;
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
        console.log('POST comment ', error.message);
        alert('Yor comment couldnt be podted\nError message: ' + error.message);
    });
    
}
export const fetchDishes = ()=>(dispatch)=>{
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error ' + response.status + ' : ' + response.statusText);
                err.response=response;
                throw err;
            }
        }, error => {
            var errormsg = new Error(error.message);
            throw errormsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = ()=>({
    type : ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type : ActionTypes.DISHES_FAILED,
    payload : errmsg
});

export const addDishes = (dishes) => ({
    type : ActionTypes.ADD_DISHES,
    payload : dishes
});

export const fetchComments = ()=>(dispatch)=>{

    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var err = new Error('Error ' + response.status + ' : ' + response.statusText);
                err.response=response;
                throw err;
            }
        }, error => {
            var errormsg = new Error(error.message);
            throw errormsg;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}
export const commentsFailed = (errmsg) => ({
    type : ActionTypes.COMMENTS_FAILED,
    payload : errmsg
});
export const addComments = (comments) => ({
    type : ActionTypes.ADD_COMMENTS,
    payload : comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var err = new Error('Error ' + response.status + ' : ' + response.statusText);
            err.response=response;
            throw err;
        }
    }, error => {
        var errormsg = new Error(error.message);
        throw errormsg;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});