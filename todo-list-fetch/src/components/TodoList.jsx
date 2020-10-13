import React from "react";
import { useEffect, useState } from "react";
import "../styles/TodoList.css";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [previewList, setPreviewList] = useState([]);

  const addToTaskList = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/joavv",
      {
        method: "PUT",
        body: JSON.stringify(previewList),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.log(error);
    });
    let data = await response.json();
    console.log(data);
    updateTaskList(data);
  };

  const updateTaskList = (data) => {
    let dataArray = Array.from(data);
    setTaskList(dataArray);
    console.log(taskList);
    setPreviewList(taskList);
    console.log(previewList);
  };

  const addTask = (event) => {
    event.preventDefault();
    setPreviewList(previewList.push({ label: task, done: false }));
    console.log(previewList);
    addToTaskList("https://assets.breatheco.de/apis/fake/todos/user/joavv");
    setTask("");
  };

  const delTask = (index) => {
    console.log(index);
    console.log(previewList[index]);
    setPreviewList(previewList.splice(index, 1));
    console.log(previewList);
    setTask("");
    addToTaskList("https://assets.breatheco.de/apis/fake/todos/user/joavv");
  };

  const delAll = () => {
    setPreviewList((previewList.length = 0));
    console.log(previewList);
    setTask("");
    addToTaskList("https://assets.breatheco.de/apis/fake/todos/user/joavv");
  };

  useEffect(() => {
    const fetchTaskList = async () => {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/joavv"
      ).catch((error) => {
        console.log(error);
      });
      console.log(response.ok);
      console.log(response.status);
      // console.log(response.text());
      let data = await response.json();
      console.log(data);
      updateTaskList(data);
    };

    fetchTaskList();
  }, [taskList.length]);

  return (
    <div className="container">
      <h1 className="todo-title text-center font-weight-light">todos</h1>
      <div className="list-group w-50 m-auto shadow">
        <form onSubmit={addTask}>
          <input
            id="submit"
            type="text"
            className="list-group-item w-100"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
        {taskList.map((task, index) => (
          <li className="list-group-item" key={index}>
            <div className="listed w-100 float-left">
              <label>{task.label}</label>
            </div>
            <button
              className="delete close"
              onClick={() => delTask(index)}
            ></button>
          </li>
        ))}
        <footer className="footer pl-2">
          <p className="pt-2">
            {taskList.length !== 1
              ? taskList.length + " items "
              : taskList.length + " item "}
            left
          </p>
        </footer>
      </div>
      <div className="text-center">
        <button className="btn btn-danger m-5" type="button" onClick={delAll}>
          Borrar Todo
        </button>
      </div>
    </div>
  );
};

export default TodoList;
