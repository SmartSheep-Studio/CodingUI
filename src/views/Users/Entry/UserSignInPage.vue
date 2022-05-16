<template>
  <div class="container-size" style="display: flex; align-items: center">
    <div style="margin: auto">
      <div id="header">
        <img src="../../../assets/codingland_logo.svg" height="64" width="64" />
        <br />
        <span style="font-size: 20px">Sign In</span> <br />
        <br />
      </div>
      <n-card style="min-width: 450px">
        <n-form
          ref="form"
          :model="data"
          :rules="rules"
          :show-require-mark="false"
        >
          <n-form-item label="Username / Email" path="username">
            <n-input
              v-model:value="data.username"
              placeholder="Your username or email"
            ></n-input>
          </n-form-item>
          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="data.password"
              type="password"
              placeholder="Your password"
            ></n-input>
          </n-form-item>
          <n-form-item size="small" :show-feedback="false" :show-label="false">
            <n-checkbox v-model:checked="data.agreement01"
              >CodingLand usage terms of service</n-checkbox
            >
          </n-form-item>
          <n-form-item size="small" :show-feedback="false" :show-label="false">
            <n-checkbox v-model:checked="data.agreement02"
              >CodingLand payment and products agreement</n-checkbox
            >
          </n-form-item>
          <n-form-item :show-feedback="false">
            <n-button
              style="width: 100%"
              type="primary"
              attr-type="button"
              @click="submit"
              >Sign In</n-button
            >
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Axios } from "axios";
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NButton,
  FormInst,
  useMessage,
} from "naive-ui";
import { inject, reactive, ref } from "vue";
import { VueCookies } from "vue-cookies";
import { useRouter } from "vue-router";

const axios = inject("axios") as Axios;
const router = useRouter();
const message = useMessage();
const cookies = inject('$cookies') as VueCookies;
const form = ref<FormInst | null>(null);
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

    const response = await axios.post("/api/security/users/signin", {
      username: data.username,
      password: data.password,
    });

    if (response.status == 200) {
      message.success("Login successfully");
      cookies.set("access_token", response.data["Response"]);
      router.back();
    } else if (response.status == 400) {
      message.warning("Wrong username or password");
    } else {
      message.error("Unknown communication error. Try again later please!");
      console.error(response.data);
    }
  });
}
</script>

<style scoped>
#header {
  text-align: center;
  width: 100%;
}
</style>
