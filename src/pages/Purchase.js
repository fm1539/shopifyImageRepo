import React from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'


var CheckoutForm = () => {
  const {price, username} = useParams()
  let obj = {
      price: price,
      username: username
  }

  var handleToken = async (token, addresses) => {
    await axios.post('http://localhost:8000/api/purchase', { obj, token }).then(response=>console.log(response))
    // window.location = '/price='+price
  }

  return (
    <div className="checkout">
             <section>
             <div class="product">
               <img
               className="product-img"
                  src="https://i.imgur.com/EHyR2nP.png"
                  alt="The cover of Stubborn Attachments"
                />
               <div class="description">
                <h3>Image</h3>
                <h5>${price * 100}</h5>
                <StripeCheckout
                  stripeKey="pk_test_51IPVGeE1OhnzAuXAmvR1DDLZqKBvBjGxwZVGO7y8Z7PGGiJdXsScgnYFfVrEgTjSiUQZAFsrKCAlOIylnkNuGyjA009HBZEEJF"
                  token={handleToken}
                  amount={price * 100}
                  name="Image Purchase"
                  billingAddress
                  shippingAddress
                />
              </div>
            </div>
            </section>
    </div>
  );
}

export default CheckoutForm