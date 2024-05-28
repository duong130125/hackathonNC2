import React from 'react'
import ListProducts from './components/ListProducts'

export default function App() {
  return (
    <>
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <ListProducts></ListProducts>
    </div>
    </>
  )
}
