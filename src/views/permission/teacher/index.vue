<template>
    <div>teacher</div>
    <router-link to="/permission/teacher/setting">setting</router-link>
    <router-link to="/permission/teacher/info">info</router-link>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Teacher'
});
</script>

<style lang="less" scoped></style>
