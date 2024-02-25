<route lang="yaml">
name: home
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const tabbar = useTabbar();
const libraryInfo = ref({
  feature: [
    '实时查看图书馆座位情况',
    '利用学号实名占座',
    '占座时长受限制',
    '恶意占座会受到惩罚',
  ],
})

const wall_show = ref({
  imageVisible: false,
  index: 0,
  data: [
    'http://82.157.166.28:8093/upload/wall_show1.png',
    'http://82.157.166.28:8093/upload/wall_show2.png',
  ],
});

const classroom_show = ref({
  imageVisible: false,
  index: 0,
  data: [
    'http://82.157.166.28:8093/upload/classroom_show1.png',
    'http://82.157.166.28:8093/upload/classroom_show2.png',
  ],
});

const knowledge_show = ref({
  imageVisible: false,
  index: 0,
  data: [
    'http://82.157.166.28:8093/upload/knowledge_show1.png',
  ],
});

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
            <HButton @click="tabbar.open('/library')">
              点击使用
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
            <HButton @click="tabbar.open('/classroom')">
              点击使用
            </HButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in classroom_show.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="classroom_show.imageVisible = true; classroom_show.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="classroom_show.imageVisible" :url-list="classroom_show.data" :initial-index="classroom_show.index" @close="classroom_show.imageVisible = false" />
      </PageMain>
    </div>
    <div class="w-full flex flex-col gap-4 px-4 xl:flex-row">
      <PageMain class="ecology">
        <template #title>
          <div class="title-info">
            <img src="../assets/images/wall.png">
            <div>
              <h1 class="c-[#67c23a]">
                信息墙
              </h1>
              <h2>一款学生们都在用的信息中心</h2>
            </div>
          </div>
          <div class="ml-auto">
            <HButton @click="tabbar.open('/wall')">
              访问官网
            </HButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in wall_show.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="wall_show.imageVisible = true; wall_show.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="wall_show.imageVisible" :url-list="wall_show.data" :initial-index="wall_show.index" @close="wall_show.imageVisible = false" />
      </PageMain>
      <PageMain class="ecology">
      <template #title>
        <div class="title-info">
          <img src="../assets/images/knowledge.png">
          <div>
            <h1 class="c-[#67c23a]">
              知识库
            </h1>
            <h2>一款学生们都在用的信息中心</h2>
          </div>
        </div>
        <div class="ml-auto">
          <HButton @click="tabbar.open('/knowledge')">
            访问官网
          </HButton>
        </div>
      </template>
      <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
        <ElCarouselItem v-for="(item, index) in knowledge_show.data" :key="item">
          <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="knowledge_show.imageVisible = true; knowledge_show.index = index" />
        </ElCarouselItem>
      </ElCarousel>
      <ElImageViewer v-if="knowledge_show.imageVisible" :url-list="knowledge_show.data" :initial-index="knowledge_show.index" @close="knowledge_show.imageVisible = false" />
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
