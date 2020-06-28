<template>
    <div class="login-container">
        <el-form :model="form" :rules="rules" auto-complete="on"
                 class="login-form" label-position="left" ref="form">
            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="userName">
                <i class="el-icon-s-custom"></i>
                <el-input
                        auto-complete="on"
                        name="userName"
                        placeholder="用户名"
                        ref="userName"
                        tabindex="1"
                        type="text"
                        v-model="form.userName"
                />
            </el-form-item>

            <el-form-item prop="password">
                <i :class="passwordType === 'password'?'el-icon-view':'el-icon-lock'"
                   @click="showPassword">
                </i>
                <el-input
                        :key="passwordType"
                        :type="passwordType"
                        @keyup.enter.native="handleLogin"
                        auto-complete="on"
                        name="password"
                        placeholder="密码"
                        ref="password"
                        tabindex="2"
                        v-model="form.password"
                />
            </el-form-item>
            <el-button @click.native.prevent="handleLogin"
                       style="width:100%;margin-bottom:30px;"
                       type="primary">
                登录
            </el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    userName: 'root',
                    password: '123456'
                },
                rules: {
                    userName: [{ required: true, trigger: 'blur', message: '请输入用户名称' }],
                    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
                },
                passwordType: 'password',
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            showPassword() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                // 聚焦密码框
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$store.dispatch('user/login', this.form)
                            .then(() => {
                                this.$router.push({ path: this.redirect || '/' })
                            })
                            .catch(() => {
                            })
                    } else {
                        console.log('提交失败')
                        return false
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url(~@/assets/image/login/background.png);

        [class^=el-icon-] {
            color: #889aa4;
            font-size: 16px;
            position: absolute;
            z-index: 1;
            top: 16px;
            left: 12px;
        }

        .el-input {
            input {
                border: none;
                height: 48px;
                padding-left: 36px;
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .login-form {
            width: 520px;
            margin: 0 auto;
            border-radius: 6px;
            background: #fff;
            padding: 24px 24px 0 24px;
        }

        .title-container {
            .title {
                font-size: 26px;
                color: #707070;
                text-align: center;
                font-weight: bold;
            }
        }
    }
</style>