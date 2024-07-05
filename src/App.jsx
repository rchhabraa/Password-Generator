import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [pw, setpw] = useState("")
  const pwref=useRef(null)

  const generator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if(character) str+="[]{}\|/?.><,"
    for (let i = 1; i <= length; i++) {
      pass+= str.charAt(Math.floor(Math.random()* str.length+1))
      
    }
    setpw(pass)
  },[length,character,number,setpw])

  const copytoclipboard=useCallback(()=>{
    pwref.current?.select()
    window.navigator.clipboard.writeText(pw)
  },[pw])

  useEffect(()=>{generator()},[length,number,character,generator])

  return (
    <>
     
     <div className='w-full max-w-md rounded-lg shadow-md py-2 px-2 my-8 mx-auto text-orange-600 bg-black'>
     <h1 className='text-4xl text-center mb-5 text-white '>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
        value={pw}
        className='py-2 px-2 outline-none  w-full '
        placeholder='Password'
        readOnly
        ref={pwref}
        />
        <button className='bg-blue-600 text-white px-3 py-0.5 shrink-0 outline-none' onClick={copytoclipboard}>Copy</button>

      </div>
      <div className='flex'>
        <input type="range"
        min={1}
        max={50}
        value={length}
        onChange={(e)=>{setlength(e.target.value)}} />
        <label className='px-2' >Length({length})</label>
        <input type="checkbox" 
        defaultChecked={number}
        onChange={()=>{setnumber(prev => !prev)}}/>
        <label className='px-2' >Numbers</label>
        <input type="checkbox"
        defaultChecked={character}
        onChange={()=>{setcharacter(prev => !prev)}} />
        <label className='px-2' >Characters</label>
      </div>
     </div>
    </>
  )
}

export default App
