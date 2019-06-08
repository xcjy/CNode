<template>
    <div></div> 
</template>

<script>
export default {
    name: 'logout',
    created(){
        // 1 恢复 vuex中的数据为原始状态
        this.$store.commit('mutationLogout')
        //  2   清空localStorage
         localStorage.clear()
        // 跳转
        this.$router.push('/topiclist/all')
    },
}
</script>
