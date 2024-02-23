<script setup lang="ts">
const tabbar = useTabbar();
function publish() {
  tabbar.open('/wall/write');
}

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
    <div class="message-area">
      <PageMain>
        <div class="content">我发表了第二篇文章！</div>
        <div class="user-name">Zaishuiwufenzhong</div>
      </PageMain>
      <PageMain>
        <div class="content">我发表了第一篇文章！</div>
        <div class="user-name">Lettle</div>
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
</style>

<route lang="yaml">
name: wallIndex
meta:
  title: 信息墙主页
  icon: ant-design:home-twotone
</route>
