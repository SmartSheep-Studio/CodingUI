<template>
  <div class="container">
    <n-grid :x-gap="16" :y-gap="16">
      <n-grid-item :span="15">
        <n-card title="订单列表"></n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import {NGrid, NGridItem, NCard} from "naive-ui";
</script>

<style scoped>

</style>
