import React from 'react';
import  "./Box.css"

class Box extends React.Component {
    
    render(){
        return (
            <div className={this.props.data} onClick={this.props.onClick} style={this.props.css}> {this.props.turn} </div>
        )
    }
} 
export default Box;