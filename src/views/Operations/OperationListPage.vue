<template>
  <div class="container">
    <n-grid :x-gap="16" :y-gap="16">
      <n-grid-item :span="24">
        <n-card title="行动记录">
          <n-space align="center" justify="space-between" style="padding-right: 10px; padding-left: 10px">
            <n-space>
              <n-checkbox v-model:checked="filter.working">仅行动中</n-checkbox>
            </n-space>
            <div>
              <n-button :loading="connecting" size="small" type="primary" @click="operations.fetch()"
              >重新获取
              </n-button
              >
            </div>
          </n-space>
          <n-list bordered>
            <n-list-item v-if="operations.records.length === 0">
              <n-empty description="目前没有任何行动记录"/>
            </n-list-item>
            <n-list-item v-for="(item, index) in operations.records.slice(0, 3)" v-else :key="index">
              <n-thing
                  :title="item['operation']"
                  :title-extra="new Date(item['created_at']).toLocaleString()"
              >
                <template #description
                >
                  <n-space justify="space-between"
                  ><span>
                    <n-tag v-if="item['status'] === 'finished'" type="success">行动成功</n-tag>
                    <n-tag
                        v-else-if="item['status'] === 'canceled'"
                        type="error">行动取消</n-tag>
                    <n-tag
                        v-else type="info">行动中</n-tag>
                  </span><span>#{{ item['id'] }}</span></n-space
                  >
                </template
                >
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="24">
        <n-card title="订单列表">
          <n-space align="center" justify="space-between" style="padding-right: 10px; padding-left: 10px">
            <n-space>
              <n-checkbox v-model:checked="filter.ignore">忽略限制</n-checkbox>
              <n-checkbox v-model:checked="filter.unfinished">仅未完成</n-checkbox>
            </n-space>
            <div>
              <n-button :loading="connecting" size="small" type="primary" @click="operations.fetch()"
              >重新获取
              </n-button
              >
            </div>
          </n-space>
          <n-list bordered>
            <n-list-item v-if="operations.data.length === 0">
              <n-empty description="目前没有任何订单"/>
            </n-list-item>
            <n-list-item v-for="(item, index) in operations.data" v-else :key="index">
              <n-thing
                  :title="item['data']['title']"
                  :title-extra="item['data']['category']"
                  @click="preview.preview(item)"
              >
                <template #description
                >
                  <n-space justify="space-between"
                  ><span
                  ><span
                  >需求等级 <b>Lv{{ item["conditions"]["level"] }}</b></span
                  >&nbsp;
                      <span
                      >需求关卡 <b>{{ item["conditions"]["progress"] }}</b></span
                      ></span
                  ><span>{{ item["id"] }}</span></n-space
                  >
                </template
                >
              </n-thing>
            </n-list-item>
          </n-list>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-drawer v-model:show="preview.display" :width="680">
      <n-drawer-content :native-scrollbar="false" :title="preview.previewing['data']['title']" closable>
        <n-space :size="24" vertical>
          <n-thing title="剧情">
            <div v-html="preview.previewing['data']['description']"></div>
          </n-thing>
          <n-thing title="消耗">
            <n-list bordered>
              <n-list-item v-for="(cost, index) in preview.previewing['costs']" :key="index">
                <span v-if="cost['id'] === 'rational'">理智</span>
                <template #suffix>{{ cost["amount"] }}</template>
              </n-list-item>
            </n-list>
          </n-thing>
          <n-thing title="奖励">
            <n-list bordered>
              <n-list-item v-for="(reward, index) in preview.previewing['rewards']" :key="index">
                <span v-if="reward['id'] === 'code-coin'">逻辑币</span>
                <template #suffix>{{ reward["amount"] }}</template>
              </n-list-item>
            </n-list>
          </n-thing>
          <n-thing title="用例">
            <n-card>
              <n-collapse>
                <n-collapse-item
                    v-for="(item, index) in preview.previewing['data']['judgement']"
                    :key="index"
                    :name="'example' + index"
                    :title="'样例 #' + (index + 1)"
                    size="small"
                >
                  <n-space vertical
                  >
                    <n-card hoverable size="small" title="输入数据">
                      <n-code :code="item['stdin']"></n-code>
                    </n-card
                    >
                    <n-card hoverable size="small" title="输出数据"
                    >
                      <n-code :code="item['stdout']"></n-code>
                    </n-card>
                  </n-space
                  >
                </n-collapse-item>
              </n-collapse>
            </n-card>
          </n-thing>
        </n-space>
        <template #footer>
          <n-button size="small" type="primary">开始行动</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import {Axios} from "axios";
import {
  NGrid,
  NGridItem,
  NCard,
  NList,
  NListItem,
  NThing,
  NTag,
  NSpace,
  NCheckbox,
  NButton,
  NDrawer,
  NDrawerContent,
  NCollapse,
  NCollapseItem,
  NCode,
  NEmpty,
  useMessage,
} from "naive-ui";
import {inject, reactive, ref, watch} from "vue";
import {VueCookies} from "vue-cookies";
import {useStatusStore} from "../../stores/status";

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
  unfinished: true,
  working: false,
});
const operations = reactive({
  data: [],
  records: [],
  progress: [],
  fetch: async () => {
    let response;
    connecting.value = true;
    // Get Available Operations
    response = await axios.get("/api/operations?ignore=" + (filter.ignore ? "yes" : "no") + "&unfinished=" + (filter.unfinished ? "yes" : "no"), {
      headers: {Authorization: "Bearer " + cookies.get("access_token")},
    });
    if (response.status != 200) {
      message.error("无法获取现有行动");
    } else {
      operations.data = response.data["Response"];
    }

    // Get Operation Progress
    response = await axios.get("/api/operations/progress?simple=yes", {
      headers: {Authorization: "Bearer " + cookies.get("access_token")},
    });
    if (response.status != 200) {
      message.error("无法获取现有行动进度");
    } else {
      operations.progress = response.data["Response"];
    }

    // Get Operation Records
    response = await axios.get("/api/operations/records?ignore=" + (!filter.working ? "yes" : "no"), {
      headers: {Authorization: "Bearer " + cookies.get("access_token")},
    });
    if (response.status != 200) {
      message.error("无法获取行动记录");
    } else {
      operations.records = response.data["Response"];
    }
    connecting.value = false;
  },
});

watch(
    store.profile,
    async () => {
      await operations.fetch();
    },
    {immediate: true, deep: true}
);
</script>

<style scoped></style>
