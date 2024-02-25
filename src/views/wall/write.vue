<template>
<div>
  <PageMain>
    <ElDivider content-position="left">
      编辑信息
    </ElDivider>
    <ElInput class="input-area" v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
    <ElButton class="submit-btn" type="primary" @click="submit">
      提交
    </ElButton>
    <ElButton class="clear-btn" type="danger" @click="clear">
      清空
    </ElButton>
  </PageMain>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
const textarea = ref();
const tabbar = useTabbar();

function submit() {
  var param = {
    uid: localStorage.getItem("id"),
    text: textarea.value
  }
  var res = axios.post("http://localhost:8080/wall/publish_article", param)
    .then(function (response) {
      alert("提交成功，等待审核");
      tabbar.close("/wall");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function clear() {
  textarea.value = "";
}
</script>

<style scoped>
  .input-area input{
    height: 100px;
  }

  .submit-btn {
    margin-top: 10px;
    margin-left: 15px;
  }

  .clear-btn {
    margin-top: 10px;
    background-color: red;
  }
</style>
