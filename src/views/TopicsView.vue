<template>
  <div class="topics">
    <!-- 最外层的容器配合container类名实现统一内间距以及宽度控制-->
    <!-- 内容容器填充内容 -->
    <div class="content">
      <div class="card-content">
        <h2 class="title">灵感</h2>
        <p class="text-content">人生很短,不要错过每一次的突发奇想</p>
        <!-- 轮播图的左右按钮 -->
        <div class="group">
          <button @click="swipe.prev($event.currentTarget)" class="hover-2">
            <i class="icon">&#xe611;</i>
          </button>
          <button @click="swipe.toggleRun" class="hover-1 btn">
            {{ swipe.run ? "关闭" : "开启" }}轮播</button
          ><button @click="swipe.next($event.currentTarget)" class="hover-2">
            <i class="icon">&#xe64a;</i>
          </button>
        </div>
      </div>
      <!-- 这里可以做个组件,组件名字就叫card吧-->
      <div class="swipe-wrap">
        <!-- 轮播图 -->
        <div id="swipe">
          <template v-for="(item, index) in itemList" :key="index">
            <TopicsCard
              :class="{ hidden: index >= 3 }"
              class="card item"
              :item="item"
              target="showDemo"
              @click="showDemo"
            />
          </template>
        </div>
      </div>
    </div>
    <div :class="{ show: isShow, min: isMin }" class="demo-box">
      <iframe name="showDemo" class="demo" ref="iframe">
        <p>你的浏览器不支持该标签,建议更换火狐浏览器</p>
      </iframe>
      <i @click="isShow = false" class="icon hover-1">&#xed1e;</i>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import TopicsCard from "../components/TopicsCard.vue";
let isShow = ref(false);
let iframe = ref();
let isMin = ref(false);
function showDemo() {
  isMin.value = window.innerWidth <= 650 ? true : false;
  isShow.value = true;
  if (isMin.value) {
    setTimeout(() => rotateDemo());
  } else {
    // 清空
    iframe.value.style.cssText = "";
  }
}
function rotateDemo() {
  let i = iframe.value;
  let box = i.parentNode;
  let w = box.clientWidth;
  let h = box.clientHeight;
  i.style.cssText = ` transform:translate(${(w - h) / 2}px,${
    (h - w) / 2
  }px) rotate(90deg);width:${h}px;height:${w}px;`;
}
onMounted(() => {
  window.addEventListener("load", () => {
    if (window.innerWidth <= 650) {
      isMin.value = true;
    }
  });
});
// 思路是移到到头的时候,关闭过度效果,不断以后将最后加塞到第一个元素前,
// 然后定位到第二个,再开启过度特效过渡到到第一个,到底的方法则相反
// 这个方法会有失效的情况,不知道有没有更好的办法
// 尝试过使用order更改元素排序，这种方式再改变order的瞬间，会排序一次，再执行移动（视觉效果就是闪烁一下）
class Swipe {
  el;
  // 初始下标
  current = 0;
  // swipe子类
  children;
  // 子类个数
  length;
  // 展示的个数
  showCount = 3;
  i = 1;
  // 自动播放
  run;
  cancel;
  btnRunCancel;

  constructor(el, options = { run: true }) {
    let isDom = el instanceof HTMLElement;
    if (!isDom) throw new Error("swipe：传入的不是dom");
    this.el = el;
    this.children = el.children;
    this.length = el.children.length;
    this.move(0);
    this.run = options.run;
    if (options.run) {
      this.start();
    }
  }
  // 控制父组件移动,移动到第x个子类的左侧x左边处
  move(x) {
    let distance = this.children[x].offsetLeft;
    this.el.style.transform = `translateX(${-distance}px)`;
  }
  // 控制父组件移动效果
  toggle(isTransition) {
    if (isTransition) {
      this.el.style.transition = ".5s ease";
    } else {
      this.el.style.transition = "none";
    }
  }
  // 测试点击右键
  next(e) {
    // 有500ms的过度动画这段事件设置不能再点击按钮

    if (e) {
      e.disabled = true;
      if (this.run) this.paused();
    }
    // 如果已经到头的话
    if (this.current + this.showCount == this.length) {
      // 设置过度效果
      this.toggle(false);
      // 这里时不断的把最前面的元素加到最后一个元素后面
      this.el.append(this.children[0]);
      // 先切换到到倒数第二个的位置,然后再过度到最后一个元素
      this.move(this.current - 1);
      setTimeout(() => {
        this.toggle(true);
        this.move(this.current);
      }, 2);
    } else {
      this.toggle(true);
      this.current++;
      this.move(this.current);
    }
    // 执行完动画之后设置可以点击按钮
    setTimeout(() => {
      if (e) {
        e.disabled = false;
        // 如果开启自动播放功能
        if (this.run) {
          // 防抖
          if (this.btnRunCancel) clearTimeout(this.btnRunCancel);
          this.btnRunCancel = setTimeout(() => {
            this.start();
          }, 1000);
        }
      }
    }, 500);
  }
  prev(e) {
    // 有500ms的过度动画这段事件设置不能再点击按钮
    if (e) {
      e.disabled = true;
      if (this.run) this.paused();
    }
    // 如果已经到头的话,prev是通过current判断的
    if (this.current == 0) {
      // 设置过度效果
      this.toggle(false);
      // 这里时不断的把最后的元素加到第一个元素前面
      this.el.insertBefore(this.children[this.length - 1], this.children[0]);
      // 偶尔会有闪烁,动画失效
      this.i++;
      // 移动一格
      this.move(1);
      setTimeout(() => {
        this.toggle(true);
        this.move(0);
      }, 1);
    } else {
      this.toggle(true);
      this.current--;
      this.move(this.current);
    }
    // 执行完动画之后设置可以点击按钮
    setTimeout(() => {
      if (e) {
        e.disabled = false;
        // 如果开启自动播放功能
        if (this.run) {
          // 防抖
          if (this.btnRunCancel) clearTimeout(this.btnRunCancel);
          this.btnRunCancel = setTimeout(() => {
            this.start();
          }, 1000);
        }
      }
    }, 500);
  }
  start(interval = 2000) {
    if (!this.cancel) this.next();
    this.cancel = setInterval(() => {
      this.next();
    }, interval);
  }
  paused() {
    clearInterval(this.cancel);
    this.cancel = null;
  }
  toggleRun() {
    if (this.run) {
      this.paused();
    } else {
      this.start();
    }
    this.run = !this.run;
  }
}
let swipe = ref({});
onMounted(() => {
  swipe.value = new Swipe(document.getElementById("swipe"));
  window.addEventListener("resize", () => {
    swipe.value.move(swipe.value.current);
  });
});
let itemList = reactive([
  {
    imgUrl: "/img/topic-1.png",
    title: "快递系统-用户端",
    sub: "后端非https协议,本网页无法与其后端通讯",
    href: "https://zhangruisite.com/expressage",
  },
  {
    imgUrl: "/img/topic-5.png",
    title: "烟花",
    sub: "祝大家新年快乐",
    href: "/",
  },
  {
    imgUrl: "/img/topic-2.png",
    title: "快递系统-后台",
    sub: "后端非https协议,本网页无法与其后端通讯",
    href: "https://zhangruisite.com/expressage-admin",
  },
  {
    imgUrl: "/img/topic-3.png",
    title: "canvas小游戏",
    sub: "每个少年都有一个坦克大战的梦,开发中...",
    href: "https://zhangruisite.com/tank",
  },
  {
    imgUrl: "/img/topic-4.png",
    title: "暂无",
    sub: "0",
    href: "#",
  },
]);
</script>

<style lang="scss" scoped>
// iframe
.demo-box {
  min-width: 100%;
  height: 0;
  visibility: hidden;
  overflow: hidden;
  .icon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    visibility: visible;
  }
}
.demo {
  width: 100%;
  height: 100%;
  transition: height 1s ease;
}
.demo-box.show {
  height: 400px;
}
.demo-box.show.min {
  aspect-ratio: 9 / 16;
  width: 100%;
  height: auto;
}
.demo-box.show .demo {
  visibility: visible;
}
.topics {
  background: var(--bg-oxford-blue);
}
.content {
  border: 1px solid rgb(30, 63, 87);
  border-radius: var(--radius-8);
  padding: 24px;
  //做个居中
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

// flex和grid最大的不同就是flex要对每个元素设置位置,grid确实在容器中就能绝对每个元素的位置,他这里把左右分成0.3:1分割大小
.card-content {
  flex: 0.3;
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: var(--text-columbia-blue);
    line-height: var(--lineHeight-1);
  }
  p {
    margin: 15px 0 20px 0;
    font-size: var(--fontSize-6);
    color: var(--text-wild-blue-yonder);
  }
  .group {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      padding: 0;
      background: var(--bg-prussian-blue);
      color: white;
    }
    .btn {
      width: max-content;
      border-radius: 5px;
      padding: 0 10px;
    }
  }
}
.swipe-wrap {
  flex: 1;
  overflow-x: hidden;
  #swipe {
    display: flex;
    gap: 20px;
    transition: none;
    --count: 3;
    .card {
      min-width: calc(100% / var(--count) - 12px);
    }
  }
}

@media (max-width: 992px) {
  .content {
    flex-direction: column;
    align-items: stretch;
    #swipe {
      --count: 3;
    }
  }
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
    align-items: stretch;
    #swipe {
      --count: 2;
    }
  }
}
@media (max-width: 575px) {
  .content {
    flex-direction: column;
    align-items: stretch;
    #swipe {
      --count: 1;
      .item {
        min-height: 323px;
      }
    }
  }
}
</style>
