import AvatarA from "../assets/images/avata2.jpeg"
import AvatarB from "../assets/images/avata3.jpeg"
import AvatarC from "../assets/images/avata.png"
import { TableOne } from "../components/tables"
const Timeline = () => {
    return (
        <div className=" p-8">
            <ol className="relative border-l border-gray-400 dark:border-gray-700">                  
                <li className="mb-10 ml-6">            
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img className="rounded-full shadow-lg" src={AvatarA} alt="Bonnie image"/>
                    </span>
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">just now</time>
                        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">Mr John moved your Cargo from Make To Malawi Lilongwe <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Fuso Truck</a> With Weight of <span className="bg-gray-100 text-gray-800 text-xs font-normal mr-2 px-2.5 py-0.5 rounded dark:bg-gray-600 dark:text-gray-300">5000Kg</span></div>
                    </div>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img className="rounded-full shadow-lg" src={AvatarB} alt="Thomas Lean image"/>
                    </span>
                    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                        <div className="items-center justify-between mb-3 sm:flex">
                            <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">2 hours ago</time>
                            <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">John Accepted Your Booking  <a href="#" className="font-semibold text-gray-900 dark:text-white hover:underline">From Zambia To Malawi</a></div>
                        </div>
                        <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">Hi ya'll! I wanted to share a webinar zeroheight is having regarding how to best measure your design system! This is the second session of our new webinar series on #DesignSystems discussions where we'll be speaking about Measurement.</div>
                    </div>
                </li>
                <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <img className="rounded-full shadow-lg" src={AvatarC} alt="Jese Leos image"/>
                    </span>
                    <div className="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
                        <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">1 day ago</time>
                        <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">You Initialed a booking and it has not yet been Assigned <a href="#" className="font-semibold text-blue-600 dark:text-blue-500 hover:underline">Wait for 5mins before you decide to manually Assign</a> Once we find a Carrier we will <span className="font-semibold text-gray-900 dark:text-white">Assign for you!</span></div>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default Timeline
