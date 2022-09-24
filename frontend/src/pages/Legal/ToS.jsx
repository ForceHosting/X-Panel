import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { siteName } from "config";

export default function ToS() {

    useEffect(()=>{
        document.title = siteName+ " - ToS"
    })
    return (
        <>
        <div className="text-center">
            <h3 className="text-2xl text-white font-bold">Terms Of Service</h3>
            <p className="text-white">Our Terms of Service is a legal agreement made between you, whether personally, or on behalf of an entity and Force Host or Force Hosting {"(we, us, or our)"}. By creating an account and logging in, you have read, understood, and agreed to be bound by all of the terms listed. If you don't agree with our terms, you are <b className="text-red-800">PROHIBITED</b> from creating an account or logging in.</p>
            <h3 className="text-2xl text-white font-bold">Property Rights</h3>
            <p className="text-white">Unless otherwise indicated, the site is our property. All source code, databases, functionality, software, web designs, text, photographs, graphics, trademakrs, service marks, and logos are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
            <h3 className="text-2xl text-white font-bold">User Agreements</h3>
            <p className="text-white">By using our site, you agree that</p>
            <ul className="list-decimal text-white text-sm">
                <li>All registration information you submit will be true, accurate, current and finished.</li>
                <li>You will maintain the accuracy of said information and promptly update such registration information as necessary.</li>
                <li>You are not under the age of 13 years old.</li>
                <li>You will not access the site through automated or non-human means, whether a bot, script, or anything else.<sup>1</sup></li>
                <li>You will not be using the site for any illegal or unauthorized purposes.</li>
                <li>You will not use the site to break any laws within the country and or state you reside in.</li>
                <li>By using the site, you agree that we can change your username, ban you, deny services, reclaim services, and withhold account information at our liking.</li>
                <li>When purchasing an item or product from us, you agree that there is a 7 day period for a full refund and we have the choice to pursue with the action or not.</li>
            </ul>
            <h3 className="text-2xl text-white font-bold">Prohibited Activities</h3>
            <ul className="list-decimal text-white text-sm">
                <li>Take data or other content from the site to create / compile, directly or indirectly, a collection, complication, database, or directory without written permission from us.</li>
                <li>Trick, defruad, or mislead us and other users, stricly in any attempt to lear sensitive account information such as passwords.</li>
                <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any parties uninterrupted use and enjoyment of the site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the site.</li>
                <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering or extraction tools.</li>
                <li>Attempt to impersonate another user or person.</li>
                <li>Harass, annoy, intimidate, or threaten any staff members or agents engaged in providing any portion of the site to you.</li>
                <li>Overuse of resources such as CPU, Memory, Disk.</li>
                <li>Abuse exploits instead of reporting them.</li>
                <li>Unofficial apps, bots, and sites are against our ToS. If you're caught owning one or using one, you will be banned from our services, without warning.</li>
            </ul>
            <h3 className="text-2xl text-white font-bold">Terms and Termination</h3>
            <p className="text-white">These Terms Of Service shall stay in full force and effect while you use the site. Without limiting any other provision of these terms, we reserve the right to, in our sole discretion and without notice or liability, deny access to access the site, to any person for any reason or for no reason, including without limitation for breach of any representation, warranty, or covenant contained in these terms or any applicable law or regulation. We may terminate your use or participation in the site or delete your account and content or information at any time. If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be actinv on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>
            <h3 className="text-2xl text-white font-bold">Modifications and Interruptions</h3>
            <p className="text-white">We reserve the right to change, modify, or remove contents of the site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our site. We also reserve the right to modify or discontinue all or part of the site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the site. We cannot guarantee the site will be available at all times. We may experience hardware, software, or other problems or need to preform maintenance related to the site, resulting in interruptions, delays, or errors.</p>
            <h3 className="text-2xl text-white font-bold">Privacy Policy</h3>
            <p className="text-white">To view our Privacy Policy click <Link className="text-blue-400" to="/legal/privacy">here</Link></p>
            <div className="mt-4">
                <p className="text-md text-white"><sup>1</sup>Scripts, bots, and non-human means created and provided by us are allowed.</p>
            </div>
        </div>
        </>
    )
}