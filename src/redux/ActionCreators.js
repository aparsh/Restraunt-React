import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import { actions } from 'react-redux-form';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


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

    // return fetch(baseUrl + 'comments', {
    //     method: 'POST',
    //     body: JSON.stringify(newComment),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     credentials: 'same-origin'
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response = response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(comment => dispatch(addComment(comment)))
    //     .catch(error => {
    //         console.log('POST comment ', error.message);
    //         alert('Yor comment couldnt be podted\nError message: ' + error.message);
    //     });

    console.log("len:",COMMENTS.length)
    COMMENTS.push(newComment);
    console.log("len:",COMMENTS.length)
    return dispatch(addComment(comment))

}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    // return fetch(baseUrl + 'dishes')
    //     .then(response => {
    //         console.log(response)
    //         if(response.ok){
    //             return response;
    //         }
    //         else{
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response=response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(dishes => dispatch(addDishes(dishes)))
    //     .catch(error => dispatch(dishesFailed(error.message)));
    return dispatch(addDishes(DISHES))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    // return fetch(baseUrl + 'comments')
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response = response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(comments => dispatch(addComments(comments)))
    //     .catch(error => dispatch(commentsFailed(error.message)));

    return dispatch(addComments(COMMENTS));
}
export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg
});
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    dispatch(promosLoading(true));

    // return fetch(baseUrl + 'promotions')
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response = response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(promos => dispatch(addPromos(promos)))
    //     .catch(error => dispatch(promosFailed(error.message)));

    return dispatch(addPromos(PROMOTIONS));
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

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    // return fetch(baseUrl + 'leaders')
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response = response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(leaders => dispatch(addLeaders(leaders)))
    //     .catch(error => dispatch(leadersFailed(error.message)));
    return dispatch(addLeaders(LEADERS))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmsg
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = (feedback) => (dispatch) => {
    // return fetch(baseUrl + 'feedback', {
    //     method: 'POST',
    //     body: JSON.stringify(feedback),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     credentials: 'same-origin'
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         }
    //         else {
    //             var err = new Error('Error ' + response.status + ' : ' + response.statusText);
    //             err.response = response;
    //             throw err;
    //         }
    //     }, error => {
    //         var errormsg = new Error(error.message);
    //         throw errormsg;
    //     })
    //     .then(response => response.json())
    //     .then(feedback => {
    //         dispatch(actions.reset('feedback'));
    //         alert(JSON.stringify(feedback));
    //     })
    //     .catch(error => {
    //         console.log('POST comment ', error.message);
    //         alert('Yor Feedback couldn\'t be posted\nError message: ' + error.message);
    //     });

    dispatch(actions.reset('feedback'));
    alert("Thanks for the feedback");
}