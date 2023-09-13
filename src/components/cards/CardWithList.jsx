
const Trip = ( { data } ) => {
    return (
        <li className="py-3 sm:py-4 line">
            <div className="top flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="icon mr-2">
                        </div>
                        <strong>
                            12:00
                        </strong>
                    </div>
                    <div className="text-slate-600 mx-3">Makeni Simson</div>
                </div>
                <div className="flex items-center">
                    <div className="icon2 mr-2 text-xl text-slate-600 font-bold">
                        <span className="material-symbols-outlined">
                            local_shipping
                        </span>
                    </div>
                    <strong className="text-slate-600">
                        BMW
                    </strong>
                </div>
            </div>
            <div className="bottom flex items-center mt-2 justify-between">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="icon mr-2"></div>
                        <strong>
                            12:00
                        </strong>
                    </div>
                    <div className="text-slate-600 mx-3">Makeni Simson</div>
                </div>
                <div className="flex items-center">
                    <div className="icon2 mr-2 text-xl text-slate-600 font-bold">
                        
                        <span className="material-symbols-outlined">
                            local_shipping
                        </span>
                    </div>
                    <strong className="text-slate-600">
                        BMW
                    </strong>
                </div>
            </div>
        </li>
    )
}

const Expense = ( { data } ) => {
    return (
        <li className="py-3 sm:py-4">
            <div className="top flex items-center justify-between">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="icon mr-2"></div>
                        <strong>
                            <span className="material-symbols-outlined">
                                scrollable_header
                            </span>
                        </strong>
                    </div>
                    <div className="text-slate-600 mx-3"> Bought Fuel </div>
                </div>
                <div className="flex items-center">
                    <div className="icon2 mr-2 text-xl text-slate-600 font-bold">K</div>
                    <strong className="text-slate-600">
                        300,000.00
                    </strong>
                </div>
            </div>
        </li>
    )
}
const CardWithList = ({ data, Icon, title, listType }) => {
    let Content 

    switch ( listType ) {
        case "trip":
            Content = <Trip data />
            break
    
        case "expense":
            Content = <Expense data />
            break

        default:
            break
    }

    return (
        
        <div className="w-[100%] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> { title } </h5>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    View all
                </a>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    { Content }
                                        
                    {/* <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex flex-start items-center space-x-1">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src={Avatar} alt="Thomas image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Thomes Lean
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $2367
                            </div>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>

    )
}

export default CardWithList
