<template>
  <div class="bar">
    <ul @click="click">
      <li
        v-for="(item, i) in list"
        :key="i"
        :index="i"
        :class="{ active: index == i }"
      >
        <span :index="i">{{ item.title }}</span>
      </li>
      <div class="slider" :style="{ transform: move }"></div>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
let { list } = defineProps({
  list: Array,
});
let move = ref("translateX(0)");
let index = ref("");
function click(e) {
  index.value = e.target?.attributes?.index?.value;
  if (!index.value) return;
  move.value = `translateX(${index.value}00%)`;
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  display: flex;
  align-items: stretch;
  width: 100%;
  padding: 0;
  background-color: var(--bg-oxford-blue-2);
  li {
    flex: 1;
    display: flex;
    justify-content: center;
    cursor: pointer;
    span {
      text-align: center;
      padding: 20px 0;
      z-index: 2;
      width: 100%;
      transition: var(--transition-1);
    }
    &.active span {
      transform: translateY(-50%);
      color: var(--text-shadow-blue);
      font-weight: bold;
    }
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    background-color: transparent;
    transition: var(--transition-1);
    pointer-events: none;
    &::before {
      position: absolute;
      top: 0;
      left: 50%;
      content: "";
      width: 60%;
      aspect-ratio: 1/1;
      background-image: var(--gradient-2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  }
}
</style>
