<template>
    <div>
        <h2 > 用户登录 </h2>
        
      <van-cell-group>
        <van-field
            v-model="accesstoken"
            center
            clearable
            label="AccessToken："
            placeholder="请输入AccessToken"
        >
            <van-button slot="button" size="small" type="primary" @click.native="dologin">登陆</van-button>
        </van-field>
        </van-cell-group>
    </div> 
</template>

<script>
import {mapMutations}  from 'vuex'
export default {
    name: 'login',
    data(){
        return{
            accesstoken: null,
            
        }
    },
    methods:{
        ...mapMutations(['mutationLogin','mutationLoginName','mutationAccessToken'] ),

        dologin:function(){
            var app=this;
            this.$http.post('./accesstoken',{
                accesstoken: this.accesstoken
            }).then(function(response){
               if(response.data.success){
                  //登陆后 
                  app.mutationLogin();
                  app.mutationLoginName(response.data.loginname)
                  app.mutationAccessToken(app.accesstoken)

                  localStorage.setItem('loginStatus',true)
                  localStorage.setItem('loginName', response.data.loginname)
                  localStorage.setItem('accessToken',app.accesstoken)
                  //localStorage.setItem('')
                  app.$router.push(  '/user/' + response.data.loginname)
               }
               else{
                 app.$toast('登陆失败 请检查AccessToken是否正确');

               }
            })
        }
    },
}
</script>

<style scoped>
 h2{
     padding: .3rem 0;
     text-align: center;
 }
</style>
