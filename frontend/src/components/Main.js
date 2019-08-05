import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';

class Main extends Component {
    render(){
        return(
            <div>
                {/* <Switch> */}
                    <Route path="/" component={Login}/>
                    {/* <Route path="/login" component={Login}/> */}
                    <Route path="/register" component={Register}/>
                    <Route path="/home" component={Home}/>
                {/* </Switch> */}
            </div>
        )
    }
}
export default Main;