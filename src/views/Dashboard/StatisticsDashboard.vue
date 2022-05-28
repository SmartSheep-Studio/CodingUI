<template>
  <div style="width: 100%">
    <n-grid :x-gap="16" :y-gap="16">
      <n-gi :span="15">
        <n-card style="height: 100%" title="基本数据">
          <template #header-extra>
            <n-button
              :disabled="new Date(store.profile.user['last_signin_at']).toDateString() === new Date().toDateString()"
              type="primary"
              @click="dailySignin.display = !dailySignin.display"
            >
              每日签到
            </n-button>
          </template>
          <n-grid :y-gap="16">
            <!-- Currencies -->
            <n-gi :span="8">
              <n-statistic label="源代码" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.SourceCodes" />
                <template #prefix>
                  <n-icon>
                    <CodeSandboxCircleFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="推荐符文" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.FavouriteRunes" />
                <template #prefix>
                  <n-icon>
                    <LikeFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="逻辑币" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.CodeCoins" />
                <template #prefix>
                  <n-icon>
                    <DollarCircleFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>

            <!-- Player States -->
            <n-gi :span="8">
              <n-statistic label="理智" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.Rational" />
                <template #prefix>
                  <n-icon>
                    <BulbFilled />
                  </n-icon>
                </template>
                <template #suffix> / {{ 86 + (store.profile.user["level"] - 1) * 2 }}</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="能量" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.Energy" />
                <template #prefix>
                  <n-icon>
                    <PowerSharp />
                  </n-icon>
                </template>
                <template #suffix> / {{ 20 + (store.profile.user["level"] - 1) * 8 }}</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="分享令牌" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.ShareTicket" />
                <template #prefix>
                  <n-icon>
                    <TicketSharp />
                  </n-icon>
                </template>
                <template #suffix> / {{ 10 + (store.profile.user["level"] - 1) }}</template>
              </n-statistic>
            </n-gi>

            <!-- Statistics -->
            <n-gi :span="24">
              <div id="statistics-chart" style="height: 310px; width: 100%; margin-top: 15px"></div>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
      <n-gi :span="9">
        <n-card embedded style="height: 100%" title="神经记忆">
          <n-card>
            <n-grid>
              <n-gi :span="9">
                <n-progress
                  :percentage="
                    (store.profile.user['level_experience'] /
                      UpgradeRequireCompute(
                        store.profile.user['level'],
                        store.node.details['Level']['Requirement'],
                        store.node.details['Level']['Difficulty']
                      )) *
                    100
                  "
                  size="large"
                  type="circle"
                >
                  <div style="text-align: center">
                    <div style="font-size: 20px">
                      Lv <b>{{ store.profile.user["level"] }}</b>
                    </div>
                    <span style="font-size: 14px">无尽深渊</span>
                  </div>
                </n-progress>
              </n-gi>
              <n-gi :offset="2" :span="13">
                <div style="padding-top: 10px">
                  <n-avatar></n-avatar>
                  <div style="font-size: 20px">
                    <b style="line-height: 34px">Dr. {{ store.profile.user["username"] }}</b>
                  </div>
                  <div>
                    <span
                      ><b>经验</b>
                      {{ SimpleNumber(store.profile.user["level_experience"]) }}
                      /
                      {{
                        SimpleNumber(
                          UpgradeRequireCompute(
                            store.profile.user["level"],
                            store.node.details["Level"]["Requirement"],
                            store.node.details["Level"]["Difficulty"]
                          )
                        )
                      }}</span
                    >
                    <br />
                    <span>
                      <b>节点</b> <span>{{ store.node.name }}</span>
                    </span>
                    <br />
                    <span
                      ><b>回忆起点&nbsp;</b>
                      <span>{{ new Date(store.profile.user["created_at"]).toLocaleDateString() }}</span></span
                    >
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </n-card>
          <n-card style="margin-top: 16px">
            <span
              >赛季 <b>起源</b> 将会在
              <b><n-countdown :duration="30 * 3600 * 1000" active /></b>
              结束</span
            >
            <br />
            <ol>
              <span style="font-size: 14px"><b>你可以得到目前的奖励</b></span>
              <li>码匠岛模型</li>
              <li>源代码 x100</li>
              <li>逻辑币 x80,000</li>
            </ol>
          </n-card>

          <!-- Actions -->
          <n-grid :y-gap="8" style="padding-top: 12px">
            <n-gi :span="24">
              <n-button disabled style="width: 100%">
                <template #icon>
                  <n-icon>
                    <DatabaseFilled />
                  </n-icon>
                </template>
                基础建设
              </n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button style="width: 100%" @click="$router.push({ name: 'Operation.Orders' })">
                <template #icon>
                  <n-icon>
                    <LayoutFilled />
                  </n-icon>
                </template>
                逻辑行动
              </n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button disabled style="width: 100%">
                <template #icon>
                  <n-icon>
                    <FireFilled />
                  </n-icon>
                </template>
                海口码头
              </n-button>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
      <n-gi :span="15">
        <n-card style="height: 100%" title="活动记录">
          <n-timeline>
            <template
              v-for="(item, index) in activities.data.slice(
                (activities.page - 1) * 10,
                (activities.page - 1) * 10 + 10
              )"
              :key="index"
            >
              <n-timeline-item
                v-if="item['type'] === 'daily-signin'"
                :time="new Date(item['created_at']).toLocaleString()"
                title="每日签到"
                type="success"
              />
              <n-timeline-item
                v-if="item['type'] === 'signin'"
                :content="'尝试连接于 ' + item['data']['at']"
                :time="new Date(item['created_at']).toLocaleString()"
                title="链接神经身份"
                type="info"
              />
            </template>
          </n-timeline>
          <n-divider></n-divider>
          <n-space justify="center">
            <n-pagination v-model:page="activities.page" :page-count="Math.ceil(activities.data.length / 10)" />
          </n-space>
        </n-card>
      </n-gi>
      <n-gi :span="9">
        <n-card embedded title="节点通告">
          <n-card>
            <n-collapse>
              <n-collapse-item
                v-for="(item, index) in activities.announcements"
                :key="index"
                :name="item['data']['id']"
                :title="item['data']['title']"
              >
                <template #header-extra>
                  <span v-if="item['type'] === 'update'">📆</span>
                </template>
                <div v-html="item['data']['content']"></div>
              </n-collapse-item>
            </n-collapse>
          </n-card>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Modals -->
    <n-modal v-model:show="dailySignin.display" preset="card" style="max-width: 540px" title="签到恢复">
      <template #header-extra>
        {{ new Date().toLocaleDateString() }}
      </template>
      <div v-if="dailySignin.rewards == null">
        <span>更具您目前的神经记忆档案，您的这次签到的奖励为：</span> <br />
        <ol>
          <li>逻辑币 0 ~ {{ store.profile.user["level"] * 10 + 200 }}</li>
          <li>理智 {{ 86 + (store.profile.user["level"] - 1) * 2 }}</li>
          <li>能量 {{ 20 + (store.profile.user["level"] - 1) * 8 }}</li>
          <li>分享令牌 {{ 10 + store.profile.user["level"] - 1 }}</li>
          <li>经验 1800</li>
        </ol>
        <span
          ><b>温馨提示</b> 若是使用了外置电源或静脉注射理智等恢复属性类药物，在签到恢复完成后溢出的效果将不复存在</span
        >
      </div>
      <div v-else>
        <span>签到完成 d(^_^o)，本次签到获得奖励：</span>
        <ol>
          <li>逻辑币 {{ dailySignin.rewards["CodeCoin"] }}</li>
          <li>理智 {{ dailySignin.rewards["Rational"] }}</li>
          <li>能量 {{ dailySignin.rewards["Energy"] }}</li>
          <li>分享令牌 {{ dailySignin.rewards["ShareTicket"] }}</li>
          <li>经验 {{ dailySignin.rewards["Experience"] }}</li>
        </ol>
        <span
          >下次签到开放时间在 <b>{{ new Date(new Date().setHours(24, 0, 0, 0)).toLocaleString() }}</b></span
        >
      </div>
      <template #footer>
        <n-space v-if="dailySignin.rewards == null" justify="end">
          <n-button :loading="dailySignin.connecting" size="small" type="primary" @click="dailySignin.do()"
            >立即签到
          </n-button>
        </n-space>
        <n-space v-else justify="end">
          <n-button size="small" type="primary" @click="dailySignin.display = !dailySignin.display">签到成功 </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import {
  NGrid,
  NGi,
  NCard,
  NStatistic,
  NNumberAnimation,
  NIcon,
  NButton,
  NProgress,
  NCollapse,
  NCollapseItem,
  NCountdown,
  NTimeline,
  NTimelineItem,
  NAvatar,
  NModal,
  NSpace,
  NPagination,
  NDivider,
  NA,
  useMessage,
} from "naive-ui";
import {
  CodeSandboxCircleFilled,
  LikeFilled,
  DollarCircleFilled,
  BulbFilled,
  DatabaseFilled,
  LayoutFilled,
  FireFilled,
} from "@vicons/antd";
import { TicketSharp } from "@vicons/ionicons5";
import { PowerSharp } from "@vicons/material";
import * as echarts from "echarts";
import { inject, onMounted, reactive, ref, watch } from "vue";
import { useStatusStore } from "../../stores/status";
import SimpleNumber from "../../utils/SimpleNumber";
import UpgradeRequireCompute from "../../utils/UpgradeRequireCompute";
import { Axios, AxiosResponse } from "axios";
import { VueCookies } from "vue-cookies";

const cookies = inject("$cookies") as VueCookies;
const axios = inject("axios") as Axios;
const message = useMessage();
const store = useStatusStore();
const backpack: any = reactive({
  data: {},
  init() {
    backpack.data = {
      SourceCodes: store.getMaterial("source-code").amount,
      FavouriteRunes: store.getMaterial("favourite-rune").amount,
      CodeCoins: store.getMaterial("code-coin").amount,
      Rational: store.getMaterial("rational").amount,
      Energy: store.getMaterial("energy").amount,
      ShareTicket: store.getMaterial("share-ticket").amount,
    };
  },
});

const dailySignin = reactive({
  display: false,
  connecting: false,
  rewards: null,
  do: async () => {
    dailySignin.connecting = true;
    let response: AxiosResponse;
    // Do Daily SignIn
    response = await axios.patch(
      "/api/security/users/daily-signin",
      {},
      {
        headers: { Authorization: "Bearer " + cookies.get("access_token") },
      }
    );
    if (response.status === 200) {
      dailySignin.rewards = response.data["Response"];
    } else {
      message.error("无法进行神经签到，未知通信错误");
      dailySignin.connecting = false;
      return;
    }
    // Update profile
    response = await axios.get("/api/security/users/profile?detail=yes", {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    const profile = response.data["Response"];
    store.setUserProfile(profile["User"], profile["Group"], profile["Backpack"]);
    dailySignin.connecting = false;
  },
});

watch(
  store.profile,
  () => {
    backpack.init();
  },
  { immediate: true, deep: true }
);

const activities = reactive({
  data: [],
  announcements: [],
  page: 1,
  fetch: async () => {
    let response: AxiosResponse;
    response = await axios.get("/api/records/announcements", {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status != 200) {
      message.error("无法获取神经节点通告");
    } else {
      activities.announcements = response.data["Response"];
    }

    response = await axios.get("/api/records/activities", {
      headers: { Authorization: "Bearer " + cookies.get("access_token") },
    });
    if (response.status != 200) {
      message.error("无法获取神经记忆活动记录");
    } else {
      activities.data = response.data["Response"];
    }
  },
});

watch(
  store.profile,
  async () => {
    await activities.fetch();
  },
  { immediate: true, deep: true }
);

// Charts
const chart: any = reactive({
  id: "statistics-chart",
  chart: null,
  options: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["源代码", "推荐符文", "逻辑币"],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "源代码",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210, 815, 145, 123, 224, 441],
      },
      {
        name: "推荐符文",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 991, 330, 415, 917, 57, 941, 294, 14],
      },
      {
        name: "逻辑币",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310, 14, 291, 144, 145, 1],
      },
    ],
  },
});

onMounted(() => {
  // @ts-ignore
  chart.chart = echarts.init(document.getElementById(chart.id), "light");
  chart.chart.setOption(chart.options);
});
</script>
