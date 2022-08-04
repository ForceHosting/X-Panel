import {siteName } from '../config';
import React, { useEffect } from "react";
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
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      404
                    </h2>
                    <p class="my-2 text-center text-xs font-extrabold text-gray-900">
                    Uh Oh! The page you requested seems to not be found! Contact support if you think this is an issue.
                  </p>
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