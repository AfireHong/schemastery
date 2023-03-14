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
        fuo: Schemastery.union(['foo', 'bar', 'qux']),
        fue: Schemastery.union([
          Schemastery.const('foo').description('Foo'),
          Schemastery.const('bar').description('Bar'),
          Schemastery.const('qux').description('Qux'),
        ]),
        bar: Schemastery.string().description('这是一段介绍'),
        ber: Schemastery.string()
          .role('textarea')
          .description('这是一段介绍'),
        bur: Schemastery.string()
          .role('link')
          .description('跳转链接')
      })} />
    </React.StrictMode>,
  )
