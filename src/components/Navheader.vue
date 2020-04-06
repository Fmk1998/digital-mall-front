<template>
  <header class="header">
    <symbol id="icon-cart" viewBox="0 0 38 32">
      <title>cart</title>
      <path class="path1"
            d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
      <path class="path2"
            d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
      <path class="path3"
            d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      <path class="path4"
            d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
    </symbol>
    <div class="navbar">
      <div class="navbar-left-container">
        <a href="/">
          <img class="navbar-brand-logo" src="static/logo.png"></a>
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <a @click="gotoLogin" v-if="!this.$store.state.user.uid" class="navbar-link">Login</a>
          <a @click="gotoUser" v-else class="navbar-link">{{this.$store.state.user.uname}}</a>
          <a @click="loginOut" href="javascript:void(0)" class="navbar-link">Logout</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count"></span>
            <a class="navbar-link navbar-cart-link" @click="gotoCart">
              <svg class="navbar-cart-logo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="登录" :visible.sync="dialogFormVisible">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="0px">
        <!--用户名-->
        <el-form-item prop="uname">
          <el-input v-model="loginForm.uname" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="iconfont iconmima"
                    type="password">
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginform">重置</el-button>

        </el-form-item>
        <div class="btns">
          <a href="#">忘记密码</a>|
          <a href="#">还未注册?点击注册吧</a>
        </div>
      </el-form>

    </el-dialog>
  </header>
</template>

<script>
  export default {
    name: "NavHeader",
    data() {
      return {
        dialogFormVisible: false,
        user:this.$store.state.user,
        loginForm: {
          uname: 'admin',
          password: 'admin',
        },
        //这是表单的验证规则对象
        loginFormRules: {
          //验证用户名是否合法
          uname: [
            {required: true, message: '请输入登录名称', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur'}
          ],
          //验证密码是否合法
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      getUser(){
        this.user = this.state.user;
      },
      //打开个人页
      gotoUser(){
        this.$message.success(`欢迎您：${this.$store.state.user.uname}`)
      },
      //打开登录栏
      gotoLogin() {
        this.dialogFormVisible = true
      },
      resetLoginform() {
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return
          console.log(this.loginForm)
          const { data } = await this.$axios.post('/api/user/login', this.loginForm)
          console.log(data);
          if (!data.success) return this.$message.error('登录失败！')
          this.$message.success('登录成功')
          this.$store.commit('updateUserInfo', data.detail);
          // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
          //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
          //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
          window.sessionStorage.setItem('token', data.detail.uid);
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.dialogFormVisible = false;
          })
      },
      loginOut() {
        this.$confirm('是否要退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let useModel = {};
          this.$store.commit('updateUserInfo', useModel);
          this.$router.push('/');
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //前往购物车
      gotoCart() {
        if (this.$store.state.user.uid) this.$router.push('/cart'); //通过push进行跳转
        else this.$message.error("请先登录！")
      },
    }
  }
</script>

<style scoped>
  .login_form {

  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }



  .btns a:hover {
    color: red;
  }
</style>
