<template>
  <div>
    <PageMain>
      <div class="select-area">
        <ElDivider content-position="left">
          申请占用教室
        </ElDivider>
        <el-select v-model="building_value" class="m-2" placeholder="教学楼" style="width: 240px">
          <el-option v-for="item in building_options" :key="item.value" :label="item.label" :value="item.value" @click="canPickFloor"/>
        </el-select>
        <el-select v-model="floor_value" :disabled="forbidFloor" class="m-2" placeholder="楼层" style="width: 240px">
          <el-option v-for="item in floor_options" :key="item.value" :label="item.label" :value="item.value" @click="canPickClr"/>
        </el-select>
        <el-select v-model="classroom_value" :disabled="forbidClassroom" class="m-2" placeholder="楼层" style="width: 240px">
          <el-option v-for="item in classroom_options" :key="item.value" :label="item.label" :value="item.value" @click="canSubmit"/>
        </el-select>
      </div>

      <el-button :disabled="forbidSubmitBtn" style="margin-left: 15px; margin-top: 7px;" type="primary" @click="dialogVisible = true;">申请占用</el-button>
    </PageMain>

    <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="500"
        :before-close="handleClose"
        draggable
      >
        <span>申请成功</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">返回修改</el-button>
            <el-button type="primary" @click="dialogVisible = false;">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false);

const tabbar = useTabbar();

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("即将关闭对话框")
    .then(() => {
      tabbar.close("/");
      done();
    })
    .catch(() => {
      // catch error
    })
}


const building_options = ref([
  { value: 1, label: '1号楼' },
  { value: 2, label: '2号楼' },
  { value: 3, label: '3号楼' },
  { value: 4, label: '4号楼' },
  { value: 5, label: '5号楼' },
  { value: 6, label: '6号楼' },
  { value: 7, label: '7号楼' },
  { value: 8, label: '8号楼' },
  { value: 9, label: '9号楼' },
]);
const building_value = ref('');

const floor_options = ref([
  { value: 1, label: '1F' },
  { value: 2, label: '2F' },
  { value: 3, label: '3F' },
  { value: 4, label: '4F' },
  { value: 5, label: '5F' },
]);
const floor_value = ref('');

const classroom_options = ref([
  { value: 1, label: '1101' },
  { value: 2, label: '1102' },
  { value: 3, label: '1103' },
  { value: 4, label: '1104' },
  { value: 5, label: '1105' },
  { value: 6, label: '1106' },
  { value: 7, label: '1107' },
  { value: 8, label: '1108' },
  { value: 9, label: '1109' },
  { value: 10, label: '1110' },
]);
const classroom_value = ref('');

var forbidFloor = true;
function canPickFloor () {forbidFloor = false;}

var forbidClassroom = true;
function canPickClr () {forbidClassroom = false;}

var forbidSubmitBtn = true;
function canSubmit () {forbidSubmitBtn = false;}

</script>

<style scoped>
</style>

<route lang="yaml">
name: classroomIndex
meta:
  title: 教室占用系统主页
  icon: ant-design:home-twotone
</route>
