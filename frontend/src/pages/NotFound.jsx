import {siteName } from '../config';
import React, { useEffect } from "react";
import PageNotFound from 'assets/404.jpg';
export default function NotFound(){
  useEffect(()=>{
    document.title = siteName+ " - 404"
})
    return (
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="py-12">
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div class="p-6 bg-white border-b border-white">
                <div class="max-w-md w-full space-y-8">
                  <div>
                    <img src={PageNotFound} alt="not found"/>
                    <p class="my-2 text-center text-lg text-gray-900">
                    The page you are trying to reach does not exist or has been removed. 
                  </p>
                  <p className="my-2 text-center text-lg text-gray-900">Please contact support if you believe this is an issue.</p>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}