import FilterComponent from "../filter/Filter"

const SideBar = () => {
    return (
        <>
            <div className="w-[40px]">
                <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
            </div>
            <aside id="cta-button-sidebar" className="fixed top-[80px] left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" style={{width : "30rem"}}>
                <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <div className="bg-red-700 flex py-2 m-0 text-white">
                        <span className="py-2 w-[10%]">Jobs</span>
                        <div className="flex ml-4 w-[50%] gap-1">
                            <button  type="button" className="inline-flex items-center py-2 px-6  text-sm rounded-lg bg-red-500 ">
                                    From date
                            </button>
                            <button  type="button" className="inline-flex items-center py-2 px-6  text-sm rounded-lg bg-red-500 ">
                                To date
                            </button>
                        </div>
                        <div className="flex w-[40%] justify-end px-2 gap-2" style={{textAlign : 'right'}}>
                            <button  type="button" className="inline-flex items-center py-2 px-6  text-sm rounded-lg bg-red-500 ">
                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            </button>
                            <button  type="button" className="inline-flex items-center py-2 px-6  text-sm rounded-lg bg-red-500 ">
                            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                    <FilterComponent />
                </div>

            </aside>
        </>
    )
}

export default SideBar
