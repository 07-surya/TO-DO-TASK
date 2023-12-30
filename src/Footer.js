import React from 'react'

const Footer = ({length}) => {
    // const Year=new Date()
  return (
    
    <footer> {length} List {length===1?"item":"items"}  </footer>
    // <footer>Copyrights &copy; {Year.getFullYear()}</footer>
  )
}

export default Footer