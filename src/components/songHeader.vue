<template>
  <div class="header">
    <ul class="header-ul">
      <li class="num">序号</li>
      <li class="name">歌曲</li>
      <li class="songer">歌手</li>
      <li class="album">专辑</li>
      <li class="time">时间</li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #f5f5f5;
  padding-left: 20px;
  font-size: 18px;
}

.header-ul {
  height: 100%;
  display: flex;
  align-items: center;
}

.num {
  width: 10%;
}
.name {
  width: 30%;
}
.songer {
  width: 30%;
}
.album {
  width: 20%;
}
.time {
  width: 10%;
}
</style>