<template>
  <div
    class="tag-wrap"
    ref="box"
    @mouseenter="initLeftAndWidth"
    @click="Toggle"
  >
    <!-- 传参类型,递归组件[
  {
    src: "/img/tag1.png",
    title: "资源",
    sub: "常用的素材",
    children: []
  }
  ] -->
    <a
      :href="tag.href && !tag.children ? tag.href : 'javascript:void(0)'"
      :target="tag.href && !tag.children ? '_blank' : ''"
      class="card tag"
    >
      <div class="text-content">
        <img :src="tag.src ? tag.src : '/img/tag1.png'" alt="" />
        <p class="lines" style="--lines: 2">{{ tag.title }}</p>
      </div>
      <!-- hover时提示用的 -->
      <div class="sub-content" style="--b: 18px" ref="sub" v-if="tag.sub">
        {{ tag.sub }}
      </div>
    </a>
    <!-- 有子类时渲染子类,js重置高宽 -->
    <template v-if="tag?.children">
      <div class="children-wrap" ref="children">
        <Tag v-for="item in tag.children" :tag="item" class="item"></Tag>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
let box = ref();
let children = ref();
let sub = ref();
// 兼容移动端
function Toggle(e) {
  initLeftAndWidth();
  let curr = e.currentTarget;
  let isActive = curr.classList.contains("active");
  let l = curr.parentNode.getElementsByClassName("active");
  for (let i = 0; i < l.length; i++) {
    l[i].classList.remove("active");
  }
  let c = curr.classList;
  isActive ? c.remove("active") : c.add("active");
}
function initLeftAndWidth() {
  if (!tag.children && !tag.sub) return;
  let l = box.value.offsetLeft;
  let w = box.value.parentNode.clientWidth;
  if (tag.children) {
    children.value.style.left = -l + "px";
    children.value.style.width = w + "px";
  }
  if (tag.sub) {
    if (w <= 500 && tag.sub.length >= 22) {
      sub.value.style.cssText = `left:${-l}px;max-width:${w}px;--b:${l + 18}px`;
    } else {
      sub.value.style.maxWidth = w - l + "px";
    }
  }
}
onMounted(() => {
  initLeftAndWidth();
});
let { tag } = defineProps({ tag: Object });
</script>

<style lang="scss" scoped>
.tag-wrap {
  cursor: pointer;
  z-index: 1;

  &:hover {
    z-index: 2;
  }
  &:hover .children-wrap {
    display: grid;
    background-color: rgba(0, 0, 0, 0.6);
  }
  &.active {
    z-index: 2;
    .children-wrap {
      display: grid;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
.tag-wrap.active > .tag > .sub-content {
  display: block;
}
.tag {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-16);
  position: initial;
  .text-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 0 18px;
    height: 68px;
    max-height: 68px;
    min-height: 68px;
  }
  img {
    width: 32px;
    height: 32px;
  }

  &:hover {
    background-image: linear-gradient(
        var(--bg-oxford-blue),
        var(--bg-oxford-blue)
      ),
      var(--gradient-1);
    filter: brightness(1.2);
    background-clip: padding-box, border-box;
    border-color: transparent;
    box-shadow: var(--shadow-2);
  }
}
// 提示
.sub-content {
  display: none;
  position: absolute;
  left: 0;
  bottom: calc(100% + 12px);
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: max-content;
  word-wrap: break-word;
  border-radius: var(--radius-16);
  padding: 16px;
  font-family: kaiti, Times, serif;
  &::before {
    content: "";
    position: absolute;
    border: 10px solid white;
    border-color: white transparent transparent transparent;
    bottom: -18px;
    left: var(--b);
  }
}

.tag:hover > .sub-content {
  display: block;
}
// 递归自身时的容器
.children-wrap {
  position: absolute;
  top: 101%;
  padding-top: 15px;
  display: none;
  gap: 30px;
  width: max-content;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  z-index: 10;
  .item {
    filter: brightness(1.2);
  }
}
</style>
