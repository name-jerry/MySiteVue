<template>
  <div class="home">
    <!-- div会默认继承父级的样式,为了易于阅读,这里再次提供一个类名-->
    <div class="hero-content flex1">
      <p class="title">你好 !</p>
      <p class="sub">
        我是<span
          >{{ typingString }}
          <!-- 设置一个空白div -->
          <div
            class="typing"
            :class="{ ani: ani }"
            data-name="main"
            @animationend="updateString"
          ></div
        ></span>
      </p>
      <p class="text-content">欢迎来到我的频道,这里是创作开始的地方!</p>
      <div class="wrap">
        <input placeholder="请输入你的留言" v-model="sendString" /><button
          class="btn-primary hover-3"
          @click="send"
        >
          发送给我 <i class="icon">&#xe64a;</i>
        </button>
      </div>
    </div>
    <div class="hero-banner flex1">
      <div class="memo">
        <h3>备忘路</h3>
        <!-- 用于实现切换 -->
        <div class="memo-content" :style="{ transform: move }">
          <!-- 未完成 -->
          <div class="tips-wrap">
            <template v-for="item in tipList">
              <Tip
                v-if="!item.isEnd"
                :key="item.id"
                :tip="item"
                @update="tipUpdate"
              ></Tip>
            </template>
          </div>
          <!-- 已完成 -->
          <div class="tips-wrap">
            <template v-for="item in tipList">
              <Tip
                v-if="item.isEnd"
                :key="item.id"
                :tip="item"
                @update="tipUpdate"
              ></Tip>
            </template>
          </div>
        </div>
        <div class="group">
          <button :class="{ active: tipNum == 0 }" @click="tipNum = 0">
            待办
          </button>
          <button :class="{ active: tipNum == 1 }" @click="tipNum = 1">
            已结
          </button>
        </div>
      </div>
      <!-- 雪花做了个绝对定位便有上下移动无限循环初始top为50px，right40px -->
      <img src="/img/pattern-2.svg" class="shape-1" width="27" height="26" />
      <img src="/img/pattern-3.svg" class="shape-2" width="27" height="26" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import Tip from "../components/Tip.vue";
let texts = ["前端工程师", "网页设计师", "前进的旅人"];

let typingString = ref(texts[0]);
let ani = ref(true);
// 用数字去判断分区,扩展性更强
let tipNum = ref(0);
let move = computed(() => `translateX(${-50 * tipNum.value}%)`);
// 计划表数据获取
let tipList = reactive([
  {
    id: "0",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: false,
    endTime: "",
  },
  {
    id: "1",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
  {
    id: "2",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
  {
    id: "3",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
  {
    id: "4",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
  {
    id: "5",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
  {
    id: "6",
    title: "完成一个计划表",
    createTime: Date.now(),
    isEnd: true,
    endTime: "",
  },
]);
let sendString = ref("");
function tipUpdate(tip) {
  tipList[tip.id] = tip;
}
function send() {
  location.href =
    "https://zhangruisite.com/leave-word/?sendWord:" + sendString.value;
}
function updateString() {
  ani.value = false;
  // 必须设置异步,不然动画不会重复
  setTimeout(() => {
    let i = texts.indexOf(typingString.value);
    typingString.value = i == texts.length - 1 ? texts[0] : texts[i + 1];
    ani.value = true;
  });
}
</script>

<style lang="scss" scoped>
.home {
  position: initial;
  display: flex;
  overflow: visible;
  gap: 50px;
}
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2.4rem;
  font-weight: var(--weight-bold);
  text-transform: capitalize;
}
.sub {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  gap: 0.2em;
  font-size: var(--fontSize-1);
  color: var(--text-alice-blue);
  font-weight: var(--weight-extraBold);
  line-height: var(--lineHeight-1);
  span {
    //块状元素特点参考div,元素前后自带br,并且沾满整行
    background-image: var(--gradient-1);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    font-size: inherit;
    font-weight: inherit;
    text-transform: capitalize;
    overflow: hidden;
  }
}
// 做一个打字输入的效果
.typing {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bg-oxford-blue-2);
  left: 0;
  z-index: 2;

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    border-left: 0.1em solid white;
    animation: cursor-blink 0.3s step-end infinite alternate;
  }
}
.ani {
  animation: typing 3s steps(6);
}
@keyframes typing {
  to {
    left: 120%;
  }
}

@keyframes cursor-blink {
  50% {
    border-color: transparent;
  }
}
.text-content {
  margin-bottom: 40px;
}
.wrap {
  display: flex;
  position: relative;
  height: 59px;
  max-width: 460px;
  padding: 10px 10px 10px 20px;
  gap: 5px;
  border-radius: var(--radius-6);
  border: 1px solid var(--bg-carolina-blue);
  background-color: var(--bg-prussian-blue);
  overflow: hidden;
  transition: var(--transition-1);
  background-image: radial-gradient(rgb(29, 76, 101), rgb(30, 70, 92));
  z-index: 4;
  &:hover {
    box-shadow: 0px 3px 20px hsla(180, 90%, 43%, 0.4);
  }
  input {
    position: relative;
    border: none;
    outline: none;
    line-height: 24px;
    flex: 1;
    width: 0;
    background: transparent;
    color: inherit;
    font: inherit;
  }
  button {
    flex: none;
    width: 120px;
  }
}
//做了个居中调整
.hero-banner {
  padding: 0 80px;
  width: 100%;
  // 备忘录
  .memo {
    margin: 0 auto;
    max-width: 350px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    width: 100%;
    max-height: 400px;
    // 如果都改成绝对定位就变得死板,没法根据内容变化高宽
    // marigin:auto的居中对块元素才有效
    border-radius: var(--radius-16);
    padding: 15px 0;
    padding-bottom: 0;
    background-color: rgb(229, 200, 162);
    overflow: hidden;
    h3 {
      display: grid;
      place-items: center;
      filter: hue-rotate(0);
      animation: memo-title 10s infinite alternate;
    }
    .memo-content {
      display: grid;
      width: 200%;
      grid-template-columns: repeat(2, 1fr);
      transition: 0.25s ease;
      .tips-wrap {
        width: 100%;
        padding: 0 15px;
        display: flex;
        flex-direction: column;
        gap: 30px;
        overflow-y: auto;
      }
    }
    // 按钮组
    .group {
      display: grid;
      padding: 0px 10px;
      gap: 5px;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      button {
        color: black;
        border-radius: 8px 8px 0 0;
        box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.5),
          1px 1px 2px rgba(0, 0, 0, 0.5);
      }
      button.active {
        box-shadow: inset -1px -1px 2px rgba(255, 255, 255, 0.5),
          inset 1px 1px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
}
.shape-1,
.shape-2 {
  position: absolute;
  //3秒,线性变化,无限次数,来回播放
  animation: shape 3s linear infinite alternate;
}
.shape-1 {
  top: 50px;
  right: 40px;
}
.shape-2 {
  bottom: 20px;
  left: 24px;
}
// 显示完结事宜

@keyframes memo-title {
  to {
    filter: hue-rotate(360deg);
  }
}
@keyframes shape {
  100% {
    transform: translateY(40px) rotate(90deg);
  }
}

@media (max-width: 992px) {
  .home {
    flex-direction: column;
  }
}

@media (max-width: 575px) {
  .shape-1 {
    top: 50px;
    right: 5px;
  }
  .shape-2 {
    bottom: 20px;
    left: 5px;
  }

  .hero-banner {
    padding: 0 20px;
  }
}
</style>
