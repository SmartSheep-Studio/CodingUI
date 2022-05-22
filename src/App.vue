<template>
  <div id="app">
    <n-config-provider>
      <n-message-provider>
        <n-notification-provider>
          <network-detection>
            <router-view></router-view>
          </network-detection>
        </n-notification-provider>
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<script lang="ts" setup>
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
} from "naive-ui";
import NetworkDetection from "./layouts/foundation/NetworkDetection.vue";
</script>

<style>
.container {
  max-width: 1120px;
  padding: 20px 16px;
  margin: 0 auto;
}

.container-fluid {
  padding: 20px 16px;
  margin: 0 auto;
  min-width: 100vw;
}

.container-size {
  min-height: calc(100vh - 70px);
  min-width: 100vw;
}
</style>
