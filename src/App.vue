<template>
  <div id="app">
    <div>
       <van-nav-bar
        title="CNode移动端社区"
        left-text="返回"
        right-text="更多"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      
 

       
    <router-view/>
    </div>

    <van-actionsheet
      v-model="showMoreMenus"
      :actions="moreMenus "
      @select="onSelect"
    />

     </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  name: 'app',
  
  data(){
    return{


    }
  },
    computed:{
   
    
 
      //状态数据
      ...mapState([
      'loginMoreMenus',
      'unLoginMoreMenus', 
      'isLogined', ]),

      ...mapGetters(['moreMenus']),

      isLogined:{
        get:function(){
          return this.$store.state.isLogined;
        },
        set: function(nval){
          //触发mutations
          this.$store.commit('mutationChangeLogin',nval)
        }
      },

      showMoreMenus:{
        get:function(){
          return this.$store.state.showMoreMenus;
        },
        set: function(nval){
          //触发mutations
          this.$store.commit('mutationIsShowMoreMenus',nval)
        }
      },
      
    },
    created:function(){
       // 读取localStorage中的数据 写入到
       var loginStatus= window.localStorage.getItem('loginStatus');
       if(loginStatus){
         this.mutationLogin();
         this.mutationLoginName( localStorage.getItem('loginName'))
         this.mutationAccessToken(localStorage.getItem('accessToken'))
       }
    },
 
  methods:{
    ...mapMutations(['mutationLogin','mutationLoginName','mutationAccessToken'] ),

    //返回
    onClickLeft(){
      this.$router.back(-1)
    
    },
    //更多
    onClickRight(){
       this.showMoreMenus=true;
             console.log(this.showMoreMenus)

    },

    //Actionsheet组件对应的弹框
    onSelect(item,index) { 
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.showMoreMenus = false;
      this.$router.push('/'+ item.className)
      //Toast(item.name);
    }

  },

    


}
</script>

<style>

</style>
