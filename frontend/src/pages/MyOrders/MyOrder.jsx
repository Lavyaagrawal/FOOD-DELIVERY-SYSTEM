

import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'

const MyOrder = () => {

    const [data, setData] = useState([])

    const { url, token } = useContext(StoreContext)

    // ===============================
    // FETCH ORDERS
    // ===============================
    const fetchOrders = async () => {

        try {

            const response = await axios.post(
                url + "/api/order/userorders",
                {},
                {
                    headers: {
                        token: token
                    }
                }
            )

            console.log("Orders:", response.data)

            if (response.data.success) {
                setData(response.data.data)
            }

        } catch (error) {

            console.log("Error fetching orders:", error)

        }

    }


    // ===============================
    // TRACK ORDER
    // ===============================
    const trackOrder = async () => {

        // Fetch latest data from database
        await fetchOrders()

    }


    // ===============================
    // FETCH ORDERS WHEN PAGE OPENS
    // ===============================
    useEffect(() => {

        if (token) {
            fetchOrders()
        }

    }, [token])


    return (

        <div className='my-orders'>

            <h2>My Orders</h2>

            <div className="container">

                {data.map((order, index) => (

                    <div
                        className="my-orders-order"
                        key={order._id || index}
                    >

                        {/* PARCEL ICON */}
                        <p className='order-icon'>
                            🍔
                        </p>


                        {/* ORDER DETAILS */}
                        <div>

                            <p className='order-items'>

                                {order.items.map((item, index) => (

                                    <span key={index}>

                                        {item.name} x {item.quantity}

                                        {index !== order.items.length - 1 && ", "}

                                    </span>

                                ))}

                            </p>


                            <p>
                                ₹{order.amount}
                            </p>


                            <p>
                                Items: {order.items.length}
                            </p>

                        </div>


                        {/* ORDER STATUS */}
                        <p className='order-status'>

                            <span>●</span>

                            {order.status || "Food Processing"}

                        </p>


                        {/* TRACK ORDER BUTTON */}
                        <button onClick={trackOrder}>
                            Track Order
                        </button>

                    </div>

                ))}

            </div>

        </div>

    )

}

export default MyOrder;

