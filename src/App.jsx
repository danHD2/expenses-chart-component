import logo from '/src/logo.svg'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [days, setDays] = useState('');
  const [selected, setSelected] = useState(null);
  const [hidden, setHidden] = useState(null);

  useEffect(() => {
    fetch(`/data.json`)
      .then(res => {
        return res.json()
      })
        .then(data => {
          setDays(data)
        })
  }, [])

  function handleSelect(day) {
    setSelected(day)
  }
 

  return (
    <>
    <div className="bg-cream min-h-screen grid place-content-center justify-items-center">
      <div className='w-11/12 md:w-96'>
        <div className='bg-softRed rounded-xl flex justify-between p-5'>
          <div className='text-white'>
            <p className='text-sm pb-1'>My balance</p>
            <h2 className='font-semibold text-2xl'>$921.48</h2>
          </div>
        <img src={logo} alt="Logo" className='w-12'/>
        </div>
        <div className='bg-paleOrange rounded-xl mt-4 p-5'>
          <h1 className='font-bold text-2xl text-darkBrown'>Spending - Last 7 days</h1>
          <div className="flex mt-10 justify-between items-end">
          {Array.isArray(days) && days.map((day) => {

            return <div key={day.day}  className='flex flex-col text-center items-center relative'>
              {hidden === day.day &&  <p className='bg-darkBrown rounded-md text-paleOrange text-xs p-2 absolute -top-9'>{`$${day.amount}`}</p>}
            <div onClick={() => handleSelect(day.day)} onMouseEnter={() => setHidden(day.day)} onMouseLeave={()=> setHidden(null)} className={`w-6 md:w-10 rounded-sm hover:opacity-80 hover:cursor-pointer ${selected === day.day ? 'bg-cyan' : 'bg-softRed'}`} style={{height: `${Math.floor(day.amount * 3)}px`}}></div>
            <p className='text-xs pt-3 text-mediumBrown font-semibold'>{day.day}</p>
            </div>
          })}
          </div>
          <div className="w-full border my-5 border-cream"></div>
          <div className='flex justify-between mb-3'>
            <div>
              <p className='text-mediumBrown font-semibold pb-2'>Total this month</p>
              <h2 className='text-3xl font-bold text-darkBrown'>$478.33</h2>
            </div>
            <div className='flex flex-col items-end justify-end'>
              <p className='font-bold text-darkBrown'>+2.4%</p>
              <p className='text-mediumBrown font-semibold'>from last month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default App
