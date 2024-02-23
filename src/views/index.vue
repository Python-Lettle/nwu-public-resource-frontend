<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const libraryInfo = ref({
  feature: [
    '实时查看图书馆座位情况',
    '利用学号实名占座',
    '占座时长受限制',
    '恶意占座会受到惩罚',
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://fantastic-admin.gitee.io/preview1.png',
    'https://fantastic-admin.gitee.io/preview2.png',
    'https://fantastic-admin.gitee.io/preview3.png',
    'https://fantastic-admin.gitee.io/preview4.png',
    'https://fantastic-admin.gitee.io/preview5.png',
    'https://fantastic-admin.gitee.io/preview6.png',
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.gitee.io/preview1.png',
    'https://one-step-admin.gitee.io/preview2.png',
    'https://one-step-admin.gitee.io/preview3.png',
    'https://one-step-admin.gitee.io/preview4.png',
    'https://one-step-admin.gitee.io/preview5.png',
    'https://one-step-admin.gitee.io/preview6.png',
  ],
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <PageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 校园公共资源系统
        </div>
      </template>
      <template #content>
        <div class="text-sm/6">
          <div>
            这是一款<b class="text-emphasis">面向大学生</b>的公共资源管理系统
          </div>
          <div>
            注：该系统目前处于测试版本，遇到任何问题欢迎联系作者
          </div>
        </div>
      </template>
    </PageHeader>
    <div class="w-full flex flex-col gap-4 px-4 xl:flex-row">
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="../assets/images/library.png">
            <div>
              <h1 class="c-[#41b883]">
                图书馆系统
              </h1>
              <h2>一款简单好用的图书馆占座系统</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('/')">
              点击使用
            </HButton>
            <HButton outline class="ml-2" @click="open('/')">
              备用地址
            </HButton>
          </div>
        </template>
        <ul class="m-0 pr-8 text-size-sm leading-6">
          <li v-for="item in libraryInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="../assets/images/classroom.png">
            <div>
              <h1 class="c-[#e60000]">
                教室占用系统
              </h1>
              <h2>一款面向学生会、教师等人员开展活动所需教室资源申请的系统</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('/')">
              点击使用
            </HButton>
            <HButton outline class="ml-2" @click="open('/')">
              备用地址
            </HButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in fantasticAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="fantasticAdminInfo.imageVisible = true; fantasticAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="fantasticAdminInfo.imageVisible" :url-list="fantasticAdminInfo.data" :initial-index="fantasticAdminInfo.index" @close="fantasticAdminInfo.imageVisible = false" />
      </PageMain>
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="https://one-step-admin.gitee.io/logo.png">
            <div>
              <h1 class="c-[#67c23a]">
                信息墙
              </h1>
              <h2>一款学生们都在用的信息中心</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="open('https://one-step-admin.gitee.io')">
              访问官网
            </HButton>
            <HButton outline class="ml-2" @click="open('https://one-step-admin.github.io')">
              备用地址
            </HButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in oneStepAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="oneStepAdminInfo.imageVisible = true; oneStepAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="oneStepAdminInfo.imageVisible" :url-list="oneStepAdminInfo.data" :initial-index="oneStepAdminInfo.index" @close="oneStepAdminInfo.imageVisible = false" />
      </PageMain>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.ecology {
  --at-apply: flex-1 m-0;

  :deep(.title-container) {
    --at-apply: flex items-center justify-between flex-wrap gap-4;

    .title-info {
      --at-apply: flex items-center gap-4;

      img {
        --at-apply: block w-12 h-12;
      }

      h1 {
        --at-apply: m-0 text-2xl;
      }

      h2 {
        --at-apply: m-0 text-base text-stone-5 font-normal;
      }
    }
  }
}
</style>
