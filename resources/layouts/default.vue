<template>
<div class="container" v-if="isTime">
    <transition name="popup">
        <preloader v-if="loading" :text="text" />
    </transition>
    <Order />
    <MyHeader />
    <Slider :speed="speedMainSlider" v-if="this.$route.fullPath == '/'" />
    <div v-else style="padding-top: 50px;" />
    <Basket />
    <div class="content">
        <nuxt />
    </div>
    <MyFooter />
</div>
<Timer :dedline="dedline" v-else/>
</template>

<script>
import MyHeader from "~/components/Header";
import Slider from "~/components/Slider";
import MyFooter from "~/components/Footer";
import Basket from "~/components/basket/";
import preloader from "~/components/preloader";
import Timer from "~/components/TimerPage";
import Order from "~/components/forms/order";

import settings from "~/settings";

export default {
    components: {
        Order,
        preloader,
        MyHeader,
        Slider,
        MyFooter,
        Basket,
        Timer
    },
    data() {
        return {
            speedMainSlider: settings.speedMainSlider,
            loading: true,
            online: true,
            text: "Идёт загрузка",
            dedline: "2018/05/12 21:00:00",
            isTime: true
        };
    },
    created() {
        this.autch()
        this.ready(() => {
            this.loading = false;
        });
    },
    methods: {
        async autch() {
            if (new Date(this.dedline).getTime() <= Date.now() == false)
                await this.$axios.$get('/api/auth/').then(res => {
                    if (res.status == 200)
                        this.isTime = true
                    else
                        this.isTime = false
                }).catch(error => {
                    this.isTime = false
                })
        },
        ready(fn) {
            if (process.browser) {
                window.onload = () => {
                    fn();
                };
                if (
                    document.attachEvent ?
                    document.readyState === "complete" :
                    document.readyState !== "loading"
                ) {
                    setTimeout(() => {
                        fn();
                    }, 1000);
                } else {
                    document.addEventListener("DOMContentLoaded", () => {
                        fn();
                    });
                }
                setTimeout(() => {
                    if (!this.loading) fn();
                }, 1000);
            }
        }
    }
};
</script>

<style lang="less">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    padding-bottom: 6px;
    .page {
        max-width: 1200px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
}

.cat-h1 {
    font-size: 18pt;
    text-align: center;
    margin-bottom: 40px;
    width: 100%;
}
</style>
