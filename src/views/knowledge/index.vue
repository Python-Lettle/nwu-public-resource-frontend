<template>
<div>
  <el-row>
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>机器学习PPT</span>
          <el-button class="button" text>下载</el-button>
        </div>
      </template>
      <div class="text item">· 大学生们都在用的机器学习知识</div>
      <div class="text item">· 研究生不可避免的基础技术</div>
      <div class="text item">· 全方面讲述机器学习领域知识</div>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>数据结构</span>
          <el-button class="button" text>下载</el-button>
        </div>
      </template>
      <div class="text item">· 计算机领域基础知识</div>
      <div class="text item">· 考研必备资料</div>
      <div class="text item">· 由易到难的学习过程</div>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
  </el-row>
</div>
</template>

<script>
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>

<route lang="yaml">
name: knowledgeIndex
meta:
  title: 知识库主页
  icon: ant-design:home-twotone
</route>
