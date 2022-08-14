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
        <el-breadcrumb-item :to="{path:'/ZGNode/'+map_id}">
          网址管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          网址类别
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="custom-tree-container">
      <div class="custom-tree-container-inner">
        <el-button @click="onAddCate">
          增加顶级类别
        </el-button>
        <br>
        <el-tree
          :data="dataSource"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <span class="custom-tree-node-label">{{ node.label }}</span>
              <span>
                <a
                  v-if="data.level<3"
                  @click="append(node, data)"
                > <el-icon><CirclePlusFilled /></el-icon> 增加 </a>
                <a
                  v-if="data.is_mine===1"
                  @click="edit(node, data)"
                > <el-icon><Tickets /></el-icon> 编辑 </a>
                <a
                  v-if="data.children.length<=0 && data.is_mine===1"
                  class="zg-delete"
                  @click="remove(node, data)"
                > <el-icon><CloseBold /></el-icon> 删除 </a>
              </span>
            </div>
          </template>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node';
import docNodeCate from '/@/api/docNodeCate';
import {userStore} from '/@/store/user';
import {docsStore} from '/@/store/docs';
import type {TResult, TResultOfOp,TZGTree} from 'store';
import { ArrowRight } from '@element-plus/icons-vue';



const store = userStore();
const token = computed(() => store.token);
const docs_store = docsStore();

const route = useRoute();
const map_id = route.params.id as string;

function onAddCate(){
  ElMessageBox.prompt('请输入类别名称', '增加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /[\u4e00-\u9fa5_a-zA-Z0-9 ]+/,
    inputErrorMessage: '不正确的名称',
  })
    .then(({ value }) => {
      doAdd2(value);
    });
}

const append = (node:Node,data: TZGTree) => {
  ElMessageBox.prompt('请输入类别名称', '增加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
      /[\u4e00-\u9fa5_a-zA-Z0-9 ]+/,
    inputErrorMessage: '不正确的名称',
  })
    .then(({ value }) => {
     doAdd(node,data,value);
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Input canceled',
      // });
    });
};

async function doAdd(node:Node,data:TZGTree,cate_name:string){
  if(cate_name){
    docs_store.isNeedRefreshCateOption = false;
    const result:TResultOfOp = await docNodeCate.add(cate_name, node.data.id, token.value, parseInt(map_id));
    if (result.success) {
      ElMessage({
        message: '添加成功。',
        type: 'success',
      });

      const newChild = { id: (result.data.id), level:(result.data.level),is_mine:1, label: cate_name, children: [] };
      if (!data.children) {
        data.children = [];
      }
      data.children.push(newChild);
      dataSource.value = [...dataSource.value];
      docs_store.isNeedRefreshCateOption = true;
    } else {
      ElMessage({
        message: '添加失败：' + result.message,
        type: 'error',
      });
    }
  }
}

async function doAdd2(cate_name:string){
  if(cate_name){
    docs_store.isNeedRefreshCateOption = false;
    const result:TResultOfOp = await docNodeCate.add(cate_name, 0, token.value, parseInt(map_id));
    if (result.success) {
      ElMessage({
        message: '添加成功。',
        type: 'success',
      });

      const newChild = { id: (result.data.id), level:(result.data.level),is_mine:1, label: cate_name, children: [] };

      dataSource.value.push(newChild);

      dataSource.value = [...dataSource.value];
      docs_store.isNeedRefreshCateOption = true;
    } else {
      ElMessage({
        message: '添加失败：' + result.message,
        type: 'error',
      });
    }
  }
}

const edit = (node:Node,data: TZGTree) => {

  ElMessageBox.prompt('请输入类别名称', '修改', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: data.label,
    inputPattern:
      /[\u4e00-\u9fa5_a-zA-Z0-9 ]+/,
    inputErrorMessage: '不正确的名称',
  })
    .then(({ value }) => {
      doEdit(node,data,value);
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Input canceled',
      // });
    });
};

async function doEdit(node:Node,data:TZGTree,cate_name:string){
  if(cate_name){
    docs_store.isNeedRefreshCateOption = false;
    const result:TResultOfOp = await docNodeCate.edit( node.data.id, cate_name, token.value, parseInt(map_id));
    if (result.success) {
      ElMessage({
        message: '修改成功。',
        type: 'success',
      });

      const newChild = { id: data.id, level:data.level, is_mine:data.is_mine, label: cate_name, children: data.children };
      if (!data.children) {
        data.children = [];
      }
      const parent = node.parent;
      const children: TZGTree[] = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      //children.splice(index, 1);
      children[index] = newChild;

      dataSource.value = [...dataSource.value];
      docs_store.isNeedRefreshCateOption = true;
    } else {
      ElMessage({
        message: '修改失败：' + result.message,
        type: 'error',
      });
    }
  }
}

const remove = (node: Node, data: TZGTree) => {
  ElMessageBox.confirm(
    '确定要删除类别',
    '警告',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(() => {
      doRemove(node,data);
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // });
    });

};

async function doRemove(node: Node, data: TZGTree){
  const parent = node.parent;
  const children: TZGTree[] = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  docs_store.isNeedRefreshCateOption = false;
  const result:TResult = await docNodeCate.del(data.id, token.value);
  if (result.success) {
    ElMessage({
      message: '删除成功。',
      type: 'success',
    });
    children.splice(index, 1);
    dataSource.value = [...dataSource.value];

    docs_store.isNeedRefreshCateOption = true;
  } else {
    ElMessage({
      message: '删除失败：' + result.message,
      type: 'error',
    });
  }
}

async function refreshCate(){
  const result = await docNodeCate.tree2(0, token.value, parseInt(map_id));
  if(result.success){
    dataSource.value = result.data.items;
  }
}

const dataSource = ref<TZGTree[]>([]);
onMounted(refreshCate);

watch(() => docs_store.isNeedRefreshCate, (first, second) => {
  console.log('cate changed: first:'+first+'; second:'+second);
  if(first){
    refreshCate();
  }
});
</script>

<style>
.custom-tree-container{
  position: relative;
  display: flex;
  align-items: center;
  justify-items: center;
  text-align: center;
}

.custom-tree-container-inner{
  width:500px;
  margin:0 auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node a{
  float:left;
  width:100px;
}
.custom-tree-node-label{
  /*width:400px;*/
}
.zg-title{
  font-size:24px;
}
.zg-delete{
  color:red;
}
.container {
  padding: 20px;
}
.zg-breadcrumb{
  padding:10px 0 30px 0;
}
</style>
