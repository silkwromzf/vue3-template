<template>
    <div class="permission">
        permission
        <div>
            <button v-on:click="switchRole(1)">admin</button>
            |
            <button v-on:click="switchRole(2)">school</button>
            |
            <button v-on:click="switchRole(3)">teacher</button>
        </div>
        <router-link to="/permission/teacher">teacher</router-link>
        |
        <router-link to="/permission/school">school</router-link>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Role } from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Permission',
    methods: {
        switchRole(role: Role) {
            this.$store.dispatch('permission/generateRoutes', role);
        }
    }
});
</script>

<style lang="less" scoped></style>
