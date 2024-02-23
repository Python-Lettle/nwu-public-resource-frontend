<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          图书馆主页
        </div>
      </template>
    </PageHeader>
    <PageMain>
      <ElDivider content-position="left">
        选择楼层
      </ElDivider>
      <HCheckList
        v-model="checkList" :options="[
          { label: '1F', value: 1 },
          { label: '2F', value: 2 },
          { label: '3F', value: 3 },
        ]" @click="changeFloor"
      />

      <div style="text-align: center; margin-top: 10px;">
        <div class="lib-table" id="libFloor1">
          <div class="lib-line">
            <div class="lib-block" @click="occupy(1,1);">1</div>
            <div class="lib-block" @click="occupy(1,2);">2</div>
            <div class="lib-block" @click="occupy(1,3);">3</div>
            <div class="lib-block" @click="occupy(1,4);">4</div>
            <div class="lib-block" @click="occupy(1,5);">5</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" @click="occupy(1,6);">6</div>
            <div class="lib-block" @click="occupy(1,7);">7</div>
            <div class="lib-block" @click="occupy(1,8);">8</div>
            <div class="lib-block" @click="occupy(1,9);">9</div>
            <div class="lib-block" @click="occupy(1,10);">10</div>
          </div>
        </div>
        <div class="lib-table" style="display: none;" id="libFloor2">
          <div class="lib-line">
            <div class="lib-block" @click="occupy(2,1);">1</div>
            <div class="lib-block" @click="occupy(2,2);">2</div>
            <div class="lib-block" @click="occupy(2,3);">3</div>
            <div class="lib-block" @click="occupy(2,4);">4</div>
            <div class="lib-block" @click="occupy(2,5);">5</div>
          </div>
        </div>
        <div class="lib-table" style="display: none;" id="libFloor3">
          <div class="lib-line">
            <div class="lib-block" @click="occupy(3,1);">1</div>
            <div class="lib-block" @click="occupy(3,2);">2</div>
            <div class="lib-block" @click="occupy(3,3);">3</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" @click="occupy(3,4);">4</div>
            <div class="lib-block" @click="occupy(3,5);">5</div>
            <div class="lib-block" @click="occupy(3,6);">6</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" @click="occupy(3,7);">7</div>
            <div class="lib-block" @click="occupy(3,8);">8</div>
            <div class="lib-block" @click="occupy(3,9);">9</div>
          </div>
        </div>
      </div>
    </PageMain>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const checkList = ref(1)
onMounted(() => {
});

function changeFloor () {
  var floor1 = document.getElementById("libFloor1");
  var floor2 = document.getElementById("libFloor2");
  var floor3 = document.getElementById("libFloor3");
  if (checkList.value == 1) {
    floor1.style.display = "inline-block"
    floor2.style.display = "none";
    floor3.style.display = "none";
  } else if (checkList.value == 2) {
    floor1.style.display = "none"
    floor2.style.display = "inline-block";
    floor3.style.display = "none";
  } else {
    floor1.style.display = "none"
    floor2.style.display = "none";
    floor3.style.display = "inline-block";
  }
}

function occupy(floor:number, seat:number)
{
  alert("占用第"+floor+"层第"+seat+"座");
}

</script>

<style scoped>
.lib-table {
  display: inline-block;
}

.lib-line {
  display:
}
.lib-block {
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 15px;
  background-color: lawngreen;
  text-align: center;
  line-height: 50px;

  display: inline-block;
}
.lib-block:hover{
  background-color: limegreen;
}
.lib-block:active{
  background-color: green;
}
</style>

<route lang="yaml">
name: libraryIndex
meta:
  title: 图书馆主页
  icon: ant-design:home-twotone
</route>
