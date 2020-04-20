<template>
    <div>
        <el-dialog
            :visible.sync="loginDialogShow"
            width="30%"
            center
            custom-class="login">
            <div slot="title">
                <span style="font-size:20px">{{title}}</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules" :hide-required-asterisk="hideSign">
                <el-form-item prop="username">
                    <span slot="label">
                        <i class="el-icon-user-solid" style="font-size:20px"></i>
                    </span>
                    <el-input v-model="form.username" placeholder="Username" style="width:86%" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password" :error="errorMessage">
                    <span slot="label">
                        <i class="el-icon-lock" style="font-size:20px"></i>
                    </span>
                    <el-input v-model="form.password" placeholder="Password" style="width:86%" show-password clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="19">
                            <el-checkbox label="记住我" name="type"></el-checkbox>
                        </el-col>
                        <el-col :span="5" v-if="title === '登录'">
                            <el-button type="text" @click="register">注册</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelLogin">取 消</el-button>
                <el-button type="primary" @click="handleLoginOrRegister">{{title}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
import jwt from 'jwt-decode';
export default {
    data() {
        return {
            loginDialogShow: false,
            form: {
                username: "",
                password: ""
            },
            title: "登录",
            hideSign: true,
            errorMessage: "",
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 8, message: '请输入6位至8位的密码', trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        show: Boolean,
        tmpTitle: String
    },
    computed: {
        ...mapGetters([
            "isAuthenticated"
        ])
    },
    watch: {
        show: function(n,o) {
            this.loginDialogShow = !this.loginDialogShow;
        },
        tmpTitle: function(n,o) {
            this.title = n;
        }
    },
    methods: {
        ...mapActions([
            "setIsAuthenticatedData",
            "setUserData"
        ]),
        handleLoginOrRegister() {
            this.$refs["form"].validate((valid) => {
                if(valid) {
                    let data = {};
                    data["username"] = this.form.username;
                    data["password"] = this.form.password;
                    if(this.title == "注册") {
                        api.register(data).then(res => {
                            if(res && res.success) {
                                this.$message.success("注册成功！");
                                this.resetForm();
                                this.title = "登录";
                            } else if(res && res.fail) {
                                this.errorMessage = res.fail;
                            }
                        })
                    } else if(this.title == "登录"){
                        api.login(data).then(res => {
                            if(res && res.token) {
                                const token = res.token;
                                localStorage.setItem('token', token);
                                const decoded = jwt(token);
                                this.setIsAuthenticatedData(!this.isEmpty(decoded));
                                let user = {
                                    username: this.form.username
                                }
                                localStorage.setItem("user", JSON.stringify(user));
                                this.setUserData(user);
                                this.loginDialogShow = false;
                                this.$router.push('helloWorld');
                                this.resetForm();
                            } else if(res && res.fail) {
                                this.errorMessage = res.fail;
                            }
                        })
                    }
                }
            })
        },
        cancelLogin() {
            this.loginDialogShow = false;
            this.resetForm();
        },
        register() {
            this.title = "注册";
            this.form = {
                username: "",
                password: ""
            }
        },
        resetForm(formName) {
            this.$refs["form"].resetFields();
        },
        isEmpty(value){
            return (value === undefined || value === null ||
                (typeof value === "object" && Object.keys(value).length === 0) ||
                (typeof value === "string" && value.trim().length === 0)
            );
        }
    }
};
</script>
<style>
.login{
    border-radius: 10px
}
.login .el-dialog__body{
    background-color: #eeeeee;
}
</style>