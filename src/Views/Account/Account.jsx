

const Account = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="h-[max-content]">
                <div className="w-[100%] min-h-[200px] bg-slate-50 relative rounded-md">
                    <div className="img-holder w-[200px] h-[200px] rounded-full bg-slate-700 absolute bottom-[-51px] left-10 z-3">

                    </div>
                </div>
                
                <div className="min-h-[200px] mt-[70px] rounded-md">
                    <div className="grid grid-cols-4 gap-2 mt-[40px]">
                        <div className="h-[100px] rounded-md bg-slate-50 dark:bg-slate-700"></div>
                        <div className="h-[100px] rounded-md bg-slate-50 dark:bg-slate-700"></div>
                        <div className="h-[100px] rounded-md bg-slate-50 dark:bg-slate-700"></div>
                        <div className="h-[100px] rounded-md bg-slate-50 dark:bg-slate-700"></div>
                    </div>
                    <div className="mt-[20px] bg-slate-50 dark:bg-slate-700">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account
