<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="6"
      >
        <div class="login-label">
          登录
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="zg-form"
          size="large"
        >
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="ruleForm.email"
              type="email"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">
              重设
            </el-button>
          </el-form-item>
        </el-form>

        <br>
        <div class="login-no-account">
          <el-button
            plain
            @click="onRegister"
          >
            没有帐号？注册
          </el-button>
        </div>
        <br>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import docUser from '/@/api/docUser';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
const store = userStore();
const docs_store = docsStore();

const emit = defineEmits(['ZgNavClick']);

function onRegister() {
  emit('ZgNavClick', 'ZGRegister');
}

const ruleForm = reactive({
  email:'',
  password:'',
});

const ruleFormRef = ref<FormInstance>();

const checkEmail = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('邮箱不能为空'));
  }
  setTimeout(() => {
    if (!value.match(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)) {
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }, 1000);
};

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if(value.length<6){
      callback(new Error('密码不能少于6位'));
    }else{
      callback();
    }
  }
};

const rules = reactive({
  password: [{ validator: validatePass, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      docs_store.isNeedRefreshCate = false;
      const result = await docUser.login({'email':ruleForm.email,'password':ruleForm.password});
      if(result.success){
        ElMessage({
          message: '登录成功。',
          type: 'success',
        });
        //save user info
        await store.setValue(result.data.user_info);
        docs_store.isNeedRefreshCate = true;

        emit('ZgNavClick', 'ZGUrl');
      }else{
        ElMessage({
          message: '登录失败：'+result.message,
          type: 'error',
        });
      }
    } else {
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.login-label{
  text-align: center;
  margin: 30px 0 30px 0;
  font-size:24px;
  /*border-bottom: 1px solid var(--el-border-color);*/
}
.login-no-account{
  text-align: center;
}
.zg-form{

}
</style>
