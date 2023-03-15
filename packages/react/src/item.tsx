import './item.scss'

import SCHEMASTERY from 'schemastery'
import React, { useMemo } from 'react'
import { Button } from 'tdesign-react'
import { MoreIcon } from 'tdesign-icons-react'
import { Primitive } from './primitive'
import { Union } from './union'
import { NeedWrapRoles } from './configure'

export interface ItemProps {
  label: string
  disabled?: boolean
  value?: any
  onChange?: (value: any) => void | Promise<void>
  schema: SCHEMASTERY
  className?: string
}

export function Item(props: ItemProps) {
  const {
    schema,
    className
  } = props
  const isPrimitive = useMemo(
    () => ['string', 'number', 'boolean'].includes(schema.type),
    [schema.type]
  )
  const isUnion = useMemo(
    () => schema.type === 'union',
    [schema.type]
  )
  const wrapDefault = useMemo(
    () => NeedWrapRoles.some(role => {
      const roles = schema.meta.role
        ?.split(' ')
        ?.filter(s => s !== ' ' && s !== '')
        ?? []
      if (typeof role === 'string')
        return roles.some(r => r?.startsWith(role))
      else
        return roles.some(r => role.test(r))
    }),
    [schema.meta.role]
  )
  const controller = isPrimitive
    ? <Primitive schema={schema} />
    : isUnion
    ? <Union schema={schema}/>
    : <></>
  return <div className={
    `schemastery-item ${schema.type}`
    + (wrapDefault ? ' wrap' : '')
    + (schema.meta.role ? ` ${schema.meta.role}` : '')
    + (className ? ` ${className}` : '')
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
