<template>
  <div class="canvas-wrap">
    <Router-link class="btn-primary hover-3 toggle" to="/home"
      >首页</Router-link
    >
    <canvas class="canvas" ref="canvas" @click="sendFire"
      ><p>你的设备不支持</p></canvas
    >
    <div class="canvas-div">
      <input
        v-model="sendText"
        type="text"
        placeholder="请输入祝福"
        class="canvas-input"
      /><button class="btn-primary hover-3" @click="send">
        发送祝福 <i class="icon">&#xe64a;</i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Fire, Fireworks } from "../pojos/Fire.js";
import { setCanvasSize, random } from "@/tools/common.js";
let sendText = ref("");
watch(sendText, change);
onUnmounted(() => {
  cancel && clearInterval(cancel);
  outC && clearTimeout(outC);
});
function change() {
  if (cancel) {
    clearInterval(cancel);
    cancel = null;
    if (outC) {
      clearTimeout(outC);
    }
    outC = setTimeout(() => {
      startSend();
    }, 10000);
  }
}

function send() {
  sendFire({ clientX: width / 2, clientY: height / 2 });
  change();
}
let canvas = ref();
/** @type {CanvasRenderingContext2D} */
let ctx;
let off;
/** @type {CanvasRenderingContext2D} */
let offCtx;
let fireList = [];
// 窗口宽高
let width;
let height;
let dpr;
let cancel;
let outC;
onMounted(() => {
  dpr = window.devicePixelRatio || 1;
  setWindowSize();
  off = document.createElement("canvas");
  //  重置尺寸
  setCanvasSize(canvas.value, width, height);
  setCanvasSize(off, width, height);
  // 获取ctx
  offCtx = off.getContext("2d");
  ctx = canvas.value.getContext("2d");
  window.addEventListener("resize", () => {
    setWindowSize();
    setCanvasSize(canvas.value, width, height);
    setCanvasSize(off, width, height);
    dpr = window.devicePixelRatio || 1;
  });
  //   创建一个动画不断的绘制火焰,消失太快了
  (function animation() {
    requestAnimationFrame(animation);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,.1)";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
    ctx.save();
    for (let i = 0; i < fireList.length; i++) {
      const fire = fireList[i];
      if (fire.isEnd && !fire.currentStep) {
        fireList.splice(i, 1);
      } else if (fire.currentStep && fire.currentStep > 1) {
        fire.list.forEach((f, index) => {
          if (!f.isEnd) f.render(ctx);
        });
      } else {
        fire.render(ctx);
      }
    }
    ctx.restore();
  })();
  startSend();
});
function startSend() {
  cancel = setInterval(() => {
    sendFire({
      clientX: random(width * 0.2, width * 0.8),
      clientY: random(height * 0.1, height * 0.7),
    });
  }, 2000);
}
function sendFire(e) {
  let cx = e.clientX;
  let cy = e.clientY;
  let gap;
  //   创造形象
  offCtx.clearRect(0, 0, width, height);
  // offCtx.lineWidth = 20;
  offCtx.beginPath();
  offCtx.fillStyle = "#fff";
  // 如果有字写字
  if (sendText.value) {
    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.font = "60px Georgia";
    offCtx.fillText(sendText.value, cx, cy);
    gap = dpr * 4;
    offCtx.restore();
  } else {
    offCtx.arc(cx, cy, Math.min(80, (width * dpr) / 2), 0, Math.PI * 2);
    offCtx.fill();
    gap = dpr * 25;
  }
  gap = Math.floor(gap);
  let imageDate = offCtx.getImageData(0, 0, width * dpr, height * dpr);
  let sites = getSites(imageDate, gap);
  // 创建一个从下边缘开始的烟火
  let f = new Fireworks(cx, height, cx, cy, sites);
  if (sendText.value) f.total = 0.8;

  fireList.push(f);
}
//   根据imageData.data获取点坐标
function getSites(imageDate, gap) {
  let g = gap || 5;
  let s = [];
  for (let y = 0; y < imageDate.height; y += g) {
    for (let x = 0; x < imageDate.width; x += g) {
      let i = (x + y * imageDate.width) * 4;
      let a = imageDate.data[i];
      if (!a || a != 255) continue;
      // if (x / dpr >= 1000) {
      //   console.log(data[i], data[i + 1], data[i + 2], data[i + 3]);
      // }
      s.push({ x: x / dpr, y: y / dpr });
    }
  }
  return s;
}
function setWindowSize() {
  width = window.innerWidth;
  height = window.innerHeight;
}
</script>

<style lang="scss" scoped>
.canvas-wrap {
  background-color: black;
  position: absolute;
  z-index: 12;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  .toggle {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 13;
  }
}
.canvas {
  position: absolute;
  z-index: 12;
}
.canvas-div {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 13;
  display: flex;
  height: 59px;
  max-width: 460px;
  width: 80vw;
  padding: 10px 10px 10px 20px;
  gap: 5px;
  border-radius: var(--radius-6);
  border: 1px solid var(--bg-carolina-blue);
  background-color: var(--bg-prussian-blue);
  overflow: hidden;
  transition: var(--transition-1);
  background-image: radial-gradient(rgb(29, 76, 101), rgb(30, 70, 92));
  &:hover {
    box-shadow: 0px 3px 20px hsla(180, 90%, 43%, 0.4);
  }
  .canvas-input {
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
</style>
