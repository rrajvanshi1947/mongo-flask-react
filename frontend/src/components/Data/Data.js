import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
// import decode from 'jwt-decode';



class Data extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            dataFlag: false,
        }
    }

    render(){
        console.log(this.props.data)

        let details = this.props.data.map((obj, i) => {
            return(
                <tr key = {i + 1}>
                    <td>{i + 1}</td>
                    <td>{obj.name}</td>
                    <td>{obj.course}</td>
                </tr>
            )
        })     
        
        return(
            <div><table className="table">
            <thead>
              <tr>
              <th>S. No.</th>
                <th>Name</th>	
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {details}
            </tbody>
          </table></div>
        )}
}
export default Data;