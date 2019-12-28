import React from "react";

class Button extends React.Component {
    constructor() {
        super(props);
        this.state= {
            visibility:"visible",
            opacity: 1
        }
    }
    render() {
        return(
            <button onClick={this.props.newGame}>NEW GAME</button>  
        )
    }
}