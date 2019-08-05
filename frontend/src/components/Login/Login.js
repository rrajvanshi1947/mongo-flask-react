import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }    

    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    
    submitLogin = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/login', data)
                .then(response => {
                    console.log(response)
                    localStorage.setItem('usertoken', response.data.token)
                    console.log('Auth flag will be set to true in the next line')
                    this.setState({authFlag: true})
                })
                .catch(err => {
                    console.log(err)
                })
    }

    render(){
        let redirectVar = null;
        if (this.state.authFlag === true || localStorage.getItem('usertoken')){
        console.log('Inside home')
            return <Redirect to='/home' />
        }
        console.log('Inside render')

        return(
            <div>
            <div className='body' >
            {redirectVar}
            <div className="contact-form"  >

        <h2>Login Form</h2>
        <form noValidate onSubmit={this.submitLogin} >
            <p>Email</p>
            <input type="email" name="email" placeholder="Enter Email" value = {this.state.email} onChange = {this.emailChangeHandler}/>
            <p>Password</p>
            <input type="password" name="password" placeholder="Enter Password" value = {this.state.password} onChange = {this.passwordChangeHandler} />
            <input type="submit" name="" value="Sign In" />
            <p><input type="checkbox" /> Remember Me </p>
            <div style={{color: 'white'}}>
                Don't have an account? <Link to="/register"><span class="glyphicon glyphicon-log-in"></span>Sign up here</Link>
            </div>
        </form>
        </div>
        </div>
        </div>
        )
    }
}
export default Login;