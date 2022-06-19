<template>
  <div class="container">
    <br>
    <el-row :gutter="20">
      <el-col
        :span="6"
        :offset="6"
      >
        <el-input
          v-model="search"
          size="big"
          placeholder="搜索标题"
        />
      </el-col>
    </el-row>
    <br>
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
      />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import docUrl from '/@/api/docUrl';
import {userStore} from '/@/store/user';
import type {TZGCate, TZGUrl} from 'store';
import type {FormInstance} from 'element-plus';
import docCate from '/@/api/docCate';


const store = userStore();

//搜索关键词属性
const search = ref('');
//表格列表数据
const list: Array<TZGUrl> = [];
let tableData = ref(list);
//类型选择
const list2: Array<TZGCate> = [];
let cateOptions = ref(list2);

const cate_name = (cate_id: string) => cateOptions.value.filter((row) => row.id === cate_id)?.[0].name;

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const emit = defineEmits(['ZgNavClick']);

const token = computed(() => store.token);

watch(() => store.token, (first, second) => {
  console.log('token changed: first:'+first+'; second:'+second);
  if(first && first!==second){
    refreshUrlList();
  }
});

async function refreshUrlList() {
  const result = await docUrl.search(1, 200);
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
</script>
<style scoped>
.container {
  padding: 20px;
}

.logo {
  height: 30px;
}
</style>
