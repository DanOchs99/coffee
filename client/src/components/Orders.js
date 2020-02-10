import React from 'react'
import './Orders.css'

function Orders(props) {
    const onClickDelete = (e) => {
        props.onDelete(e.target.id)
    }

    let orderElements = []
    if (props.orders) {
        for (let i=0; i<props.orders.length; i++) {
            orderElements.push(
              <div key={i} className="orderListItem">
                <div>
                  {props.orders[i].name}
                  &nbsp;&nbsp;
                  ({props.orders[i].email})
                  &nbsp;&nbsp;
                  {props.orders[i].date}
                  &nbsp;&nbsp;
                  {props.orders[i].order}
                  &nbsp;&nbsp;
                  <button>EDIT</button>
                  &nbsp;&nbsp;
                  <button onClick={onClickDelete} id={props.orders[i]._id}>DELETE</button>
                </div>
              </div>
            )
        }
    }

    return(
        <div>
            {orderElements}
        </div>
    )
}

export default Orders;
