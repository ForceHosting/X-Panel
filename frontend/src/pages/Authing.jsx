import { getUserDataRoute } from "utils/APIRoutes";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Authing() {
  const navigate = useNavigate();

  useEffect(() => {
    (async function() {

      

      const res = await fetch(`${getUserDataRoute}`);
      console.log(res.json())
      const data = await res.json();
      if(data.status === true){
        localStorage.setItem(process.env.XPANEL_LOCAL_KEY, JSON.stringify(data.user));
        console.log(data)
      }
})();
}, [navigate]);

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-white">
                <div className="max-w-md w-full space-y-8">
                  <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Please wait while we authenticate your account.
                    </h2>
                    <p className="my-2 text-center text-xs font-extrabold text-gray-900">
                      This should only take a few seconds.
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
  );
}

export default Authing;
