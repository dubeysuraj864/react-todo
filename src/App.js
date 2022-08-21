import React,{ useState, useEffect } from "react";
import "./App.css";

function App() {

  const getLocalItem = () => {
      let list = localStorage.getItem("list");
      console.log(list);
      if(list){
        return JSON.parse(list)
      }
      else{
        return [];
      }
  }

  const [text, setText] = useState("");
  const [task, setTask] = useState(getLocalItem());

  const changeText = (e) => {
    setText(e.target.value);
  };
  const submitHandler = (e) => {
    console.log("submitted");
    e.preventDefault();
    setTask([...task, text]);
    setText("")
    
  };

  const removeTask = (a) => {
      const finalData = task.filter((curEle, index) => {
          return index !== a;
      })

      setTask(finalData)
  }

  useEffect(()=>{
      localStorage.setItem("list", JSON.stringify(task));
  },[task])

  return (
    <div className="App">
      <div className="container">
        <header>Todo App </header>
        <div className="top">
          <form onSubmit={submitHandler}>
            <input type="text" value={text} onChange={changeText} />
            <button type="submit">Add</button>
       
          </form>
       

          <div className="msg"></div>
        </div>
        <div className="bottom">
          {
          
            task.map((value,index) => {
                return(
                  <>
               <div className="items">
               <div className="col-title"><li>{value}</li></div>
                <div className="col-button"><button onClick={() => removeTask(index) } >Delete</button></div>
               </div>
                </>
                )
            })
          }
        </div>  
     
      </div>
    </div>
  );
}

export default App;
