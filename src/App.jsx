
import './App.css'
import { TopNavBar } from './components'
import Layout from './components/Layout'

function App() {
  const copyRight = new Date ().getFullYear ()

  return (
    <div className='h-[100vh] w-full overflow-hidden bg-slate-200 relative'>  
        <TopNavBar />
        <main className="relative overflow-y-auto py-[80px]">
          <Layout />
        </main>
        <div className="absolute p-2 pr-6 pl-6 rounded-3xl text-slate-200 dark:text-slate-700 z-10 bottom-10 right-12 bg-slate-700 dark:bg-slate-200">
          &copy; { copyRight } <span><b>Katundu Inc.</b></span> 
        </div>
    </div>
  )
}

export default App