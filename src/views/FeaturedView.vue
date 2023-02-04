<template>
  <div class="featured">
    <!-- 布局h2,sub,div各占一行,div中5个item,2个占比50%,3个占比30% ,gap:30px,通过设置弹性占比,wrap实现自动换行,item另外做个组件-->
    <h2 class="title">精选</h2>
    <p class="sub">有特色和高评价的文章</p>
    <div class="content">
      <FeaturedCard
        v-for="item in cardList"
        :key="item.id"
        :img-src="item.imgSrc"
        :tags="item.tags"
        :time="item.time"
        :title="item.title"
        :head-img="item.headImg"
        :head-title="item.headTitle"
        :head-sub="item.headSub"
        class="item card"
      />
    </div>
    <a href="#" class="btn hover-3">查看更多<i class="icon">&#xe64a;</i></a>
  </div>
</template>

<script setup>
import FeaturedCard from "../components/FeaturedCard.vue";
import { reactive } from "vue";
let cardList = reactive([
  {
    id: 0,
    imgSrc: "/img/featured-1.png",
    tags: ["Travel", "Lifestyle"],
    time: "3",
    title: "Self-observation is the first step of inner unfolding ",
    headImg: "/img/author-1.png",
    headTitle: "Joseph",
    headSub: "25 Nov 2022",
  },
  {
    id: 1,
    imgSrc: "/img/featured-2.png",
    tags: ["Design", "Movie"],
    time: "6",
    title: "Self-observation is the first step of inner unfolding ",
    headImg: "/img/author-1.png",
    headTitle: "Joseph",
    headSub: "25 Nov 2022",
  },
  {
    id: 2,
    imgSrc: "/img/featured-3.png",
    tags: ["Design", "Movie"],
    time: "6",
    title: "Self-observation is the first step of inner unfolding ",
    headImg: "/img/author-1.png",
    headTitle: "Joseph",
    headSub: "25 Nov 2022",
  },
  {
    id: 3,
    imgSrc: "/img/featured-4.png",
    tags: ["Design", "Movie"],
    time: "6",
    title: "Self-observation is the first step of inner unfolding ",
    headImg: "/img/author-1.png",
    headTitle: "Joseph",
    headSub: "25 Nov 2022",
  },
  {
    id: 4,
    imgSrc: "/img/featured-5.png",
    tags: ["Design", "Movie"],
    time: "6",
    title: "Self-observation is the first step of inner unfolding ",
    headImg: "/img/author-1.png",
    headTitle: "Joseph",
    headSub: "25 Nov 2022",
  },
]);
</script>

<style lang="scss" scoped>
.featured {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  .title {
    font-size: var(--fontSize-2);
    // 这里为什么颜色和原作品不一样,是因为这个块的大小不一样,虽然显示的内容一样,
    // 但是我的是占满了整行,所以背景颜色也被拉伸了,设置inline-block也没用,因为我父级用了flex,默认交叉行是拉伸的
    background-image: var(--gradient-1);
    background-repeat: no-repeat;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 10px;
  }
  .sub {
    font-size: var(--fontSize-3);
    margin-bottom: 70px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.item {
  // 组件内部使用的css变量,改变父组件的css变量控制每个组件的title文字大小
  --fontSize-2: 2rem;
  transition: var(--transition-1);
  border-radius: var(--radius-16);
  // 设置宽度
  // 间隔为30所以要每个项目减去15
  flex: 1 1 calc(32% - 15px);
  padding: 20px;
  border-radius: var(--radius-16);
  &:hover {
    transform: translateY(-5px);
  }
}
// 设置头两个宽度为50%
.item:is(:nth-of-type(-n + 2)) {
  --fontSize-2: 2.4rem;
  flex: 1 1 calc(50% - 15px);
}
.btn {
  margin: 30px auto 0;
  padding: 18px 30px;
  border-radius: var(--radius-pill);
}
@media (max-width: 1200px) {
}
@media (max-width: 992px) {
  .item.card {
    flex: 1 1 calc(50% - 15px);
  }
}
@media (max-width: 768px) {
  .item.card {
    flex: 1 1 100%;
  }
}
</style>
