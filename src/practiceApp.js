import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const getLocalList = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [text, setText] = useState("");
  const [task, setTask] = useState(getLocalList());

  const removeTask = (a) => {
    const finalTask = task.filter((curEle, index) => {
      return index !== a;
    });
    setTask(finalTask);
    document.getElementById("msg").innerHTML = `Item deleted`;
  };

  const changeText = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (document.getElementById("input").value === "") {
      document.getElementById("msg").innerHTML = `Please add something..`;
    } else {
      setTask([...task, text]);
      setText("");
      document.getElementById("msg").innerHTML = `Added to list`;
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(task));
  }, [task]);

  return (
    <div className="App">
      <h1>Todo list</h1>
      <div className="container">
        <form onSubmit={onSubmit}>
          <input type="text" id="input" value={text} onChange={changeText} />
          <button type="submit">Add</button>
          <div id="msg"></div>
        </form>
        <div className="items">
          {task.map((value, index) => {
            return (
              <div className="list">
                <div className="title">
                  <li key={index}>{value}</li>
                </div>
                <div className="delete-btn" key={index}>
                  <button onClick={() => removeTask(index)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
