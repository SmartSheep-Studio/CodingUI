<template>
  <div>
    <div v-if="status.connecting">
      <div style="display: flex; align-items: center; height: 100vh; width: 100vw">
        <div style="margin: auto; text-align: center">
          <div id="title">
            <img height="100" src="../../assets/codingland_logo_text.svg" width="180" />
          </div>
          <div id="description" style="font-size: 15px; color: #808080">
            <span v-if="status.step === 0">正在与神经网络节点建立连接 🔗</span>
            <span v-if="status.step === 1">正在读取您的神经记忆 🤔️</span>
          </div>
          <div id="progress" style="padding-top: 16px">
            <n-spin size="small"></n-spin>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status.error.isHappened">
      <div style="display: flex; align-items: center; height: 100vh; width: 100vw">
        <div style="margin: auto; text-align: center">
          <div id="title">
            <img height="100" src="../../assets/codingland_logo_text.svg" width="180" />
          </div>
          <div id="description" style="font-size: 15px">
            <span>{{ status.error.detail }}</span>
            <div style="padding-top: 12px">
              <span style="color: #808080">{{ status.error.summary }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status.available">
      <slot></slot>
    </div>
    <div v-else>
      <div style="display: flex; align-items: center; height: 100vh; width: 100vw">
        <div style="margin: auto; text-align: center">
          <div id="title">
            <img height="100" src="../../assets/codingland_logo_text.svg" width="180" />
          </div>
          <div id="description" style="font-size: 15px">
            <span>{{ status.detail["Message"] }}</span>
            <div style="padding-top: 12px">
              <span style="color: #808080">服务终止 🛑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Axios, AxiosResponse } from "axios";
import { NSpin, useMessage } from "naive-ui";
import { inject, onMounted, reactive, watch } from "vue";
import { VueCookies } from "vue-cookies";
import { useRoute, useRouter } from "vue-router";
import { useStatusStore } from "../../stores/status";

const store = useStatusStore();
const route = useRoute();
const router = useRouter();
const message = useMessage();
const cookies = inject("$cookies") as VueCookies;
const axios = inject("axios") as Axios;
const status: any = reactive({
  connecting: true,
  available: true,
  error: {
    isHappened: false,
    summary: "",
    detail: "",
  },
  detail: {},
  step: 0,
});

async function connect() {
  try {
    let response: AxiosResponse;
    response = await axios.get("/api", { timeout: 3000 });
    if (response.data["Response"] == null) {
      return;
    }
    if (response.data["Response"]["Services"] === "DOWN") {
      status.available = false;
      status.detail = response.data["Response"];
      return;
    } else {
      status.detail = response.data["Response"];
      store.setNodeInformation(response.data["Response"]["NodeName"], response.data["Response"]["Details"]);
    }
    if (cookies.isKey("access_token")) {
      status.step++;
      await fetchUserProfile();
    } else {
      status.connecting = false;
    }
  } catch (error) {
    console.log(error);
    status.error.isHappened = true;
    status.error.summary = "通信错误 💥";
    status.error.detail = "无法检测到神经网络节点生命活动迹象，请检查通信桥梁是否正常 😣";
  } finally {
    status.connecting = false;
  }
}

async function fetchUserProfile() {
  const response = await axios.get("/api/security/users/profile?detail=yes", {
    headers: { Authorization: "Bearer " + cookies.get("access_token") },
  });
  if (response.data["Response"]["Lock"] != null) {
    status.error.isHappened = true;
    status.error.summary = "神经档案被锁定，无法使用 🔒";
    status.error.detail = response.data["Response"]["Lock"]["description"];
    cookies.remove("access_token");
  } else {
    const profile = response.data["Response"];
    store.setUserProfile(profile["User"], profile["Group"], profile["Backpack"]);
    status.connecting = false;
  }
}

axios.interceptors.response.use((response) => {
  if (response.status === 429) {
    store.isDefenseNow(false);
    status.error.isHappened = true;
    status.error.summary = "神经连接被拒 🚧";
    status.error.detail = "有时候，喝杯茶，休息一下也不为过 ♨️";
  } else if (response.status === 401) {
    cookies.remove("access_token");
    message.error("无法进行神经连接验证，请重新验证身份");
    if(route.name !== "User.Entry.SignIn") {
      router.push({ name: "User.Entry.SignIn" });
    }
  }
  return response;
});

watch(store.node, () => {
  if (store.node.defense) {
    console.warn("[DEFENSE] Neural nodes automatically activate defense.");
    status.error.isHappened = true;
    status.error.summary = "神经连接被拒 🚧";
    status.error.detail = "有时候，喝杯茶，休息一下也不为过 ♨️";
    store.isDefenseNow(false);
  }
});

onMounted(async () => {
  await connect();
});
</script>
