<template>
  <div class="info">
    <h4>基本信息</h4>
    <div class="info-list">
      <div class="info-item">
        姓名: <span class="info-val" v-html="singer_info.name"></span>
      </div>
      <div class="info-item">
        英文名: <span class="info-val" v-html="singer_info.aartist"></span>
      </div>
      <div class="info-item">
        性别: <span class="info-val">{{ singer_info.gener }}</span>
      </div>
      <div class="info-item">
        国籍: <span class="info-val">{{ singer_info.country }}</span>
      </div>
      <div class="info-item">
        出生地: <span class="info-val">{{ singer_info.birthplace }}</span>
      </div>
      <div class="info-item">
        语言: <span class="info-val">{{ singer_info.language }}</span>
      </div>
      <div class="info-item">
        生日: <span class="info-val">{{ singer_info.birthday }}</span>
      </div>
      <div class="info-item">
        星座: <span class="info-val">{{ singer_info.constellation }}</span>
      </div>
      <div class="info-item">
        身高: <span class="info-val">{{ singer_info.tall }}</span>
      </div>
      <div class="info-item">
        体重: <span class="info-val">{{ singer_info.weight }}</span>
      </div>
    </div>
    <h4>个人简介</h4>
    <p class="p" v-html="singer_info.info"></p>
  </div>
</template>

<script>
export default {
  props: ["singer_info"],
};
</script>

<style lang="scss" scoped>
h4 {
  font-size: 22px;
  margin-bottom: 10px;
}

.info {
  padding: 20px;

  &-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  &-item {
    width: 46%;
    padding: 15px 2%;
    color: #999;
    font-size: 15px;
  }

  &-item:nth-child(4n-2) {
    background-color: #fafafa;
  }

  &-item:nth-child(4n-3) {
    background-color: #fafafa;
  }

  &-val {
    color: #333;
  }
}

.p {
  line-height: 25px;
  font-size: 14px;
  color: #333;
}
</style>