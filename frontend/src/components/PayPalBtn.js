import { PayPalButton } from "react-paypal-button-v2";
import React from 'react';
import { paypalKey } from '../config'

export default function PPButton(props) {
const { amount, currency, createSubscription, onApprove, catchError,onError, onCancel, price} = props;
return (
<PayPalButton
amount={amount}
currency={currency}
createSubscription={(data, details) => createSubscription(data, details)}
onApprove={(data, details) => onApprove(data, details, price)}
onError={(err) => onError(err)}
catchError={(err) => catchError(err)}
onCancel={(err) => onCancel(err)}
options={{
clientId: paypalKey,
vault:true
}}
style={{
shape: 'rect',
color: 'blue',
layout: 'horizontal',
label: 'subscribe',
}}
/>
);
}