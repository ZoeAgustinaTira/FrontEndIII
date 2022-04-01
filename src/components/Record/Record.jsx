
import React, { Component } from "react";

export default class Record extends Component {
    render() {
        console.log(this.props);

        return (
            <>
                <div className="recordatorio">
                    <h3>Seleccion anterior: {this.props.letter}</h3>
                    <h4>Historial de opciones elegidas:</h4>
                    <ul>{this.props.electionList.map((letter, index) => <li key={index}>{letter}</li>)}</ul>

                </div>
            </>
        )
    }

}