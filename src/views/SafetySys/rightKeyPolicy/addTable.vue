<template>

  <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 900px;" :hoverable="true">

    <a-card-meta>
      <template #description>
        <span @click="$emit('someEvent',table)"><left-outlined />返回</span>
        <span style="margin-left:10px;font-size: 16px;font-weight:bold;color:#000">{{disabled?'添加':'编辑'}}右键策略</span>
      </template>
    </a-card-meta>

    <div style="margin-top:20px">
      <div style="width:80%;margin: 0 auto;margin-top: 50px;">
        <a-form autocomplete="off" :model="formState" @finish="onFinish" :label-col="{span: 4, offset: 2}" :wrapper-col="wrapperCol" v-if="current == 0">
          <a-form-item label="策略名称" name="strategyName" :rules="[{ required: true, message: '请输入策略名称!' }]">
            <a-input :disabled='disabled' v-model:value="formState.strategyName" style="width: 400px" placeholder="请输入" />
          </a-form-item>

          <a-form-item label="策略KEY" name="strategyKey" :rules="[{ required: true, message: '请输入策略KEY!' }]">
            <a-input :disabled='disabled' v-model:value="formState.strategyKey" style="width: 400px" placeholder="请输入" />
          </a-form-item>

          <a-form-item label="策略说明">
            <a-textarea :disabled='disabled' v-model:value="formState.strategyDescription" style="width: 400px" placeholder="请输入" :rows="2" />
          </a-form-item>

          <a-form-item label="启用状态">
            <a-switch :disabled='disabled' v-model:checked="formState.enableStatus" />
          </a-form-item>

          <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
            <a-button :disabled='disabled' type="primary" html-type="submit">保存</a-button>
          </a-form-item>

        </a-form>

      </div>
    </div>

  </a-card>
</template>
<script setup name="network">
import { toRaw } from "@vue/reactivity";
import SafetySysApi from '@/api/SafetySys/SafetySysApi'
import table from './table.vue'
const current = ref(0);
const disabled = ref(false)
const classify = ref([])
const formState = reactive({
  strategyName: '',
  strategyKey: '',
  enableStatus: true,
  strategyDescription: '',
  id: ''
});


onMounted(() => {
  if (props.par.ids) {
    console.log(props.par)
    SafetySysApi.securityrightclickInfo({ id: props.par.ids }).then((res) => {
      let list = toRaw(res)
      console.log(list.enableStatus == true)
      disabled.value = props.par.isShow
      formState.strategyName = list.strategyName
      formState.id = list.id
      formState.strategyKey = list.strategyKey
      formState.strategyDescription = list.strategyDescription
      formState.enableStatus = list.enableStatus == 'true' ? true : false
    }).catch((err) => {
      console.log(err);
    })
  } else {
    formState.id = ''
  }
});

const props = defineProps({
  par: {
    default: Object
  },
});
// console.log(props.par)
watch(props, (value, old) => {
  console.log(value)
})

const emit = defineEmits(['some-event'])

const onFinish = values => {
  console.log(values, formState);
  const value = toRaw(formState)
  console.log(value)
  if (value.id == '' || value.id == null) {
    SafetySysApi.securityrightclickAdd(value).then((res) => {
      setTimeout(() => {
        emit('some-event', table)
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  } else {
    SafetySysApi.securityrightclickEdit(value).then((res) => {
      setTimeout(() => {
        emit('some-event', table)
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  }

};

</script>
<style lang="less" scoped>
</style>