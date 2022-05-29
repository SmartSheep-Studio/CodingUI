<template>
  <div class="container-size horizontal-wrapper">
    <div class="horizontal-left">
      <div class="horizontal-resize"></div>
      <div class="editor"><MonacoEditor v-model:value="data.content" language="javascript" style="height: 100%" /></div>
    </div>
    <div class="horizontal-right">

    </div>
  </div>
</template>

<script lang="ts" setup>
import MonacoEditor from "../../compoments/MonacoEditor.vue";
import {reactive} from "vue";

const data = reactive(({
  content: "console.log('Hello World')"
}))
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
  background: #ccc;
  resize: horizontal;
  overflow: scroll;
  height: calc(100vh - 64px);
  opacity: 0;
  position: relative;
}

.horizontal-resize::-webkit-scrollbar {
  width: 20px;
  height: inherit;
}

.horizontal-right {
  background: #f0f;
  flex: 1
}

.editor {
  position: absolute;
  width: calc(100% - 10px);
  height: 100%;
  left: 0;
  top: 0;
}
</style>
