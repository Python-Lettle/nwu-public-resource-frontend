<script setup lang="ts">
import axios from 'axios';

const tabbar = useTabbar();
function publish() {
  tabbar.open('/wall/write');
}

var contents = ref();

var param = {num: 10}
var res = axios.post('http://localhost:8080/wall/getArticle', param)
  .then(function (response) {
    contents.value = response.data.data;
    contents.value = contents.value.reverse();
    console.log(contents);
  })
  .catch(function (error) {
    console.log(error);
  });

// var testContent = [
//   {article_text: "我发表了第一篇文章！", article_username:"Lettle"},
//   {article_text: "我发表了第二篇文章！", article_username:"Zaishuiwufenzhong"}
// ];
// testContent = testContent.reverse();


</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          信息墙主页
        </div>
      </template>
    </PageHeader>
    <div class="message-area" >
      <PageMain v-for="(item,index) in contents">
        <div class="content"> {{item.article_text}} </div>
        <div class="user-name">发布者:  {{item.article_username}} </div>
        <div class="publish-time">发表时间: {{item.publish_time}} </div>
      </PageMain>
    </div>

    <FixedActionBar>
      <ElButton @click="publish">
        发布信息
      </ElButton>
    </FixedActionBar>
  </div>
</template>

<style scoped>
.content {
  font-size: 16px;
}

.user-name {
  margin-top: 20px;
}

.publish-btn {
  border: 0;
  border-radius: 10px;
  font-size: 16px;
  background-color: deepskyblue;
}
.publish-btn:hover {
  background-color: dodgerblue;
}
.publish-btn:active {
  background-color: royalblue;
}

.publish-time {
  color: gray;
}
</style>

<route lang="yaml">
name: wallIndex
meta:
  title: 信息墙主页
  icon: ant-design:home-twotone
</route>
