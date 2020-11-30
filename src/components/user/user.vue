<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsers">
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">+ 添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border :stripe="true">
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑用户" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="EditDialog(scope.row.uid)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="角色分配" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除用户" placement="top" :enterable="false" >
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.uid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10, 15]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 内容主题区域 -->
      <el-form :model="addFrom" :rules="addFromRules" ref="addFromRef" label-width="80px">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="addFrom.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addFrom.password" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addFrom.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addFrom.phone" />
        </el-form-item>
      </el-form>
      <!-- 对话框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名：">
          <el-input v-model="editForm.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
        <el-form-item label="手机号码：" prop="phone">
          <el-input v-model="editForm.phone" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm">更 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义手机号码校验
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
      if (regPhone.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号码'))
    }

    return {
      queryInfo: {
        query: '',
        // 当前页数
        pageNum: 1,
        //当前页面显示数据条数
        pageSize: 5,
      },
      userlist: [],
      total: 0,
      // 添加用户对话框显示与隐藏
      addDialogVisible: false,
      // 修改用户对话框显示与隐藏
      editDialogVisible: false,
      // 添加用户的表单数据
      addFrom: {
        username: 'test3',
        password: '123456',
        email: 'test3@jyb.com',
        phone: '15960388888',
      },
      // 扁担验证规则
      addFromRules: {
        username: [
          { required: true, message: '用户名不能为空', tigger: 'blur' },
          { min: 3, max: 8, message: '用户名长度为3~8个字符', tigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', tigger: 'blur' },
          { min: 6, max: 18, message: '密码长度为6~18个字符', tigger: 'blur' },
        ],
        email: [
          { required: true, message: '邮箱不能为空', tigger: 'blur' },
          { type: 'email', message: '邮箱格式不合法', tigger: 'blur' },
        ],
        phone: [
          { required: true, message: '手机号不能为空', tigger: 'blur' },
          { validator: checkPhone, tigger: 'blur' },
        ],
      },
      // 修改用户的表单
      editForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
      },
      editFormRules: {
        email: [
          { required: true, message: '邮箱不能为空', tigger: 'blur' },
          { type: 'email', message: '邮箱格式不合法', tigger: 'blur' },
        ],
        phone: [
          { required: true, message: '手机号不能为空', tigger: 'blur' },
          { validator: checkPhone, tigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    //获取用户列表数据
    async getUsers() {
      const { data: res } = await this.$http.get('sys/userlist', {
        params: this.queryInfo,
      })
      if (res.code !== 200) return this.$message.error('数据加载失败！')
      // console.log(res)
      this.userlist = res.data.list
      this.total = res.data.total
    },

    // 监听 pagesize 改变事件
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pageSize = newSize
      this.getUsers()
    },
    //监听页码值 改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pageNum = newPage
      this.getUsers()
    },
    // 监听状态开关的改变
    async userStatusChange(value) {
      // console.log(value.uid)
    },
    // 添加新用户
    addUser() {
      this.$refs.addFromRef.validate(async (valid) => {
        if (!valid) return
        //可以发起网络提交添加用户请求
        this.$http.post('sys/saveUser', this.addFrom).then((res) => {
          console.log(res)
          if (res.status !== 200) {
            this.$message.error('用户添加失败！')
          }
          this.$message.success('用户添加成功！')
          // 隐藏添加用户的对话框
          this.addDialogVisible = false
          // 重新获用户数据列表
          this.getUsers()
        })
      })
    },
    addDialogClose() {
      this.$refs.addFromRef.resetFields()
    },
    // 编辑用户对话框
    async EditDialog(uid) {
      // 发起请求用户数据
      const { data: res } = await this.$http.get('sys/getUser/' + uid)
      // console.log(res.user.username)
      if (res.status !== 200) {
        return this.$message.error('查询用户失败！')
      }
      this.editForm = res.user
      // console.log(this.editform)
      this.editDialogVisible = true
    },

    updateForm() {
      console.log()
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(
          'sys/editUser',this.editForm
        )
        if (res.status !== 200) {
          return this.$message.error('用户数据更新失败！')
        }
        //关闭修改用户对话框
        this.editDialogVisible = false
        // 重新获取列表
        this.getUsers()
        // 成功提示
        this.$message.success('用户数据更新成功！')
      })
    },

    async delUser(uid){
      console.log(uid);
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        //如果用户确认删除，则返回值为字符串 confirm
        //如果用户取消删除，则返回值为字符串 cancel
        console.log(confirmResult)
        if(confirmResult !== 'confirm'){
          return this.$message.info('已取消删除')
        }
        // 确认删除
        const {data:res} = await this.$http.get("sys/delUser/"+uid)
        if(res.status !== 200){
          return this.$message.error("删除用户数据失败！")
        }
        this.$message.success("删除用户数据成功！")
        this.getUsers();
    }
  },
}
</script>
<style scoped>
</style>