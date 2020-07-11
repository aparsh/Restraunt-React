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


const  mapStateToProps = state =>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  } 
}

class Main extends Component{

  constructor(props){
    super(props);
    this.state={
      
    };
  }

  

  render(){
    const DishWithID = ({match})=>{
      return (
        <DishDeatils 
        dish={this.props.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }


    const HomePage = () => {
        return (
            <Home dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
                  promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
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
                <Route exact path='/contactus' component={Contact} />
                <Route path="/about" component={()=> <About leaders={this.props.leaders}/>}/>
                <Redirect to="/home"/>
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
