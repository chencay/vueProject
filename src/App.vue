<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import jwt from 'jwt-decode';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  created(){   
    /*在根组件进行判断，否则刷新就没了*/
    if (localStorage.token && localStorage.user){
      const decoded = jwt(localStorage.token);
      this.setIsAuthenticatedData(!this.isEmpty(decoded));
      this.setUserData(JSON.parse(localStorage.user));
    } else {
      this.setIsAuthenticatedData(false);
      this.setUserData({});
    }
  },
  methods: {
    ...mapActions([
        "setIsAuthenticatedData",
        "setUserData"
    ]),
    isEmpty(value){
      return(
          value ===undefined || value ===null ||
          (typeof  value === "object" && Object.keys(value).length ===0) ||
          (typeof value ==="string" && value.trim().length ===0)
      );
    }
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue','Avenir', Helvetica, Arial, sans-serif,'PingFang SC',
    'Hiragino Sans GB','Microsoft YaHei','微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  height: 100%;
  position: relative;
}
a{
  text-decoration: none;
}
</style>
