<template>
  <div class="wrap">
    <!-- 左侧img右侧title+time -->
    <img :src="imgSrc" alt="" />
    <div class="right">
      <h4 class="title hover-1">
        <a href="">{{ title }}</a>
      </h4>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup>
// 引入资源
let { imgSrc, title, time } = defineProps(["imgSrc", "title", "time"]);
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  gap: 10px;
  margin-block-start: 20px;
}
img {
  flex: 0;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
}
.title {
  flex: 1;
  color: var(--text-columbia-blue);
}
.time {
  font-size: var(--fontSize-6);
  color: var(--text-slate-gray);
  margin-top: 12px;
  margin-bottom: 20px;
}
</style>
