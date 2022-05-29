import * as VueRouter from "vue-router"

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: "/", component: () => import("../layouts/AppLayout.vue"), children: [
                {path: "", name: "Dashboard", component: () => import("../views/Dashboard/DashboardPage.vue")},

                {
                    path: "user/entry/signin",
                    name: "User.Entry.SignIn",
                    component: () => import("../views/Users/Entry/UserSignInPage.vue")
                },
                {
                    path: "user/entry/signup",
                    name: "User.Entry.SignUp",
                    component: () => import("../views/Users/Entry/UserSignUpPage.vue")
                },

                {
                    path: "operations/orders",
                    name: "Operation.Orders",
                    component: () => import("../views/Operations/OperationListPage.vue")
                },
                {
                    path: "operations/execute",
                    name: "Operation.Execute",
                    component: () => import("../views/Operations/OperationExecutePage.vue")
                },
            ]
        },
    ]
})
