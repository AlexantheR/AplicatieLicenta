import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'

export default function Checkout({ subtotal }) {

  const orderstate = useSelector((state) => state.placeOrderReducer)
  const { loading, error, success } = orderstate
  const dispatch = useDispatch()
  function tokenHandler(token) {
    console.log(token)
    dispatch(placeOrder(token, subtotal))
  }

  return (
    <div>

      {loading && (<Loading />)}
      {error && (<Error error='Something went wrong' />)}
      {success && (<Success success='Your order was placed successfully' />)}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51MxrSbBLFgjsWwKCRKsXXygticOx7Q961jmSeGXuSGJyM7SlZ3XClkSWn0idUqskONrUw7IqEOC0uz9vs1rCWeCu00152iWCYs'
        currency='RON'
      >
        <button className='btnPayNow'>
          Pay Now
        </button>
      </StripeCheckout>

    </div>
  )
}
