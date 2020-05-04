<template>

  <div class="login_container">
    <nav-header/>
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <!--登录表单区域-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form" label-width="0px">
        <!--用户名-->
        <el-form-item prop="uname">
          <el-input v-model="loginForm.uname" placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"
                    type="password">
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model="loginForm.password2" type="password" placeholder="确认密码" prefix-icon="el-icon-view" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="zhuce">注册</el-button>
          <el-button type="info" @click="resetLoginform">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import NavHeader from "../components/Navheader";
  export default {
    name: 'Login',
    components: {NavHeader},
    data () {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          uname: '',
          password: '',
          password2:'',
        },
        //这是表单的验证规则对象
        loginFormRules: {
          //验证用户名是否合法
          uname: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
          ],
          //验证密码是否合法
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          password2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      zhuce () {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          let {uname,password} = this.loginForm;
          let user = {uname:uname,password:password};
          const {data} = await this.$axios.post('/api/user/register', user);
          if (!data.success) return this.$message.error("用户名已经存在");
          const {data2} = await this.$axios.post('/api/user', user);
          console.log(data2);
          this.$message.success('注册成功');
          this.$router.push('/');
          })
      },
      //点击重置
      resetLoginform () {
        this.$refs.loginFormRef.resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
    background: url("../assets/img/bg.png") no-repeat;
    background-size: 100% 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border: 1px solid rgba(229, 229, 229, 1);
    box-shadow: -7px 7px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .btns {
      display: flex;
      float: right;
    }
  }
</style>
