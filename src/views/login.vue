<route lang="yaml">
meta:
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import Copyright from '@/layouts/components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import axios from 'axios'

defineOptions({
  name: 'Login',
});

const route = useRoute();
const router = useRouter();

const settingsStore = useSettingsStore();
const userStore = useUserStore();

const banner = new URL('../assets/images/login-banner.png', import.meta.url).href;
const logo = new URL('../assets/images/logo.png', import.meta.url).href;
const title = import.meta.env.VITE_APP_TITLE;
const formType = ref('login');
const loading = ref(false);
const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath);

// 登录
const loginFormRef = ref<FormInstance>()
const loginForm = ref({
  username: localStorage.login_username || '',
  password: '',
  remember: !!localStorage.login_username,
})
const loginRules = ref<FormRules>({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleLogin() {
  loginFormRef.value && loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      userStore.login(loginForm.value).then(() => {
        loading.value = false
        // if (loginForm.value.remember) {
        //   localStorage.setItem('login_username', loginForm.value.id);
        // }
        // else {
        //   localStorage.removeItem('login_username')
        // }
        if (localStorage.getItem("id") != undefined) {
          location.reload();
        } else {
          ElMessage({message: '登录失败',type: 'warning',});
        }
      }).catch(() => {
        loading.value = false
        ElMessage({message: '登录失败',type: 'warning',});
      })
    }
  })
}

// 注册
const registerFormRef = ref<FormInstance>()
const registerForm = ref({
  username: '',
  id: '',
  email: '',
  password: '',
  checkPassword: '',
})
const registerRules = ref<FormRules>({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  id: [
    { required: true, trigger: 'blur', message: '请输入学号' },
  ],
  email: [
    { required: true, trigger: 'blur', message: '请输入邮箱' },
  ],
  password: [
    { required: true, trigger: 'blur', message: '请输入密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, trigger: 'blur', message: '请再次输入密码' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        }
        else {
          callback()
        }
      },
    },
  ],
})
// 注册业务函数
function handleRegister() {
  // ElMessage({
  //   message: '注册模块仅提供界面演示，无实际功能，需开发者自行扩展',
  //   type: 'warning',
  // })
  registerFormRef.value && registerFormRef.value.validate((valid) => {
    if (valid) {
      const params = {
        "id": registerForm.value.id,
        "pwd": registerForm.value.password,
        "email": registerForm.value.email,
        "username": registerForm.value.username,
      };
      const res = axios.post('http://localhost:8080/user/register/',params);
      // 设置回调函数，接收返回的响应对象
      // 异步操作成功时，执行的回调函数
      res.then(response=>{
        // console.log(response);
        if (response.data.data == "success") {
          ElMessage({
            message: '注册成功',
            type: 'success',
          });
          toLoginForm();
        } else {
          ElMessage({
            message: '用户已经存在',
            type: 'warning',
          });
        }
      })
      // 异步操作失败时，执行的回调函数
      res.catch(error=>{
        console.log('请求失败:')
        // console.log('error:',error)
        console.log('请求失败响应对象获取',error.response)
      })
    }
  })
}
function toLoginForm() {
  formType.value = "login";
}

// 重置密码
const resetFormRef = ref<FormInstance>()
const resetForm = ref({
  username: localStorage.login_username,
  id: '',
  newPassword: '',
})
const resetRules = ref<FormRules>({
  username: [
    { required: true, trigger: 'blur', message: '请输入用户名' },
  ],
  id: [
    { required: true, trigger: 'blur', message: '请输入验证码' },
  ],
  newPassword: [
    { required: true, trigger: 'blur', message: '请输入新密码' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
})
function handleReset() {
  ElMessage({
    message: '重置密码仅提供界面演示，无实际功能，需开发者自行扩展',
    type: 'info',
  })
  resetFormRef.value && resetFormRef.value.validate((valid) => {
    if (valid) {
      // 这里编写业务代码
    }
  })
}

function testAccount(username: string) {
  loginForm.value.username = username
  loginForm.value.password = '123456'
  localStorage.setItem("token", "test");
  localStorage.setItem("id", 0);
  localStorage.setItem("username", username);
  ElMessage({message: '登录成功',type: 'success',});
  location.reload();
}
</script>

<template>
  <div>
    <div class="bg-banner" />
    <div id="login-box">
      <div class="login-banner">
        <img :src="logo" class="logo">
        <img :src="banner" class="banner">
      </div>
      <ElForm v-show="formType === 'login'" ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="title-container">
          <h3 class="title">
            欢迎来到 {{ title }} ! 👋🏻
          </h3>
        </div>
        <div>
          <ElFormItem prop="id">
            <ElInput v-model="loginForm.id" placeholder="学号" type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput v-model="loginForm.password" type="password" placeholder="密码" tabindex="2" autocomplete="new-password" show-password @keyup.enter="handleLogin">
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <div class="flex-bar">
          <ElCheckbox v-model="loginForm.remember">
            记住我
          </ElCheckbox>
          <ElLink type="primary" :underline="false" @click="formType = 'reset'">
            忘记密码了?
          </ElLink>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%;" @click.prevent="handleLogin">
          登录
        </ElButton>
        <div class="sub-link">
          <span class="text">还没有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'register'">
            创建新帐号
          </ElLink>
        </div>
        <!-- <div style="margin-top: 20px; margin-bottom: -20px; text-align: center;">
          <ElDivider>演示账号一键登录</ElDivider>
          <ElButton type="primary" size="small" plain @click="testAccount('admin')">
            admin
          </ElButton>
          <ElButton size="small" plain @click="testAccount('test')">
            test
          </ElButton>
        </div> -->
      </ElForm>
      <ElForm v-show="formType === 'register'" ref="registerFormRef" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on">
        <div class="title-container">
          <h3 class="title">
            准备使用本系统! 🚀
          </h3>
        </div>
        <div>
          <ElFormItem prop="username">
            <ElInput v-model="registerForm.username" placeholder="用户名" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="id">
            <ElInput v-model="registerForm.id" placeholder="学号" tabindex="2">
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="email">
            <ElInput v-model="registerForm.email" placeholder="邮箱" tabindex="3">
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput v-model="registerForm.password" type="password" placeholder="密码" tabindex="4" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="checkPassword">
            <ElInput v-model="registerForm.checkPassword" type="password" placeholder="确认密码" tabindex="5" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleRegister">
          注册
        </ElButton>
        <div class="sub-link">
          <span class="text">已经有帐号?</span>
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm>
      <!-- <ElForm v-show="formType === 'reset'" ref="resetFormRef" :model="resetForm" :rules="resetRules" class="login-form">
        <div class="title-container">
          <h3 class="title">
            忘记密码了? 🔒
          </h3>
        </div>
        <div>
          <ElFormItem prop="username">
            <ElInput v-model="resetForm.username" placeholder="用户名" type="text" tabindex="1">
              <template #prefix>
                <SvgIcon name="i-ri:user-3-fill" />
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="id">
            <ElInput v-model="resetForm.id" placeholder="验证码" type="text" tabindex="2">
              <template #prefix>
                <SvgIcon name="i-ic:baseline-verified-user" />
              </template>
              <template #append>
                <ElButton>发送验证码</ElButton>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem prop="newPassword">
            <ElInput v-model="resetForm.newPassword" type="password" placeholder="新密码" tabindex="3" show-password>
              <template #prefix>
                <SvgIcon name="i-ri:lock-2-fill" />
              </template>
            </ElInput>
          </ElFormItem>
        </div>
        <ElButton :loading="loading" type="primary" size="large" style="width: 100%; margin-top: 20px;" @click.prevent="handleReset">
          确认
        </ElButton>
        <div class="sub-link">
          <ElLink type="primary" :underline="false" @click="formType = 'login'">
            去登录
          </ElLink>
        </div>
      </ElForm> -->
    </div>
    <Copyright />
  </div>
</template>

<style lang="scss" scoped>
[data-mode="mobile"] {
  #login-box {
    position: relative;
    top: inherit;
    left: inherit;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    height: 100%;
    border-radius: 0;
    box-shadow: none;
    transform: translateX(0) translateY(0);

    .login-banner {
      width: 100%;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
      min-height: auto;
      padding: 30px;
    }
  }

  .copyright {
    position: relative;
  }
}

:deep(input[type="password"]::-ms-reveal) {
  display: none;
}

.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
}

#login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background-color: var(--g-container-bg);
  border-radius: 10px;
  box-shadow: var(--el-box-shadow);
  transform: translateX(-50%) translateY(-50%);

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: var(--g-bg);

    .banner {
      width: 100%;

      @include position-center(y);
    }

    .logo {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 30px;
      border-radius: 4px;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 500px;
    min-height: 500px;
    padding: 50px;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 30px;
        font-size: 1.3em;
        font-weight: bold;
        color: var(--el-text-color-primary);
      }
    }
  }

  .el-form-item {
    margin-bottom: 24px;

    :deep(.el-input) {
      width: 100%;
      height: 48px;
      line-height: inherit;

      input {
        height: 48px;
      }

      .el-input__prefix,
      .el-input__suffix {
        display: flex;
        align-items: center;
      }

      .el-input__prefix {
        left: 10px;
      }

      .el-input__suffix {
        right: 10px;
      }
    }
  }

  :deep(.el-divider__text) {
    background-color: var(--g-container-bg);
  }

  .flex-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .sub-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);

    .text {
      margin-right: 10px;
    }
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}
</style>
