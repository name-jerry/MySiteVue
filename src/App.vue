<script setup>
  import { reactive, ref, computed } from "vue";
  import { RouterView } from "vue-router";
  import { useStore } from "./stores/main";
  import Bar from "./components/Bar.vue";
  // 默认调整到烟花
  let main = useStore();
  let list1 = reactive([
    { href: "/", title: "首页" },
    { href: "#topics", title: "demo" },
    { href: "#labels", title: "开发" },
    { href: "#recent", title: "精选" },
  ]);
  let list2 = reactive([
    { href: "#", title: "消息" },
    { href: "#", title: "关注" },
    { href: "#", title: "收藏" },
    { href: "#", title: "发布" },
  ]);
  // 设置一个开关控制nav的显示
  let navIsShow = ref(false);

  function toggle() {
    navIsShow.value = !navIsShow.value;
    document.body.classList.toggle("active");
  }
  // 判断是不是微信
  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
  isWeiXin() && alert("请使用外部浏览器打开,获得更好的体验");
  // 一个登录退出得切换
  let isLogin = computed(() => main.isLogin);
  let user = computed(() => main.user);

  function toggleLogin(e) {
    if (isLogin.value) {
      e.preventDefault();
      main.isLogin = !isLogin.value;
    }
  }
</script>

<template>
  <header>
    <div class="container header">
      <a href="/" class="logo"></a>
      <nav :class="{ active: navIsShow }">
        <!-- 头部 -->
        <div class="top">
          <a href="" class="logo"></a>
          <button @click="toggle">
            <i class="icon hover-1">&#xed1e;</i>
          </button>
        </div>
        <!-- 主体 -->
        <div class="list-1 two">
          <a class="hover-1" v-for="item in list1" :key="item.title" :href="item.href">{{ item.title }}</a>
        </div>
        <div class="three">
          <!-- 头像行 -->
          <div class="head">
            <img src="/img/author-1.png" />
            <div class="right">
              <p class="title">你好 {{ user.name }} !</p>
              <p class="sub">你收到0信息</p>
            </div>
          </div>
          <!-- 数组行 -->
          <div class="list-2">
            <a v-for="item in list2" :key="item.title" :href="item.href">{{
              item.title
            }}</a>
          </div>
        </div>
        <!-- 底部行 -->
        <div class="nav-footer">
          Copyright ©2023-2023 zhangruisite.com All Rights Reserved.
        </div>
      </nav>
      <div class="header-right">
        <div class="head">
          <img src="/img/author-1.png" />
          <p class="title">你好 {{ user.name }} !</p>
        </div>
        <a class="btn-primary hover-3" href="/login" @click="toggleLogin">{{
          isLogin ? "退出登录" : "登录"
        }}</a>
        <button @click="toggle" class="toggle hover-1">
          <i class="icon">&#xe62f;</i>
        </button>
      </div>
    </div>
  </header>
  <!-- <RouterView name="fire" class="fire" id="fire" /> -->
  <!-- 同一页面显示多个view,可以在views中各自写内容,逻辑更清晰,后续有必要可以改成显示单个view -->
  <!-- 每个内容都增加了统一的margin:0 auto 居中,并且配上左右padding -->
  <main class="main">
    <RouterView class="container home" id="home" />
    <!-- home中有一个伪类before可能会遮盖topics中的按钮 -->
    <RouterView name="topics" id="topics" class="container topics" />
    <RouterView name="labels" id="labels" class="container labels" />
    <RouterView name="recent" id="recent" class="container recent" />
  </main>
  <RouterView name="footer" id="footer" class="container footer" />
  <Bar class="bar container" :list="list1" />
</template>

<style lang="scss">
  //页面整体区分页眉header,主体main,页脚footer

  //头部元素设置
  header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: var(--bg-oxford-blue-2);
    z-index: 9;

    // 正常状态下设置top three nav-footer为none
    // 还有一个叉叉图标还没设置
    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24px;
      padding-bottom: 24px;
      gap: 10px;

      .logo {
        background-image: url("/img/logo.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        width: 119px;
        height: 34px;
      }

      nav {
        text-transform: capitalize;
        display: flex;
        flex-direction: column;
        // logo已经在外面统一渲染了直接从一个a数组开始

        .top {
          justify-content: space-between;
          align-items: center;
          font-size: 2rem;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--border-prussian-blue);
        }

        .list-1 {
          display: flex;
          gap: 40px;
          color: var(--text-wild-blue-yonder);

          a {
            color: var(--text-wild-blue-yonder);
            padding: 10px 0;
          }
        }

        // 原来是把两个线条放到一起设置便于后期维护
        .three {
          margin-top: 20px;
          margin-bottom: 25px;
          padding-top: 30px;
          padding-bottom: 20px;
          border-top: 1px solid var(--border-prussian-blue);
          border-bottom: 1px solid var(--border-prussian-blue);
        }

        // 头像列表左侧img头像,右侧两行title和sub
        .head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;

          img {
            border-radius: 50%;
            height: 48px;
            height: 48px;
            object-fit: cover;
          }

          .title {
            font-size: var(--fontSize-6);
            font-weight: bold;
            color: var(--text-columbia-blue);
          }
        }

        // 第二个数组,二维数组使用grid生成更加方便只管
        .list-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-size: var(--fontSize-6);
          color: var(--text-alice-blue);

          a {
            padding-bottom: 6px;
            padding-top: 6px;

            &:hover {
              color: var(--text-wild-blue-yonder);
              transform: translateX(3px);
            }
          }
        }

        .nav-footer {
          color: var(--text-alice-blue);
          font-size: var(--fontSize-8);
        }
      }

      nav {

        .top,
        .three,
        .nav-footer {
          display: none;
        }
      }
    }

    .toggle {
      background-color: transparent;
      border: none;
      color: var(--text-wild-blue-yonder);
      display: none;
      transition: var(--transition-1);
      padding: 0;
      width: 35px;
      height: 35px;

      .icon {
        font-size: 2.8rem;
      }
    }
  }

  .header-right {
    display: flex;
    gap: 20px;
    align-items: center;

    .head {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        border-radius: 50%;
        height: 35px;
        object-fit: cover;
      }

      .title {
        font-size: var(--fontSize-6);
        font-weight: bold;
        color: var(--text-columbia-blue);
      }
    }
  }

  //主体元素设置,主体内总共有5个模块,分别按导航名字命名
  .main {
    // 利用flex:1顶开布局时页尾最少也是在底部
    flex: 1;

    // 用于目测显示范围
    .home {
      margin-top: 88px;
      padding-top: 10px;
    }

    .topics {
      margin-top: 40px;
    }
  }

  .featured {
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .bar {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }

  @media (max-width: 768px) {
    body.active {
      overflow: hidden;
    }

    header {
      .container {
        position: initial;

        .header-right {
          .head {
            display: none;
          }
        }

        .toggle {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        nav {
          position: absolute;
          top: 0;
          right: -340px;
          max-width: 340px;
          width: 100%;
          height: 100vh;
          overflow: auto;
          z-index: 2;
          padding: 30px;
          background-color: var(--bg-oxford-blue-2);
          transition: var(--transition-1);

          .list-1 {
            flex-direction: column;
          }
        }

        nav.active {
          transform: translateX(-340px);

          .top {
            display: flex;
          }

          .three,
          .nav-footer {
            display: block;
          }
        }

        .btn-primary {
          margin-left: auto;
        }
      }
    }

    .bar {
      display: block;
    }
  }

  .footer {
    margin-top: 30px !important;
  }
</style>
