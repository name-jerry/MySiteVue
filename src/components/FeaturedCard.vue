<template>
  <div class="item">
    <!--4部分,img,tag+time,title,head+btn  -->
    <img :src="imgSrc" alt="" class="one" />
    <!-- 第二行 -->
    <div class="two">
      <!-- 遍历生成tags -->
      <div class="tags">
        <a href="#" class="hover-1" v-for="(item, index) in tags" :key="index"
          >#{{ item }}</a
        >
      </div>
      <div class="time"><i class="icon">&#xe60a;</i>{{ time }} mins read</div>
    </div>
    <!-- 第三行标题 -->
    <h3 class="title hover-1">
      <a href="">{{ title }}</a>
    </h3>
    <!-- 第四行 -->
    <div class="bottom">
      <div class="head">
        <img :src="headImg" alt="" />
        <div class="text">
          <span class="head-title">{{ headTitle }}</span>
          <span class="sub">{{ headSub }}</span>
        </div>
      </div>
      <a>Read more</a>
    </div>
  </div>
</template>

<script setup>
// 引入prop,就是刚刚的数据,用结构复制的方式直接获取对象
let { imgSrc, tags, time, title, headSub, headImg, headTitle } = defineProps([
  "imgSrc",
  "tags",
  "time",
  "title",
  "head-sub",
  "head-img",
  "head-title",
]);
// 计算时间差
</script>

<style lang="scss" scoped>
.one {
  // 设置长宽比
  width: 100%;
  aspect-ratio: 2 / 1;
  object-fit: cover;
  border-radius: var(--radius-16);
}
.two {
  display: flex;
  margin: 24px 0 20px 0;
  justify-content: space-between;
  font-size: var(--fontSize-6);
  .tags {
    display: flex;
    gap: 3px;
  }
  .time {
    display: flex;
    align-items: center;
    gap: 3px;
  }
}
.title {
  color: var(--text-columbia-blue);
  font-size: var(--fontSize-2);
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  .head {
    display: flex;
    color: var(--text-slate-gray);
    gap: 10px;
    img {
      border-radius: 50%;
      width: 48px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }
    .text {
      display: flex;
      flex-direction: column;
    }
    .head-title {
      font-weight: bold;
      font-size: var(--fontSize-4);
    }
    .sub {
      font-size: var(--fontSize-6);
    }
  }
  a {
    color: var(--text-wild-blue-yonder);
    font-size: var(--fontSize-6);
  }
}
</style>
