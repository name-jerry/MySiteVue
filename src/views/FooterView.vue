<template>
  <div>
    <div class="footer-wrap card">
      <!-- 上下两部分,上为左中右三块,下为一块 -->
      <div class="content-wrap">
        <div class="content">
          <div class="left">
            <a href="#" class="logo"></a>
            <p class="sub">
              人生突破自我最快的方法就是学习，积累的知识将会产生进化的可能
            </p>
            <p class="title">联系我</p>
            <div class="iconList">
              <a class="hover-1" href="#">
                <i class="icon">&#xe733;</i>
                <span>微信</span>
              </a>
              <a class="hover-1" href="#">
                <i class="icon">&#xe83d;</i>
                <span>QQ</span>
              </a>
              <a class="hover-1" href="#">
                <i class="icon">&#xe66f;</i>
                <span>邮箱</span>
              </a>
            </div>
          </div>

          <div class="right">
            <p class="title">订阅</p>
            <p class="sub">关注我们，接受最新的咨询</p>
            <div class="input-wrap">
              <i class="icon">&#xe603;</i>
              <input type="text" placeholder="名字" />
            </div>
            <div class="input-wrap">
              <i class="icon">&#xe66f;</i
              ><input type="text" placeholder="邮箱地址" />
            </div>
            <a class="btn-primary hover-3"
              >订阅信息<i class="icon">&#xe64a;</i></a
            >
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <MyFooter class="admin"></MyFooter>
        <!-- <div class="link-wrap">
          <p class="title">友情链接</p>
          <div class="links">
            <a
              v-for="(item, index) in list"
              :href="item.href"
              class="hover-1"
              >{{ item.title }}</a
            >
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import MyFooter from "../components/MyFooter.vue";

let list = reactive([
  { title: "哔哩哔哩", href: "https://www.bilibili.com/" },
  { title: "IconFont", href: "https://www.iconfont.cn/" },
  { title: "菜鸟教程", href: "https://www.runoob.com/" },
  { title: "MDN", href: "https://developer.mozilla.org/zh-CN/" },
  { title: "Can I Use", href: "https://caniuse.com/" },
  { title: "Vue3.0", href: "https://cn.vuejs.org/guide/quick-start.html" },
  {
    title: "Element",
    href: "https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88",
  },
  { title: "uni-app", href: "https://uniapp.dcloud.net.cn/" },
  { title: "css圆角", href: "https://uniapp.dcloud.net.cn/" },
  { title: "css阴影", href: "https://neumorphism.io/#e0e0e0" },
]);
</script>

<style lang="scss" scoped>
.footer-wrap {
  width: 100%;
  line-height: 1.5;
  padding: 0 20px;
  margin-bottom: 24px;
  border-radius: var(--radius-48);
  color: var(--text-wild-blue-yonder);
  font-size: 1.6rem;
}
.content-wrap {
  display: grid;
  width: 100%;
  padding: 40px 20px;
  .content {
    display: grid;
    max-width: 800px;
    margin: auto;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}
.left {
  .logo {
    background-image: url("/img/logo.svg");
    background-repeat: no-repeat;
    background-position: center;
    width: 119px;
    height: 34px;
    background-size: contain;
  }
  .sub {
    margin: 20px 0;
    font-size: var(--fontSize-4);
  }
  .title {
    margin-bottom: 2px;
    font-size: var(--fontSize-3);
    font-weight: bold;
    color: var(--text-columbia-blue);
  }
  .iconList {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 15px;
    a {
      font-size: 1.1em;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
}
.right {
  .title {
    color: var(--text-columbia-blue);
    font-size: var(--fontSize-3);
    height: 34px;
    font-weight: bold;
    display: inline-flex;
    align-items: center;
  }
  .sub {
    margin: 20px 0;
  }
  .input-wrap {
    font-size: var(--fontSize-6);
    margin-bottom: 24px;
    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid var(--text-wild-blue-yonder);
      background-color: transparent;
      outline: none;
      color: inherit;
      padding: 12px 12px 12px 20px;
      font-weight: inherit;
      font-size: var(--fontSize-6);
    }
    .icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .btn-primary {
    font-size: var(--fontSize-6);
  }
}
.footer-bottom {
  border-top: 1px solid var(--border-prussian-blue);
  padding: 50px 0;
  display: grid;
}
@media (max-width: 1200px) {
  .content {
    padding-right: 0;
    padding-left: 0;
  }
}
@media (max-width: 992px) {
  .content-wrap {
    .content {
      grid-template-columns: 1fr;
    }
  }
  .footer-bottom {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
}
@media (max-width: 575px) {
}
</style>
