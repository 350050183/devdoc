<template>
  <div class="container">
    <div class="zg-breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">
          首页
        </el-breadcrumb-item>
        <el-breadcrumb-item>收藏的网址</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table
      :data="filterTableData"
      style="width: 100%"
    >
      <el-table-column
        label="收藏夹"
        prop="map_name"
        width="160"
      >
        <template #default="scope">
          {{ (scope.row.map_name) }}
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="cate_name"
        width="160"
      >
        <template #default="scope">
          {{ (scope.row.cate_name) }}
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
        label="logo"
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
  </div>
</template>

<script lang="ts" setup>
import docFavoriteNode from '/@/api/docFavoriteNode';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
import type {TZGNode,TZGNodeCate,TZGTree} from 'store';
import docNodeCate from '/@/api/docNodeCate';
import { ArrowRight } from '@element-plus/icons-vue';

const store = userStore();
const docs_store = docsStore();

//类型选择
const list2: Array<TZGTree> = [];
let cateOptions = ref(list2);

//搜索关键词属性
const search = ref('');
//表格列表数据
// eslint-disable-next-line no-undef
const list: Array<TZGNode> = [];
let tableData = ref(list);

const logo_url = (url:string)=>import.meta.env.VITE_API_SERVER_URL + url;

// const router = useRouter();
// const route = useRoute();

const map_id = store.default_map_id;

function findCateName(cate_id:string){
  return findCateNameRecursive(cateOptions.value,cate_id);
}

function findCateNameRecursive(cate_list:TZGTree[],cate_id:string):string{
  for(const idx in cate_list){
    const item = cate_list[idx];
    if(item.id === cate_id){
      return item.label;
    }else if( item.children && item.children.length>0){
      console.log('recursive');
      console.log(item.children);
      const found = findCateNameRecursive(item.children,cate_id);
      if(found!=''){
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

const onDelete = async (index: number, row: TZGNode) => {
  const result = await docFavoriteNode.del(parseInt(row.id), token.value);
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

watch(() => docs_store.isNeedRefreshFavUrl, (first, second) => {
  console.log('fav changed: first:'+first+'; second:'+second);
  if(first){
    refreshUrlList();
  }
});

const router = useRouter();

async function refreshUrlList() {
  const result = await docFavoriteNode.myurl(token.value, 1, 200);
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

(refreshUrlList)();

onMounted(async () => {
  const result = await docNodeCate.tree2(0, store.token, parseInt(map_id));
  if(result.success){
    cateOptions.value = result.data.items;
  }
});

</script>
<style scoped>
.container {
  padding: 20px;
}

.logo {
  height: 30px;
}
</style>
