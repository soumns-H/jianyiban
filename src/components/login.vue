<template>
  <div class="container">
    <div class="login_box">
      <!-- log区域 -->
      <div class="log_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 表单登录区域 -->
      <el-form ref="loginFormRef" :model="loginFom" class="login_form_box" :rules="verification">
        <el-form-item prop="username">
          <el-input v-model="loginFom.username"  prefix-icon="iconfont icon-user" placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginFom.password" type="password" prefix-icon="iconfont icon-mima" placeholder="密码"/>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

export default {

    data() {
        return {
            // 登录表单数据对象
            loginFom:{
                username:'admin',
                password:'admin123'
            },

            // 表单验证规则
            verification:{
                username:[
                    {required:true,message:"请输入用户名",trigger:'blur'},
                    {min:3,max:8,message:"用户名字符长度在3~8个字符之间",trigger:'blur'}
                ]
                ,password:[
                    {required:true,message:"请输入密码",trigger:'blur'},
                    {min:6,max:16,message:"密码长度在6~16个字符之间",trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        loginSubmit:function(){
            //预验证
            this.$refs.loginFormRef.validate(async(valid)=>{
                if(!valid) return;
                //登录请求待完成
                this.$message.success("登录成功")
                // 将token保存到sessionStorage
                // window.sessionStorage.setItem("token",res.data.token);
                // 跳转页面
                this.$router.push("/index")
            })
        },
        // 重置表单
        resetForm:function(){
            this.$refs.loginFormRef.resetFields();  
        }
    }

};
</script>

<style scoped>
.container {
  background-color: #2b4b5b;
  height: 100%;
}
.login_box {
  position: absolute;
  height: 280px;
  width: 420px;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3px;
}
.log_box {
  position: absolute;
  height: 120px;
  width: 120px;
  border: 1px solid #eee;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 10px;
  border-radius: 50%;
}
.log_box img {
  height: 100%;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 50%;
  background-color: rgba(212, 198, 198, 0.233);
}
.login_form_box{
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns{
    display: flex;
    justify-content: flex-end;
}
</style>