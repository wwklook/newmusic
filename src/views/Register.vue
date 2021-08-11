<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="nickname">
        <span class="svg-container">
          <i class="iconfont icon-nickname"></i>
        </span>
        <el-input v-model="registerForm.nickname" placeholder="请输入昵称" />
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont icon-user"></i>
        </span>
        <el-input v-model="registerForm.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-password"></i>
        </span>
        <el-input
          :key="passwordType"
          v-model="registerForm.password"
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

      <el-form-item prop="password2">
        <span class="svg-container">
          <i class="iconfont icon-password"></i>
        </span>
        <el-input
          :key="passwordType"
          v-model="registerForm.password2"
          :type="passwordType"
          placeholder="请确认密码"
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

      <el-form-item prop="captcha_1">
        <span class="svg-container">
          <i class="iconfont icon-captcha"></i>
        </span>
        <el-input v-model="registerForm.captcha_1" placeholder="请输入验证码" />
        <img class="captcha" @click="getCaptcha" :src="image_url" />
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleRegister"
        >注册</el-button
      >
      <div class="remember">
        <span>
          <router-link :to="'/music/login?redirect=' + redirect"
            >返回登录</router-link
          >
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCaptcha, register } from "@/network/profile";
export default {
  name: "Register",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("用户名不能少于4位"));
      } else {
        callback();
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else if (value.length > 13) {
        callback(new Error("密码不能大于6位"));
      } else {
        callback();
      }
    };
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {},
      registerRules: {
        nickname: [{ required: true, trigger: "blur", message: "请输入昵称" }],
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          { validator: validateUsername, trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
            trigger: "blur",
            message: "用户名不允许输入特殊符号",
          },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { validator: validatePassword, trigger: "blur" },
        ],
        password2: [
          { required: true, trigger: "blur", message: "请输入确认密码" },
          { validator: validatePassword2, trigger: "blur" },
        ],
        captcha_1: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      image_url: "",
    };
  },
  created() {
    if (this.$store.state.isRegister) {
      this.$router.replace({ path: this.redirect || "/music" });
    }
    this.getCaptcha();
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
    async getCaptcha() {
      const { data } = await getCaptcha();
      this.registerForm.captcha_0 = data.key;
      this.registerForm.captcha_1 = "";
      this.image_url = data.image_url;
    },
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
    handleRegister() {
      // 登录事件
      this.$refs.registerForm.validate((valid) => {
        if (!valid) return false;

        this.loading = true;
        register(this.registerForm)
          .then((res) => {
            if (res.data.succeed) {
              this.$message.success(res.data.message);
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
            } else {
              this.$message.error(res.data.message);
              this.getCaptcha();
              this.loading = false;
            }
          })
          .catch((err) => {
            this.$message.error(err.toString());
            this.getCaptcha();
            this.loading = false;
          });
      });
    },
  },
};
</script>

<style lang="scss">
.register-container {
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
.register-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .register-form {
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
  .captcha {
    display: inline-block;
    height: 47px;
    width: auto;
    cursor: pointer;
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
