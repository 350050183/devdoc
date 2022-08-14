<template>
  <div class="container">
    <div class="zg-breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/ZGMap'}">
          图谱管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          网址管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-button
      type="primary"
      plain
      @click="onAdd"
    >
      添加
    </el-button>
    <el-button
      type="primary"
      plain
      @click="onNodeCate"
    >
      网址类别管理
    </el-button>
    <el-table
      :data="filterTableData"
      style="width: 100%"
    >
      <el-table-column
        label="网址类别"
        prop="cate_id"
        width="160"
      >
        <template #default="scope">
          {{ findCateName(scope.row.cate_id) }}
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
        label="网站logo"
        prop="logo"
        width="100"
      >
        <template #default="scope">
          <img
            :src="logo_url(scope.row.logo)"
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
      title="管理网址"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item
          label="标题 *"
          label-width="120px"
          prop="title"
        >
          <el-input
            v-model="ruleForm.title"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="URL *"
          label-width="120px"
          prop="url"
        >
          <el-input
            v-model="ruleForm.url"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="简短介绍 *"
          label-width="120px"
          prop="description"
        >
          <el-input
            v-model="ruleForm.description"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="类别 *"
          label-width="120px"
          prop="cate_id"
        >
          <el-tree-select
            v-model="ruleForm.cate_name"
            :data="cateListData"
            :filter-node-method="filterNodeMethod"
            filterable
            :props="defaultProps"
            @change="onTreeSelect"
          />
          &nbsp;
          <el-button
            type="primary"
            plain
            @click="onNodeCate"
          >
            类别管理
          </el-button>
        </el-form-item>

        <el-form-item
          label="索引字母 *"
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
            :action="docNode.api_docNode_upload"
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
                  v-if="ruleForm.logo_url"
                  :src="ruleForm.logo_url"
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
import docNode from '/@/api/docNode';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
import type {UploadFile, UploadProps, UploadUserFile, UploadFiles} from 'element-plus';
import type {TZGNode, TZGTree} from 'store';
import docNodeCate from '/@/api/docNodeCate';
import type {FormInstance} from 'element-plus';
import {ArrowRight} from '@element-plus/icons-vue';

const defaultProps = {
  children: 'children',
  label: 'label',
  value: 'id',
};

const store = userStore();
const docs_store = docsStore();

//表单显示与隐藏属性
let dialogFormVisible = ref(false);
//搜索关键词属性
const search = ref('');
//表单实例
const ruleFormRef = ref<FormInstance>();
//表格列表数据
const list: Array<TZGNode> = [];
let tableData = ref(list);
//类型选择
const list2: Array<TZGTree> = [];
let cateOptions = ref(list2);
//文件上传
const fileList = ref<UploadUserFile[]>([
  // {
  //   name: 'food.jpeg',
  //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  // }
]);
const logo_url = (url: string) => url && url.length>0 ? import.meta.env.VITE_API_SERVER_URL + url:'';

const router = useRouter();
const route = useRoute();

const map_id = route.params.id as string;

const token = computed(() => store.token);

watch(() => store.token, (first, second) => {
  console.log('token changed: first:' + first + '; second:' + second);
  if (first && first !== second) {
    refreshUrlList();
  }
});

watch(() => docs_store.isNeedRefreshCateOption, (first, second) => {
  console.log('cate_option changed: first:' + first + '; second:' + second);
  if (first) {
    refreshCateOptions();
  }
});

const cateListData = ref(list2);

async function refreshUrlList() {
  const result = await docNode.myurl(token.value, parseInt((route.params.id) as string), 1, 200);
  if (result.success) {
    tableData.value = result.data.items;
  } else {
    ElMessage({
      message: '错误：' + result.message,
      type: 'error',
    });
    if (parseInt(result.code) === 5504) {
      store.token = '';
      store.id = 0;
      await router.push('/ZGLogin');
    }
  }
}

(refreshUrlList)();

function findCateName(cate_id: string) {
  return findCateNameRecursive(cateOptions.value, cate_id);
}

function findCateNameRecursive(cate_list: TZGTree[], cate_id: string): string {
  for (const idx in cate_list) {
    const item = cate_list[idx];
    if (item.id === cate_id) {
      return item.label;
    } else if (item.children && item.children.length > 0) {
      // console.log('recursive');
      // console.log(item.children);
      const found = findCateNameRecursive(item.children, cate_id);
      if (found != '') {
        return found;
      }
    }
  }
  return '';
}

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const onNodeCate = () => {
  router.push('/ZGNodeCate/' + map_id);
};

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
  console.log(value);
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
      ruleForm.alpha = value.toUpperCase();
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

// const validateLogo = (rule: any, value: string, callback: any) => {
//   if (!value || value === '') {
//     callback(new Error('请上传LOGO文件'));
//   } else {
//     if (value.length < 6) {
//       callback(new Error('LOGO文件路径不正确'));
//     } else {
//       callback();
//     }
//   }
// };

const rules = reactive({
  title: [{validator: validateTitle, trigger: 'blur'}],
  url: [{validator: validateUrl, trigger: 'blur'}],
  description: [{validator: validateDescription, trigger: 'blur'}],
  cate_id: [{validator: validateCateId, trigger: 'blur'}],
  // logo: [{validator: validateLogo, trigger: 'blur'}],
  alpha: [{validator: validateAlpha, trigger: 'blur'}],
});

let ruleForm = reactive({
  id: '',
  cate_id: '',
  cate_name: '',
  title: '',
  url: '',
  icon_class: '',
  alpha: '',
  is_new: '',
  logo: '',
  logo_url: '',
  description: '',
  map_id: map_id,
});

const onSave = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const result = await (ruleForm.id ? docNode.edit(ruleForm, token.value) : docNode.add(ruleForm, token.value));
      if (result.success) {
        ElMessage({
          message: '操作成功。',
          type: 'success',
        });
        dialogFormVisible.value = false;
        // emit('ZgNavClick', 'ZGNode');
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

const onEdit = (index: number, row: TZGNode) => {
  ruleForm.id = row.id;
  ruleForm.cate_id = row.cate_id;
  ruleForm.cate_name = row.cate_name;
  ruleForm.title = row.title;
  ruleForm.url = row.url;
  ruleForm.alpha = row.alpha;
  ruleForm.logo = row.logo;
  ruleForm.logo_url = import.meta.env.VITE_API_SERVER_URL + row.logo;
  ruleForm.description = row.description;
  dialogFormVisible.value = true;
};

const onDelete = async (index: number, row: TZGNode) => {
  const result = await docNode.del(parseInt(row.id), token.value);
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

async function refreshCateOptions() {
  const foo = await docNodeCate.tree2(0, store.token, parseInt(map_id), 1, 99999);
  cateOptions.value = foo.data.items;
  cateListData.value = foo.data.items;
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
    ruleForm.logo = result.data.logo;
    ruleForm.logo_url = import.meta.env.VITE_API_SERVER_URL + result.data.logo;
    fileList.value = [];
  } else {
    ElMessage({
      message: '文件上传失败：' + result.message,
      type: 'error',
    });
  }

};

// const filterMethod = (value:string) => {
//   cateListData.value = [...cateOptions.value].filter((item) => item.label.includes(value));
// };
const filterNodeMethod = (value: string, data: TZGTree) => data.label.includes(value);

function onTreeSelect(val:any){
  console.log(val);
  ruleForm.cate_id = val;
}
</script>
<style scoped>
.container {
  padding: 20px;
}

.logo {
  height: 30px;
}

.zg-breadcrumb {
  padding: 10px 0 30px 0;
}
</style>
