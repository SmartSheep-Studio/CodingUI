<template>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import {editor} from "monaco-editor"
import {onMounted, onBeforeUnmount} from "vue";

const props = defineProps(["value", "language", "theme"])
const emit = defineEmits(["update:value"])

let instance: editor.IStandaloneCodeEditor;

function init() {
  instance = editor.create(document.getElementById("editor") as HTMLDivElement, {
    value: props.value,
    language: props.language,
    theme: props.theme,
    lineNumbers: 'on',
    automaticLayout: true,
    formatOnPaste: true,
    renderValidationDecorations: 'on',
  })

  editor.getModels()[0]?.onDidChangeContent((event) => {
    emit("update:value", editor.getModels()[0]?.getValue())
  })
}

onMounted(() => {
  init();
})

onBeforeUnmount(() => {
  instance.dispose();
})
</script>

<style scoped>

</style>
