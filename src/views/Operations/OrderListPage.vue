<template>
  <div class="container">
    <n-grid :x-gap="16" :y-gap="16">
      <n-grid-item :span="24">
        <n-card title="订单列表">
          <n-space justify="space-between" align="center" style="padding-right: 10px; padding-left: 10px">
            <div><n-checkbox v-model:checked="filter.ignore">忽略限制</n-checkbox></div>
            <div>
              <n-button type="primary" size="small" @click="operations.fetch()" :loading="connecting"
                >重新获取</n-button
              >
            </div>
          </n-space>
          <n-list bordered>
            <n-list-item v-for="(item, index) in operations.data" :key="index">
              <n-thing
                @click="preview.preview(item)"
                :title="item['data']['title']"
                :title-extra="item['data']['category']"
              >
                <template #description
                  ><n-space justify="space-between"
                    ><span
                      >需求等级 <b>Lv{{ item["conditions"]["level"] }}</b></span
                    >
                    <span
                      >需求关卡 <b>{{ item["conditions"]["progress"] }}</b></span
                    ></n-space
                  ></template
                >
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-drawer v-model:show="preview.display" :width="680">
      <n-drawer-content closable :title="preview.previewing['data']['title']">
        <n-space vertical :size="24">
          <n-thing title="剧情"><div v-html="preview.previewing['data']['description']"></div></n-thing>
          <n-thing title="用例">
            <n-space vertical>
              <n-card
                v-for="(item, index) in preview.previewing['data']['judgement']"
                :key="index"
                size="small"
                :title="'样例 #' + (index + 1)"
                ><n-space vertical
                  ><n-card size="small" title="输入数据"><n-code :code="item['stdin']"></n-code></n-card
                  ><n-card size="small" title="输出数据"><n-code :code="item['stdout']"></n-code></n-card></n-space
              ></n-card>
            </n-space>
          </n-thing>
        </n-space>
        <template #footer><n-button type="primary" size="small">开始行动</n-button></template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { Axios } from "axios";
import {
  NGrid,
  NGridItem,
  NCard,
  NList,
  NListItem,
  NThing,
  NEllipsis,
  NSpace,
  NCheckbox,
  NButton,
  NDrawer,
  NDrawerContent,
  NCode,
  useMessage,
} from "naive-ui";
import { inject, reactive, ref, watch } from "vue";
import { VueCookies } from "vue-cookies";
import { useStatusStore } from "../../stores/status";

const cookies = inject("$cookies") as VueCookies;
const message = useMessage();
const store = useStatusStore();
const axios = inject("axios") as Axios;
const connecting = ref(false);
const preview: any = reactive({
  display: false,
  previewing: {},
  preview: (item: object) => {
    preview.display = true;
    preview.previewing = item;
    preview.previewing["data"]["description"] = preview.previewing["data"]["description"].replace(
      "{DOCTOR_NAME}",
      store.profile.user["username"]
    );
  },
});
const filter = reactive({
  ignore: false,
});
const operations = reactive({
  data: [],
  fetch: async () => {
    connecting.value = true;
    const response = await axios.get("/api/operations?ignore=" + (filter.ignore ? "yes" : "no"), {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status != 200) {
      message.error("无法获取现有行动");
    } else {
      operations.data = response.data["Response"];
    }
    connecting.value = false;
  },
});

watch(
  store.profile,
  async () => {
    await operations.fetch();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped></style>
