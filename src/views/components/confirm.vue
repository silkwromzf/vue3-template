<template>
  <div class="confirm">
    <div>confirm</div>
    <Confirm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Confirm from "@/components/confirm/index";

export default defineComponent({
  name: "ComponentsConfirm",
  components: { Confirm },
  props: {}
});
</script>

<style lang="less" scoped></style>
