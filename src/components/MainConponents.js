import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDeatils from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import {Switch, Redirect, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import {addComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';


const  mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  } 
}

const mapDispatchToProps = dispatch => ({
    addComment:(dishId, rating, author, comment)=>dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())},
    fetchComments: () => { dispatch(fetchComments())},
    fetchPromos: () => { dispatch(fetchPromos())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
});
class Main extends Component{

  constructor(props){
    super(props);
    this.state={
    };
  }

 
  componentDidMount() {
    this.props.fetchPromos();
    this.props.fetchDishes();
    this.props.fetchComments();
  }

  render(){
    const DishWithID = ({match})=>{
      return (
        <DishDeatils 
        dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrmsg={this.props.dishes.errmsg} 
        comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
        addComment = {this.props.addComment}
        />
      );
    }


    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrmsg={this.props.dishes.errmsg}      
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrmsg={this.props.promotions.errmsg}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    return (
      <div>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={ ()=> <Menu dishes={this.props.dishes}/> }/>
                <Route exact path="/menu/:dishId" component={DishWithID} />
                <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                <Route path="/about" component={()=> <About leaders={this.props.leaders}/>}/>
                <Redirect to="/home"/>
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
