import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Apprendre React", completed: false },
    { id: 2, text: "Créer une application To-Do List", completed: false },
    { id: 3, text: "Ajouter des animations", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [animationTrigger, setAnimationTrigger] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return alert("Veuillez entrer une tâche !");
    setAnimationTrigger("add");
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
    setTimeout(() => setAnimationTrigger(""), 500); // Réinitialise le déclencheur après l'animation
  };

  const updateTask = (id, newText) => {
    setAnimationTrigger("update");
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)));
    setTimeout(() => setAnimationTrigger(""), 500);
  };

  const deleteTask = (id) => {
    setAnimationTrigger("delete");
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    }, 500); // Retarde la suppression pour permettre l'animation
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className={`container mt-5 animate__animated ${animationTrigger === "" ? "animate__fadeIn" : ""}`}>
      <h1 className="text-center mb-4">Gestionnaire de Tâches</h1>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Ajouter une nouvelle tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-primary animate-btn"
          onClick={addTask}
        >
          Ajouter
        </button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h3 className="text-primary">Tâches en cours</h3>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <div
                key={task.id}
                className={`task-card card mb-3 animate__animated ${
                  animationTrigger === "delete" ? "animate__fadeOut" : ""
                }`}
              >
                <div className="card-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={task.text}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                  />
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success"
                      onClick={() => toggleComplete(task.id)}
                    >
                      Terminer
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-6">
          <h3 className="text-success">Tâches terminées</h3>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <div
                key={task.id}
                className="task-card card mb-3 animate__animated animate__fadeInRight"
              >
                <div className="card-body">
                  <p className="mb-2 text-decoration-line-through">{task.text}</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => toggleComplete(task.id)}
                  >
                    Reprendre
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
