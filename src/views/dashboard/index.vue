<template>
    <div>
        dashboard
        <button @click="logout">登出</button>
    </div>
    <Layout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@/components/layout/index.vue';

export default defineComponent({
    name: 'Dashboard',
    components: { Layout },
    methods: {
        logout() {
            this.$store.dispatch('user/logout');
        }
    }
});
</script>

<style lang="less" scoped></style>
