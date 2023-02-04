<template>
  <div class="pages">
    <div
      class="page"
      @click="$emit('pages-click', 'left')"
      v-if="current > Math.round(show / 2)"
    >
      <i class="icon-left">&#xe611;</i>
    </div>
    <!-- 省略号 -->
    <div class="page hidden" v-if="current > Math.round(show / 2)">...</div>
    <template v-for="item in max" :key="item">
      <div
        v-if="
          (item <= show && current < Math.round(show / 2)) ||
          (item > current - Math.round(show / 2) &&
            item <= current + ~~(show / 2))
        "
        class="page"
        :class="{ active: item == current }"
        @click="$emit('pages-click', item)"
      >
        {{ item }}
      </div>
    </template>
    <!-- 省略号 -->
    <div class="page hidden" v-if="current + show / 2 < max">...</div>
    <div
      class="page"
      @click="$emit('pages-click', 'right')"
      v-if="current + ~~(show / 2) < max"
    >
      <i class="icon-right">&#xe64a;</i>
    </div>
  </div>
</template>

<script setup>
let { current, max, show } = defineProps({
  current: Number,
  max: Number,
  show: Number,
});
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  gap: 5px;
}

.page {
  background-color: var(--bg-prussian-blue);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    transform: translateY(-2px);
    background-color: var(--bg-carolina-blue);
  }
}
.active {
  background-color: var(--bg-carolina-blue);
}
// 设置省略号底部对齐
</style>
