import React from "react"
import ItemsList from "./ItemsList"

const Content =({items,handleCheck,handleDelete}) => { 
   
  
  return (
    <> 
      {(items.length)?(
        <ItemsList
        items={items}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />

        ):(
          <p style={{margin:'2rem'}}> There is no Task</p>
        )}
        
   
    </>

  )
}

export default Content