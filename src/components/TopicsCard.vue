<template>
  <a
    class="card"
    :href="item.href"
    :style="{ 'background-image': 'url(' + item?.imgUrl + ')' }"
  >
    <div class="text-content">
      <h3 class="title">{{ item?.title }}</h3>
      <p class="sub">{{ item?.sub }}</p>
    </div>
  </a>
</template>

<script setup>
let { item } = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped>
//原作者多层嵌套之后使用img显示图片,我目前没明白这样做的好处,就直接使用背景呈现图片
.card {
  //   background-image: url("img/topic-1.png");
  background-repeat: no-repeat;
  background-size: contain;
  aspect-ratio: 507 / 618;
  border-radius: var(--radius-8);
  &:hover .text-content .title {
    color: var(--text-carolina-blue);
  }
  &::before {
    position: absolute;
    content: "";
    bottom: 0;
    width: 100%;
    height: 50%;
    background-image: var(--gradient-3);
  }
  .text-content {
    position: absolute;
    bottom: 15px;
    left: 15px;
    .title {
      color: var(--text-columbia-blue);
      font-weight: var(--weight-bold);
      margin-bottom: 5px;
    }
    .sub {
      font-size: var(--fontSize-7);
    }
  }
}
</style>
