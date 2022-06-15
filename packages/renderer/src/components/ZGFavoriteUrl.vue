<template>
  <div class="container">
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
import docFavoriteUrl from '/@/api/docFavoriteUrl';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
import type {TZGUrl} from 'store';
import type {TZGCate} from 'store';
import docCate from '/@/api/docCate';

const store = userStore();
const docs_store = docsStore();

//类型选择
const list2: Array<TZGCate> = [];
let cateOptions = ref(list2);

//搜索关键词属性
const search = ref('');
//表格列表数据
// eslint-disable-next-line no-undef
const list: Array<TZGUrl> = [];
let tableData = ref(list);

const cate_name = (cate_id: string) => cateOptions.value.filter((row) => row.id === cate_id)?.[0].name;

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const emit = defineEmits(['ZgNavClick']);

const onDelete = async (index: number, row: TZGUrl) => {
  const result = await docFavoriteUrl.del(parseInt(row.id), token.value);
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

async function refreshUrlList() {
  const result = await docFavoriteUrl.myurl(token.value, 1, 200);
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

onMounted(async () => {
  cateOptions.value = await docCate.listByLevel(3);
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
