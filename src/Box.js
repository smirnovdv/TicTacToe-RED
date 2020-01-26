import React from 'react';
import  "./Box.css"

export default function Box(props)  {
    return (
        <div className={props.data} onClick={props.onClick} style={props.css}> {props.turn} </div>
    )
}
 