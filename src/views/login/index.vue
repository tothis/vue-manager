<template>
    <div class="login-container">
        <el-form
                :model="form"
                :rules="rules"
                auto-complete="on"
                class="login-form"
                label-position="left"
                ref="form">
            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="userName">
                <svg-icon icon-class="user"/>
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
                <i @click="showPassword">
                    <svg-icon :icon-class="passwordType === 'password'?'eye':'eye-open'"/>
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

        <vue-particles
                moveSpeed="6"
                particleSize="8"
                hoverMode="repulse"
        />
    </div>
</template>
<script>
    import { login } from '@/api/user'

    export default {
        name: 'i-login',
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
                        login(this.form, () => {
                            this.$router.push({ path: this.redirect || '/' })
                        })
                    } else {
                        console.log('数据不合法')
                        return false
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    #particles-js {
        position: fixed;
        background: radial-gradient(#03548a, #0f023f);
        left: 0;
        right: 0;
    }

    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        .svg-icon {
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
            border: 1px solid rgba(255, 255, 255, .1);
            background: rgba(0, 0, 0, .1);
            border-radius: 5px;
            color: #454545;
        }

        .login-form {
            width: 520px;
            margin: 0 auto;
            border-radius: 6px;
            background: #fff;
            padding: 24px 24px 0 24px;
            z-index: 1;
        }

        .title-container {
            margin-bottom: 20px;

            .title {
                font-size: 26px;
                color: #707070;
                text-align: center;
                font-weight: bold;
            }
        }
    }
</style>
