// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import React, {  useState,useEffect } from 'react'
import AddList from './AddList';
import SearchItem from './SearchItem';
// import { flushSync } from 'react-dom';

function App() {

  const [items,setItems]=useState(
     [])
  //   [
  //   {
  //     id:1,
  //     checked:true, 
  //     item:"playing"
  //   },
  //   {
  //     id:2,
  //     checked:false,
  //     item:"studying"
  //   },
  //   {
  //     id:3,
  //     checked:true,
  //     item:"gaming"
  //   },
  // ]
   
const API_URL='http://localhost:3500/items';
const [newItem, setNewItem]=useState('')
const [search,setSearch]=useState('')
const [fetchError,setFetchError]=useState(null)
const[isLoading,setIsLoading]=useState(true)
useEffect(()=>{
  const FetchItems=async()=>{
    try
  {
    const response= await fetch(API_URL);
    if(!response.ok)throw Error("data not found")    // console.log(response);
    const listItems= await response.json();
    // console.log(listItems);
    setItems(listItems);
    setFetchError(null);  
  }
  catch(err)
  {
    setFetchError(err.message);
  }finally{
    setIsLoading(false)
  }
  }
  setTimeout(()=>{
  (async()=> await FetchItems())
  ()},2000)
  
},[])

const addItem=(item)=>{
  const id=items.length?items[items.length-1].id
  +1:1;
  const addNewItem={id,checked:false,item}
  const listItems=[...items,addNewItem]
  setItems(listItems)
  localStorage.setItem("TODO_List",JSON.stringify(listItems))
 
}   

const handleCheck=(id)=>{
  const listItems=items.map((item)=>

  item.id===id?{...item,checked:!item.checked}:item)   
setItems(listItems)
// localStorage.setItem("TODO_List",JSON.stringify(listItems))
}

const handleDelete=(id)=>{

  const listItems=items.filter((item)=>
  item.id!==id)
setItems(listItems)
// localStorage.setItem("TODO_List",JSON.stringify(listItems))  

}

const handleSubmit=(e)=>
{
  e.preventDefault() 
  if(!newItem) return;
  console.log(newItem);
  addItem(newItem) 
  setNewItem('')
}


  return (
    <div className="App">
      <Header title="TODO LIST"/>
    
      <AddList
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        
       />
      <SearchItem 
          search={search}
          setSearch={setSearch}/>
      <main>
                {isLoading && <p>Loading items...</p>}
                {fetchError && <p>{`error:${fetchError}`}
                </p>}
                {!isLoading && !fetchError && <Content
                  items={items.filter(item=>((item.item).toLowerCase()).includes(search.toLowerCase()))}
                  handleCheck={handleCheck} 
                  handleDelete={handleDelete}
                />}
      </main>
      <Footer
      length={items.length}
      />
      </div>
  );
}
Header.defaultProps={
  title:"TO DO list"
}
export default App;
