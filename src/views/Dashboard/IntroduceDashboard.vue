<template>
  <div style="width: 100%">
    <!-- Introduce -->
    <div style="text-align: center; padding-top: 4rem" id="introduce">
      <div style="max-width: 60%; margin: 0 auto">
        <span style="font-size: 60px"><b>CodingLand</b></span> <br />
        <div style="font-size: 20px">
          <span
            >The world best coding learning platform. Make your web /
            application development learning easier!</span
          >
        </div>
      </div>
      <div style="padding-top: 4rem">
        <img
          src="../../assets/illustrations/introduce/introduce_header.svg"
          height="256"
          width="512"
        />
      </div>
    </div>

    <!-- Features -->
    <div style="padding-top: 4rem" id="features">
      <div style="font-size: 30px; text-align: center">Features</div>
      <br />
      <br />
      <n-grid :x-gap="16" :y-gap="16">
        <n-gi :span="8">
          <n-card title="Developer Friendly" style="height: 100%">
            <span
              >CodingLand extend LumbaShark's Developer Friendly feature. We
              provided a CLI client, a mobile phone client and a desktop client.
              You can choose your favorite way to access CodingLand</span
            >
            <br />
            <span>
              We also support use RESTful api to automatic claim materials,
              create client / projects, etc.
            </span>
          </n-card>
        </n-gi>
        <n-gi :span="8">
          <n-card title="Study Easy & Fun" style="height: 100%">
            <span
              >CodingLand have a new place, we call it "AlgorithmLand". You can do we collect and made's algorithm question.</span
            >
            <br />
            <span>
              After you solve questions, you can get some "SourceCode". You can use source code to exchange some resource to try more things.
            </span>
          </n-card>
        </n-gi>
        <n-gi :span="8">
          <n-card title="Discuss & Social" style="height: 100%">
            <span
              >Now you can discuss your funny things when you coding, or post some question for get some solution.</span
            >
            <br />
            <span>
              You also can post your algorithm land question solution and discuss it!
            </span>
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NGrid, NGi, NCard } from "naive-ui";
</script>
