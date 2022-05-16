<template>
  <div id="app">
    <n-config-provider>
      <n-message-provider>
        <n-notification-provider>
          <router-view></router-view>
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
  min-height: calc(100vh - 70px - 60px);
  min-width: 100vw;
}
</style>
