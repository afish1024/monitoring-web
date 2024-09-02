<template>

  <a-card size="small" style="width: 100%;overflow-y:auto;;min-height: 600px;max-height: 900px;" :hoverable="true">

    <a-card-meta>
      <template #description>
        <span @click="$emit('someEvent',table)"><left-outlined />返回</span>
        <span style="margin-left:10px;font-size: 16px;font-weight:bold;color:#000">{{disabled?'添加':'编辑'}}基本策略</span>
      </template>
    </a-card-meta>

    <div style="margin-top:20px">
      <div style="width:80%;margin: 0 auto;margin-top: 50px;">
        <a-form :model="formState" @finish="onFinish" :label-col="{span: 3, offset: 1}" :wrapper-col="wrapperCol" v-if="current == 0">
          <a-form-item label="策略名称" name="strategyName" :rules="[{ required: true, message: '请输入策略名称!' }]">
            <a-input :disabled='disabled' v-model:value="formState.strategyName" style="width: 400px" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="策略分类" name="strategySort" :rules="[{ required: true, message: '请选择策略分类!' }]">
            <a-select :disabled='disabled' v-model:value="formState.strategySort" style="width: 400px" placeholder="请选择">
              <a-select-option :value="item.id" v-for="item in strategyType">{{item.dictLabel}}</a-select-option>

            </a-select>
          </a-form-item>
          <a-form-item label="策略行为" name="strategicBehavior" :rules="[{ required: true, message: '请选择策略行为!' }]">
            <a-select :disabled='disabled' v-model:value="formState.strategicBehavior" style="width: 400px" placeholder="请选择">
              <a-select-option value="ping">ping</a-select-option>
              <a-select-option value="telnet">telnet</a-select-option>
              <a-select-option value="ssh">ssh</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="用户名">
            <a-input :disabled='disabled' v-model:value="formState.userName" style="width: 400px" placeholder="请输入用户名" />
          </a-form-item>

          <a-form-item label="密码">
            <a-input :disabled='disabled' v-model:value="formState.password" style="width: 400px" placeholder="请输入密码" />
          </a-form-item>

          <a-form-item label="策略命令" name="strategicCommand" :rules="[{ required: true, message: '请输入策略命令!' }]">
            <a-textarea :disabled='disabled' v-model:value="formState.strategicCommand" style="width: 400px" placeholder="请输入" :rows="2" />
          </a-form-item>

          <a-form-item label="超时时间(秒)">
            <a-input-number :disabled='disabled' v-model:value="formState.timeout" style="width: 400px" :min="1" :precision="0" :step="1" :max="60" />
          </a-form-item>

          <a-form-item label="长度限制">
            <a-input-number :disabled='disabled' v-model:value="formState.lengthLimit" style="width: 400px" :min="1" :precision="0" :step="1" :max="60" />
          </a-form-item>

          <a-form-item label="策略备注">
            <a-textarea :disabled='disabled' v-model:value="formState.strategyRemark" style="width: 400px" placeholder="请输入" :rows="2" />
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
const value = ref(0)
const disabled = ref(false)
const strategyType = ref([])
const formState = reactive({
  strategyName: '',
  strategySort: '',
  strategicBehavior: '',
  enableStatus: true,
  userName: '',
  password: '',
  strategicCommand: '',
  timeout: '',
  lengthLimit: '',
  strategyRemark: '',
  id: ''
});


onMounted(() => {
  if (props.par.ids) {
    SafetySysApi.securitybaseInfo({ id: props.par.ids }).then((res) => {
      let list = toRaw(res)
      disabled.value = props.par.isShow
      formState.strategyName = list.strategyName
      formState.id = list.id
      formState.strategySort = list.strategySort
      formState.strategicBehavior = list.strategicBehavior
      formState.enableStatus = list.enableStatus == 'true' ? true : false
      formState.userName = list.userName
      formState.password = list.password
      formState.strategicCommand = list.strategicCommand
      formState.timeout = list.timeout
      formState.lengthLimit = list.lengthLimit
      formState.strategyRemark = list.strategyRemark
    }).catch((err) => {
      console.log(err);
    })
  } else {
    formState.id = ''
  }


  SafetySysApi.listForLabel({ dictValue: 'STRATEGY_TYPE' }).then((res) => {

    strategyType.value = res
  }).catch((err) => {
    console.log(err);
  })
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
    SafetySysApi.securitybaseAdd(value).then((res) => {
      setTimeout(() => {
        emit('some-event', table)
      }, 500)
    }).catch((err) => {
      console.log(err);
    })
  } else {
    SafetySysApi.securitybaseEdit(value).then((res) => {
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