import React from 'react';
import  "./Cell.css"

<<<<<<< HEAD:src/Cell.js
export default class Cell extends React.Component {
    
    render(){
        return (
            <div className={this.props.data} onClick={this.props.onClick} style={this.props.css}> {this.props.turn} </div>
        )
    }
} 
=======
export default function Box(props)  {
    return (
        <div className={props.data} onClick={props.onClick} style={props.css}> {props.turn} </div>
    )
}
 
>>>>>>> 2b61ab5a8c944dc925dbd049fc70e84602cc56e2:src/Box.js
