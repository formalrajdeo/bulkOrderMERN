import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'
import axios from 'axios'
import './App.css'

const options1 = [5, 10, 15]

const App = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [orderStatus, setOrderStatus] = useState(false)
  const [orders, setOrders] = useState([])
  const [bulkProducts, setBulkProducts] = useState([])
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState('')

  useEffect(() => {
    async function callMe() {
      await axios({ method: 'GET', url: `http://localhost:5000/api/user` })
        .then((res) => {
          setUsers(res.data.results)
        })
        .catch((err) => {
          toast(err)
          toast(err)
        })

      await axios({
        method: 'GET',
        url: `http://localhost:5000/api/product`,
      })
        .then((res) => {
          setProducts(res.data.results)
        })
        .catch((err) => {
          toast(err)
        })

      await axios({
        method: 'GET',
        url: `http://localhost:5000/api/order`,
      })
        .then((res) => {
          setOrders(res.data.results)
        })
        .catch((err) => {
          toast(err)
        })
    }
    callMe()
  }, [])

  useEffect(() => {
    async function callMe() {
      await axios({
        method: 'GET',
        url: `http://localhost:5000/api/order`,
      })
        .then((res) => {
          setOrders(res.data.results)
        })
        .catch((err) => {
          toast(err)
        })
    }
    callMe()
  }, [orderStatus])
  const submitHandler = async (e) => {
    e.preventDefault()
    if (selectedUser !== '') {
      let data = {}
      if (productId == '') {
        bulkProducts.map((d, i) => {
          data = {
            products: d.data,
            users: selectedUser,
          }
          axiosOrderCall(data)
        })
      } else {
        data = {
          products: productId,
          users: selectedUser,
        }
        axiosOrderCall(data)
      }
    } else {
      toast('Please fill or select fields')
    }
  }
  async function axiosOrderCall(data) {
    await axios({
      method: 'POST',
      url: `http://localhost:5000/api/order`,
      data,
    })
      .then((res) => {
        if (res.data.success) {
          toast('Success')
          setOrderStatus(!orderStatus)
        } else return toast('Failed to POST Order')
      })
      .catch((err) => {
        toast(err)
      })
  }
  const orderStatusHandler = async (value, id) => {
    await axios({
      method: 'PUT',
      url: `http://localhost:5000/api/order/${id}`,
      data: {
        status: value,
      },
    })
      .then((res) => {
        if (res.data.success) return setOrderStatus(!orderStatus)
        else return toast('Failed to Update Order')
      })
      .catch((err) => {
        toast(err)
      })
  }

  const bulkHandler = (value) => {
    setBulkProducts([])
    setProductId('')
    return products.map((d, i) => {
      if (i < value)
        return setBulkProducts((prevState) => [...prevState, { data: d._id }])
    })
  }
  const singleProductHandler = (value) => {
    setBulkProducts([])
    setProductId(value)
  }
  const deleteOrder = async (id) => {
    await axios({
      method: 'DELETE',
      url: `http://localhost:5000/api/order/${id}`,
    })
      .then((res) => {
        if (res.data.success) return setOrderStatus(!orderStatus)
        else return toast('Failed to Delete Order')
      })
      .catch((err) => {
        toast(err)
      })
  }
  console.log('h1', bulkProducts)
  return (
    <>
      <Container>
        <ToastContainer />
        <FormBox>
          <Box>
            <FormOrder>
              <Input
                value={productId}
                onChange={(e) => singleProductHandler(e.target.value)}
              />
              <select
                name='product'
                id='product'
                onChange={(e) => singleProductHandler(e.target.value)}
              >
                <option value='none'>Select Product</option>
                {products.map((d, i) => {
                  return (
                    <option key={i} value={d._id}>
                      {d.title}
                    </option>
                  )
                })}
              </select>
            </FormOrder>

            <FormOrder>
              <label>Bulk Products</label>
              <select
                name='bulkProduct'
                id='bulkProduct'
                onChange={(e) => bulkHandler(e.target.value)}
              >
                <option value='none'>Select Products</option>
                {options1.map((d, i) => {
                  return (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  )
                })}
              </select>
            </FormOrder>

            <FormOrder>
              <label>Users</label>
              <select
                name='users'
                id='user'
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value='none'>Select User</option>
                {users.map((d, i) => {
                  return (
                    <option key={i} value={d._id}>
                      {d.username}
                    </option>
                  )
                })}
              </select>
            </FormOrder>
          </Box>
          <Button onClick={(e) => submitHandler(e)}>Submit</Button>
        </FormBox>
        <Section>
          <div>Pending Orders</div>
          {orders && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Users</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((d, i) => {
                    if (!d.status) {
                      return (
                        <tr key={i}>
                          <td>{d._id}</td>
                          <td>{d.products[0].title}</td>
                          <td>{d.users[0].username}</td>
                          <td>
                            <select
                              name='status'
                              id='status'
                              onChange={(e) =>
                                orderStatusHandler(!d.status, d._id)
                              }
                            >
                              <option value={d.status}>
                                {d.status ? 'Alloted' : 'Pending'}
                              </option>
                              <option value={!d.status}>
                                {!d.status ? 'Alloted' : 'Pending'}
                              </option>
                            </select>
                          </td>
                          <td>
                            <button onClick={() => deleteOrder(d._id)}>
                              delete
                            </button>
                          </td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
            </>
          )}
        </Section>
        <Section>
          <div>Alloted Orders</div>
          {orders && (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Products</th>
                    <th>Users</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((d, i) => {
                    if (d.status) {
                      return (
                        <tr key={i}>
                          <td>{d._id}</td>
                          <td>{d.products[0].title}</td>
                          <td>{d.users[0].username}</td>
                          <td>
                            <select
                              name='status'
                              id='status'
                              onChange={(e) =>
                                orderStatusHandler(!d.status, d._id)
                              }
                            >
                              <option value={d.status}>
                                {d.status ? 'Alloted' : 'Pending'}
                              </option>
                              <option value={!d.status}>
                                {!d.status ? 'Alloted' : 'Pending'}
                              </option>
                            </select>
                          </td>
                          <td>
                            <button onClick={() => deleteOrder(d._id)}>
                              delete
                            </button>
                          </td>
                        </tr>
                      )
                    }
                  })}
                </tbody>
              </table>
            </>
          )}
        </Section>
      </Container>
    </>
  )
}

const Input = styled.input.attrs({ type: 'text', placeholder: 'Product ID' })`
  margin: auto;
  padding: 0 0.5rem;
  margin-bottom: 0;
  text-transform: uppercase;
  min-width: 15rem;
  border-radius: 5px;
  height: 35px;
  border-color: transparent;
  transition: 0.15s;
  border: 1px solid black;
  text-align: center;
`
const Button = styled.button`
  padding: 1.5rem;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: cyan;
  align-items: center;
  height: 30px;
  width: 100%;
  border: none;
  /* border-radius: 28px; */
  border-radius: 0.4rem;
  box-shadow: inset 0 0 0 1px rgb(0 0 0/ 60%),
    inset 0 0 0 2px rgba(0 0 0 /0%) inset 0 0 0 1px rgb(0 0 0/0%);
  vertical-align: middle;
  z-index: 0;
  transition: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: blue;
    color: rgba(0, 0, 0, 0.75);
  }
`

const FormBox = styled('div')`
  height: 25rem;
  width: clamp(20rem, 100%, 40rem);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const FormOrder = styled('div')`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`

const Box = styled('div')`
  min-height: 20rem;
  width: 25rem;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Section = styled('div')`
  min-height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Container = styled('div')`
  min-height: 100vh;
  background-color: orange;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
`
export default App
