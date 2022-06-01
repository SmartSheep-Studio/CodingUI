<template>
  <div class="container-size horizontal-wrapper">
    <div class="horizontal-left">
      <div class="horizontal-resize"></div>
      <div class="editor">
        <MonacoEditor v-model:value="editor.content" :language="editor.language" style="height: 100%" />
        <div>
          <n-grid :cols="24">
            <n-gi :span="1" :offset="1">
              <n-affix :bottom="20">
                <n-tooltip placement="right">
                  <template #trigger>
                    <n-button strong secondary circle type="info" size="large" @click="operation.commit()">
                      <template #icon>
                        <n-icon>
                          <PlayCircle />
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  消耗 1 能量进行模拟运行
                </n-tooltip>
              </n-affix>
            </n-gi>
          </n-grid>
        </div>
      </div>
    </div>
    <div class="horizontal-right">
      <div style="height: calc(100vh - 64px)">
        <n-scrollbar
          style="height: calc(50% - 44px); width: calc(100% - 40px); padding-top: 20px; padding-left: 20px; padding-right: 20px">
          <n-tabs v-model:value="result.focus" type="segment">
            <n-tab-pane name="overview" tab="概览">
              <n-empty v-if="operation.commits.length === 0" description="请先进行模拟运行" />
              <div v-else style="padding: 20px">
                <n-grid :cols="3">
                  <n-gi>
                    <n-statistic label="启动于">{{ new Date(operation.data.created_at).toLocaleString() }}</n-statistic>
                  </n-gi>
                  <n-gi>
                    <n-statistic label="活动于">{{ new Date(operation.data.updated_at).toLocaleString() }}</n-statistic>
                  </n-gi>
                  <n-gi>
                    <n-statistic label="提交数" :value="operation.commits.length"></n-statistic>
                  </n-gi>
                </n-grid>
              </div>
            </n-tab-pane>
            <n-tab-pane name="commits" tab="提交明细">
              <n-empty v-if="operation.commits.length === 0" description="请先进行模拟运行" />
              <n-card v-else>
                <n-collapse accordion>
                  <n-collapse-item v-for="(commit, index) in operation.commits" :title="'提交 #' + (index + 1)"
                    :name="'commit' + commit.id" :key="index">
                    <n-space vertical>
                      <n-card hoverable size="small" title="提交代码">
                        <n-code :code="commit.code"></n-code>
                      </n-card>
                      <n-card hoverable size="small" title="提交状态">
                        <n-checkbox v-for="(mark, index) in commit.data['marks']" :key="index" :checked="mark">用例
                          #{{ index + 1 }}</n-checkbox>
                      </n-card>
                    </n-space>
                  </n-collapse-item>
                </n-collapse>
              </n-card>
            </n-tab-pane>
          </n-tabs>
        </n-scrollbar>
        <n-divider />
        <n-scrollbar
          style="height: calc(50% - 25px); width: calc(100% - 40px); padding-left: 20px; padding-right: 20px">
          <n-space :size="24" vertical>
            <n-thing title="剧情">
              <div v-html="operation.operation['story']"></div>
            </n-thing>
            <n-thing v-if="operation.operation['description'] !== ''" title="简介">
              <div v-html="operation.operation['description']"></div>
            </n-thing>
            <n-thing title="消耗">
              <n-list bordered>
                <n-list-item v-for="(cost, index) in operation.operation['costs']" :key="index">
                  <span v-if="cost['id'] === 'rational'">理智</span>
                  <template #suffix>{{ cost["amount"] }}</template>
                </n-list-item>
              </n-list>
            </n-thing>
            <n-thing title="奖励">
              <n-list bordered>
                <n-list-item v-for="(reward, index) in operation.operation['rewards']" :key="index">
                  <span v-if="reward['id'] === 'code-coin'">逻辑币</span>
                  <template #suffix>{{ reward["amount"] }}</template>
                </n-list-item>
              </n-list>
            </n-thing>
            <n-thing title="用例">
              <n-card>
                <n-collapse>
                  <n-collapse-item v-for="(item, index) in operation.operation['judgement']" :key="index"
                    :name="'example' + index" :title="'样例 #' + (index + 1)" size="small">
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
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NTabs, NEmpty, NTabPane, NCollapse, NCollapseItem, NCard, NList, NListItem, NThing, NSpace, NScrollbar, NDivider, NCode, NAffix, NGrid, NGi, NIcon, NButton, NStatistic, NCheckbox, NTooltip, useMessage } from "naive-ui";
import { PlayCircle } from "@vicons/ionicons5";
import { inject, onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VueCookies } from "vue-cookies";
import { Axios } from "axios";
import { useStatusStore } from "../../stores/status";
import MonacoEditor from "../../compoments/MonacoEditor.vue";

const cookies = inject("$cookies") as VueCookies;
const store = useStatusStore();
const message = useMessage();
const axios = inject("axios") as Axios;
const router = useRouter();
const route = useRoute();
const editor = reactive({
  content: "print('Hello World')",
  language: "python",
  runtime: {
    name: "python3",
    version: "3.9.4",
  }
});
const result = reactive({
  focus: "overview",
});

const operation: any = reactive({
  id: route.query["id"],
  data: {},
  operation: {},
  commits: [],
  fetch: async () => {
    let response;
    // Fetch Log
    response = await axios.get("/api/operations/log?id=" + operation.id, {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    operation.data = response.data["Response"];
    if (operation.data["status"] !== "working") {
      message.error("无法获取行动数据或行动已经完成，请从订单列表选择目标行动来重新开始行动");
      await router.push({ name: "Operation.Orders" });
      return;
    }
    // Fetch Operation
    response = await axios.get("/api/operations/detail?id=" + operation.data["operation"], {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    operation.operation = response.data["Response"];
    if (response.data["Response"] == null) {
      message.error("无法获取行动记录的行动，可能行动已经失效，请从订单列表选择目标行动来重新开始行动");
      await router.push({ name: "Operation.Orders" });
      return;
    } else {
      operation.operation["story"] = operation.operation["story"].replace(
        "{DOCTOR_NAME}",
        store.profile.user["username"]
      );
      operation.operation["description"] = operation.operation["description"].replace(
        "{DOCTOR_NAME}",
        store.profile.user["username"]
      );
    }
    // Fetch Commits
    response = await axios.get("/api/operations/commits?id=" + operation.id, {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    operation.commits = response.data["Response"]
  },

  commit: async () => {
    const response = await axios.post("/api/operations/commit?runtime=" + editor.runtime.name + "&runtimeVersion=" + editor.runtime.version, {
      id: operation.id,
      code: editor.content,
    }, {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });

    if (response.status === 400) {
      message.error("提交代码失败，请检查您的代码何选择的运行环境是否有效")
    } else if (response.status === 402) {
      message.warning("提交代码失败，需要的资源不足，请检查仓库")
    } else if (response.status === 200) {
      if (response.data["Status"]["Code"] === "FINISHED") {
        message.success("成功提交代码，所有用例通过，行动完成")
        await router.push({ name: "Operation.Orders" })
        return
      }
      message.success("成功提交代码，但模拟用例未通过，请重新检查")
      operation.commits.push({code: editor.content, data: response.data["Response"]})
    }
  },
});

watch(
  store.profile,
  async () => {
    await operation.fetch();
  },
  { deep: true }
);

onMounted(async () => {
  if (route.query["id"] == null) {
    message.error("无法获取行动记录 ID，请从订单列表选择目标行动来开始行动");
    router.push({ name: "Operation.Orders" });
  } else {
    await operation.fetch();
  }
});
</script>

<style>
.horizontal-wrapper {
  display: flex;
}

.horizontal-left {
  position: relative;
}

.horizontal-resize {
  min-width: 30vw;
  width: 40vw;
  max-width: 60vw;
  resize: horizontal;
  overflow: scroll;
  height: calc(100vh - 64px);
  opacity: 1;
  position: relative;
}

.horizontal-resize::-webkit-scrollbar {
  width: 10px;
  height: inherit;
}

.horizontal-right {
  flex: 1;
}

.editor {
  position: absolute;
  width: calc(100% - 10px);
  height: 100%;
  left: 0;
  top: 0;
}
</style>
