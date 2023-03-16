# Schemastery React

## 支持

### role

#### primitive
* number
  * input
  * slider
* string
  * input
  * link
  * textarea
  * [ ] date
  * [ ] code:${language}
* union
  * select
  * radio
    * inline
    * [ ] inline-border
    * [ ] inline-button
* Date
  * [ ] base
    * [ ] datetime
    * [ ] select
  * [ ] pannel

* list

```ts
import Schema from 'schemastery'

export default Schema.object({
  0: Schema.tuple([Number, Number]),
  1: Schema.array(Number),
  2: Schema.array(Schema.union(['foo', 'bar', 'qux'])),
  3: Schema.tuple([
    Schema.union(['foo', 'bar', 'qux']),
    Schema.union(['foo', 'bar', 'qux']),
    Schema.union(['foo', 'bar', 'qux'])
  ])
})
```

  * [ ] tuple
    * [ ] base
    * [ ] 2
      * [ ] datetime-range
      * [ ] number-range
    * [ ] wrap
    * [ ] nowrap
  * [ ] array
    * [ ] base
    * [ ] wrap
    * [ ] nowrap
  * [ ] string, boolean
    * [ ] select-multiple
    * [ ] checkbox
    * [ ] checkbox-inline
