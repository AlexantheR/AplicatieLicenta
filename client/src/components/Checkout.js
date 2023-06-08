import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../actions/orderActions'
import Loading from '../components/Loading'
import Success from '../components/Success'
import Error from '../components/Error'
// import nodemailer from 'nodemailer'

export default function Checkout({ subtotal }) {

  const orderstate = useSelector((state) => state.placeOrderReducer)
  const { loading, error, success } = orderstate
  const dispatch = useDispatch()
  function tokenHandler(token) {
    console.log(token)
    dispatch(placeOrder(token, subtotal))
  }


  // `Comanda a fost plasata! Mai jos poti vedea detaliile comenzii:\n\n`+
  //     `Suma: ${subtotal} RON\n` + 
  //     `Id tranzactie: ${token.id}\n` + 
  //     `Adresa: ${token.card.address_line1}, ${token.card.address_city}, ${token.card.address_country}, ${token.card.address_zip}`,
    

  return (
    <div>

      {loading && (<Loading />)}
      {error && (<Error error='Ceva nu a mers bine!' />)}
      {success && (<Success success='Comanda a fost plasata cu succes!' />)}

        <StripeCheckout
          amount={subtotal * 100}
          shippingAddress
          token={tokenHandler}
          stripeKey='pk_test_51MxrSbBLFgjsWwKCRKsXXygticOx7Q961jmSeGXuSGJyM7SlZ3XClkSWn0idUqskONrUw7IqEOC0uz9vs1rCWeCu00152iWCYs'
          currency='RON'
        >
          <button className='btnPayNow'>
            Plateste
          </button>
        </StripeCheckout>
    </div>
  )
}


