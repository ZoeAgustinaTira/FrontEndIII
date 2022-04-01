//creo el componente botones
import React, { Component } from "react";

export default class Buttons extends Component {
    render() {
        return (
            <>
                <div className="opciones">
                    <div className="opcion">
                        <button id='a' className="botones" onClick={() => {
                            this.props.update('a')
                        }}>A</button>

                        <h3>{this.props.choices.a}</h3>
                    </div>

                    <div className="opcion">
                        <button id='b' className="botones" onClick={() => {
                            this.props.update('b')
                        }}>B</button>
                        <h2>{this.props.choices.b}</h2>
                    </div>
                </div>
            </>
        )
    }
}