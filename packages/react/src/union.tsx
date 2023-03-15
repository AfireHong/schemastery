import './union.scss'

import Schemastery from 'schemastery'
import { useMemo } from 'react'
import { Select, RadioGroup } from 'tdesign-react/esm'
import { ControllerProps } from './controller'
import { NeedWrapRoles } from './configure'

NeedWrapRoles.push('radio-inline')

export interface UnionProps extends ControllerProps {
}

export interface Option {
  label: string
  title: string
  value: any
}

function resolveSchemaList(schemas: Schemastery[]): Option[] {
  return schemas.map(schema => ({
    label: schema.meta.label || schema.meta.description || schema.value,
    title: schema.meta.description,
    value: schema.value,
  }))
}

export function Union({
  schema,
  ...rest
}: UnionProps) {
  const options = useMemo(() => resolveSchemaList(schema.list), [schema.list])
  const props = {
    title: schema.meta.description,
    ...rest
  }
  const roles = schema.meta.role
    ?.split(' ')
    ?.filter(s => s !== ' ' && s !== '')
    ?? []
  switch (roles[0] ?? 'select') {
    case 'select':
      return <Select
        options={options}
        {...props}
      />
    case 'radio':
    case 'radio-inline':
      return <RadioGroup
        options={options}
        {...props}
      />
  }
  return <>
  </>
}
