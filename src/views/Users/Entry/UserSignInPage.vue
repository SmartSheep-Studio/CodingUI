<template>
  <div class="container-size" style="display: flex; align-items: center">
    <div style="margin: auto">
      <div id="header">
        <img height="64" src="../../../assets/codingland_logo.svg" width="64" />
        <br />
        <span style="font-size: 20px">Sign In</span> <br />
        <br />
      </div>
      <n-space vertical>
        <n-alert title="需要验证身份" type="error" v-if="$route.params['message'] != null" closable>{{
          $route.params["message"]
        }}</n-alert>
        <div>
          <n-card style="min-width: 450px">
            <n-form ref="form" :model="data" :rules="rules" :show-require-mark="false">
              <n-form-item label="Username / Email" path="username">
                <n-input v-model:value="data.username" placeholder="Your username or email"></n-input>
              </n-form-item>
              <n-form-item label="Password" path="password">
                <n-input v-model:value="data.password" placeholder="Your password" type="password"></n-input>
              </n-form-item>
              <n-form-item :show-feedback="false" :show-label="false" size="small">
                <n-checkbox v-model:checked="data.agreement01">CodingLand usage terms of service </n-checkbox>
              </n-form-item>
              <n-form-item :show-feedback="false" :show-label="false" size="small">
                <n-checkbox v-model:checked="data.agreement02">CodingLand payment and products agreement </n-checkbox>
              </n-form-item>
              <n-form-item :show-feedback="false">
                <n-button attr-type="button" style="width: 100%" type="primary" :loading="connecting" @click="submit"
                  >Sign In
                </n-button>
              </n-form-item>
            </n-form>
          </n-card>
          <div style="text-align: center; padding-top: 10px">
            <span
              >未曾保有神经记忆者，访
              <router-link #="{ navigate, href }" :to="{ name: 'User.Entry.SignUp' }" custom>
                <n-a :href="href" @click="navigate">此处</n-a>
              </router-link>
              创记忆也</span
            >
          </div>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Axios } from "axios";
import {
  FormInst,
  NAlert,
  NA,
  NButton,
  NCard,
  NCheckbox,
  NForm,
  NFormItem,
  NInput,
  NSpace,
  useDialog,
  useMessage,
} from "naive-ui";
import { inject, reactive, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRoute, useRouter } from "vue-router";

const axios = inject("axios") as Axios;
const route = useRoute();
const router = useRouter();
const dialog = useDialog();
const message = useMessage();
const cookies = inject("$cookies") as VueCookies;
const form = ref<FormInst | null>(null);
const connecting = ref(false);
const data = reactive({
  username: "",
  password: "",
  agreement01: false,
  agreement02: false,
});
const rules = {
  username: {
    required: true,
    message: "Enter your username or email please.",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "Enter your password please.",
    trigger: "blur",
  },
};

function submit(event: MouseEvent) {
  event.preventDefault();
  form.value?.validate(async (errors) => {
    if (errors) {
      return;
    } else if (!data.agreement01 || !data.agreement02) {
      message.warning("Agree to the terms of service first.");
      return;
    }

    connecting.value = true;
    const response = await axios.post("/api/security/users/signin", {
      username: data.username,
      password: data.password,
    });

    if (response.status === 200) {
      cookies.set("access_token", response.data["Response"]);
      dialog.success({
        title: "连接成功",
        positiveText: route.params["redirect"] ? "返回上一级" : "前往仪表盘",
        content: () => "成功连接到神经档案 " + data.username + "，欢迎回来！",
        onPositiveClick: () => {
          router
            .push({ name: route.params["redirect"] ? (route.params["redirect"] as string) : "Dashboard" })
            .then(() => router.go(0));
        },
      });
    } else if (response.status === 401) {
      message.warning("找不到神经档案或授权无效");
    } else {
      message.error("未知神经通信错误，请稍后再试");
      console.error(response.data);
    }
    connecting.value = false;
  });
}
</script>

<style scoped>
#header {
  text-align: center;
  width: 100%;
}
</style>
