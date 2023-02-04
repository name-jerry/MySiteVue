import { Vector, random } from "../tools/common";
// 应该要有两种烟花,一种随机存在事件,一种是有固定形状的
// 这是有固定形状的,而二阶段模拟抛物线
class Fire {
  // 全部改成向量
  // 最终点
  endSite;
  //初时属性
  createSite;
  createTime;
  // 重力加速度,向量
  g = new Vector(0, 120);
  //二维向量,初速度
  createV;
  //即时属性
  currentV;
  // 这是z轴上的速度,取标量
  //   标量
  minV = 5;
  // 半径
  createRadius = 1;
  //变大范围
  radiusRange = 1;
  currentRadius;
  // 烟花颜色
  green = random(150, 255);
  red = random(150, 255);
  blue = random(150, 255);
  alpha = 1;
  // 总飞行时长,秒,保留3位小数
  flyTime;
  // 默认不设置总时长,如果设置总时长表示这是一次非垂直的运动,需要调整参数模拟z轴效果
  isSetTime = false;
  //   当前进度
  rate = 0;
  //   是否到达终点
  isEnd = false;
  // 放大比例
  scale;
  constructor(createX, createY, endX, endY, total) {
    this.createTime = Date.now() / 1000;
    this.currentSite = new Vector(createX, createY);
    this.createSite = new Vector(createX, createY);
    this.endSite = new Vector(endX, endY);
    this.currentRadius = this.createRadius;

    // 如果总时长不存在,表示是垂直发送
    if (!total) {
      // 根据飞高度推算时间,重力加速度中计算高度h=1/2gt^2,已知高度和g推时间和初速度
      // 不应该每次都是到达顶点才爆炸,假设提前爆炸,这里设结尾还有速度Ve,则公式改为h=Ve*t+1/2gt^2,一元二次求解,t=(-Ve+sqr(ve^2+2gh))/g
      // 这里用的都是标量
      let eV = 400;
      let h = this.createSite.subtract(this.endSite).getLength();
      // this.flyTime = +Math.sqrt((2 * h) / this.g.getLength()).toFixed(3) + 1;
      // 根号部分
      let sqr = Math.sqrt(eV ** 2 + 2 * this.g.getLength() * h);
      this.flyTime = (-eV + sqr) / this.g.getLength();
      // 初速度等于时间乘加速度,这是标量,需要改成向量
      // 求初速度标量
      let sv = this.flyTime * this.g.getLength() + eV;
      // 求速度的单位方向
      let v = this.endSite.subtract(this.createSite).normalize();
      // 生成初速度
      this.createV = v.stretch(sv);
      this.currentV = v.stretch(sv);
    } else {
      // 总时长存在得时候
      // 根据时长和距离,推算速度和z轴坐标
      this.flyTime = total;
      this.isSetTime = true;
      // 根据距离向量推算单位速度向量
      this.createV = this.endSite.subtract(this.createSite).stretch(1 / total);
      this.currentV = this.endSite.subtract(this.createSite).stretch(1 / total);
    }
  }
  update() {
    // 更新一下进度百分
    // 时长
    let diff = Date.now() / 1000 - this.createTime;
    if (this.flyTime >= diff) {
      this.rate = +(diff / this.flyTime).toFixed(2);
    } else {
      this.rate = 1;
    }
    this.isEnd = this.rate == 1;

    // 到达终点前
    if (!this.isEnd) {
      // 两种情况一种是有设置时间得一种是没有设置时间得
      if (this.isSetTime) {
        // 设置时间得假设是匀速运动
        // 已移动距离
        let diffS = this.endSite.subtract(this.createSite).stretch(this.rate);
        this.currentSite = this.createSite.add(diffS);
        this.radiusRange = Math.min(
          2,
          +(
            20 / this.endSite.subtract(this.createSite).getLength() +
            1
          ).toFixed(1)
        );
      } else {
        // 更新瞬时速度,瞬时速度等于,v初+gt
        // this.currentV = this.createV.add(this.g.stretch(diff));
        // 这里位置因该是长度应该h=(v-gt+v)*t/2=>h=vt-1/2gt^2,标量公式
        let diffH =
          this.createV.getLength() * diff -
          (1 / 2) * this.g.getLength() * diff ** 2;
        this.currentSite.y = this.createSite.y - diffH;
      }

      // 根据时长增大烟花半径
      this.currentRadius = this.rate * this.radiusRange + this.createRadius;
      // 到达终点
    } else {
      this.isDead = true;
    }
  }
  render(ctx) {
    let x = this.currentSite.x;
    let y = this.currentSite.y;
    ctx.beginPath();
    // 创造一个径向渐变的填充色
    let radialGradient = ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      this.currentRadius
    );
    // 给填充色选择不同位置的渐变色
    radialGradient.addColorStop(
      0.5,
      `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
    );
    radialGradient.addColorStop(
      1,
      `rgba(${this.red},${this.green},${this.blue},0)`
    );
    ctx.fillStyle = radialGradient;
    // 绘制烟花
    ctx.arc(x, y, this.currentRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    this.update();
  }
}
// =======================烟花,在原基础上加入阶段的概念
class Fireworks extends Fire {
  // 火焰实例
  list = [];
  //   二阶段火焰位置
  sites = [];
  //   阶段
  total = 0.5;
  currentStep = 1;
  maxStep = 2;
  audio = new Audio("/video/sendFire.mp3");
  audio2 = new Audio("/video/endFire.mp3");
  constructor(x, y, endX, endY, sites) {
    super(x, y, endX, endY);
    this.sites = sites;
    this.audio.loop = false;
    this.audio2.loop = false;
    this.audio.play();
  }
  //   重写下update
  //   再进入下个阶段的时候,就已经知道有多少个火焰实列了,所以这里不能随便写一个数量了
  // ,要先获取所有火焰最终到达的位置和数量才能再这里决定创建多少个火焰列子,我先写到二阶段,后续应该差不多
  update() {
    super.update();
    if (this.isEnd && this.currentStep < this.maxStep) {
      this.isEnd = false;
      this.currentStep++;
      this.audio.pause();
      this.audio2.play();
      setTimeout(() => {
        this.audio2.pause();
      }, 1000);
      //   开启二阶段
      for (let i = 0; i < this.sites.length; i++) {
        let { x, y } = this.sites[i];
        let f = new Fire(this.endSite.x, this.endSite.y, x, y, this.total);
        this.list.push(f);
      }
    }
  }
}

export { Fire, Fireworks };
