<!--suppress CssUnknownTarget -->
<template>
  <n-message-provider>
  <div class="background"></div>
  <n-card class="box">
    <h1 style="text-align: center" >调查问卷</h1>
    <n-form :model="userValue" :rules="rules" ref="formRef">
      <n-form-item-row label="用户名" path="username">
        <n-input placeholder="请输入用户名" v-model:value="userValue.username"/>
      </n-form-item-row>
      <n-form-item-row label="密码" path="password">
        <n-input placeholder="请输入密码" v-model:value="userValue.password" type="password" show-password-on="click"/>
      </n-form-item-row>
    </n-form>
    <n-button type="primary" block secondary strong @click="handleLogin">
      登录
    </n-button>
  </n-card>
  </n-message-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst } from 'naive-ui'
import {
  NTabs,
  NCard,
  NButton,
  NInput,
  NTabPane,
  NForm,
  NFormItemRow,
} from "naive-ui";
export default defineComponent({
  name: "LoginView",
  components: {
    NTabs,
    NCard,
    NButton,
    NInput,
    NTabPane,
    NForm,
    NFormItemRow,
  },
  methods: {
    handleLogin() {
      window.$message.success('登录成功');
    },
  },
  setup() {
    const formRef = ref<FormInst | null>(null)
    return {
      formRef,
      userValue: ref({
        username: '',
        password: '',
      }),
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' },
        ],
      },
      handleLogin (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            window.$message.success('Valid')
          } else {
            console.log(errors)
            window.$message.error('Invalid')
          }
        })
      }
    }
  },
})
</script>

<style scoped>
@media only screen and (min-width: 550px) {
  .background {
    filter: brightness(0.8);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: url('https://source.yby.zone/upload/images/1655001503_P15Qqvxb1oe.jpg') center no-repeat;
    background-size: cover;
  }

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
  }
}

@media only screen and (max-width: 550px) {
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    border: 0;
  }
}

</style>
