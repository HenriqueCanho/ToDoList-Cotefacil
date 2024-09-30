import React, { useState, useEffect } from "react";

export function ToDoList() {
    // Inicializa o estado com as tarefas salvas no localStorage ou com uma lista padrão se estiver vazio
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [
            { text: "Eat Breakfast", checked: false },
            { text: "Take a shower", checked: false },
            { text: "Walk the dog", checked: false }
        ];
    });
    
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    // Atualiza o localStorage sempre que a lista de tarefas for alterada
    useEffect(() => { // toda vez que a lista muda ele entra em acao
        localStorage.setItem("tasks", JSON.stringify(tasks)); // transforma a lista em texto e armazena
    }, [tasks]);

    function handleInputChange(event) {
        setNewTask(event.target.value); // atualiza a nova tarefa ou o campo de edição
    }

    function addTask() {
        if (newTask.trim() !== "") { // Não deixa que seja adicionada uma tarefa vazia
            if (editingIndex !== null) {  // verifica se o usuário está editando uma tarefa existente
                // Atualiza a tarefa existente
                const updatedTasks = [...tasks]; // cria uma copia do array
                updatedTasks[editingIndex].text = newTask; // Atualiza o texto da tarefa que está sendo editada
                setTasks(updatedTasks); // Atualiza o estado com a lista modificada
                setEditingIndex(null); // Limpa o índice de edição
            } else {
                // Se o índice não for modificado, o usuário está adicionando uma nova tarefa
                setTasks([...tasks, { text: newTask, checked: false }]);
            }
            setNewTask(""); // Limpa o campo de input
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index); // Remove a tarefa correspondente ao índice
        setTasks(updatedTasks); // Atualiza o estado com a nova lista de tarefas
    }

    function markChecked(index) {
        const updatedTasks = [...tasks];
        updatedTasks[index].checked = !updatedTasks[index].checked; // Alterna o status de checada
        setTasks(updatedTasks); // Atualiza o estado
    }

    function editButton(index) {
        setNewTask(tasks[index].text); // Preenche o campo de input com o texto da tarefa para edição
        setEditingIndex(index); // Define o índice da tarefa que está sendo editada
    }

    return (
        <>
            <div className="to-do-list">
                <div className="to-do-list-header">
                    <h1>To Do List</h1>
                    <div>
                        <input type="text" placeholder="Enter a text: " value={newTask} onChange={handleInputChange} />
                        <button className="add-button" onClick={addTask}>
                            {editingIndex !== null ? "Update" : "Add"} {/* Muda o texto do botão para "Update" quando estiver editando */}
                        </button>
                    </div>
                </div>
                <ol>
                    {tasks.map((task, index) => {
                        return (
                            <li key={index}>
                                <span className={`text ${task.checked ? 'checked' : ''}`}>
                                    {task.text}
                                </span>
                                <button className="delete-button" onClick={() => deleteTask(index)}>Delete</button>
                                <button className="check-button" onClick={() => markChecked(index)}>
                                    {task.checked ? "Uncheck" : "Check"} {/* Muda o texto conforme o status */}
                                </button>
                                <button className="edit-button" onClick={() => editButton(index)}>Edit</button>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </>
    );
}