const mutations={

//修改 active
mutationChangeActive: function(state,payLoad){
    state.active=payLoad
},

//修改showmoreMenus
mutationIsShowMoreMenus: function(state,payLoad){
    state.showMoreMenus=payLoad
},

mutationLogin:function(state){
    state.isLogined=true ;

},

mutationLoginName: function(state,payLoad){
    state.loginName=payLoad

},
mutationAccessToken:function(state,payload){
    state.accessToken=payload
},

mutationLogout: function(state){
    state.isLogined=false
    state.loginName= ''
    state.accessToken= ''
}


};
export default mutations;
