import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className='h-[100vh] w-[100vw] text-red-400'>
            <div className="h-[50%] bg-red-400 relative flex justify-center items-center">
                <h1 className="text-8xl text-white font-extrabold">
                    404
                </h1>
               <div className="w-[80%] h-[70%] absolute bg-white rounded-lg left-[10%] bottom-[-60%]">
                    <div className="h-full w-full relative bg-slate-50 rounded-lg">
                        <Link to="/" className="bg-red-500 text-slate-50 p-3 rounded-lg text-xl absolute bottom-3 left-3">
                            Back Home
                        </Link>
                    </div>
               </div>
            </div>
        </div>
    )
}

export default PageNotFound
