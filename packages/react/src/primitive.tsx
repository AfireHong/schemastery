import SCHEMASTERY from 'schemastery'
import { Input, InputNumber, Textarea } from 'tdesign-react/esm'

export interface PrimitiveProps {
  schema: SCHEMASTERY
}

export function Primitive({
  schema,
  ...rest
}: PrimitiveProps) {
  switch (schema.type) {
    case 'number':
      return <InputNumber
        style={{
          width: '100%'
        }}
        {...rest}
      />
    case 'string':
      if (schema.meta.role === 'textarea')
        return <Textarea
          autosize={{
            minRows: 1,
          }}
          {...rest}
        />
      else
        return <Input {...rest}/>
  }
  return <></>
}
