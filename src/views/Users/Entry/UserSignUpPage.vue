<template>
  <div class="container-size" style="display: flex; align-items: center">
    <div style="margin: auto">
      <div id="header">
        <img height="64" src="../../../assets/codingland_logo.svg" width="64"/>
        <br/>
        <span style="font-size: 20px">Sign Up</span> <br/>
        <br/>
      </div>
      <n-card style="min-width: 450px">
        <div v-if="step === 0">
          <n-form
              ref="form"
              :model="data"
              :rules="rules"
              :show-require-mark="false"
          >
            <n-form-item label="Username" path="username">
              <n-input
                  v-model:value="data.username"
                  placeholder="Your username or email"
              ></n-input>
            </n-form-item>
            <n-form-item label="Email" path="email">
              <n-input
                  v-model:value="data.email"
                  placeholder="Your password again"
                  type="email"
              ></n-input>
            </n-form-item>
            <n-form-item label="Birthday">
              <n-date-picker
                  v-model:value="data.birthday"
                  placeholder="Your birthday"
                  style="width: 100%"
              ></n-date-picker>
            </n-form-item>
            <n-form-item label="Password" path="password">
              <n-input
                  v-model:value="data.password"
                  placeholder="Your password"
                  type="password"
              ></n-input>
            </n-form-item>
            <n-form-item label="Confirm Password" path="confirmPassword">
              <n-input
                  v-model:value="data.confirmPassword"
                  placeholder="Your password again"
                  type="password"
              ></n-input>
            </n-form-item>
            <n-form-item :show-feedback="false" :show-label="false" size="small">
              <n-checkbox v-model:checked="data.agreement01"
              >CodingLand 文明使用神经网络节点用户条款
              </n-checkbox
              >
            </n-form-item>
            <n-form-item :show-feedback="false" :show-label="false" size="small">
              <n-checkbox v-model:checked="data.agreement02"
              >CodingLand 神经网络商品出售与退换条款
              </n-checkbox
              >
            </n-form-item>
            <n-form-item :show-feedback="false" :show-label="false" size="small">
              <n-checkbox v-model:checked="data.automaticSignin"
              >档案创建完成后自动验证身份并登入
              </n-checkbox
              >
            </n-form-item>
            <n-form-item :show-feedback="false">
              <n-button
                  :loading="connecting"
                  attr-type="button"
                  style="width: 100%"
                  type="primary"
                  @click="submit"
              >Sign Up
              </n-button
              >
            </n-form-item>
          </n-form>
        </div>
        <div v-if="step === 1">
          <n-form
              ref="form"
              :model="data"
              :rules="rules"
              :show-require-mark="false"
          >
            <n-form-item label="Activation Code" path="activationCode">
              <n-input
                  v-model:value="data.activationCode"
                  placeholder="Your activation code"
              ></n-input>
            </n-form-item>
            <n-form-item :show-feedback="false">
              <n-button
                  :loading="connecting"
                  attr-type="button"
                  style="width: 100%"
                  type="primary"
                  @click="active"
              >Active
              </n-button
              >
            </n-form-item>
          </n-form>
        </div>
        <div v-if="step === 2">
          <div style="padding-top: 20px; padding-bottom: 20px">
            <n-result description="欢迎加入 CodingLand 神经网络" status="success" title="档案创建成功">
              <template #footer>
                <n-button @click="$router.push({name: 'Dashboard'}).then(() => $router.go(0))">前去仪表盘</n-button>
              </template>
            </n-result>
          </div>
        </div>
      </n-card>
      <div style="text-align: center; padding-top: 10px">
        <span>回忆起记忆者，访
          <router-link #="{ navigate, href }" :to="{name: 'User.Entry.SignIn'}" custom>
            <n-a :href="href" @click="navigate">此处</n-a>
          </router-link> 验证也</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Axios} from "axios";
import {
  FormInst,
  NA,
  NButton,
  NCard,
  NCheckbox,
  NDatePicker,
  NForm,
  NFormItem,
  NInput,
  NResult,
  useMessage
} from "naive-ui";
import {inject, reactive, ref} from "vue";
import {VueCookies} from "vue-cookies";
import {useRouter} from "vue-router";

const axios = inject("axios") as Axios;
const router = useRouter();
const message = useMessage();
const cookies = inject("$cookies") as VueCookies;
const form = ref<FormInst | null>(null);
const step = ref(0);
const connecting = ref(false);
const data: any = reactive({
  email: "",
  birthday: null,
  username: "",
  password: "",
  confirmPassword: "",
  activationCode: "",
  agreement01: false,
  agreement02: false,
  automaticSignin: true,
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
  email: [{
    required: true,
    message: "Enter your email please.",
    trigger: "blur",
  }, {
    validator: (rule: string, value: string) => {
      if (
          !new RegExp(
              /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
          ).test(value)
      ) {
        return new Error("Enter a valid email please.");
      }
    },
    trigger: "blur",
  }],
  confirmPassword: [
    {required: true, message: "Enter your password again please.", trigger: "blur"},
    {
      validator: (rule: string, value: string) => {
        if (value !== data.password) {
          return new Error(
              "Twice password isn't match."
          );
        }
      },
      trigger: "blur",
    },
  ],
  activationCode: {required: true, message: "Enter your activation code please.", trigger: "blur"}
};

function submit(event: MouseEvent) {
  event.preventDefault();
  form.value?.validate(async (errors) => {
    if (errors) {
      return;
    } else if (!data.agreement01 || !data.agreement02) {
      message.warning("请先阅读并同意全部神经网络使用协议");
      return;
    }

    connecting.value = true;
    const response = await axios.post("/api/security/users/signup", {
      username: data.username,
      password: data.password,
      email: data.email,
      birthday: new Date(data.birthday),
    });

    if (response.status == 200) {
      if (response.data["Status"]["Code"] === "TRY_AGAIN_LATER") {
        message.success("成功创建档案，但电子邮件发信受阻，请用注册邮箱发送电子邮件 littlesheep.code@hotmail.com 来完成激活");
      } else {
        message.success("成功创建档案，请检查您的电子邮箱来获取激活码");
      }
      step.value++;
    } else if (response.status == 400) {
      if (response.data["Status"]["CodeDetail"] === "USERNAME_DUPLICATED") {
        message.warning("被占用使用的用户名，请开动脑筋重新想一个吧");
      } else if (response.data["Status"]["CodeDetail"] === "ALREADY_REGISTERED") {
        message.warning("邮箱被使用了，请检查是否曾经创建过档案");
      }
    } else {
      message.error("未知通信错误");
      console.error(response.data);
    }
    connecting.value = false;
  });
}

function active(event: MouseEvent) {
  event.preventDefault();
  form.value?.validate(async (errors) => {
    connecting.value = true;
    const response = await axios.post("/api/security/users/active", {
      code: data.activationCode
    });

    if (response.status == 200) {
      message.success("成功激活神经记忆档案");
      if (data.automaticSignin) {
        await signin();
      }
      step.value++;
    } else if (response.status == 400) {
      message.warning("档案激活码错误，请检查");
    } else {
      message.error("未知通信错误");
      console.error(response.data);
    }
    connecting.value = false;
  });
}

async function signin() {
  const response = await axios.post("/api/security/users/signin", {
    username: data.username,
    password: data.password,
  });

  if (response.status == 200) {
    cookies.set("access_token", response.data["Response"]);
  } else {
    message.error("验证身份失败，请稍后尝试手动登入");
    console.error(response.data);
  }
}
</script>

<style scoped>
#header {
  text-align: center;
  width: 100%;
}
</style>
