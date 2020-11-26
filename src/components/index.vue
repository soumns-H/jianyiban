<template>
    <div>
        <el-button type="infoinfo" @click="logout">退出</el-button>
    </div>
</template>
<script>
export default {
    methods:{
        logout:function(){
            //清空session，重定向到登录页面
            window.sessionStorage.clear();
            this.$router.push("/login")
        }
    }
}
</script>
<style scoped>

</style>