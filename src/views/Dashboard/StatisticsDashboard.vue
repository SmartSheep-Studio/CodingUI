<template>
  <div style="width: 100%">
    <n-grid :x-gap="16" :y-gap="16">
      <n-gi :span="15">
        <n-card title="Statistics" style="height: 100%">
          <n-grid :y-gap="16">
            <!-- Currencies -->
            <n-gi :span="8">
              <n-statistic label="Source Codes" tabular-nums>
                <n-number-animation :from="0" :to="18561" />
                <template #prefix>
                  <n-icon>
                    <CodeSandboxCircleFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="Recommend Points" tabular-nums>
                <n-number-animation :from="0" :to="816154575" />
                <template #prefix>
                  <n-icon>
                    <LikeFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="Code Coins" tabular-nums>
                <n-number-animation :from="0" :to="9456155525" />
                <template #prefix>
                  <n-icon>
                    <DollarCircleFilled />
                  </n-icon>
                </template>
              </n-statistic>
            </n-gi>

            <!-- Player States -->
            <n-gi :span="8">
              <n-statistic label="Rational" tabular-nums>
                <n-number-animation :from="0" :to="86" />
                <template #prefix>
                  <n-icon>
                    <BulbFilled />
                  </n-icon>
                </template>
                <template #suffix> / 86 </template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="Energy" tabular-nums>
                <n-number-animation :from="0" :to="1008" />
                <template #prefix>
                  <n-icon>
                    <DeploymentUnitOutlined />
                  </n-icon>
                </template>
                <template #suffix> / 1290</template>
              </n-statistic>
            </n-gi>
            <n-gi :span="8">
              <n-statistic label="Triangle Rune" tabular-nums>
                <n-number-animation :from="0" :to="100" />
                <template #prefix>
                  <n-icon>
                    <HeatMapOutlined />
                  </n-icon>
                </template>
                <template #suffix> / 100</template>
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
        <n-card title="Experience Road" embedded style="height: 100%">
          <n-card>
            <n-grid>
              <n-gi :span="10">
                <n-progress type="circle" :percentage="90">
                  <div style="text-align: center">
                    <span style="font-size: 22px">Rank <br /> <b>1st</b></span>
                  </div>
                </n-progress>
              </n-gi>
              <n-gi :span="14">
                <ol>
                  <li>LittleSheep (You)</li>
                  <li>Deepsea</li>
                  <li>我顶你个肺</li>
                  <b>......</b>
                </ol>
              </n-gi>
            </n-grid>
          </n-card>
          <n-card style="margin-top: 16px">
            <span>Season <b>ZERO</b> Will Ending After <b>39:59:01</b></span>
            <br />
            <ol>
              <span style="font-size: 16px"><b>Your rewards</b></span>
              <li>CodingLand ship model</li>
              <li>Source Codes *100</li>
              <li>Code Coins *80,000</li>
            </ol>
          </n-card>
          <n-grid :y-gap="8" style="padding-top: 12px">
            <n-gi :span="24">
              <n-button style="width: 100%">Operation</n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button style="width: 100%">Free Mode</n-button>
            </n-gi>
            <n-gi :span="24">
              <n-button style="width: 100%">Mining Plant</n-button>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
      <n-gi :span="15">
        <n-card title="Recent Activity" style="height: 100%">
          <n-list bordered>
            <n-list-item>
              <template #prefix>
                <span>2021</span>
              </template>
              <span>Collect <b>Source Codes *700</b> In Season <b>BETA</b></span>
              <br />
              <span>Collect <b>Source Codes *10000</b> In Season <b>Alpha</b></span>
              <br />
              <span>Collect <b>Source Codes *120</b> In
                <b>Rougulike: Welding</b></span>
              <br />
              <span>Collect <b>Source Codes *120</b> In
                <b>Rougulike: Welding</b></span>
              <br />
              <span>Collect <b>Source Codes *120</b> In
                <b>Rougulike: Welding</b></span>
              <br />
              <span>Collect <b>Source Codes *120</b> In
                <b>Rougulike: Welding</b></span>
              <br />
              <span>Collect <b>Source Codes *120</b> In
                <b>Rougulike: Welding</b></span>
            </n-list-item>
          </n-list>
        </n-card>
      </n-gi>
      <n-gi :span="9">
        <n-card title="Announcements & Events" embedded>
          <n-card>
            <n-collapse>
              <n-collapse-item title="ZERO 赛季开放" name="new-season-zero">
                <template #header-extra>🥳</template>
                <div>
                  <span>经验之路 ZERO 赛季开放挑战！</span> <br />
                  <span>现在各位 Coder
                    可以在个人仪表盘上看见现在的经验之路排名。经验之路排名仅限达到
                    Lv50 及以上的 Coder 参加。赛季会在 2022/5/15 到 2022/7/1
                    开放挑战。</span>
                  <br />
                  <span>在挑战截止后我们会按照经验之路上的奖品发放到大家的 Bank
                    中。并且等级会会滚到 Lv50
                    MAX/MAX。等待下一次经验之路。</span>
                </div>
              </n-collapse-item>
              <n-collapse-item title="更新兑换规则" name="updatelogs-exchangerule">
                <template #header-extra>🤩</template>
                <div>
                  <span>在 2022/5/1 之后的推荐点数兑换源代码规则变更</span>
                  <br />
                  <span>兑换公式由原本的
                    <code>推荐等数 *(2X 开发者等级) = 源代码 *1</code> 更改至
                    <code>推荐等数 *500 = 源代码 *1</code></span>
                  <br />
                  <span>顺便提醒：使用非法手段破坏此活动平衡者，<b>永久封号</b></span>
                </div>
              </n-collapse-item>
              <n-collapse-item title="重构更新公告" name="updatelogs-refactor">
                <template #header-extra>🚀</template>
                <div>
                  <span>LumbaShark 伦巴鲨现在已经停止更新，CodingLand
                    将全盘替代（重构）</span>
                  <br />
                  <span>详细公告 👉
                    <n-a href="https://www.smartsheep.space/devlogs/codingland-devlog01/">传送门</n-a>
                  </span>
                  <br />
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
  NA,
} from "naive-ui";
import {
  CodeSandboxCircleFilled,
  LikeFilled,
  DollarCircleFilled,
  BulbFilled,
  DeploymentUnitOutlined,
  HeatMapOutlined,
} from "@vicons/antd";
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";

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
      data: ["Source Codes", "Recommend Points", "Code Coins"],
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
        name: "Source Codes",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210, 815, 145, 123, 224, 441],
      },
      {
        name: "Recommend Points",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 991, 330, 415, 917, 57, 941, 294, 14],
      },
      {
        name: "Code Coins",
        type: "line",
        stack: "Total",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310, 14, 1245, 144, 145, 1],
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
