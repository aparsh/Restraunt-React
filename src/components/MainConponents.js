import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponents';
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes';
import {Switch, Redirect, Route} from 'react-router-dom';

class Main extends Component{

  constructor(props){
    super(props);
    this.state={
      dishes:DISHES
    };
  }

  render(){
    const HomePage = () => {
        return (
            <Home/>
        );
    }
    return (
      <div>
        <Header />
        <div className="container">
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={ ()=> <Menu dishes={this.state.dishes}/> }/>}/>
                <Redirect to="/home"/>
            </Switch>
        <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
