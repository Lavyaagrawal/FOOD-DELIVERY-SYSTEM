

import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import parcel_icon from '../../assets/parcel_icon.png'

const Orders = () => {

    const [orders, setOrders] = useState([])

    const url = "https://food-delivery-system-2xcs.onrender.com";

    // ===============================
    // FETCH ALL ORDERS
    // ===============================
    const fetchAllOrders = async () => {
        try {

            const response = await axios.get(
                url + "/api/order/list"
            )

            console.log("Orders:", response.data)

            if (response.data.success) {
                setOrders(response.data.data)
            }

        } catch (error) {
            console.log("Error fetching orders:", error)
        }
    }


    // ===============================
    // UPDATE ORDER STATUS
    // ===============================
    const updateOrderStatus = async (orderId, status) => {

        try {

            const response = await axios.post(
                url + "/api/order/status",
                {
                    orderId: orderId,
                    status: status
                }
            )

            console.log("Status response:", response.data)

            if (response.data.success) {

                // Fetch orders again so UI gets updated
                await fetchAllOrders()

            }

        } catch (error) {

            console.log("Error updating status:", error)

        }

    }


    // ===============================
    // LOAD ORDERS WHEN PAGE OPENS
    // ===============================
    useEffect(() => {

        fetchAllOrders()

    }, [])


    return (
        <div className='orders'>

            <h3>Orders</h3>

            <div className="order-list">

                {orders.map((order, index) => (

                    <div className="order-item" key={order._id || index}>

                        {/* PARCEL IMAGE */}
                        <img
                            src={parcel_icon}
                            alt="parcel"
                            className="order-icon"
                        />


                        {/* ORDER DETAILS */}
                        <div className="order-details">

                            <p className="order-food-items">

                                {order.items.map((item, index) => (

                                    <span key={index}>

                                        {item.name} x {item.quantity}

                                        {index !== order.items.length - 1 && ", "}

                                    </span>

                                ))}

                            </p>


                            {/* CUSTOMER NAME */}
                            <p className="order-address">

                                {order.address.firstName}{" "}
                                {order.address.lastName}

                            </p>


                            {/* STREET */}
                            <p>
                                {order.address.street}
                            </p>


                            {/* CITY / STATE / ZIPCODE */}
                            <p>

                                {order.address.city},{" "}
                                {order.address.state}{" "}
                                {order.address.zipcode}

                            </p>


                            {/* PHONE */}
                            <p>

                                Phone: {order.address.phone}

                            </p>

                        </div>


                        {/* AMOUNT */}
                        <div className="order-amount">

                            <p>
                                ₹{order.amount}
                            </p>

                        </div>


                        {/* PAYMENT */}
                        <div className="order-payment">

                            <p>

                                {order.payment
                                    ? "Paid"
                                    : "Payment Pending"}

                            </p>

                        </div>


                        {/* ORDER STATUS */}
                        <div className="order-status">

                            <select
                                value={order.status || "Food Processing"}
                                onChange={(event) =>
                                    updateOrderStatus(
                                        order._id,
                                        event.target.value
                                    )
                                }
                            >

                                <option value="Food Processing">
                                    Food Processing
                                </option>

                                <option value="Out for Delivery">
                                    Out for Delivery
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                            </select>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default Orders;

