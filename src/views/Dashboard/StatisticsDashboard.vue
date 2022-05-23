<template>
  <div style="width: 100%">
    <n-grid :x-gap="16" :y-gap="16">
      <n-gi :span="15">
        <n-card style="height: 100%" title="基本数据">
          <template #header-extra>
            <n-button
                :disabled="new Date(store.profile.user['last_signin_at']).toDateString() === new Date().toDateString()"
                type="primary"
                @click="dailySignin.display = !dailySignin.display">
              每日签到
            </n-button>
          </template>
          <n-grid :y-gap="16">
            <!-- Currencies -->
            <n-gi :span="8">
              <n-statistic label="源代码" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.SourceCodes"/>
                <template #prefix>
                  <n-icon>
                    <CodeSandboxCircleFilled/>
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="推荐符文" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.FavouriteRunes"/>
                <template #prefix>
                  <n-icon>
                    <LikeFilled/>
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="逻辑币" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.CodeCoins"/>
                <template #prefix>
                  <n-icon>
                    <DollarCircleFilled/>
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>

            <!-- Player States -->
            <n-gi :span="8">
              <n-statistic label="理智" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.Rational"/>
                <template #prefix>
                  <n-icon>
                    <BulbFilled/>
                  </n-icon>
                </template>
                <template #suffix> / {{ 86 + (store.profile.user["level"] - 1) * 2 }}</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="能量" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.Energy"/>
                <template #prefix>
                  <n-icon>
                    <PowerSharp/>
                  </n-icon>
                </template>
                <template #suffix> / {{ 20 + (store.profile.user["level"] - 1) * 8 }}</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="分享令牌" tabular-nums>
                <n-number-animation :from="0" :to="backpack.data.ShareTicket"/>
                <template #prefix>
                  <n-icon>
                    <TicketSharp/>
                  </n-icon>
                </template>
                <template #suffix> / {{ 10 + (store.profile.user["level"] - 1) }}</template>
              </n-statistic>
            </n-gi>

            <!-- Statistics -->
            <n-gi :span="24">
              <div
                  id="statistics-chart"
                  style="height: 310px; width: 100%; margin-top: 15px"
              ></div>
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
                      UpgradeRequireCompute(store.profile.user['level'], store.node.details['Level']['Requirement'], store.node.details['Level']['Difficulty'])) *
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
                    <b style="line-height: 34px"
                    >Dr. {{ store.profile.user["username"] }}</b
                    >
                  </div>
                  <div>
                    <span
                    ><b>经验</b>
                      {{ SimpleNumber(store.profile.user["level_experience"]) }}
                      /
                      {{
                        SimpleNumber(UpgradeRequireCompute(store.profile.user["level"], store.node.details["Level"]["Requirement"], store.node.details["Level"]["Difficulty"]))
                      }}</span
                    >
                    <br/>
                    <span>
                      <b>节点</b> <span>{{ store.node.name }}</span>
                    </span>
                    <br/>
                    <span
                    ><b>回忆起点&nbsp;</b>
                      <span>{{
                          new Date(
                              store.profile.user["created_at"]
                          ).toLocaleDateString()
                        }}</span></span
                    >
                  </div>
                </div>
              </n-gi>
            </n-grid>
          </n-card>
          <n-card style="margin-top: 16px">
            <span
            >赛季 <b>起源</b> 将会在
              <b><n-countdown :duration="30 * 3600 * 1000" active/></b>
              结束</span
            >
            <br/>
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
                    <ShieldFilled/>
                  </n-icon>
                </template>
                逻辑行动
              </n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button style="width: 100%">
                <template #icon>
                  <n-icon>
                    <LayoutFilled/>
                  </n-icon>
                </template>
                自由模式
              </n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button disabled style="width: 100%">
                <template #icon>
                  <n-icon>
                    <FireFilled/>
                  </n-icon>
                </template>
                地下大堂
              </n-button>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
      <n-gi :span="15">
        <n-card style="height: 100%" title="近期活动">
          <n-list bordered>
            <n-list-item>
              <template #prefix>
                <span>2021</span>
              </template>
              <span>在赛季 <b>起源</b> 中获得 <b>逻辑币 x1000</b></span>
              <br/>
              <span>在赛季 <b>起源</b> 中获得 <b>逻辑币 x200</b></span>
            </n-list-item>
          </n-list>
        </n-card>
      </n-gi>
      <n-gi :span="9">
        <n-card embedded title="节点通告">
          <n-card>
            <n-collapse>
              <n-collapse-item name="new-season-zero" title="起源赛季开放">
                <template #header-extra>🥳</template>
                <div>
                  <span>经验之路 <b>起源</b> 赛季开放挑战！</span> <br/>
                  <span
                  >现在各位逻辑博士
                    可以在个人仪表盘上看见现在的经验之路排名。经验之路排名仅限达到
                    Lv50 及以上的博士参加。赛季会在 2022/5/15 到 2022/7/1
                    开放挑战。</span
                  >
                </div>
              </n-collapse-item>
              <n-collapse-item
                  name="updatelogs-exchangerule"
                  title="更新兑换规则"
              >
                <template #header-extra>🤩</template>
                <div>
                  <span>在 2022/5/1 之后的推荐点数兑换源代码规则变更</span>
                  <br/>
                  <span
                  >兑换公式由原本的
                    <code>推荐等数 *(2X 开发者等级) = 源代码 *1</code> 更改至
                    <code>推荐等数 *500 = 源代码 *1</code></span
                  >
                  <br/>
                  <span
                  >顺便提醒：使用非法手段破坏此活动平衡者，<b
                  >永久封号</b
                  ></span
                  >
                </div>
              </n-collapse-item>
              <n-collapse-item name="updatelogs-refactor" title="重构更新公告">
                <template #header-extra>🚀</template>
                <div>
                  <span
                  >LumbaShark 伦巴鲨现在已经停止更新，CodingLand
                    将全盘替代（重构）</span
                  >
                  <br/>
                  <span
                  >详细公告 👉
                    <n-a
                        href="https://www.smartsheep.space/devlogs/codingland-devlog01/"
                    >传送门</n-a
                    >
                  </span>
                  <br/>
                </div>
              </n-collapse-item>
            </n-collapse>
          </n-card>
        </n-card>
      </n-gi>
    </n-grid>

    <!-- Modals -->
    <n-modal v-model:show="dailySignin.display"
             preset="card" style="max-width: 540px" title="签到恢复">
      <template #header-extra>
        {{ new Date().toLocaleDateString() }}
      </template>
      <div v-if="dailySignin.rewards == null">
        <span>更具您目前的神经记忆档案，您的这次签到的奖励为：</span> <br>
        <ol>
          <li>逻辑币 0 ~ {{ store.profile.user["level"] * 100 + 2000 }}</li>
          <li>理智 {{ 86 + (store.profile.user["level"] - 1) * 2 }}</li>
          <li>能量 {{ 20 + (store.profile.user["level"] - 1) * 8 }}</li>
          <li>分享令牌 {{ 10 + store.profile.user["level"] - 1 }}</li>
          <li>经验 1800</li>
        </ol>
        <span><b>温馨提示</b> 若是使用了外置电源或静脉注射理智等恢复属性类药物，在签到恢复完成后溢出的效果将不复存在</span>
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
        <span>下次签到开放时间在 <b>{{ new Date(new Date().setHours(24, 0, 0, 0)).toLocaleString() }}</b></span>
      </div>
      <template #footer>
        <n-space v-if="dailySignin.rewards == null" justify="end">
          <n-button :loading="dailySignin.connecting" size="small" type="primary" @click="dailySignin.do()">立即签到
          </n-button>
        </n-space>
        <n-space v-else justify="end">
          <n-button size="small" type="primary" @click="dailySignin.display = !dailySignin.display">签到成功
          </n-button>
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
  NList,
  NListItem,
  NCollapse,
  NCollapseItem,
  NCountdown,
  NAvatar,
  NModal,
  NSpace,
  NA,
  useMessage,
} from "naive-ui";
import {
  CodeSandboxCircleFilled,
  LikeFilled,
  DollarCircleFilled,
  BulbFilled,
  MessageFilled,
  LayoutFilled,
  FireFilled,
} from "@vicons/antd";
import {TicketSharp} from "@vicons/ionicons5";
import {PowerSharp, ShieldFilled} from "@vicons/material";
import * as echarts from "echarts";
import {inject, onMounted, reactive, ref, watch} from "vue";
import {useStatusStore} from "../../stores/status";
import SimpleNumber from "../../utils/SimpleNumber";
import UpgradeRequireCompute from "../../utils/UpgradeRequireCompute";
import {Axios, AxiosResponse} from "axios";
import {VueCookies} from "vue-cookies";

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
    }
  }
});

const dailySignin = reactive({
  display: false,
  connecting: false,
  rewards: null,
  do: async () => {
    dailySignin.connecting = true;
    let response: AxiosResponse
    // Do Daily SignIn
    response = await axios.patch("/api/security/users/signin", {}, {
      headers: {Authorization: "Bearer " + cookies.get("access_token")},
    });
    if (response.status === 200) {
      dailySignin.rewards = response.data["Response"]
    } else {
      message.error("无法进行神经签到，未知通信错误");
      dailySignin.connecting = false;
      return;
    }
    // Update profile
    response = await axios.get("/api/security/users/profile?detail=yes", {
      headers: {Authorization: "Bearer " + cookies.get("access_token")},
    });
    const profile = response.data["Response"];
    store.setUserProfile(
        profile["User"],
        profile["Group"],
        profile["Backpack"]
    );
    dailySignin.connecting = false;
  }
})

watch(store.profile, () => {
  backpack.init()
}, {immediate: true, deep: true})

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
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
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
