import React from 'react';
import  "./Box.css"

export default function Box()  {
    return (
        <div className={this.props.data} onClick={this.props.onClick} style={this.props.css}> {this.props.turn} </div>
    )
}
 