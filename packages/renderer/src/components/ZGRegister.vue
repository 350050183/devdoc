<template>
  <div>
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="6"
      >
        <div class="login-label">
          注册
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
          <el-form-item
            label="重复密码"
            prop="password2"
          >
            <el-input
              v-model="ruleForm.password2"
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
            @click="onLogin"
          >
            已有帐号？登录
          </el-button>
        </div>
        <br>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import docUser from '/@/api/docUser';
import type { FormInstance } from 'element-plus';

const router = useRouter();

function onLogin() {
  router.push('/ZGLogin');
}

const ruleForm = reactive({
  password:'',
  password2:'',
  email:'',
});

const ruleFormRef = ref<FormInstance>();

const checkEmail = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('邮箱不能为空'));
  }
  setTimeout(() => {
    if (value.indexOf('@')<=0 || value.indexOf('.')<=0) {
      callback(new Error('请输入正确的邮箱'));
    } else {
      if (value.length < 10) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    }
  }, 1000);
};

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (ruleForm.password2 !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('password2', () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入重复密码'));
  } else if (value !== ruleForm.password) {
    callback(new Error('两次输入密码不匹配。'));
  } else {
    callback();
  }
};

const rules = reactive({
  password: [{ validator: validatePass, trigger: 'blur' }],
  password2: [{ validator: validatePass2, trigger: 'blur' }],
  email: [{ validator: checkEmail, trigger: 'blur' }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await docUser.register({'email':ruleForm.email,'password':ruleForm.password,'password2':ruleForm.password2});
      if(result.success){
        ElMessage({
          message: '注册成功，请重新登录。',
          type: 'success',
        });
        onLogin();
      }else{
        ElMessage({
          message: '注册失败：'+result.message,
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
