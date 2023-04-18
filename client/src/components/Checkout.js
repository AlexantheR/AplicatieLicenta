import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch } from 'react-redux'
import { placeOrder } from '../actions/orderActions'

export default function Checkout({ subtotal }) {

  const dispatch = useDispatch()
  function tokenHandler(token) {
    console.log(token)
    dispatch(placeOrder(token, subtotal))
  }

  return (
    <div>

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
