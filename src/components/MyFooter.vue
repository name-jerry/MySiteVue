<template>
  <view class="footer light">
    <text>
      转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源，
    </text>
    <text>商业媒体及纸媒请先联系</text>
    <text> Copyright ©2023-2023 zhangruisite.com All Rights Reserved. </text>
    <view class="info">
      <a class="a" href="https://beian.miit.gov.cn/" target="_blank">
        浙ICP备2022037162号-1
      </a>
      <a
        class="a"
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33038102332258"
      >
        <img class="img" src="@/assets/img/beian.png" />
        <text>浙公网安备 33038102332258号</text>
      </a>
    </view>
  </view>
</template>

<script></script>

<style>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
  line-height: 20px;
  font-size: 12px;
  color: var(--color-text);
  box-shadow: var(--shadow);
}
.info {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.img {
  width: 20px;
  height: 20px;
}

.a {
  display: flex;
  color: #939393;
  text-decoration: none;
}
</style>
