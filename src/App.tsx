/*
 * @Author: qtx
 * @Date: 2021-04-24 00:24:44
 * @LastEditors: qtx
 * @LastEditTime: 2021-04-24 04:20:24
 * @Description:
 */
import React, { useState } from 'react'
import { useMount } from 'react-use'
import logo from './logo.svg'
import './App.css'
import XLSX from './xlsx.core.min.js'
import X from './xlsx'

function App() {
  const [count, setCount] = useState(0)

  useMount(() => {
    var url = '/src/填报模板_v2的副本.xlsx'
    var oReq = new XMLHttpRequest()
    oReq.open('GET', url, true)
    oReq.responseType = 'arraybuffer'

    oReq.onload = function (e) {
      var arraybuffer = oReq.response

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer)
      var arr = new Array()
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i])
      var bstr = arr.join('')

      /* Call XLSX */
      var workbook = XLSX.read(bstr, { type: 'binary', cellStyles: true, cellHTML: true })
      var workbook1 = X.read(bstr, { type: 'binary', cellStyles: true, cellHTML: true })

      console.log(workbook.Sheets)
      console.log(workbook1.Sheets)
      workbook.SheetNames.forEach((name) => {
        workbook.Sheets[name]['!margins'] = workbook1.Sheets[name]['!margins']
      })

      workbook.Sheets['供地计划表']['A5'] = { v: 'test' }

      console.log(workbook.Sheets)
      X.writeFile({ Sheets: workbook.Sheets, SheetNames: workbook.SheetNames }, '111.xlsx', {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary',
      })
    }

    oReq.send()
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
