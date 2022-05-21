<template>
  <div>
    <div v-if="status.connecting">
      <div class="container-size-fluid" style="display: flex; align-items: center">
        <div style="margin: auto; text-align: center;">
          <div id="title"><img src="../../assets/codingland_logo_text.svg" height="100" width="180"></div>
          <div id="description" style="font-size: 15px; color: #808080">
            <span v-if="status.step === 0">Establishing a connection to the neural network 🔗</span>
            <span v-if="status.step === 1">Fetching your profile 🤔️</span>
          </div>
          <div id="progress" style="padding-top: 16px;">
            <n-spin size="small"></n-spin>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status.error">
      <div class="container-size-fluid" style="display: flex; align-items: center">
        <div style="margin: auto; text-align: center;">
          <div id="title"><img src="../../assets/codingland_logo_text.svg" height="100" width="180"></div>
          <div id="description" style="font-size: 15px">
            <span>Unable to link with neural network suggestion 😣</span> <br>
            <n-divider></n-divider>
            <span style="color: #808080">Network Error 🌍</span>
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
            <n-divider></n-divider>
            <span style="color: #808080">Services Down 🛑</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Axios, AxiosResponse} from 'axios';
import {NSpin ,NDivider, useMessage} from 'naive-ui';
import {inject, onMounted, reactive} from 'vue';
import {VueCookies} from 'vue-cookies';
import {useRouter} from 'vue-router';
import {useStatusStore} from '../../stores/status';

const store = useStatusStore();
const router = useRouter();
const message = useMessage();
const cookies = inject("$cookies") as VueCookies;
const axios = inject("axios") as Axios;
const status: any = reactive({
  connecting: true,
  available: true,
  error: false,
  detail: {},
  step: 0,
})

async function connect() {
  try {
    let response: AxiosResponse;
    response = await axios.get("/api", {timeout: 3000});
    if (response.data["Response"]["Services"] === "DOWN") {
      status.available = false
      status.detail = response.data["Response"]
      return
    } else {
      status.detail = response.data["Response"]
    }
    if (cookies.isKey("access_token")) {
      status.step++
      response = await axios.get("/api/security/users/profile?detail=yes", {headers: {Authorization: "Bearer " + cookies.get("access_token")}})
      if (response.status === 401) {
        message.error("Neuron memory lost, please sign in again!")
        cookies.remove("access_token")
        setTimeout(() => {
          router.go(0)
        }, 300)
      } else {
        const profile = response.data["Response"]
        store.setUserProfile(profile["User"], profile["Group"], profile["Backpack"])
        status.connecting = false
      }
    } else {
      status.connecting = false
    }
  } catch (error) {
    status.error = true
  } finally {
    status.connecting = false
  }
}

async function fetchUserProfile() {

}

onMounted(async () => {
  await connect()
})
</script>
