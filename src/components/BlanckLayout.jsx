import { Outlet } from "react-router-dom"

const BlanckLayout = () => {
    return (
        <div className="w-full h-full">
            <h1 className="font-semibold text-8xl flex justify-center items-center h-[100vh] w-[100vw] text-sky-700 animate-pulse">Hello</h1>
            <Outlet />
        </div>
    )
}

export default BlanckLayout
