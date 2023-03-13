import React from 'react'
import ReactDOM from 'react-dom/client'

import { Schema } from 'schemastery-react'
import Schemastery from 'schemastery'

ReactDOM
  .createRoot(document.querySelector('#root')!)
  .render(
    <React.StrictMode>
      <Schema model={Schemastery.object({
        foo: Schemastery.number(),
        fuu: Schemastery.number().default(10),
        bar: Schemastery.string().description('这是一段介绍'),
        ber: Schemastery.string()
          .role('textarea')
          .description('这是一段介绍')
      })} />
    </React.StrictMode>,
  )
