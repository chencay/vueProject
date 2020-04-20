<template>
  <div>
    <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <el-image style="width: 50px; height: 50px;border-radius:50%"
                    src="../../static/images/sun.png"></el-image>
          <span style="text-align:center;font-size:18px;padding:10px">梦尘</span>
        </el-menu-item>
        <el-menu-item style="float:right;padding:0 20px">
            <el-dropdown style="padding: 0 20px" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-image 
                  style="width: 40px; height: 40px;border-radius:50%"
                  src="../../static/images/userPhoto.png">
                </el-image>
              </span>
              <el-dropdown-menu slot="dropdown" style="background:#99a9bf;text-align:center">
                <el-dropdown-item command="a" v-show="isAuthenticated && user">{{user.username}}</el-dropdown-item>
                <el-dropdown-item command="b" v-show="isAuthenticated && user">退出</el-dropdown-item>
                <el-dropdown-item command="c" v-show="!isAuthenticated">登录</el-dropdown-item>
                <el-dropdown-item command="d" v-show="!isAuthenticated">注册</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="home-image" style="text-align:center;padding:20px">
      <el-image src="../../static/images/work.jpg"></el-image>
    </div>
    <div class="introduction">
      <h1 style="font-size:40px">记忆，美好</h1>
      <el-button style="font-size:18px" type="primary" round 
                  icon="el-icon-d-arrow-right" @click="openMemory">开启</el-button>
    </div>
    <div class="text">
      <h2 style="text-align:center;font-size:30px">寄语</h2>
      <h3 style="text-align:center;font-size:18px">{{text}}</h3> 
    </div>
    <div class="block">
      <h2 style="text-align:center;font-size:30px">美好</h2>
      <el-carousel :interval="3000" type="card" height="500px" style="padding:20px">
        <el-carousel-item v-for="url in urls" :key="url" style="text-align:center">
          <el-image :src="url"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <login :show="showLoginDialog" :tmpTitle="title"></login>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Vue from 'vue';
import login from './dialog/login';
  export default {
    name: 'mainBoard',
    components: {
      login
    },
    data() {
      return {
        urls: [
          '../../static/images/book.jpg',
          '../../static/images/nature.jpg',
          '../../static/images/life.jpg',
          '../../static/images/oFlower.jpg',
          '../../static/images/hFlower.jpg',
          '../../static/images/food.jpg'
        ],
        text: "回首岁月，缘来缘去",
        showLoginDialog: false,
        activeIndex: "1",
        title: "登录",
        isLogin: false
      }
    },
    computed: {
      ...mapGetters([
        "isAuthenticated",
        "user"
      ])
    },
    methods: {
      ...mapActions([
        "setIsAuthenticatedData",
        "setUserData"
      ]),
      handleCommand(command) {
        if(!command) {
          return;
        }
        switch(command) {
          case "a":
            this.$message.success("这里是个人中心，开发中...");
            break;
          case "b":
            this.logout();
            break;
          case "c":
            this.login();
            break;
          case "d":
            this.register();
            break;
          default:
            break;
        }
      },
      openMemory() {
        if(this.isAuthenticated) {
          this.$router.push('helloWorld');
        } else {
          this.login();
        }
      },
      login() {
        this.showLoginDialog = !this.showLoginDialog;
        this.title = "登录";
      },
      logout() {
        const _this = this;
        Vue.swal({
          title: "提示",
          text: "确定退出当前账号？",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          confirmButtonColor: "#f56c6c",
          reverseButtons: true
        }).then(isConfirm => {
          if(isConfirm.value) {
            if(localStorage.token) {
              localStorage.removeItem("token");
            }
            let user = {};
            _this.setUserData(user);
            _this.setIsAuthenticatedData(false);
            if(_this.$route.path !== '/home') {
              _this.$router.push('home');
            }
          }
          Vue.swal.close();
        }) 
        
      },
      register() {
        this.showLoginDialog = !this.showLoginDialog;
        this.title = "注册";
      }
    }
  }
</script>
<style>
.text {
  padding: 50px;
}
.introduction {
  position: absolute;
  top: 15%;
  left: 45%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>