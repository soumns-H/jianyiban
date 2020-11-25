<template>
    <div class="container">
        <div class="box">
            <form>
                <div>
                    <div>
                        <input name="username" type="text" placeholder="用户名"/>
                    </div>
                    <div>
                        <input name="password" type="password" placeholder="密码"/>
                    </div>
                    <div>
                        <input type="button" value="登录">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.container{
    position: relative;
    height: 280px;
    background-color: aqua;
    justify-items: center;
}
.container .box{
    position: relative;
    display: flex;
    flex: 1;
    height: 250px;
    margin: auto;
    width: 400px;
    background-color: blueviolet;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
}

</style>