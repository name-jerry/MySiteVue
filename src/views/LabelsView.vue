<template>
  <div class="label">
    <!-- 三部分标题h2,简介p,标签组 -->
    <h2 class="title">常用书签</h2>
    <p class="sub">开发日常使用到的链接</p>
    <div class="content">
      <Tag v-for="(item, i) in tags" :tag="item"></Tag>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Tag from "../components/Tag.vue";

let tags = reactive([
  {
    src: "/img/tag1.png",
    title: "资源",
    sub: "常用的素材",
    children: [
      {
        title: "iconfont-阿里巴巴矢量图标库",
        href: "https://www.iconfont.cn/",
      },
      { title: "素材", href: "https://www.aigei.com/game/" },
      { title: "css", href: "https://chokcoco.github.io/CSS-Inspiration/#/" },
      {
        title: "CodePen Search",
        href: "https://codepen.io/search/pens?q=",
      },
      {
        title: "中文字体免费下载和在线预览-字体天下",
        href: "https://www.fonts.net.cn/fonts-zh-12.html",
      },
      {
        title: "混音图标 - 开源图标库",
        href: "https://remixicon.com/",
      },
      {
        title: "Remix-Design/RemixIcon：开源中性风格图标系统",
        href: "https://github.com/Remix-Design/remixicon#usage",
      },
      { title: "npm", href: "https://www.npmjs.com/" },
    ],
  },
  {
    src: "/img/tag2.png",
    title: "字典",
    sub: "查询数据",
    children: [
      {
        title: "MDN Web Docs",
        sub: "css的api查询",
        href: "https://developer.mozilla.org/zh-CN/",
      },
      {
        title: "菜鸟教程 - 学的不仅是技术，更是梦想！",
        sub: "基本教学",
        href: "https://www.runoob.com/",
      },
      {
        title: "Can I use... Support tables for HTML5, CSS3, etc",
        sub: "css属性兼容度查询",
        href: "https://caniuse.com/",
      },
    ],
  },
  {
    src: "/img/tag3.png",
    title: "工具",
    sub: "工具类",
    children: [
      {
        title: "SVG 路径可视化工具",
        href: "https://svg-path-visualizer.netlify.app/#M1%2C5%20A%205%203%2020%200%201%208%208",
      },
      {
        title: "manifest生成器",
        href: "https://www.seochecker.it/web-app-manifest-generator",
      },
      {
        title: "github.com在全国各地区DNS检测情况-Ping.cn",
        href: "https://www.ping.cn/dns/github.com",
      },
      { title: "配色生成", href: "https://www.chinavid.com/color.html" },
      {
        title: "配色推荐",
        href: "http://tool.c7sky.com/webcolor/#character_12",
      },
      {
        title: "配色模拟",
        href: "https://www.materialpalette.com/blue/indigo",
      },
      { title: "CSS阴影生成器", href: "https://neumorphism.io/#e0e0e0" },
      { title: "手调渐变色", href: "https://mycolor.space/gradient" },
      { title: "手调渐变色2", href: "https://cssgradient.io/" },
      { title: "渐变色背景", href: "https://uigradients.com/#Neuromancer" },
      { title: "渐变色背景2", href: "https://webgradients.com/" },
      { title: "复杂背景", href: "https://gradienta.io/" },
      {
        title: "SVG Path Builder",
        href: "https://codepen.io/anthonydugois/pen/mewdyZ",
      },
      {
        title: "颜色格式转换",
        href: "https://tool.ip138.com/rgbhex/#:~:text=%E9%A2%9C%E8%89%B2%E5…1%E5%85%AD%E8%BF%9B%E5%88%B6%EF%BC%9A%23FF%EF%BC%89%E3%80%82",
      },
      {
        title: "border-radius",
        href: "https://9elements.github.io/fancy-border-radius/",
      },
      {
        title: "Clippy — CSS clip-path maker",
        href: "https://bennettfeely.com/clippy/",
      },
      {
        title: "Animista - CSS Animations on Demand",
        href: "https://animista.net/play/basic/rotate/rotate-right",
      },
      { title: "css技巧", href: "https://css-tricks.com/tag/css-animation/" },
      {
        title: "Vanilla-tilt.js抖动特效",
        href: "https://micku7zu.github.io/vanilla-tilt.js/",
      },
      { title: "转base64格式", href: "https://transfonter.org/" },
      {
        title: "在线抠图软件_图片去除背景 | remove.bg – remove.bg",
        href: "https://www.remove.bg/zh/upload",
      },
    ],
  },
  {
    src: "/img/tag4.png",
    title: "vue",
    children: [
      {
        title: "Icon 图标 | Element Plus",
        href: "https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88",
      },
      { title: "uni-app官网", href: "https://uniapp.dcloud.net.cn/" },
      {
        title: "快速上手\n                  | Vue.js",
        href: "https://cn.vuejs.org/guide/quick-start.html",
      },
      {
        title: "表单输入绑定\n                  | Vue.js",
        href: "https://cn.vuejs.org/guide/essentials/forms.html",
      },
      {
        title: "一个\n                  Vue 3 UI 框架 | Element Plus",
        href: "https://element-plus.gitee.io/zh-CN/",
      },
      { title: "Vue3", href: "https://vue3js.cn/start/" },
      {
        title: "快速上手 | uni-simple-router",
        href: "https://hhyang.cn/v2/start/quickstart.html",
      },
      {
        title: "组件/标签的变化",
        href: "https://uniapp.dcloud.net.cn/vernacular.html#%E7%BB%84%E4%BB%B6-%E6%A0%87%E7%AD%BE%E7%9A%84%E5%8F%98%E5%8C%96",
      },
      {
        title: "总览",
        href: "https://unicloud.dcloud.net.cn/pages/overview/overview?pageid=65",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.title {
  background-image: var(--gradient-2);
  display: inline;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  font-size: var(--fontSize-2);
  margin-bottom: 10px;
}
.sub {
  font-size: var(--fontSize-3);
  margin-bottom: 70px;
}
.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
}

@media (max-width: 1200px) {
  .content {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 992px) {
  .content {
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
  }
}
</style>
