import React from 'react';
import  "./Cell.css"

export default class Cell extends React.Component {
    
    render(){
        return (
            <div className={this.props.data} onClick={this.props.onClick} style={this.props.css}> {this.props.turn} </div>
        )
    }
} 
