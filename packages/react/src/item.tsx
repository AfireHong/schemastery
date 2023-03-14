import './item.scss'

import SCHEMASTERY from 'schemastery'
import React, { useMemo } from 'react'
import { Button } from 'tdesign-react'
import { MoreIcon } from 'tdesign-icons-react'
import { Primitive } from './primitive'
import { Union } from './union'

export interface ItemProps {
  label: string
  disabled?: boolean
  value?: any
  onChange?: (value: any) => void | Promise<void>
  schema: SCHEMASTERY
}

export function Item(props: ItemProps) {
  const {
    schema,
  } = props
  const isPrimitive = useMemo(
    () => ['string', 'number', 'boolean'].includes(schema.type),
    [schema.type]
  )
  const isUnion = useMemo(
    () => schema.type === 'union',
    [schema.type]
  )
  const shouldWrap = useMemo(
    () => ['textarea'].includes(schema.meta.role),
    [schema.meta.role]
  )
  const controller = isPrimitive
    ? <Primitive schema={schema} />
    : isUnion
    ? <Union schema={schema}/>
    : <></>
  return <div className={
    'schemastery-item' + (shouldWrap ? ' wrap' : '')
  }>
    <div className='schemastery-item__more'>
      <Button
        shape='square'
        variant='text'
        icon={<MoreIcon/>}
      />
    </div>
    <div className='schemastery-item__label'>
      {props.label}
      {schema.meta.description && <div className='schemastery-item__label-description'>
        {schema.meta.description}
      </div>}
    </div>
    <div className='schemastery-item__control'>
      {React.cloneElement(controller, {
        defaultValue: schema.meta.default,
        disabled: props.disabled ?? false,
      })}
    </div>
  </div>
}
