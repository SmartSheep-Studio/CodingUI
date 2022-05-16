<template>
  <div class="container">
    <IntroduceDashboard v-if="!cookies.isKey('access_token')" />
    <StatisticsDashboard v-else />
  </div>
</template>

<script lang="ts" setup>
import IntroduceDashboard from "./IntroduceDashboard.vue";
import StatisticsDashboard from "./StatisticsDashboard.vue";

import { VueCookies } from "vue-cookies";
import { inject } from "vue";

const cookies = inject("$cookies") as VueCookies;
</script>
