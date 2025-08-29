<script setup lang="ts">
import { alt } from "@/utils/alt";
import { LocalWebViewEvents, type NotificationData } from "shared";
import { ref } from "vue";

const notificationMessage = ref("");
const notificationBorderColor = ref("");
const notificationEmoji = ref("");

alt.on(
  LocalWebViewEvents.SHOW_NOTIFICATION,
  ({ message, type }: NotificationData) => {
    notificationMessage.value = message;

    switch (type) {
      case "error":
        notificationBorderColor.value = "#ff0000";
        notificationEmoji.value = "🔴";
        break;
      case "normal":
        notificationBorderColor.value = "#ffffff";
        break;
      case "success":
        notificationBorderColor.value = "#00ff00";
        notificationEmoji.value = "🟢";
        break;
      case "warn":
        notificationBorderColor.value = "#ffff00";
        notificationEmoji.value = "⚠️";
        break;
    }
  }
);
</script>

<template>
  <div class="ui">
    <div class="notification" :style="{ borderColor: notificationBorderColor }">
      <span class="icon">{{ notificationEmoji }}</span>
      <span class="message">{{ notificationMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.ui {
  height: 100%;
  width: 100%;
  position: absolute;
}

.notification {
  display: flex;
  gap: 5px;
  height: 100px;
  width: 500px;
  background-color: rgba(197, 197, 197, 0.984);
  border: 5px;
}

.message {
  color: red;
}
</style>
