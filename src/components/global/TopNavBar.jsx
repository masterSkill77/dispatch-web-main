import { Link, useNavigate } from "react-router-dom"
import Avatar from "../../assets/images/avata.png"
const TopNavBar = () => {
    const navigate = useNavigate()
    return (
        
        <nav className="border-red-700 dark:bg-gray-900 fixed left-0 top-0 right-0 z-50 bg-red-600">
            <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center justify-between">
                        <button onClick={() => navigate ("/app/book-now")} type="button" className="text-white bg-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">Book Now</button>
                        <button onClick={() => navigate ("/app/book-now")} type="button" className="text-white bg-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">Book Later</button>
                    </div>
                <button className="flex items-center">

                    <Link to="https://katundu.africa/">
                        <img src="/logo.jpeg" className="h-8 mr-3" alt="Katundu Logo" />
                    </Link>
                    <Link to="/app">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Katundu Inc</span>
                    </Link>
                </button>
                <div className="flex items-center md:order-2 gap-5">
                    <button type="button" className="flex mr-3 text-sm w-10 h-10 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        
                    </button>
                    <button type="button" className="flex mr-3 text-sm w-10 h-10 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        
                    </button>
                    <button type="button" className="flex mr-3 text-sm w-10 h-10 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        
                    </button>
                    <button type="button" className="flex mr-3 text-sm w-10 h-10 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        
                    </button>
                    <button type="button" className="flex mr-3 text-sm w-10 h-10 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                        
                    </button>
                    <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user_bottom" aria-expanded="false" data-dropdown-toggle="dropdown" data-dropdown-placement="bottom">
                        <span className="sr-only">Open user menu</span>
                        <img className="w-10 h-10 rounded-full object-cover" src={Avatar} alt="user photo" />
                    </button>
                    {/* <!-- Dropdown menu --> */}
                    <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
                        <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user_bottom">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                
            </div>
        </nav>

    )
}

export default TopNavBar
