<template>
  <div class="container">
    <div class="content">
      <div
        class="slider"
        :class="{ 'show-light': isLight }"
        @click="slider"
        :is-light="isLight"
      ></div>
      <div class="banner"></div>
      <div class="wrap">
        <div class="light-wrap" :class="{ 'show-light': isLight }">
          <div class="light"></div>
        </div>

        <div
          class="form card"
          :class="{ 'show-light': isLight, 'is-register': !isLogin }"
        >
          <form action="#" class="login-form" @submit="login">
            <!-- 登录界面 -->
            <div class="login-box box">
              <h1>登录</h1>
              <div class="input-wrap">
                <input
                  name="acc"
                  v-model="form.acc"
                  type="text"
                  :required="isLogin"
                /><i class="icon">&#xeb68;</i><span>请输入账号</span>
              </div>
              <div class="input-wrap">
                <input
                  name="pwd"
                  v-model="form.pwd"
                  :type="showPwd ? 'text' : 'password'"
                  :required="isLogin"
                /><i class="icon">&#xe60f;</i><span>请输入密码</span>
                <i class="icon eye" @click="showPwd = !showPwd">{{
                  showPwd ? "&#xebcc;" : "&#xebcd;"
                }}</i>
              </div>
              <div class="bottom-wrap">
                <label for="check"
                  ><input id="check" type="checkbox" />记住账号密码</label
                >
                <p><a href="">忘记密码</a></p>
              </div>
              <!-- 按钮 -->
              <button class="btn hover-3" type="submit">登录</button>
              <p class="no-acc">
                没有账号? <span @click="isLogin = false">注册</span>
              </p>
            </div>
          </form>
          <!-- 注册界面 -->
          <form action="#" class="register-form" @submit="register">
            <div class="register-box box">
              <h1>注册</h1>
              <div class="input-wrap">
                <input
                  name="name"
                  type="text"
                  v-model="form.name"
                  :required="!isLogin"
                /><i class="icon">&#xeb68;</i><span>请输入昵称</span>
              </div>
              <div class="input-wrap">
                <input
                  name="acc"
                  type="text"
                  v-model="form.acc"
                  :required="!isLogin"
                /><i class="icon">&#xeb68;</i><span>请输入账号</span>
              </div>
              <div class="input-wrap">
                <input
                  name="pwd"
                  :type="showPwd ? 'text' : 'password'"
                  :required="!isLogin"
                  v-model="form.pwd"
                /><i class="icon">&#xe60f;</i><span>请输入密码</span>
                <i class="icon eye" @click="showPwd = !showPwd">{{
                  showPwd ? "&#xebcc;" : "&#xebcd;"
                }}</i>
              </div>
              <div class="input-wrap">
                <input
                  name="pwd2"
                  :type="showPwd ? 'text' : 'password'"
                  v-model="form.pwd2"
                  :required="!isLogin"
                /><i class="icon">&#xe60f;</i><span>请再次输入密码</span>
                <i class="icon eye" @click="showPwd = !showPwd">{{
                  showPwd ? "&#xebcc;" : "&#xebcd;"
                }}</i>
              </div>
              <div class="radio-group">
                <p>性别:</p>
                <label
                  ><input
                    type="radio"
                    name="sex"
                    value="man"
                    v-model="form.sex"
                    :required="!isLogin"
                  />男</label
                >
                <label
                  ><input
                    type="radio"
                    name="sex"
                    value="woman"
                    v-model="form.sex"
                    :required="!isLogin"
                  />女</label
                >
              </div>
              <!-- 按钮 -->
              <button class="btn hover-3" type="submit" data-type="注册">
                注册
              </button>
              <p class="no-acc">
                已有账号!<span @click="isLogin = true">返回登录</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { useStore } from "../stores/main";
let main = useStore();
let user = computed(() => main.user);
let form = reactive({});
function login(e) {
  e.preventDefault();
  console.log();
  if (form.acc == user.value.acc && form.pwd == user.value.pwd) {
    alert("登录成功");
    main.isLogin = location.href = "/";
  } else {
    alert("账号密码有误");
  }
}
function register(e) {
  e.preventDefault();
  if (form.pwd != form.pwd2) alert("密码不一致");
  main.user = form;
  alert("注册成功,请登录");
  isLogin.value = true;
}

let isLight = ref(false);
let showPwd = ref(false);
let isLogin = ref(true);
watch(isLogin, () => {
  form = {};
});
function slider() {
  isLight.value = !isLight.value;
}
</script>

<style lang="scss" scoped>
.content {
  margin: auto;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  overflow: hidden;
}

// 横条
.banner {
  margin-top: 10px;
  height: 10px;
  width: 100%;
  background-image: var(--gradient-2);
  border-radius: 40px;
}
//   右侧得滑块
.slider {
  position: absolute;
  width: 10px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  right: 10%;
  top: 150px;
  z-index: 3;
  &::before {
    content: attr(is-light);
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    width: 50px;
    padding: 10px 0;
    background-color: gray;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: auto;
    transition: var(--transition-1);
    border-radius: var(--radius-8);
    cursor: pointer;
  }
}
.slider.show-light::before {
  transform: translate(-50%, calc(100px - 100%));
  text-shadow: 0 0 10px white;
}
.wrap {
  width: 90%;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 10px;
  perspective: 1000px;
  .light-wrap {
    --light: rgba(255, 255, 255, 0.1);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 0px;
    width: 100%;
    pointer-events: none;
    transition: var(--transition-1);
    overflow: hidden;
    z-index: 2;
    border-radius: var(--radius-16);
    .light {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 800px;
      width: 120%;
      background-image: linear-gradient(
          to bottom right,
          transparent 50%,
          var(--light) 50%
        ),
        linear-gradient(to bottom left, transparent 50%, var(--light) 50%),
        linear-gradient(to right, var(--light), var(--light));
      background-repeat: no-repeat;
      background-size: 18% 100%, 18% 100%, 64% 100%;
      background-position: 0 0, 100% 0, 50% 0;
      filter: blur(1px);
      pointer-events: none;
    }
  }
  .light-wrap.show-light {
    height: 100%;
  }
}
// 有光得时候设置字体发光
.form.show-light {
  filter: brightness(110%);
  text-shadow: 0 0 20px var(--text-wild-blue-yonder),
    0 0 40px var(--text-wild-blue-yonder);
}
.form {
  border-radius: var(--radius-16);
  .box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: var(--text-wild-blue-yonder);
    padding: 20px 50px 40px;
  }

  h1 {
    font-size: var(--fontSize-2);
    text-align: center;
  }
  .input-wrap {
    font-size: var(--fontSize-3);
    color: var(--text-columbia-blue);
    border-bottom: 2px solid var(--text-columbia-blue);

    input {
      background: transparent;
      border: none;
      outline: none;
      padding: 10px 15px 10px 40px;
      font-size: 1em;
      color: inherit;
      font-weight: bold;
    }
    span {
      position: absolute;
      top: 50%;
      left: 40px;
      transform: translateY(-50%);

      font-size: 1em;
      pointer-events: none;
      transition: var(--transition-1);
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    .eye {
      right: 10px;
      left: initial;
      cursor: pointer;
      &:active {
        transform: translateY(-50%) scale(1.2);
      }
    }
    input:is(:valid, :focus) ~ span {
      transform: translate(-20%, -120%) scale(0.8);
    }
  }

  .bottom-wrap {
    display: flex;
    justify-content: space-between;
    label {
      cursor: pointer;
      display: flex;
      gap: 10px;
      #check {
        cursor: pointer;
      }
    }
  }
}
// 增加特效
.form {
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px solid var(--border-prussian-blue);
    border-radius: var(--radius-16);
    animation: clippath 3s infinite linear;
  }
  &::after {
    animation: clippath 3s infinite -1.5s linear;
  }
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}
.btn {
  padding: 10px 20px;
  min-width: 100%;
  border-radius: var(--radius-8);
  display: flex;
  justify-content: center;
}
.no-acc {
  align-self: center;
  span {
    cursor: pointer;
  }
}
// 注册界面
.register-form,
.login-form {
  transition: var(--transition-1);
}
.register-form {
  position: absolute;
  top: 0;
  width: 100%;
  transform: translateX(100%);
  .radio-group {
    display: flex;
    justify-content: space-between;
  }
}
.form.is-register {
  height: 600px;
  .login-form {
    transform: translateX(-100%);
  }
  .register-form {
    transform: translateX(0);
  }
}
@media (max-width: 575px) {
  .wrap {
    width: 100%;
  }
}
</style>
