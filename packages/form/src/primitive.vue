<template>
  <el-switch v-if="schema.type === 'boolean'" v-model="value" :class="{ nullable }" :disabled="disabled"></el-switch>

  <template v-else-if="schema.type === 'number'">
    <el-slider v-if="schema.meta.role === 'slider'" style="width: 200px"
      v-model="value" :disabled="disabled" :max="schema.meta.max" :min="schema.meta.min" :step="schema.meta.step"
    ></el-slider>
    <el-input-number v-else
      v-model="value" :disabled="disabled" :max="schema.meta.max" :min="schema.meta.min" :step="schema.meta.step"
    ></el-input-number>
  </template>

  <template v-else>
    <el-color-picker v-if="schema.meta.role === 'color'" v-model="value" show-alpha></el-color-picker>
    <el-time-picker v-if="schema.meta.role === 'time'" v-model="date"></el-time-picker>
    <el-date-picker v-else-if="['date', 'datetime'].includes(schema.meta.role)" :type="schema.meta.role" v-model="date"></el-date-picker>
    <el-input v-else v-model="value" :disabled="disabled" :class="{ nullable }"
      :style="{ width: isLink ? '16rem' : '12rem' }" :type="type">
      <template #prefix v-if="nullable"></template>
      <template #suffix v-if="isLink">
        <icon-external @click="onClickExternal(value)"></icon-external>
      </template>
      <template #suffix v-else-if="schema.meta.role === 'secret'">
        <icon-eye v-if="showPass" @click="showPass = !showPass"></icon-eye>
        <icon-eye-slash v-else @click="showPass = !showPass"></icon-eye-slash>
      </template>
    </el-input>
  </template>
</template>

<script lang="ts" setup>

import { computed, PropType, ref } from 'vue'
import { IconExternal, IconEye, IconEyeSlash } from './icons'
import { isNullable } from './utils'
import Schema from 'schemastery'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  schema: {} as PropType<Schema>,
  modelValue: {},
  disabled: Boolean,
})

const showPass = ref(false)

const nullable = computed(() => isNullable(props.modelValue))

const value = computed<any>({
  get: () => props.modelValue,
  set: emit.bind(null, 'update:modelValue'),
})

const isLink = computed(() => ['url', 'link'].includes(props.schema.meta.role))

const type = computed(() => {
  const { type, meta } = props.schema
  return type === 'number' ? 'number' : meta.role === 'secret' && !showPass.value ? 'password' : 'text'
})

const date = computed({
  get() {
    if (!props.modelValue) return
    if (['date', 'datetime'].includes(props.schema.meta.role)) {
      return new Date(value.value)
    } else if (props.schema.meta.role === 'time') {
      return new Date('1970-01-01 ' + value.value)
    }
  },
  set(value) {
    if (props.schema.meta.role === 'datetime') {
      emit('update:modelValue', value.toLocaleString())
    } else if (props.schema.meta.role === 'date') {
      emit('update:modelValue', value.toLocaleDateString())
    } else if (props.schema.meta.role === 'time') {
      emit('update:modelValue', value.toLocaleTimeString())
    }
  },
})

function onClickExternal(value: string) {
  if (!value) return
  open(value, '_blank')
}

</script>

<style lang="scss">

.schema-item {
  .el-input {
    .k-icon {
      color: var(--fg3);
      transition: var(--color-transition);
      cursor: pointer;

      &:hover {
        color: var(--fg1);
      }
    }

    &.nullable:not(:focus-within) .el-input__prefix {
      display: block;
      position: absolute;
      top: 50%;
      width: 40%;
      border-top: var(--el-border);
      transition: var(--color-transition);
    }
  }

  .el-switch.nullable {
    .el-switch__action {
      left: 11px;
    }
  }
}

</style>
