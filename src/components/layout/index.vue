<template>
    <div class="a">layout</div>
    <router-link to="/">components</router-link>|
    <router-link to="/confirm">confirm</router-link>|
    <router-link to="/permission">permission</router-link>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Layout',
    props: {}
});
</script>

<style lang="less" scoped></style>
