import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_pk}`);

console.log(stripePromise);

const Payment = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div>
            <h1>Please pay <strong>{data.price}</strong> for <strong>{data.product}</strong></h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm data={data}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;