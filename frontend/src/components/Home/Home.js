import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import decode from 'jwt-decode';
import Data from '..//Data/Data'


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : decode(localStorage.getItem('usertoken')).identity.email,
            first_name: decode(localStorage.getItem('usertoken')).identity.first_name,
            last_name: decode(localStorage.getItem('usertoken')).identity.last_name,
            data: [],
            dataFlag: false,
        }
        this.showData = this.showData.bind(this)
        this.handleLogout = this.handleLogout.bind(this);
    }

    showData(e){
        console.log("Request to get mongo data");
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/getdata').then(response => {
            console.log(response);
            this.setState({
	        data: response.data,
            dataFlag: true
          });
        })
        console.log(this.state.data)
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear()
        return <Redirect to='/' />
      }

    render(){
        console.log(this.state.data)
        return(
            <div>
                <br></br>
            <div><button type="submit" className="btn btn-primary" style={{"position": "absolute", "left": "50px"}} onClick = {this.showData}>View Data</button>
            {/* <button style={{"position": "absolute", "left": "1200px"}} className="btn btn-danger" onClick={this.handleLogout}> Logout</button> */}
            <Link to="/" onClick={this.handleLogout} style={{"position": "absolute", "left": "1200px"}}><span class="glyphicon glyphicon-log-in"></span> Logout</Link>
            </div> 
            <br></br>
            <br></br>
            <div>{console.log('Inside control change to data component')}
            { this.state.dataFlag===true ? <Data data={this.state.data}/> : null }</div>
    
            </div>
    )}
}
export default Home;
