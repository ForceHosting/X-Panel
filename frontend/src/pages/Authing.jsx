import { getUserDataRoute } from "utils/APIRoutes";
import axios from "axios";

export default function Authing(){

    axios.get(getUserDataRoute).then(res=>{
        console.log("res" + res.data.login)
        if(res.data.login) {
            console.log(res.data)
        }
      }).catch((err)=>{
        console.log(err);
      })


    return (
        <h1>Please wait. We are authenticating you.</h1>
    )
}