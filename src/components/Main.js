import React, { Component } from "react";

import Form from './Form';
import Tarefas from "./Tarefas";

import './Main.css';

export default class Main extends Component {
    // Field Class --> Tipo um constructor, que permite que criemos atributos da classe
    state = {
        //Tudo que for alterado aqui dentro, será refletido para o método de render()

        // Tarefa Atual

        novaTarefa: '',
        // Array que conterá as tarefas que foram salvas
        tarefas: [],
        //Estado do Index
        index: -1,
    };

    //Salvar tarefas no LocalStorage
    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;

        if (tarefas === prevState.tarefas) return

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    //Será executado assim que o componente for montado
    componentDidMount() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas'));

        if (!tarefas) return;

        this.setState({ tarefas });
    }

    //Método para prever o evento do envio do formulario
    handleSubmit = (e) => {
        e.preventDefault();
        const { tarefas, index } = this.state;
        let { novaTarefa } = this.state;
        novaTarefa = novaTarefa.trim();

        if (tarefas.indexOf(novaTarefa) !== -1) return;

        const novasTarefas = [...tarefas];

        //Se o index for igual a -1, quer dizer que estamos criando uma nova tarefa
        if (index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa],
                novaTarefa: '',
            });
        } else {
            novasTarefas[index] = novaTarefa;

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa: '',
            })
        }

    }

    //Método que SETA um valor para o atributo novaTarefa
    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    //Método que edita a tarefa
    handleEdit = (e, index) => {
        const { tarefas } = this.state;
        this.setState({
            index,
            novaTarefa: tarefas[index],
        });
    }

    //Método que deleta a tarefa
    handleDelete = (e, index) => {
        const { tarefas } = this.state;
        const novasTarefas = [...tarefas];

        novasTarefas.splice(index, 1);

        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    //Método RENDER
    render() {
        // Desestruturação do State
        const { novaTarefa, tarefas } = this.state;

        return (
            <div className="main">
                <h1>
                    Lista de Tarefas
                </h1>

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <Tarefas
                    tarefas={tarefas}
                    handleEdit={this.handleEdit}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}