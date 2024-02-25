<template>
<div>
  <el-row v-for="(item,index) in knowledges">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span> {{item.subject}} </span>
          <!-- <el-button class="button" text>下载</el-button> -->
        </div>
      </template>
      <div class="resources" v-for="(text,index) in item.texts">
        <div class="text item"> {{text.txt}}---{{text.link}} </div>
      </div>
      <!-- <template #footer>Footer content</template> -->
    </el-card>
  </el-row>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';

const knowledges = ref([]);

const param = {uid: localStorage.getItem("id")};
const res = axios.post('http://localhost:8080/knowledge/detail', param)
  .then(function (response) {
    console.log(response);
    let raw_knowledge = response.data;
    for (let i=0; i<raw_knowledge.length; i++) {
      if (raw_knowledge[i].low_text != "" && raw_knowledge[i].low_text != undefined) {
        var low_text_sp = raw_knowledge[i].low_text.split(";");
        var texts = [];
        for (let j=0; j<low_text_sp.length; j+=2) {
          texts.push({txt: low_text_sp[j], link: low_text_sp[j+1]});
        }
        knowledges.value.push({
          subject: raw_knowledge[i].subject,
          texts: texts,
          });
      }

      if (raw_knowledge[i].high_text != "" && raw_knowledge[i].high_text != undefined) {
        var low_text_sp = raw_knowledge[i].high_text.split(";");
        var texts = [];
        for (let j=0; j<low_text_sp.length; j+=2) {
          texts.push({txt: low_text_sp[j], link: low_text_sp[j+1]});
        }
        knowledges.value.push({
          subject: raw_knowledge[i].subject,
          texts: texts,
          });
      }
    }
    console.log(knowledges.value);
  })
  .catch(function (error) {
    console.log(error);
  });

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
