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
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const  mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  } 
}

const mapDispatchToProps = dispatch => ({
    postComment:(dishId, rating, author, comment)=>dispatch(postComment(dishId, rating, author, comment)),
    postFeedback:(feedback)=>dispatch(postFeedback(feedback)),
    fetchDishes: () => { dispatch(fetchDishes())},
    fetchComments: () => { dispatch(fetchComments())},
    fetchPromos: () => { dispatch(fetchPromos())},
    fetchLeaders: () => { dispatch(fetchLeaders())}
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
    this.props.fetchLeaders();
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
        postComment = {this.props.postComment}
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
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrmsg={this.props.leaders.errmsg}
            />
        );
    }
    return (
      <div>
        <Header />
        <div className="container">
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='page'>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={ ()=> <Menu dishes={this.props.dishes}/> }/>
                    <Route exact path="/menu/:dishId" component={DishWithID} />
                    <Route exact path='/contactus' component={()=>
                                    <Contact postFeedback={this.props.postFeedback}/>} 
                    />
                    <Route path="/about" component={()=> <About leaders={this.props.leaders}/>}/>
                    <Redirect to="/home"/>
                </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
