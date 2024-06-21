import './App.css'
import PlusIcon from './plus.svg'
import React, { useEffect, useState } from "react";
import Pair from './pair'
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
function App() {
  var searchParams = new URLSearchParams(window.location.search)
  let [pairs,setPairs] = useState(searchParams.has("p") ? JSON.parse(window.atob(searchParams.get("p"))) : [])
  function generateRandomList(type,min,max) {
    var returni = []
    if(type == "number") {
      for (let index = min; index <= max; index++) {
        returni.push(index)
      }
    }
    if(type == "letter") {
      for (let index = letters.indexOf(min); index <= letters.indexOf(max); index++) {
        returni.push(letters[index])
      }
    }
    return returni
  }
  function getRandomInList(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
  function generateCombo() {
    var rs = ''
    pairs.forEach(pair => {
      rs += getRandomInList(generateRandomList(pair[0],pair[1],pair[2]))
    })
    return rs
  }
  function repeatStr(str,num) {
    var nstr = ''
    for (let index = 0; index < num; index++) {
      nstr += str
    }
    return nstr
  }
  var [combo,setCombo] = useState(generateCombo())
  var [ebtn,setEbtn] = useState("Export")
  useEffect(() => {
    setCombo(generateCombo());
  }, [pairs]);
  return (
    <div className="application">
      <p>Random Combo: {combo}</p>
      <div className="btns">
        <button onClick={() => {
        setCombo(repeatStr("_",pairs.length))
        setTimeout(() => {
          setCombo(generateCombo)
        },400)
        
      }}>Generate Combo</button>
      <button onClick={() => {
        navigator.clipboard.writeText(`https://prob.justwhatever.net/?p=${window.btoa(JSON.stringify(pairs))}`);
        setEbtn("Copied")
        setTimeout(() => {
          setEbtn("Export")
        },1500)
        
      }}>{ebtn}</button>
      </div>
      
      <h4>Fragments</h4>
      <div className="pairs">
        {pairs.map((p,index) => (
          <Pair key={index} defaulttype={p[0]} defaultmin={p[1]} defaultmax={p[2]} onUpdate={(type,min,max) => {
            p[0] = type
            p[1] = min
            p[2] = max
          }} remove={() => {
            setPairs(pairs.filter((_, i) => i !== index));
          }}/>
        ))}
        <button style={{background:"none",border:"none",cursor:"pointer"}} onClick={() => {
          setPairs([...pairs, ["number", 0, 9]])
        }}>
          <div className="card" style={{alignItems:"center"}}>
            <img src={PlusIcon} style={{scale:"40%"}}/>
          </div>
        </button>
        
      </div>
    </div>
  );
}

export default App;
