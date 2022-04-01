import React, { Component } from "react";
import Buttons from "../Buttons/Buttons";
import Data from "../data.json"
import Record from "../Record/Record";
import Swal from "sweetalert2";

export default class Design extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            id: "",
            history: [],
            choices: {
                a: "",
                b: "",
            },
            letter: "",
            electionList: []
        }
        this.update = this.update.bind(this)

    }

    componentDidMount() {
        Swal.fire({
            title: '¡Bienvenido a tu propia aventura!',
            width: 500,
            padding: '3em',
            color: '#716add',
            background: 'rgba(0,0,0,0.9)',
            backdrop: `
              rgba(1,0,0,0.9)
              url("https://media.giphy.com/media/rCmC12OWz9kTS/giphy.gif")
              repeat
            `
        })

        this.setState({
            count: this.state.count,
            id: `${Data[0].id}`,
            history: `${Data[0].historia}`,
            choices: {
                a: Data[0].opciones.a,
                b: `${Data[0].opciones.b}`,
            }
        });
    }

    update(e) {
        if (this.state.count <= 7) {
            switch (e) {
                case 'a':
                    this.setState({
                        history: Data[this.state.count].historia,
                        choices: {
                            a: `${Data[this.state.count].opciones.a}`,
                            b: `${Data[this.state.count].opciones.b}`
                        },
                        count: this.state.count + 2,
                        letter: 'A',
                        electionList: [...this.state.electionList, 'A']
                    })
                    break;

                case 'b':
                    this.setState({
                        history: `${Data[this.state.count + 1].historia}`,
                        choices: {
                            a: `${Data[this.state.count + 1].opciones.a}`,
                            b: `${Data[this.state.count + 1].opciones.b}`
                        },
                        count: this.state.count + 2,
                        letter: 'B',
                        electionList: [...this.state.electionList, 'B']
                    })
                    break;
            }
        } else {
            Swal.fire({
                width: 500,
                padding: '3em',
                color: '#716add',
                background: 'rgba(0,0,0,0.9)',
                title: 'FIN... ¿Quieres volver a empezar la historia?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Repetir',
                denyButtonText: `Terminar`,

            }).then((result) => {
                if (result.isConfirmed) {
                    let timerInterval
                    Swal.fire({
                        title: 'Comenzando en...',
                        html: '<b></b> segundos',
                        timer: 5000,
                        timerProgressBar: true,
                        background: 'rgba(0,0,0,0.9)',
                        backdrop: `url(https://media.giphy.com/media/zl3b8VDACq9aw/giphy.gif)`,

                        didOpen: () => {
                            Swal.showLoading()
                            
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                                b.textContent = (Swal.getTimerLeft() / 1000)
                                    .toFixed(0)

                            }, 100)

                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log('I was closed by the timer')
                            window.location.reload();
                        }
                    })

                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Historia terminada',
                        color: '#716add',
                        background: 'rgba(0,0,0,0.9)',
                        backdrop: `
                        url("https://media.giphy.com/media/iZGpuaRKdEZoI/giphy.gif")`,

                    })

                }
            })
        }
    }

    render() {
        return (
            <>
                <div className="layout">
                    <h1 className="historia">{this.state.history}</h1>
                    <Buttons choices={this.state.choices} update={this.update} />
                    <Record letter={this.state.letter} electionList={this.state.electionList} />
                </div>
            </>
        )
    }
}
