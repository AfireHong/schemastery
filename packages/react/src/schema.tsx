import SCHEMASTERY from 'schemastery'
import { Item } from './item'

export interface SchemaProps<T extends any> {
  model: SCHEMASTERY
  disabled?: boolean
}

export function Schema<T>(props: SchemaProps<T>) {
  const {
    model,
    disabled,
  } = props

  if (model.type !== 'object')
    return <>
      尚不支持的 Schema 类型
    </>

  return <>
    {Object.entries(model.dict).map(([key, value]) => <Item
      key={key}
      label={value.meta.label || key}
      schema={value}
      disabled={props.disabled}
    />)}
  </>
}

Schema.Item = Item
