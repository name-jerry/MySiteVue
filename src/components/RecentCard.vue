<template>
  <div class="item">
    <!--左侧img,右侧:badge,title,sub tags+time  -->
    <img :src="imgSrc" alt="" />
    <!-- 右侧-->
    <div class="right-warp">
      <!-- badge -->
      <a href="" class="badge">工作提示</a>
      <!-- 标题 -->
      <h3 class="title hover-1">
        <a href="" class="lines" style="--lines: 2">{{ title }}</a>
      </h3>
      <!-- 简介 -->
      <p class="sub lines" style="--lines: 3">{{ sub }}</p>
      <!-- 底部标签 -->
      <div class="tags-warp">
        <!-- 遍历生成tags -->
        <div class="tags">
          <a href="#" class="hover-1" v-for="(item, index) in tags" :key="index"
            >#{{ item }}</a
          >
        </div>
        <div class="time"><i class="icon">&#xe60a;</i>{{ time }} 阅读</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入prop,就是刚刚的数据,用结构复制的方式直接获取对象
let { imgSrc, title, sub, tags, time } = defineProps([
  "imgSrc",
  "title",
  "sub",
  "tags",
  "time",
]);
// 计算时间差
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  &:hover img {
    transform: translateY(-2px);
  }
}
//左图
img {
  // flex使用数字的时候会覆盖width属性
  flex: 0.7;
  // 设置长宽比
  aspect-ratio: 271 / 251;
  object-fit: cover;
  border-radius: var(--radius-16);
  transition: var(--transition-1);
}
.right-warp {
  flex: 1;
  padding: 0 10px;

  .badge {
    padding: 4px 15px;
    border-radius: var(--radius-pill);
    font-size: var(--fontSize-8);
    color: white;
    background: var(--bg-prussian-blue);
    // 和原文字体不同才导致的视觉效果不同er
    font-weight: bolder;
    &:hover {
      transform: translateY(-2px);
      background: var(--bg-carolina-blue);
    }
  }
  .title {
    color: var(--text-columbia-blue);
    font-size: 2.4rem;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  // 设置最大显示行数，有没有办法自适应呢
  .sub {
    color: var(--text-wild-blue-yonder);
    font-size: var(--fontSize-6);
  }
}
.tags-warp {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0px;
  justify-content: space-between;
  font-size: var(--fontSize-6);
  .tags {
    display: flex;
    gap: 15px;
  }
  .time {
    display: flex;
    align-items: center;
    gap: 3px;
  }
}
@media (max-width: 575px) {
  .item {
    flex-direction: column;
    align-items: center;
  }
}
</style>
