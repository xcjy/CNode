<template>
    <div>
        <van-tabs v-model="active" @click="routeto" >
        <van-tab v-for="(item,index) in topics" :key="index" :title="item.desc"></van-tab>
            </van-tabs>


        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-cell-group>
            <van-cell v-for="(item,index) in lists" :key="index"
            :title="item.title"
                is-link
                :url=" '/#/topic/'+ item.id "   > 
            <span slot="title" class="cell_title">
                
                <span class="reply_count">{{item.reply_count}}</span> 
                /
                <span class="visit_count">{{item.visit_count}}</span>
                <span v-if="item.top" class="top">置顶</span>
                    <span class="tab" v-if="$route.path=='/topiclist/all'">{{tabMap[ item.tab ]}}</span>
                    <span class="title">{{item.title}}</span>

            </span>

                <span slot="icon" class="cell_author_avatar"> 
                    <img :src="item.author.avatar_url" >
                </span>

            </van-cell>

        </van-cell-group>


        </van-pull-refresh>

        <van-pagination v-if="lists"
        v-model="currentPage" 
        :total-items="1500" 
        :items-per-page="10"
        @change="handleChange"
        />


    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'topiclist',
    props: ['name'],
    data(){
        return{
            lists: [],
            page:1 , //默认页数
            currentPage:1, //分页器当前页数
            limit: 15,
            isLoading: false,
            tabMap: {
                ask: '问答',
                share: '分享',
                job: '招聘',
                good: '精华',
                
            }
        }
    },
      computed:{
   
    
      //状态数据
      ...mapState(['topics' ]),

         active:{
         get:function(){
          return this.$store.state.active;
        },
        set: function(nval){
          //触发mutations
          this.$store.commit('mutationChangeActive',nval)
        }
      },

      },



    beforeRouteEnter:function(to,from,next){
        //进入该组件之前的回调操作  进入前发AJAX
        // to表示待进入的组件路由
        // from 表示离开的组件路由
        // next表示函数钩子  执行下一步操作
        next( function(vm){
            vm.$http.get('/topics',{
                params:{ 
                    tab:to.params.name ,
                     page: vm.page,
                      limit: vm.limit

                 }
            }).then(function(response){
               if(response.data.success){
                   vm.lists=response.data.data
               }
            })
        });

    },
    //动态路由切换时的导航守卫
    beforeRouteUpdate:function(to,from ,next){
        this.currentPage=1;
        var app=this;
        this.$http.get('/topics',{
            params:{
                tab : to.params.name,
                page: this.page,
                limit: this.limit
            }
        }).then(function(response){
            if(response.data.success){
                // 异步请求 此时this不再表示当前组件对象
                app.lists=response.data.data
            }
        })
        next()
    },
    methods:{
    routeto(index,title){
      this.$router.push('/topiclist/' + this.topics[index].name )
    },

    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);},
    handleChange(){
          var app=this;
        this.$http.get('/topics',{
            params:{
                tab : this.name,
                page: this.currentPage,
                limit: this.limit
            }
        }).then(function(response){
            if(response.data.success){
                // 异步请求 此时this不再表示当前组件对象
                app.lists=response.data.data
            }
        })
    },
    },

      watch: {
          // 如果路由有变化，会再次执行该方法
          "$route.path": function(){
      if(this.$route.path !== '/topiclist/' + this.topics[this.active].name){
        switch(this.$route.path){
            case '/topiclist/all':
            this.active=0;
            break;
             case '/topiclist/good':
            this.active=1;
            break;
             case '/topiclist/share':
            this.active=2;
            break;
             case '/topiclist/ask':
            this.active=3;
            break;
             case '/topiclist/job':
            this.active=4;
            break;
             case '/topiclist/dev':
            this.active=5;
            break;
        }
      }
          }
        }

}
</script>

<style scoped>
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
.cell_title .reply_count{
    color: #9e78c0;
}
.cell_title .visit——count{
    color: hsl(0, 0%, 71%);
}
.cell_title .top{
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    color: #fff;
     margin-left:5px;

}
.cell_title .tab{
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;;
    font-size: 12px;
    margin-left:5px;
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
