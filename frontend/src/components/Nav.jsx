import axios from 'axios';
import {siteName} from 'config';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from 'utils/APIRoutes';
export default function Nav({ username }){
    const navigate = useNavigate()
    const logout = async () => {
        const id = await JSON.parse(
            localStorage.getItem(process.env.USER_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if(data.status === 200){
            localStorage.clear();
            navigate("/login")
        }
    }


    return (
        <nav className="p-4 md:py-8 xl:px-0 md:container md:mx-w-6xl md:mx-auto">
        <div className="hidden lg:flex lg:justify-between lg:items-center">
            <a href="/" className="flex items-start gap-2 group">
                <div className="bg-blue-600 text-white p-2 rounded-md group-hover:bg-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <p className="text-sm font-light uppercase text-gray-300">
                    Powered by X-Panel
                    <span className="text-base block font-bold tracking-widest">
                    {siteName}
                    </span>
                </p>
            </a>
            <ul className="flex items-center space-x-4 text-sm font-semibold">
                <li><a href="/server/create" className="px-2 xl:px-4 py-2 text-gray-300 rounded-md hover:bg-gray-600">Create Server</a></li>
                <li><a href="/asdf" className="px-2 xl:px-4 py-2 text-gray-300 rounded-md hover:bg-gray-600">Purchase Coins</a></li>
                <li><a href="/account" className="px-2 xl:px-4 py-2 text-gray-300 rounded-md hover:bg-gray-600">Account Settings</a></li>
                <li><a href="/support" className="px-2 xl:px-4 py-2 text-gray-300 rounded-md hover:bg-gray-600">Help Desk</a></li>
            </ul>
            <ul className="flex items-center gap-6">
                <li>
                    <a href="/account" className="text-sm font-sans text-gray-300 font-semibold tracking-wider">
                        {username}
                    </a>
                </li>
                <li>
                    <button onClick={logout}>
                        <div className="p-2 rounded hover:bg-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current text-gray-300"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
        </nav>
    )
}