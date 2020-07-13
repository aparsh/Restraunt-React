import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/MainConponents';
import './App.css';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/ConfigureStore';

const store = ConfigureStore();

class App extends Component{
  constructor(props){
    super(props);
    this.state={
    };
  }

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
