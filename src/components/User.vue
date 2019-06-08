<template>
    <div v-if="userInfo">
        <div class="content">
         <div class="pannel">
           <div class="header">  <span class="col_fade"> 主页</span></div>
             <div class="userInfo">
             <img :src="userInfo.avatar_url"> 
              {{userInfo.loginname}}
              <ul >
                  <li> {{userInfo.score}}&nbsp;积分</li> 
                  <li> 注册时间:&nbsp;{{userInfo.create_at}}</li>
                   </ul>
          </div>

        </div>

            <div class="pannel">
           <div class="header">  <span class="col_fade"> 最近创建的话题</span></div>
            <van-cell-group>
               <van-cell v-for="(item,index) in userInfo.recent_topics" :key="index"
                :title="item.title"
                    is-link
                    :url=" '/#/topic/'+ item.id "   > 
                <span slot="title" class="cell_title">
                    
                        <span class="title">{{item.title}}</span>

                </span>

                    <span slot="icon" class="cell_author_avatar"> 
                        <img :src="item.author.avatar_url" >
                    </span>

               </van-cell>

               </van-cell-group>       
          </div>

               <div class="pannel">
           <div class="header">  <span class="col_fade"> 最近回复的话题</span></div>
            <van-cell-group>
               <van-cell v-for="(item,index) in userInfo.recent_replies" :key="index"
                :title="item.title"
                    is-link
                    :url=" '/#/topic/'+ item.id "   > 
                <span slot="title" class="cell_title">
                    
                        <span class="title">{{item.title}}</span>

                </span>

                    <span slot="icon" class="cell_author_avatar"> 
                        <img :src="item.author.avatar_url" >
                    </span>

               </van-cell>

               </van-cell-group>       
          </div>

        </div>



        </div>
      
      
</template>
<script>
export default {
    name: 'User',
    prpos: ['loginName'],
    data(){
        return{
            userInfo: {}
        }
    },
    beforeRouteEnter(to, from ,next){
        next((vm)=>{
            vm.$http.get('/user/'+ to.params.loginName).then(
                (response)=>{vm.userInfo=response.data.data; }
            )
        })
    },
    beforeRouteUpdate(to,from,next){
        var app=this
        this.$http.get('/user/'+to.params.loginName).then(
            (response)=>{ app.userInfo=response.data.data}
        )
        next()
    },
}
</script>
<style scoped>
ul{
    margin-top: .2rem;
}
ul li{
    margin: .4rem .07rem;
}
.content{
    margin-top: .4rem;
}
.col_fade{
    color: #ababab;
    font-size: .32rem;
}
.pannel{
        background-color: #fff;
        line-height: .2rem;
}
.header{
    padding: .4rem;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.userInfo{
    padding: .2rem;
}
.userInfo img{
    width: .8rem;
    weight: .8rem;
    border-radius: 3px;
}


.cell_title{
     overflow:hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    max-width: 80%;
    display: inline-block;
    vertical-align: middle;
    font-size: .2rem;
    line-height: .6rem;
    margin-left: .1rem;
}


.cell_title .title{
    margin-left: .15rem;
    line-height: .4rem;
}
.cell_author_avatar img{
    min-width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
}
</style>
