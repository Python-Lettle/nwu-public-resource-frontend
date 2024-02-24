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
            <div class="lib-block" id="seat1_1" @click="occupy(1,1);">1</div>
            <div class="lib-block" id="seat1_2" @click="occupy(1,2);">2</div>
            <div class="lib-block" id="seat1_3" @click="occupy(1,3);">3</div>
            <div class="lib-block" id="seat1_4" @click="occupy(1,4);">4</div>
            <div class="lib-block" id="seat1_5" @click="occupy(1,5);">5</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" id="seat1_6" @click="occupy(1,6);">6</div>
            <div class="lib-block" id="seat1_7" @click="occupy(1,7);">7</div>
            <div class="lib-block" id="seat1_8" @click="occupy(1,8);">8</div>
            <div class="lib-block" id="seat1_9" @click="occupy(1,9);">9</div>
            <div class="lib-block" id="seat1_10" @click="occupy(1,10);">10</div>
          </div>
        </div>
        <div class="lib-table" style="display: none;" id="libFloor2">
          <div class="lib-line">
            <div class="lib-block" id="seat2_1" @click="occupy(2,1);">1</div>
            <div class="lib-block" id="seat2_2" @click="occupy(2,2);">2</div>
            <div class="lib-block" id="seat2_3" @click="occupy(2,3);">3</div>
            <div class="lib-block" id="seat2_4" @click="occupy(2,4);">4</div>
            <div class="lib-block" id="seat2_5" @click="occupy(2,5);">5</div>
          </div>
        </div>
        <div class="lib-table" style="display: none;" id="libFloor3">
          <div class="lib-line">
            <div class="lib-block" id="seat3_1" @click="occupy(3,1);">1</div>
            <div class="lib-block" id="seat3_2" @click="occupy(3,2);">2</div>
            <div class="lib-block" id="seat3_3" @click="occupy(3,3);">3</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" id="seat3_4" @click="occupy(3,4);">4</div>
            <div class="lib-block" id="seat3_5" @click="occupy(3,5);">5</div>
            <div class="lib-block" id="seat3_6" @click="occupy(3,6);">6</div>
          </div>
          <div class="lib-line">
            <div class="lib-block" id="seat3_7" @click="occupy(3,7);">7</div>
            <div class="lib-block" id="seat3_8" @click="occupy(3,8);">8</div>
            <div class="lib-block" id="seat3_9" @click="occupy(3,9);">9</div>
          </div>
        </div>
      </div>
    </PageMain>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'

const dialogVisible = ref(false);
const checkList = ref(1)

onMounted(() => {
  var res = axios.get('http://localhost:8080/library/getSeats')
    .then(function (response) {
      var seats = response.data;
      for (let floor = 0; floor < seats.length; floor++) {
        for (let seat = 0; seat < seats[floor].length; seat++) {
          if (seats[floor][seat] == 1) {
            getBlock(floor, seat).style.backgroundColor = "red";
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  var param = {uid: localStorage.getItem("id")}
  var res = axios.post('http://localhost:8080/library/getMySeat', param)
    .then(function (response) {
      var seat_data = response.data;
      if (seat_data.code == "success") {
        var floor = seat_data.floor;
        var seat = seat_data.seat;
        getBlock(floor-1, seat-1).style.backgroundColor = "skyblue";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
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

function getBlock(floor:number, seat: number) {
  let f = floor + 1;
  let s = seat + 1;
  return document.getElementById("seat"+f+"_"+s);
}

function occupy(floor:number, seat:number) {
  if (getBlock(floor-1, seat-1).style.backgroundColor == "red") {
    ElMessage({
      message: '该座位已被占用',
      type: 'warning',
    });
  } else if (getBlock(floor-1, seat-1).style.backgroundColor == "skyblue") {
    // 想要退座
    release();
  } else {
    let param = {id: localStorage.getItem("id"), floor: floor, pos: seat};
    let res = axios.post("http://localhost:8080/library/occupy", param)
      .then(function (response) {
        console.log(response)
        if (response.data.data == "fail") {
          ElMessage({
            message: "占用失败",
            type: 'warning',
          });
        } else {
          ElMessage({
            message: "占用第"+floor+"层第"+seat+"座",
            type: 'success',
          });
          getBlock(floor-1, seat-1).style.backgroundColor = "skyblue";
        }
      })
      .catch(function (error) {
        ElMessage({
          message: "占用失败,请检查网络",
          type: 'warning',
        });
      });
  }
}

// 退座
const release = () => {
  ElMessageBox.confirm(
    '你确定要释放这个座位吗',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      let param = {uid: localStorage.getItem("id")};
      let res = axios.post("http://localhost:8080/library/release", param)
        .then(function (response) {
          console.log(response)
          if (response.data.data == "fail") {
            ElMessage({
              message: "释放失败",
              type: 'warning',
            });
          } else {
            ElMessage({
              message: "释放成功",
              type: 'success',
            });
            location.reload();
          }
        })
        .catch(function (error) {
        });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消释放',
      })
    })
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
  user-select: none;
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
