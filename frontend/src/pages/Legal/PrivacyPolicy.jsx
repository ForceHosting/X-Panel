import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { siteName } from "config";

export default function PrivacyPolicy() {

    useEffect(()=>{
        document.title = siteName+ " - Privacy Policy"
    })
    return (
        <>
        <div className="text-center">
        <h3 className="text-2xl text-white font-bold">Privacy Policy</h3>
        <p className="text-white">What data do we collect from you using our services and website?</p>
        <p className="text-white">While using our services, we collect the following information</p>
        <ul className="text-white text-sm">
            <li>Your email address</li>
            <li>Your username</li>
            <li>Your IP address upon last signin</li>
        </ul>
        <h3 className="text-2xl text-white font-bold">How do we use your information?</h3>
        <p className="text-white">We use your information to prevent fraudulent purchases, manage your account, and to provided better services to our customers.</p>
        <h3 className="text-2xl text-white font-bold">Where is the customer data stored?</h3>
        <p className="text-white">Your data is stored in a highly secured database, only accessible by our senior developers.</p>
        <h3 className="text-2xl text-white font-bold">User Rights.</h3>
        <p className="text-white">At any point in time you can do these things.</p>
        <ul className="text-white text-sm">
            <li>Withdraw your data from our database</li>
            <li>Request a copy of your data</li>
        </ul>
        <h3 className="text-2xl text-white font-bold">How do we secure your data?</h3>
        <p className="text-white">Your data is stored by us in a very secure database only accessible by senior developers.</p>
        <h3 className="text-2xl text-white font-bold">CPPA</h3>
        <p className="text-white">The CPPA is designed to protect any United States Citizens data, you have the right to visit our legal agreements anonymously without any information being collected.</p>
        <h3 className="text-2xl text-white font-bold mt-4">Terms of Service</h3>
        <p className="text-white">To view our Terms of Service click <Link className="text-blue-400" to="/legal/tos">here</Link></p>
        </div>
        </>
    )
}