<template>
    <div class="login">
        login
        <button @click="login">登录</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Login',
    methods: {
        login() {
            this.$store.dispatch('user/getToken').then(async () => {
                await this.$store.dispatch('user/getUserInfo');
                const { redirectedFrom } = this.$router.currentRoute.value;
                // 未登录的跳转路由动态可能未添加
                this.$router.push(redirectedFrom?.path || '/');
            });
        }
    }
});
</script>
