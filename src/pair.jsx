import { useRef, useState } from "react"
import Slider from 'multi-range-slider-react'
import './card.css'
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export default function Pair(params) {
  var [min,setMin] = useState(params.defaultmin ? params.defaultmin : 0)
  var [type,setType] = useState(params.defaulttype ? params.defaulttype : "number")
  var [max,setMax] = useState(params.defaultmax ? params.defaultmax : 9)
  return (
    <div className="card">
        <select defaultValue={type} onChange={(e) => {
          setType(e.target.value)
          params.onUpdate(e.target.value,min,max)
        }}>
          <option value="number">Number</option>
          <option value="letter">Letter</option>
        </select>
        {type == "number" ? (
          <Slider id='number' minValue={params.defaultmin ? params.defaultmin : 0} maxValue={params.defaultmax ? params.defaultmax : 9} label="none" ruler="none" style={{border:"none",boxShadow:"none",padding:"none",width:'150px'}} step="1" min="0" onInput={(e) => {
            setMin(e.minValue)
            setMax(e.maxValue)
            params.onUpdate(type,e.minValue,e.maxValue)
          }} max="9" barLeftColor="#ccccac" barInnerColor="#337aff" barRightColor="#ccccac"  />
        ) : (
          <>
            <Slider id="letter" min="0" max="25" label="none" ruler="none" style={{border:"none",boxShadow:"none",padding:"none",width:'150px'}} step="1" minValue="0" onInput={(e) => {
              setMin(letters[e.minValue])
              setMax(letters[e.maxValue])
              params.onUpdate(type,letters[e.minValue],letters[e.maxValue])
            }} maxValue="3" barLeftColor="#ccccac" barInnerColor="#337aff" barRightColor="#ccccac"  />
          </>
        )}
        <p>Selected range: {min} - {max}</p>
        {/* <button onClick={() => {
          params.remove()
        }}>Remove</button> */}
    </div>
  ) 
}