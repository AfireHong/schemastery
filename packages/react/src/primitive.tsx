import SCHEMASTERY from 'schemastery'
import { Input, InputAdornment, InputNumber, Textarea } from 'tdesign-react/esm'
import { LinkIcon } from 'tdesign-icons-react'
import { useState } from 'react'

export interface PrimitiveProps {
  schema: SCHEMASTERY
  value?: any
  defaultValue?: any
}

export function Primitive({
  schema,
  ...rest
}: PrimitiveProps) {
  const [value, setValue] = useState(rest.defaultValue || rest.value)
  const props = {
    ...rest,
    value,
    onChange: setValue
  }
  switch (schema.type) {
    case 'number':
      return <InputNumber
        style={{
          width: '100%'
        }}
        {...props}
      />
    case 'string':
      if (schema.meta.role === 'textarea')
        return <Textarea
          autosize={{
            minRows: 1,
          }}
          {...props}
        />
      if (schema.meta.role === 'link')
        return <InputAdornment
          append={<div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              fontSize: 20,
              cursor: 'pointer',
            }}
            onClick={() => {
              if (!value)
                return

              window.open(value, '_blank')
            }}
          ><LinkIcon /></div>}
        >
          <Input {...props}/>
        </InputAdornment>
      return <Input {...props}/>
  }
  return <></>
}
