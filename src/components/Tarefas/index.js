import React from 'react'

import { FaEdit, FaWindowClose } from 'react-icons/fa'

import './Tarefas.css'

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
    return (
        <ul className="tarefas">
            {
                tarefas.map((tarefa, index) => (
                    <li key={tarefa}>
                        {tarefa}
                        <span>
                            <FaEdit
                                className="edit"
                                onClick={((e) => handleEdit(e, index))}
                            />

                            <FaWindowClose
                                className="close"
                                onClick={((e) => handleDelete(e, index))}
                            />
                        </span>
                    </li>
                ))
            }
        </ul>

    )
}