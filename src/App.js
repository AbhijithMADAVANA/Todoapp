import React,{useState , useEffect} from 'react';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit  } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false); 

  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setNewDescription]=useState("");
  const [completeTodos,setCompletedTodos]=useState([]); 
  const [currentEdit,setCurrenntEdit]=useState("");
  const [currentEditedItem,setCurrentEditedItem]=useState("");  
  const handleAddTodo=()=>{
    let  newTodoItem={
      title:newTitle,
      description:newDescription
    }

    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  }

  const handleDeleteTodo=index=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete=(index)=>{
    let now=new Date();
    let dd= now.getDate();
    let mm=now.getMonth()+1;
    let yyyy = now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn = dd + '-' + mm +'-' + yyyy + 'at' +h+':'+m+':'+s;

    let filteredItem ={
      ...allTodos[index],
      completedOn:completedOn

    }
    let updatedCompletedArr =[...completeTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('CompleteTodos',JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompleteTodo =(index)=>{

    let reducedTodo=[...completeTodos];
    reducedTodo.splice(index);
    localStorage.setItem('completeTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'));
    let savedCompleteTodo=JSON.parse(localStorage.getItem('completeTodo'))
    if(savedTodo){
      setTodos(savedTodo);

    }
    if(savedCompleteTodo){
      setCompletedTodos(savedCompleteTodo);
    }
  },[])

  const handleEdit=(ind,item)=>{
    console.log(ind);
    setCurrenntEdit(ind);
    setCurrentEditedItem(item);

  }
  const handleUpdatedTitle=(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }
  const handleUpdatedDescription=(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })


  }

  const handleUpdateTodo=()=>{
    let newTodo=[...allTodos];
    newTodo[currentEdit]=currentEditedItem;
    setTodos(newTodo);
    setCurrenntEdit("");
  }

  return (

    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper' >
        <div className='todo-input' >

          <div className='todo-input-item' >
            <label >Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="whats the task title?"/>
          </div>
          <div className='todo-input-item' >
            <label >Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="whats the task description?"/>
          </div>
          <div className='todo-input-item' >
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>


        </div>
      
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          

          { isCompleteScreen===false && allTodos.map((item,index)=>{
            if (currentEdit===index){
              return(
                <div className='edit__wrapper' key={index}>
                <input placeholder='Updated Title' row={ 4} onChange={(e)=>handleUpdatedTitle(e.target.value)} value={currentEditedItem.title} />
                <textarea placeholder='Updated Description'onChange={(e)=>handleUpdatedDescription(e.target.value)} value={currentEditedItem.description} />
                <button type='button' onClick={handleUpdateTodo} className='primaryBtn'>Update</button>
              </div>
              )
              
            }else{
              return(
              <div className='todo-list-item' key={index}>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=> handleDeleteTodo (index)}/>
                  <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)}/>
                  <AiOutlineEdit className="check-icon" onClick={()=>handleEdit(index,item)} />
                </div>
            
          </div>
            )}
            
          }
          )}

          { isCompleteScreen===true && completeTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompleteTodo(index)}/>
                  
                </div>
            
          </div>
            )
          }
          )}
         
        </div>

      </div>
    </div>
  );
}

export default App;
