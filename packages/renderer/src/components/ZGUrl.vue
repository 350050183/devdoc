<template>
  <div class="container">
    <el-button
      type="primary"
      plain
      @click="onAdd"
    >
      添加
    </el-button>
    <el-table
      :data="filterTableData"
      style="width: 100%"
    >
      <el-table-column
        label="分类"
        prop="cate_id"
        width="160"
      >
        <template #default="scope">
          {{ cate_name(scope.row.cate_id) }}
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
      />
      <el-table-column
        label="网址"
        prop="url"
      >
        <template #default="scope">
          <a
            :href="scope.row.url"
            target="_blank"
          >{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="索引字母"
        prop="alpha"
        width="100"
      />
      <el-table-column
        label="logo"
        prop="logo"
        width="100"
      >
        <template #default="scope">
          <img
            :src="scope.row.logo"
            class="logo"
          >
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        width="200"
      >
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="搜索标题"
          />
        </template>
        <template #default="scope">
          <el-button
            size="large"
            @click="onEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定要删除吗?"
            cancel-button-text="取消"
            confirm-button-text="确定"
            @confirm="onDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button type="danger">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogFormVisible"
      title="管理URL"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item
          label="标题"
          label-width="120px"
          prop="title"
        >
          <el-input
            v-model="ruleForm.title"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="URL"
          label-width="120px"
          prop="url"
        >
          <el-input
            v-model="ruleForm.url"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="简短介绍"
          label-width="120px"
          prop="description"
        >
          <el-input
            v-model="ruleForm.description"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="类别"
          label-width="120px"
          prop="cate_id"
        >
          <el-select
            v-model="ruleForm.cate_id"
            filterable
            placeholder="请选择类别"
          >
            <el-option
              v-for="item in cateOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="索引字母"
          label-width="120px"
          prop="alpha"
        >
          <el-input
            v-model="ruleForm.alpha"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="LOGO图片"
          label-width="120px"
          prop="logo"
        >
          <el-upload
            :action="docUrl.api_docurl_upload"
            :on-success="handleSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            name="logo"
            drag
          >
            <el-button type="primary">
              点击上传文件
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png 文件要小于 500KB.
              </div>
              <div>
                <img
                  v-if="ruleForm.logo"
                  :src="ruleForm.logo"
                  style="width:100px;height:60px"
                >
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="onSave(ruleFormRef)"
          >保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import docUrl from '/@/api/docUrl';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
import type {UploadFile, UploadProps, UploadUserFile, UploadFiles} from 'element-plus';
import type {TZGCate, TZGUrl} from 'store';
import docCate from '/@/api/docCate';
import type {FormInstance} from 'element-plus';
//import docUser from '/@/api/docUser';

// const props = defineProps({
//   isNeedRefresh: { type: Boolean, required: false },
// });

// if(props.isNeedRefresh){
//   console.log('isNeedRefresh');
//   refreshUrlList();
// }

const store = userStore();
const docs_store = docsStore();

//表单显示与隐藏属性
let dialogFormVisible = ref(false);
//搜索关键词属性
const search = ref('');
//表单实例
const ruleFormRef = ref<FormInstance>();
//表格列表数据
const list: Array<TZGUrl> = [];
let tableData = ref(list);
//类型选择
const list2: Array<TZGCate> = [];
let cateOptions = ref(list2);
//文件上传
const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'food.jpeg',
  //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  // }
]);

const cate_name = (cate_id: string) => cateOptions.value.filter((row) => row.id === cate_id)?.[0].name;

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

function onAdd() {
  dialogFormVisible.value = true;
  ruleForm.id = '';
}

const validateTitle = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请输入标题'));
  } else {
    if (value.length < 2) {
      callback(new Error('标题不能少于2位'));
    } else {
      callback();
    }
  }
};
const validateDescription = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请输入描述'));
  } else {
    if (value.length < 6) {
      callback(new Error('描述不能少于6位'));
    } else {
      callback();
    }
  }
};
const validateCateId = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请选择类别'));
  } else {
    if (value.length < 1) {
      callback(new Error('类别不能少于1位'));
    } else {
      callback();
    }
  }
};
const validateAlpha = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请输入索引字母'));
  } else {
    if (value.length != 1) {
      callback(new Error('索引字母只能是1位'));
    } else {
      callback();
    }
  }
};
const validateUrl = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请输入URL'));
  } else {
    if (value.length < 6) {
      callback(new Error('URL不能少于6位'));
    } else {
      callback();
    }
  }
};
const validateLogo = (rule: any, value: string, callback: any) => {
  if (!value || value === '') {
    callback(new Error('请上传LOGO文件'));
  } else {
    if (value.length < 6) {
      callback(new Error('LOGO文件路径不正确'));
    } else {
      callback();
    }
  }
};

const rules = reactive({
  title: [{validator: validateTitle, trigger: 'blur'}],
  url: [{validator: validateUrl, trigger: 'blur'}],
  description: [{validator: validateDescription, trigger: 'blur'}],
  cate_id: [{validator: validateCateId, trigger: 'blur'}],
  logo: [{validator: validateLogo, trigger: 'blur'}],
  alpha: [{validator: validateAlpha, trigger: 'blur'}],
});

let ruleForm = reactive({
  id: '',
  cate_id: '',
  title: '',
  url: '',
  icon_class: '',
  alpha: '',
  is_new: '',
  logo: '',
  description: '',
});

const emit = defineEmits(['ZgNavClick']);

const onSave = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await (ruleForm.id ? docUrl.edit(ruleForm, token.value) : docUrl.add(ruleForm, token.value));
      if (result.success) {
        ElMessage({
          message: '操作成功。',
          type: 'success',
        });
        dialogFormVisible.value = false;
        // emit('ZgNavClick', 'ZGUrl');
        await refreshUrlList();
      } else {
        ElMessage({
          message: '操作失败：' + result.message,
          type: 'error',
        });
      }
    }
  });
  return false;
};

const onEdit = (index: number, row: TZGUrl) => {
  ruleForm.id = row.id;
  ruleForm.cate_id = row.cate_id;
  ruleForm.title = row.title;
  ruleForm.url = row.url;
  ruleForm.alpha = row.alpha;
  ruleForm.logo = row.logo;
  ruleForm.description = row.description;
  dialogFormVisible.value = true;
};

const onDelete = async (index: number, row: TZGUrl) => {
  const result = await docUrl.del(parseInt(row.id), token.value);
  if (result.success) {
    ElMessage({
      message: '删除成功。',
      type: 'success',
    });
    await refreshUrlList();
  } else {
    ElMessage({
      message: '删除失败：' + result.message,
      type: 'error',
    });
  }
};

const token = computed(() => store.token);

watch(() => store.token, (first, second) => {
  console.log('token changed: first:'+first+'; second:'+second);
  if(first && first!==second){
    refreshUrlList();
  }
});


watch(() => docs_store.isNeedRefreshCateOption, (first, second) => {
  console.log('cate_option changed: first:'+first+'; second:'+second);
  if(first){
    refreshCateOptions();
  }
});

async function refreshUrlList() {
  const result = await docUrl.myurl(token.value, 1, 200);
  if (result.success) {
    tableData.value = result.data.items;
  } else {
    ElMessage({
      message: '错误：' + result.message,
      type: 'error',
    });
    if(parseInt(result.code)===5504){
      store.token = '';
      store.id = 0;
      emit('ZgNavClick','ZGLogin');
    }
  }
}

(refreshUrlList)();

async function refreshCateOptions(){
  cateOptions.value = await docCate.listByLevel(3,1,99999);
}

onMounted(refreshCateOptions);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  // console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  // console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  // console.log('handleExceed call');
  ElMessage.warning(
    `选择的文件数量${files.length}，超出同时上传文件数量  ${
      files.length + uploadFiles.length
    }`,
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`,
  ).then(
    () => true,
    () => false,
  );
};

const handleSuccess: UploadProps['onSuccess'] = (result: any, ufile: UploadFile, ufiles: UploadFiles) => {
  if (result.success) {
    ruleForm.logo = import.meta.env.VITE_API_SERVER_URL + result.data.logo;
    fileList.value = [];
  } else {
    ElMessage({
      message: '文件上传失败：' + result.message,
      type: 'error',
    });
  }

};
</script>
<style scoped>
.container {
  padding: 20px;
}

.logo {
  height: 30px;
}
</style>
