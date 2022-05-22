<template>
  <div style="width: 100%">
    <n-grid :x-gap="16" :y-gap="16">
      <n-gi :span="15">
        <n-card title="基本数据" style="height: 100%">
          <n-grid :y-gap="16">
            <!-- Currencies -->
            <n-gi :span="8">
              <n-statistic label="源代码" tabular-nums>
                <n-number-animation :from="0" :to="backpack.SourceCodes"/>
                <template #prefix>
                  <n-icon>
                    <CodeSandboxCircleFilled/>
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="推荐符文" tabular-nums>
                <n-number-animation :from="0" :to="backpack.FavouriteRunes"/>
                <template #prefix>
                  <n-icon>
                    <LikeFilled/>
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="逻辑币" tabular-nums>
                <n-number-animation :from="0" :to="backpack.CodeCoins"/>
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
                <n-number-animation :from="0" :to="86"/>
                <template #prefix>
                  <n-icon>
                    <BulbFilled/>
                  </n-icon>
                </template>
                <template #suffix> / 86</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="电力" tabular-nums>
                <n-number-animation :from="0" :to="1008"/>
                <template #prefix>
                  <n-icon>
                    <PowerSharp/>
                  </n-icon>
                </template>
                <template #suffix> / 1290</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="闪现令牌" tabular-nums>
                <n-number-animation :from="0" :to="100"/>
                <template #prefix>
                  <n-icon>
                    <TicketSharp/>
                  </n-icon>
                </template>
                <template #suffix> / 100</template>
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
        <n-card title="神经记忆" embedded style="height: 100%">
          <n-card>
            <n-grid>
              <n-gi :span="9">
                <n-progress
                    type="circle"
                    size="large"
                    :percentage="
                    (store.profile.user['level_experience'] /
                      (store.profile.user['level'] *
                        store.node.details['Level']['Requirement'] *
                        (store.profile.user['level'] *
                          store.node.details['Level']['Difficulty']))) *
                    100
                  "
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
                        SimpleNumber(
                            store.profile.user["level"] *
                            store.node.details["Level"]["Requirement"] *
                            (store.profile.user["level"] *
                                store.node.details["Level"]["Difficulty"])
                        )
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
              <n-button style="width: 100%" disabled>
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
              <n-button style="width: 100%" disabled>
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
        <n-card title="近期活动" style="height: 100%">
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
        <n-card title="节点通告" embedded>
          <n-card>
            <n-collapse>
              <n-collapse-item title="起源赛季开放" name="new-season-zero">
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
                  title="更新兑换规则"
                  name="updatelogs-exchangerule"
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
              <n-collapse-item title="重构更新公告" name="updatelogs-refactor">
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
  NA,
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
import {onMounted, reactive, ref, watch} from "vue";
import {useStatusStore} from "../../stores/status";
import SimpleNumber from "../../utils/SimpleNumber";

const store = useStatusStore();
const backpack = ref({
  SourceCodes: store.getMaterial("source-code").amount,
  FavouriteRunes: store.getMaterial("favourite-rune").amount,
  CodeCoins: store.getMaterial("code-coin").amount,
});

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
