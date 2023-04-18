import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default function Checkout({ subtotal }) {

  function tokenHandler(token) {
    console.log(token)
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
