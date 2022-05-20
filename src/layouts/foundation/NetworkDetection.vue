<template>
  <div>
    <div v-if="status.connecting">
      <div class="container-size-fluid" style="display: flex; align-items: center">
        <div style="margin: auto; text-align: center;">
          <div id="title"><img src="../../assets/codingland_logo_text.svg" height="100" width="180"></div>
          <div id="description" style="font-size: 15px; color: #808080">
            <span v-if="status.step === 0">Establishing a connection to the neural network server</span>
            <span v-if="status.step === 1">Pulling your profile</span>
          </div>
          <div id="progress" style="padding-top: 16px;">
            <n-spin size="small"></n-spin>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status.available">
      <slot></slot>
    </div>
    <div v-else>
      <div class="container-size-fluid" style="display: flex; align-items: center">
        <div style="margin: auto; text-align: center;">
          <div id="title"><img src="../../assets/codingland_logo_text.svg" height="100" width="180"></div>
          <div id="description" style="font-size: 15px">
            <span>{{ status.detail["Message"] }}</span> <br>
            <span style="color: #808080">Services Down</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Axios } from 'axios';
import { NSpin } from 'naive-ui';
import { inject, onMounted, reactive } from 'vue';

const axios = inject("axios") as Axios;
const status: any = reactive({
  connecting: true,
  available: true,
  detail: {},
  step: 0,
})

async function connect() {
  const response = await axios.get("/api");
  if (response.data["Response"]["Services"] === "DOWN") {
    status.available = false
  }
  status.detail = response.data["Response"];
  status.connecting = false;
}

onMounted(async () => {
  await connect()
})
</script>
