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
          size="large"
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
        label="LOGO"
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
      />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import docNode from '/@/api/docNode';
import {userStore} from '/@/store/user';
import type {TZGNodeCate, TZGNode} from 'store';
import docNodeCate from '/@/api/docNodeCate';


const store = userStore();

//搜索关键词属性
const search = ref('');
//表格列表数据
const list: Array<TZGNode> = [];
let tableData = ref(list);
//类型选择
const list2: Array<TZGNodeCate> = [];
let cateOptions = ref(list2);

const logo_url = (url:string)=>import.meta.env.VITE_API_SERVER_URL + url;

const cate_name = (cate_id: string) => cateOptions.value.filter((row) => row.id === cate_id)?.[0]?.title;

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

watch(() => store.token, (first, second) => {
  console.log('token changed: first:'+first+'; second:'+second);
  if(first && first!==second){
    refreshNodeList();
  }
});

const router = useRouter();

async function refreshNodeList() {
  const result = await docNode.search(store.default_map_id,1, 200);
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
      await router.push('/ZGLogin');
    }
  }
}

(refreshNodeList)();

async function refreshCateOptions(){
  cateOptions.value = await docNodeCate.listByLevel(3, store.default_map_id,1,99999);
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
