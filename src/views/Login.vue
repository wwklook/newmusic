<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont icon-user"></i>
        </span>
        <el-input v-model="loginForm.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-password"></i>
        </span>
        <el-input
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <i
            class="iconfont"
            :class="
              passwordType === 'password' ? 'icon-eye-off' : 'icon-eye-outline'
            "
          ></i>
        </span>
      </el-form-item>

      <div></div>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        >登录</el-button
      >
      <div class="remember">
        <!-- <span>忘记密码？</span> -->
        <span>
          <router-link :to="'/music/register?redirect=' + redirect"
            >注册</router-link
          >
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  created() {
    if (this.$store.state.isLogin) {
      this.$router.replace({ path: this.redirect || "/music" });
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      // 显示/隐藏 密码
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // 登录事件
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return false;

        this.loading = true;
        this.$store
          .dispatch("login", this.loginForm)
          .then((res) => {
            this.$message.success(res.data.message);
            this.loading = false;
            this.$router.replace({ path: this.redirect || "/music" });
          })
          .catch((err) => {
            this.$message.error(err);
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #333 inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }

  .el-form-item__content {
    display: flex;
    align-items: center;
  }

  .el-form-item {
    width: 100%;
    border: 1px solid #ddd;
    background: #333;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
    box-shadow: 5px 5px 5px #00000033;
    margin-bottom: 32px;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 35px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #eee;
    border-radius: 10px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #333;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    margin-right: 10px;
  }
}

.svg-container {
  margin: 0 10px;
}

.remember {
  color: #333;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  margin-bottom: 30px;
  span {
    margin-left: 12px;
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
}
</style>
