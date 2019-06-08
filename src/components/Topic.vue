<template>
    <div id="content" v-if="topic">
        <div class="panel">
            <div class="topic_header">
                <span class="topic_full_title">{{topic.title}}</span>
                <div class="changes">
                    <span> 作者    <a :href= " '#/user/'+topic.author.loginname ">{{topic.author.loginname}}</a> </span>
                    <span> {{topic.visit_count}}次浏览</span>
                    <span> 来自{{topic.tab}}</span>
                  
                </div>
            </div>
            
            <div class="inner_topic">
                <div class="markdown-body topic_content" v-html="topic.content"></div>

            </div>
        </div>


        <div class="panel">
             <van-cell-group>
                 <div class="replies_header">{{topic.reply_count}} 回复</div>

                  <van-cell v-for="(item,index) in topic.replies" :key="index" 
                  >

                  <div class="author_content">
                   <span slot="icon" class="cell_author_avatar"> 
                     <img :src="item.author.avatar_url" >
                  </span>
                    <span> <a :href=" '/#/user/' + item.author.loginname" >{{item.author.loginname}} </a> &nbsp;</span>
                    <span> {{index+1}}楼</span>
                  </div>

                  <div class="reply_content markdown-body" v-html="item.content">

                  </div>
              

                  </van-cell>

             </van-cell-group>


        </div>


    </div>




</template>

<script>
export default {
    name: 'topic',
    props: ['id'],
    data: function(){
        return{
            topic: null
        }
    },
    beforeRouteEnter(to,from ,next){
        next(function(vm){
            vm.$http.get ( '/topic/' + to.params.id).then(function(response){
                   if(response.data.success){
                           vm.topic=response.data.data
                   }
            })

            
        })
    },
    beforeRouteUpdate(to,from,next){
        var app=this;
        this.$http.get( '/topic/' + to.params.id).then(function(response){
                    if(response.data.success){

                    }
            })
    }

}
</script>

<style scoped>
.panel{
        line-height: .5rem;
}
#content .changes span::before{
   content: "•";
}
.topic_header{
    padding: .2rem;
    background-color: #fff;
}


#content .topic_full_title{
    font-size: .44rem;
    font-weight: 700;
    margin: .16rem 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
}
#content .changes{
    font-size: 12px;
    color: #838383;
}

#content .inner_topic{
    padding: .2rem;
        background-color: #fff;
}
#content .topic_content{
    margin: 0 .2rem;
}

.cell_author_avatar img{
    min-width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-right: 5px;
}

.replies_header{
    padding: .4rem;
    background-color: #f8f8f8;
}

</style>
