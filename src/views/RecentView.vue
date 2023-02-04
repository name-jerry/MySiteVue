<template>
  <div class="recent">
    <!-- 左右两部分,左边内容是标题,摘要,卡片组,按钮组;右边部分分为三块,都差不多就是一堆itemList -->
    <!-- 左边容器 -->
    <div class="left-wrap">
      <h2 class="title">最新文章</h2>
      <p class="sub">不要错过最新的咨询</p>
      <div class="wrap">
        <!-- 卡片组 -->
        <div class="content">
          <!-- 卡片组件 -->
          <RecentCard
            class="recent-card"
            v-for="(item, index) in postList"
            :key="index"
            :img-src="item.imgSrc"
            :title="item.title"
            :sub="item.sub"
            :tags="item.tags"
            :time="item.time"
          />
        </div>
        <!-- 分页器,自制组件 -->
        <div class="pages">
          <!-- 做个分页器 -->
          <Pages
            class="pages"
            :current="pages.current"
            :max="pages.max"
            :show="pages.show"
            @pages-click="pagesClick"
          />
        </div>
      </div>
    </div>
    <!-- 右边容器 -->
    <div class="right-wrap">
      <!-- 第一个卡片组 -->
      <div class="one card">
        <h3 class="title">热门帖子</h3>
        <PopularCard
          v-for="(item, index) in popularList"
          :key="index"
          :img-src="item.imgSrc"
          :title="item.title"
          :time="item.time"
        />
      </div>
      <!-- 第二个卡片组 -->
      <div class="two card">
        <h3 class="title">最新评论</h3>
        <template v-for="(item, index) in commentList">
          <!-- 上sub,下head+div>title+time -->
          <div class="two-wrap">
            <p class="two-sub">{{ item.sub }}</p>
            <div class="two-bottom">
              <img :src="item.imgSrc" alt="" />
              <div class="head-content">
                <div class="two-title">{{ item.title }}</div>
                <div class="time">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- 第三个卡片组 -->
      <div class="three card">
        <a href="#" class="logo"></a>
        <p class="three-sub">Follow us on instagram</p>
        <div class="three-content">
          <a href="#" v-for="(item, index) in instaList"
            ><img class="img" :src="item" alt=""
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import RecentCard from "../components/RecentCard.vue";
import Pages from "../components/Pages.vue";
import PopularCard from "../components/PopularCard.vue";
let postList = reactive([
  {
    imgSrc: "/img/recent-post-1.jpg",
    title: "Helpful Tips for Working from Home as a Freelancer",
    sub: "Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far",
    tags: ["Travel", "Lifestyle"],
    time: "3 mins",
  },
  {
    imgSrc: "/img/recent-post-2.jpg",
    title: "Helpful Tips for Working from Home as a Freelancer",
    sub: "Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far",
    tags: ["Travel", "Lifestyle"],
    time: "3 mins",
  },
  {
    imgSrc: "/img/recent-post-3.jpg",
    title: "Helpful Tips for Working from Home as a Freelancer",
    sub: "Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far",
    tags: ["Travel", "Lifestyle"],
    time: "3 mins",
  },
  {
    imgSrc: "/img/recent-post-4.jpg",
    title: "Helpful Tips for Working from Home as a Freelancer",
    sub: "Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far",
    tags: ["Travel", "Lifestyle"],
    time: "3 mins",
  },
  {
    imgSrc: "/img/recent-post-5.jpg",
    title: "Helpful Tips for Working from Home as a Freelancer",
    sub: "Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner flapped lynx far that and jeepers giggled far and far",
    tags: ["Travel", "Lifestyle"],
    time: "3 mins",
  },
]);
// 当前页,最大页,最大显示页
let pages = reactive({
  current: 1,
  max: 10,
  show: 4,
});
function pagesClick(n) {
  if (typeof n == "number") {
    pages.current = n;
  } else if (n == "left") {
    pages.current -= 1;
  } else if (n == "right") {
    pages.current += 1;
  }
}
// 右侧第一个卡片组
let popularList = reactive([
  {
    imgSrc: "/img/popular-post-1.jpg",
    title: "Creating is a privilege but it’s also a gift",
    time: "15 mins read 15 April 2022",
  },
  {
    imgSrc: "/img/popular-post-2.jpg",
    title: "Being unique is better than being perfect",
    time: "15 mins read 15 April 2022",
  },
  {
    imgSrc: "/img/popular-post-3.jpg",
    title: "Every day, in every city and town across the country",
    time: "15 mins read 15 April 2022",
  },
  {
    imgSrc: "/img/popular-post-4.jpg",
    title: "Your voice, your mind, your story, your vision",
    time: "15 mins read 15 April 2022",
  },
  {
    imgSrc: "/img/popular-post-2.jpg",
    title: "Being unique is better than being perfect",
    time: "15 mins read 15 April 2022",
  },
]);
let commentList = reactive([
  {
    sub: "“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “ ",
    imgSrc: "img/author-6.png",
    title: "Jane Cooper",
    time: "15 April 2022",
  },
  {
    sub: "“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “ ",
    imgSrc: "img/author-7.png",
    title: "Katen Doe",
    time: "15 April 2022",
  },
  {
    sub: "“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “ ",
    imgSrc: "img/author-7.png",
    title: "Barbara Cartland",
    time: "15 April 2022",
  },
]);
// three
let instaList = reactive([
  "/img/insta-post-1.png",
  "/img/insta-post-2.png",
  "/img/insta-post-3.png",
  "/img/insta-post-4.png",
  "/img/insta-post-5.png",
  "/img/insta-post-6.png",
  "/img/insta-post-7.png",
  "/img/insta-post-8.png",
  "/img/insta-post-9.png",
]);
</script>

<style lang="scss" scoped>
.recent {
  margin-block-start: 100px;
  display: flex;
  gap: 50px;
}
// 左侧容器
.left-wrap {
  // 布局时1比0.6
  flex: 1;
  .title {
    font-size: var(--fontSize-2);
    margin-bottom: 10px;
    background-image: var(--gradient-2);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
  .sub {
    font-size: var(--fontSize-3);
    margin-bottom: 70px;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
// 右侧容器
.right-wrap {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .one,
  .two,
  .three {
    border-radius: var(--radius-16);
    padding: 25px;
  }
  .title {
    display: inline-block;
    background-image: var(--gradient-2);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: var(--fontSize-3);
    margin-block-end: 40px;
    &::after {
      display: block;
      content: "";
      margin-top: 10px;
      height: 3px;
      width: 100px;
      background-color: var(--bg-carolina-blue);
    }
  }
}
.two {
  .two-wrap {
    padding-block-end: 22px;
    border-block-end: 1px solid var(--border-prussian-blue);
    margin-block-end: 22px;
  }
  .two-sub {
    margin-block-end: 20px;
    font-size: var(--fontSize-6);
    line-height: var(--lineHeight-1);
    color: var(--text-wild-blue-yonder);
  }
  img {
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
    width: 32px;
    height: 32px;
  }
  .two-bottom {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--fontSize-6);
    .time {
      font-size: var(--fontSize-7);
    }
  }
}
.three {
  .logo {
    width: 119px;
    height: 37px;
    background-image: url("img/logo.svg");
    background-size: contain;
  }
  .three-sub {
    margin-block: 5px 30px;
    font-weight: bold;
  }
  .three-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    a {
      width: 100%;
      height: 100%;
      border-radius: var(--radius-8);
      overflow: hidden;
      aspect-ratio: 1 / 1;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
@media (max-width: 992px) {
  .recent {
    flex-direction: column;
  }
}
</style>
