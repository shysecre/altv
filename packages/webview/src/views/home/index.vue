<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { alt } from "@/utils/alt";

export default defineComponent({
  name: "Home",
  setup() {
    onMounted(() => {
      if (typeof alt !== "undefined") {
        alt.on("hey", (args) => {
          console.log("Alt event received:", args);
        });
      }
    });

    return {};
  }
});
</script>

<template>
  <div class="hello">HELLO WORLD!</div>
</template>

<style scoped>
.hello {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  font-size: 2rem;
}
</style>
