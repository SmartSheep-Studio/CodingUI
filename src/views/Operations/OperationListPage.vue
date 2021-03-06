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
              </n-button>
            </div>
          </n-space>
          <n-list bordered>
            <n-list-item v-if="operations.logs.length === 0">
              <n-empty description="目前没有任何行动记录" />
            </n-list-item>
            <n-list-item
              v-for="(item, index) in operations.logs.slice(
                (operations.pagination.logs - 1) * 3,
                (operations.pagination.logs - 1) * 3 + 3
              )"
              v-else
              :key="index"
            >
              <n-thing
                :title-extra="new Date(item['created_at']).toLocaleString()"
                @click="
                  () => {
                    if (item['status'] === 'working') {
                      $router.push({ name: 'Operation.Execute', query: { id: item['id'] } });
                    }
                  }
                "
              >
                <template #header><code>{{ item["operation"] }}</code></template>
                <template #description>
                  <n-space justify="space-between"
                    ><span>
                      <n-tag v-if="item['status'] === 'finished'" type="success">行动成功</n-tag>
                      <n-tag v-else-if="item['status'] === 'canceled'" type="error">行动取消</n-tag>
                      <n-tag v-else type="info">行动可用</n-tag> </span
                    ><span><code>#{{ item["id"] }}</code></span></n-space
                  >
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
          <n-space justify="center">
            <n-pagination
              v-model:page="operations.pagination.logs"
              :page-count="Math.ceil(operations.logs.length / 3)"
            />
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="24">
        <n-card title="订单列表">
          <n-space align="center" justify="space-between" style="padding-right: 10px; padding-left: 10px">
            <n-space size="small">
              <n-checkbox v-model:checked="filter.ignore">忽略限制</n-checkbox>
              <n-checkbox v-model:checked="filter.unfinished">仅未完成</n-checkbox>
              <span
                >章节 <span v-if="filter.chapter == null">未选择</span><span v-else>{{ filter.chapter }}</span></span
              >
            </n-space>
            <n-space>
              <n-button @click="chapter.selector = !chapter.selector" size="small">选择章节</n-button>
              <n-button :loading="connecting" size="small" type="primary" @click="operations.fetch()"
                >重新获取
              </n-button>
            </n-space>
          </n-space>
          <n-list bordered>
            <n-list-item v-if="operations.data.length === 0">
              <n-empty description="目前没有任何订单" />
            </n-list-item>
            <n-list-item
              v-for="(item, index) in operations.data.slice(
                (operations.pagination.operations - 1) * 10,
                (operations.pagination.operations - 1) * 10 + 10
              )"
              v-else
              :key="index"
            >
              <n-thing :title="item['title']" @click="preview.preview(item)">
                <template #header-extra
                  ><n-tag>{{ item["category"] }}</n-tag></template
                >
                <template #description>
                  <n-space justify="space-between"
                    ><n-space size="small"
                      ><n-tag v-if="item['finished']" type="success">已完成</n-tag
                      ><n-tag v-else-if="item['unlocked']" type="info">已解锁</n-tag
                      ><n-tag v-else type="error">未解锁</n-tag
                      ><n-tag
                        >需求等级 <b>Lv{{ item["conditions"]["level"] }}</b></n-tag
                      >
                      <n-tag
                        >需求进度 <b>Pr{{ item["conditions"]["progress"] }}</b></n-tag
                      ></n-space
                    ><span
                      ><code>{{ item["id"] }}</code></span
                    >
                  </n-space>
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
          <n-space justify="center">
            <n-pagination
              v-model:page="operations.pagination.operations"
              :page-count="Math.ceil(operations.data.length / 10)"
            />
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <!-- Operation Preview Drawer -->
    <n-drawer v-model:show="preview.display" :width="680">
      <n-drawer-content :native-scrollbar="false" :title="preview.previewing['title']" closable>
        <n-space :size="24" vertical>
          <n-thing title="剧情">
            <div v-html="preview.previewing['story']"></div>
          </n-thing>
          <n-thing title="简介" v-if="preview.previewing['description'] !== ''">
            <div v-html="preview.previewing['description']"></div>
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
                  v-for="(item, index) in preview.previewing['judgement']"
                  :key="index"
                  :name="'example' + index"
                  :title="'样例 #' + (index + 1)"
                  size="small"
                >
                  <n-space vertical>
                    <n-card hoverable size="small" title="输入数据">
                      <n-code :code="item['stdin']"></n-code>
                    </n-card>
                    <n-card hoverable size="small" title="输出数据">
                      <n-code :code="item['stdout']"></n-code>
                    </n-card>
                  </n-space>
                </n-collapse-item>
              </n-collapse>
            </n-card>
          </n-thing>
        </n-space>
        <template #footer>
          <n-button size="small" type="primary" @click="preview.start()" :loading="connecting">开始行动</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>

    <!-- Chapter Selector -->
    <n-modal
      v-model:show="chapter.selector"
      class="custom-card"
      preset="card"
      title="章节选择"
      style="max-width: 60vw"
      :bordered="false"
    >
      <n-space
        align="center"
        justify="space-between"
        style="padding-right: 10px; padding-left: 10px; padding-bottom: 20px"
      >
        <n-space>
          <n-checkbox v-model:checked="filter.chapterIgnore">忽略限制</n-checkbox>
        </n-space>
        <n-space>
          <n-button
            size="small"
            @click="
              () => {
                filter.chapter = null;
                chapter.selector = !chapter.selector;
              }
            "
            >清空选择</n-button
          >
          <n-button :loading="connecting" size="small" type="primary" @click="chapter.fetch()">重新获取</n-button>
        </n-space>
      </n-space>
      <n-card>
        <n-collapse accordion>
          <n-collapse-item v-for="(item, index) in chapter.data.slice(
                (operations.pagination.chapters - 1) * 3,
                (operations.pagination.chapters - 1) * 3 + 3
              )" :key="index" :title="item['id']">
            <template #header-extra
              ><n-tag>{{ item["category"] }}</n-tag></template
            >
            <div style="padding: 20px">
              <n-thing title="剧情">
                <div v-html="item['story']"></div>
              </n-thing>
              <n-thing title="简介" v-if="item['description'] !== ''">
                <div v-html="item['description']"></div>
              </n-thing>
            </div>
            <n-space justify="space-between">
              <n-space
                ><n-tag
                  >所需等级 <b>Lv{{ item["data"]["level"] }}</b></n-tag
                ><n-tag
                  >所需进度 <b>Pr{{ item["data"]["progress"] }}</b></n-tag
                ></n-space
              >
              <n-button
                type="primary"
                size="small"
                @click="
                  () => {
                    filter.chapter = item['id'];
                    chapter.selector = !chapter.selector;
                  }
                "
                >选择此章节</n-button
              >
            </n-space>
          </n-collapse-item>
        </n-collapse>
      </n-card>
      <n-space justify="center" style="padding-top: 20px"><n-pagination v-model:page="operations.pagination.chapters" :page-count="Math.ceil(chapter.data.length / 3)" /></n-space>
    </n-modal>
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
  NPagination,
  NModal,
  useMessage,
} from "naive-ui";
import { inject, reactive, ref, watch } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";
import { useStatusStore } from "../../stores/status";

const cookies = inject("$cookies") as VueCookies;
const message = useMessage();
const store = useStatusStore();
const router = useRouter();
const axios = inject("axios") as Axios;
const connecting = ref(false);
const filter = reactive({
  ignore: false,
  unfinished: true,
  working: false,
  chapter: null,
  chapterIgnore: false,
});
const chapter: any = reactive({
  data: [],
  selector: false,
  fetch: async () => {
    connecting.value = true;
    const response = await axios.get("/api/operations/chapter?ignore=" + (filter.chapterIgnore ? "yes" : "no"), {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status === 200) {
      chapter.data = response.data["Response"];
    } else {
      message.error("获取章节列表失败");
    }
    connecting.value = false;
  },
});
const preview: any = reactive({
  display: false,
  previewing: {},
  preview: (item: any) => {
    preview.display = true;
    preview.previewing = item;
    preview.previewing["story"] = preview.previewing["story"].replace("{DOCTOR_NAME}", store.profile.user["username"]);
    preview.previewing["description"] = preview.previewing["description"].replace(
      "{DOCTOR_NAME}",
      store.profile.user["username"]
    );
  },
  start: async () => {
    connecting.value = true;
    const response = await axios.post(
      "/api/operations/start",
      { id: preview.previewing["id"] },
      {
        headers: { Authorization: "Bearer " + cookies.get("access_token") },
      }
    );
    if (response.status === 402) {
      message.warning("无法开展行动，资源或者行动槽位不足，请检查行动消耗");
    } else if (response.status === 400) {
      if (response.data["Status"]["Code"] === "OPERATION_STARTED") {
        message.warning("无法开展行动，此行动已经正在进行中");
      } else if(response.data["Status"]["CodeDetail"] === "DISSATISFY_THE_CONDITIONS") {
        message.warning("不满足开展条件要求，请满足该行动条件后重试")
      } else {
        message.error("无法开展行动，找不到目标行动或者行动已终止，请刷新行动列表");
      }
    } else {
      message.success("行动成功开展");
      router.push({ name: "Operation.Execute", query: { id: response.data["Response"]["id"] } });
    }
    connecting.value = false;
  },
});
const operations = reactive({
  data: [],
  logs: [],
  progress: [],
  pagination: {
    logs: 1,
    operations: 1,
    chapters: 1,
  },
  fetch: async () => {
    let response;
    connecting.value = true;
    // Get Available Operations
    response = await axios.get(
      "/api/operations?ignore=" +
        (filter.ignore ? "yes" : "no") +
        "&unfinished=" +
        (filter.unfinished ? "yes" : "no") +
        (filter.chapter == null ? "" : "&chapter=" + filter.chapter),
      {
        headers: { Authorization: "Bearer " + cookies.get("access_token") },
      }
    );
    if (response.status != 200) {
      message.error("无法获取现有行动");
    } else {
      operations.data = response.data["Response"];
    }

    // Get Operation Progress
    response = await axios.get("/api/operations/progress?simple=yes", {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status != 200) {
      message.error("无法获取现有行动进度");
    } else {
      operations.progress = response.data["Response"];
    }

    // Get Operation Records
    response = await axios.get("/api/operations/logs?ignore=" + (!filter.working ? "yes" : "no"), {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status != 200) {
      message.error("无法获取行动记录");
    } else {
      operations.logs = response.data["Response"];
    }
    connecting.value = false;
  },
});

watch(
  store.profile,
  async () => {
    await chapter.fetch();
    await operations.fetch();
  },
  { immediate: true, deep: true }
);
</script>

<style scoped></style>
