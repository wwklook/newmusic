<template>
  <div class="header">
    <ul class="header-ul">
      <li class="num">序号</li>
      <li class="name">歌曲</li>
      <li class="singer">歌手</li>
      <li class="album">专辑</li>
      <li class="time">时间</li>
    </ul>
  </div>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #f5f5f5;
  font-size: 18px;
}

.header-ul {
  height: 100%;
  display: flex;
  align-items: center;
}

.num {
	padding-left: 30px;
  width: 15%;
}
.name {
  width: 25%;
}
.singer {
  width: 25%;
}
.album {
  width: 25%;
}
.time {
  width: 10%;
}
</style>