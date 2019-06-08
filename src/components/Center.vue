<template>
    <div>center page</div> 
</template>

<script>
export default {
    name: 'center',
    computed:{
        loginName: function(){
            return this.$store.state.loginName
        }
    },
    created(){
        this.$router.replace('/user/'+ this.loginName)
    },
}
</script>
