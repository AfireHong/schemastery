import React from 'react'
import ReactDOM from 'react-dom/client'

import { Schema } from 'schemastery-react'
import Schemastery from 'schemastery'

ReactDOM
  .createRoot(document.querySelector('#root')!)
  .render(
    <React.StrictMode>
      <Schema model={Schemastery.object({
        foo: Schemastery.number().label('Foo'),
        fuu: Schemastery.number().default(10),
        fuo: Schemastery.union(['foo', 'bar', 'qux']),
        fue: Schemastery.union([
          Schemastery.const('foo').label('Foo').description('这是 Foo'),
          Schemastery.const('bar').label('Bar').description('这是 Bar'),
          Schemastery.const('qux').label('Qux').description('这是 Qux'),
        ]),
        fee: Schemastery.union([
          Schemastery.const('foo').label('Foo').description('这是 Foo'),
          Schemastery.const('bar').label('Bar').description('这是 Bar'),
          Schemastery.const('qux').label('Qux').description('这是 Qux'),
        ]).role('radio'),
        fea: Schemastery.union([
          Schemastery.const('foo').label('Foo').description('这是 Foo'),
          Schemastery.const('bar').label('Bar').description('这是 Bar'),
          Schemastery.const('qux').label('Qux').description('这是 Qux'),
        ]).role('radio-inline'),
        feaNoWrap: Schemastery.union([
          Schemastery.const('foo').label('Foo').description('这是 Foo'),
          Schemastery.const('bar').label('Bar').description('这是 Bar'),
          Schemastery.const('qux').label('Qux').description('这是 Qux'),
        ]).role('radio-inline nowrap'),
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
