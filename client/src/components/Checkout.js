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
    // sendEmail(token)
  }

  // async function sendEmail(token) {
  //   try {
  //     // Create a nodemailer transporter using your SMTP settings
  //     const transporter = nodemailer.createTransport({
  //       host: 'sandbox.smtp.mailtrap.io',
  //       port: 2525,
  //       auth: {
  //         user: "c47e34f6301bab",
  //         pass: "de0f0e2f8d7e4c"
  //       }
  //     });

  //     // Compose the email message
  //     const message = {
  //       from: 'adinu90@gmail.com',
  //       to: token.email,
  //       subject: 'Confirmare comanda',
  //       text: `Comanda a fost plasata! Mai jos puteti vedea detaliile comenzii:\n\n` +
  //         `Total: ${subtotal} RON\n` +
  //         `ID Tranzactie: ${token.id}\n` +
  //         `Addresa: ${token.card.address_line1}, ${token.card.address_city}, ${token.card.address_country}, ${token.card.address_zip}`,
  //     };

  //     // Send the email
  //     await transporter.sendMail(message);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }

  return (
    <div>

      {loading && (<Loading />)}
      {error && (<Error error='Ceva nu a mers bine!' />)}
      {success && (<Success success='Comanda a fost plasata cu succes!' />)}

      <StripeCheckout
        amount={subtotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51MxrSbBLFgjsWwKCbsXG1ISF3luoqebwtbEnUqI4r7t10fFSRmtGKgiTmAhqeBGfP2H7yTrACseB7bimLCTFQ9Fr00ezwARnpD'
        currency='RON'
      >
        <button className='btnPayNow'>
          Plateste
        </button>
      </StripeCheckout>
    </div>
  )
}


