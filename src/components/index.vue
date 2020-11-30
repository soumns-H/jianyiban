<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="log_box">
        <img src="../assets/logo.png" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主题区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <!-- 三元 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">

          <div class="toggle_button" @click="togglrCollapse">|||</div>
        <!-- 侧边栏菜单去区域 -->
        <el-menu background-color="#333744"  text-color="#fff" active-text-color="#409EFF" :unique-opened="true" :collapse="isCollapse"
        :collapse-transition="false" router default-active="activePath"> 
          <!-- 一级菜单 -->
          <el-submenu :index="items.id+''" v-for="items in menu" :key="items.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 菜单图标 -->
              <i class="el-icon-location"></i>
              <!-- 菜单文本 -->
              <span>{{items.menuName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="cItems.path+''" v-for="cItems in items.childMenu" :key="cItems.id" @click="saveNavState(cItems.path)">
              <template slot="title">
                <!-- 菜单图标 -->
                <i class="el-icon-location"></i>
                <!-- 菜单文本 -->
                <span>{{cItems.menuName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题区域 -->
      <el-main>
          <!-- 路由占位符 -->
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
        //左侧菜单数据
      menu: [
         
          {
          id: "1",
          menuName: "用户管理",
          path: "",
          childMenu: [{
              id: "3",
              menuName: "用户列表",
              path: "/users",
            }],
        },
        {
          id: "2",
          menuName: "权限管理",
          path: "",
          childMenu: [{
              id: "4",
              menuName: "角色列表",
              path: "user",
            },
            {
              id: "5",
              menuName: "权限列表",
              path: "user",
            },],
        }],
        //是否折叠
        isCollapse:false,
        //被激活的链接地址
        activePath:''
    };
  },
  created(){
      this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout: function () {
      //清空session，重定向到登录页面
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    // getMenuList:function(){
    //     const menulist = [
            
    //     ]
    //     this.menu = menulist
    // },
    // 点击菜单折叠与展开
    togglrCollapse:function(){
        this.isCollapse=!this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState:function(activePath){
        window.sessionStorage.setItem("activePath",activePath)
    }
  },
};
</script>
<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
}

.log_box {
  display: flex;
  align-items: center;
  color: white;
}
.log_box img {
  height: 60px;
  height: 60px;
  border-radius: 50%;
}

.log_box span {
  margin-left: 20px;
}

.el-aside {
  background-color: #333744;
}

.el-menu {
    border-right: none;
}

.el-main {
  background-color: #eaedf1;
}

.toggle_button{
background-color: #4A5064;
font-size: 14px;
line-height: 24px;
height: 24px;
text-align: center;
color: #fff;
font-weight: 500;
letter-spacing: 0.2em;
cursor: pointer;

}
</style>