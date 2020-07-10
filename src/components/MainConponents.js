import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDeatils from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {Switch, Redirect, Route} from 'react-router-dom';


class Main extends Component{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      promotions:PROMOTIONS,
      leaders:LEADERS,
      comments:COMMENTS
    };
  }

  

  render(){
    const DishWithID = ({match})=>{
      return (
        <DishDeatils 
        dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.state.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }


    const HomePage = () => {
        return (
            <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
                  promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                  leader={this.state.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    return (
      <div>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={ ()=> <Menu dishes={this.state.dishes}/> }/>
                <Route exact path="/menu/:dishId" component={DishWithID} />
                <Route exact path='/contactus' component={Contact} />
                <Route path="/about" component={()=> <About leaders={this.state.leaders}/>}/>
                <Redirect to="/home"/>
            </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
