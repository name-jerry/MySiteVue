<template>
  <div class="input-wrap" :class="{ active: isActive, end: copy.isEnd }">
    <input
      type="checkbox"
      class="check"
      v-model="copy.isEnd"
      @click="$emit('update', copy)"
    /><input
      :disabled="!isActive"
      type="text"
      v-model="copy.title"
      class="input"
    /><button
      class="right-button"
      @click="
        () => {
          if (isActive) $emit('update', copy);
          isActive = !isActive;
        }
      "
    >
      {{ isActive ? "确认" : "编辑" }}
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
let { tip } = defineProps(["tip"]);
let copy = reactive({
  ...tip,
});
let isActive = ref(false);
</script>

<style lang="scss" scoped>
// 标签正常时
.input-wrap {
  position: relative;
  display: flex;
  gap: 10px;
  padding: 0.5em 0.5em 0.5em 2.2em;
  border-radius: 8px;
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.4),
    2px 2px 5px rgba(0, 0, 0, 0.4);
  transition: 0.25s ease;
  input {
    outline: none;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
  }
  .check {
    position: absolute;
    display: inline-block;
    z-index: 2;
    left: 1.5em;
    top: 50%;
    width: 1.5em;
    height: 1.5em;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    cursor: pointer;
    border-radius: 50%;
  }
  .check:checked {
    border: none;
    background-color: blue;
    color: white;
    &::after,
    &::before {
      position: absolute;
      content: "";
      top: 75%;
      left: 50%;
      width: 2px;
      background-color: white;
    }
    &::before {
      height: 1em;
      transform-origin: top left;
      transform: rotate(-145deg);
    }
    &::after {
      height: 0.6em;
      transform-origin: top left;
      transform: rotate(140deg);
    }
  }

  .input {
    display: block;
    flex: 1;
    width: 100%;
    min-height: 100%;
    max-height: 100%;
    line-height: 1.5;
    background: transparent;
    font: inherit;
    color: black;
    overflow: auto;
  }

  .right-button {
    flex: none;
    display: block;
    padding: 4px 8px;
    color: hsla(216, 100%, 95%, 1);
    background-image: linear-gradient(
      90deg,
      hsl(199, 89%, 49%),
      hsl(180, 90%, 43%) 51%,
      hsl(199, 89%, 49%)
    );
    background-size: 200%;
    background-position: left;
    border-radius: 4px;
    overflow: hidden;
    &:hover {
      background-position: right;
      transition: 0.25s ease;
    }
  }
}
//可编辑
.input-wrap.active {
  box-shadow: -2px -4px 5px rgba(255, 255, 255, 0.4),
    2px 4px 5px rgba(0, 0, 0, 0.4);
}
</style>
