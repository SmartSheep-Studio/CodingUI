<template>
  <n-layout style="height: 100vh">
    <n-layout-header style="height: 64px" bordered>
      <n-grid>
        <n-gi :span="3" style="text-align: center">
          <img
            src="../assets/codingland_logo_text.svg"
            alt="CodingLand"
            width="128"
            height="64"
          />
        </n-gi>
        <n-gi :span="15" style="padding: 12px">
          <n-menu
            v-model:value="navigator.active"
            mode="horizontal"
            :options="navigator.options"
          />
        </n-gi>
        <n-gi :span="6">
          <div style="float: right; padding: 16px 30px 16px 16px;">
            <div v-if="!cookies.isKey('access_token')">
              <n-button
                type="primary"
                @click="$router.push({ name: 'User.Entry.SignIn' })"
                >登入</n-button
              >
            </div>
            <div v-else>
              <n-dropdown
                trigger="hover"
                @select="dropdownHandler"
                :options="[
                  {
                    label: '登出',
                    key: 'logout',
                  },
                ]"
              >
                <n-avatar
                  :size="32"
                />
              </n-dropdown>
            </div>
          </div>
        </n-gi>
      </n-grid>
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px" has-sider>
      <n-layout :native-scrollbar="false">
        <router-view></router-view>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import {
  NLayout,
  NLayoutHeader,
  NGrid,
  NGi,
  NMenu,
  NIcon,
  NButton,
  NAvatar,
  NDropdown,
  useMessage,
} from "naive-ui";
import { Component, h, inject, reactive, watch } from "vue";
import { HomeOutlined as DashboardIcon } from "@vicons/antd";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { VueCookies } from "vue-cookies";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const cookies = inject('$cookies') as VueCookies;
const message = useMessage();
const route = useRoute();
const router = useRouter();
const navigator: any = reactive({
  active: route.name,
  options: [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: "Dashboard",
              params: {
                lang: "zh-CN",
              },
            },
          },
          { default: () => "仪表盘" }
        ),
      key: "Dashboard",
      icon: renderIcon(DashboardIcon),
    },
  ],
});

function dropdownHandler(key: string | number) {
  switch (key) {
    case "logout":
      cookies.remove("access_token");
      message.success("Logout successfully!");
      setTimeout(() => router.go(0), 300)
      return;
    default:
      return;
  }
}

watch(route, (value) => {
  navigator.active = value.name;
});
</script>
