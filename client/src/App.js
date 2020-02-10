import React, {useState, useEffect} from 'react';

import './App.css'
import Orders from './components/Orders'

function App() {

  const [status, setStatus] = useState({ editing: false })
  const [orders, setOrders] = useState([])

  const updateOrders = () => {
    fetch('http://localhost:8080/orders')
    .then(res => { res.json() 
      .then( json => setOrders(json) )
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  // load the orders from database on startup
  useEffect(() => { updateOrders() }, [])

  const onClickCreate = () => {
      // toggle display of editing boxes
      setStatus({ ...status, editing: !(status.editing)})
  }

  const handleChange = (e) => {
    // capture textbox entries
    setStatus({...status, [e.target.name]: e.target.value})
  }

  const onClickSave = () => {
    // save order to db
    const order = {name: status.name, date: status.date, order: status.order, email: status.email}
    fetch('http://localhost:8080/orders',{
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => { 
        setStatus({ ...status, editing: !(status.editing)})
        updateOrders()
    })
    .catch(error => { console.log(error)
                      setStatus({ ...status, editing: !(status.editing)})
                      updateOrders()
    })
  }

  const onDelete = (orderId) => {
    // delete an order form the db
    const order = { id: orderId }

    fetch('http://localhost:8080/orders',{
      method: 'DELETE',
      body: JSON.stringify(order),
      headers: {
          "Content-Type": "application/json"
      }
    })
    .then(res => {
        updateOrders()
    })
    .catch(error => { console.log(error)
                      updateOrders()
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Coffee Orders Manager</h1>
        <div style={{display: 'inline'}}>
          {!status.editing ? <button onClick={onClickCreate} >Create</button> : null}
          {!status.editing ? <button>Filters</button> : null}
        </div>
        {status.editing ? <input type="text" placeholder="name" onChange={handleChange} name="name" /> : null}
        {status.editing ? <input type="text" placeholder="date" onChange={handleChange} name="date" /> : null}
        {status.editing ? <input type="text" placeholder="order" onChange={handleChange} name="order" /> : null}
        {status.editing ? <input type="text" placeholder="email" onChange={handleChange} name="email" /> : null}
        {status.editing ? <button onClick={onClickSave} >Save</button> : null}
        {!status.editing ? <Orders orders={orders} onDelete={onDelete} /> : null}
        
      </header>
    </div>
  );
}

export default App;
