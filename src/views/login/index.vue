<template>
  <div class="login">
    login
    <button @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  methods: {
    login() {
      this.$router.push("/");
    }
  }
});
</script>
