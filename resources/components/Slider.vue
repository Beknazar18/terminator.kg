<template>
<div class="main-slider" :style="'background-image: url(\'/images/slider/' + items[active].thumbnail + '\')'" v-if="items.length > 0">
    <div class="slider-container">
        <div class="slider-content" v-html="items[active].description" />
        <nuxt-link class="slider-link" :to="items[active].link" v-if="items[active].is_local && items[active].link.length > 0">Подробнее</nuxt-link>
        <a class="slider-link" :href="items[active].link" target="_blank" v-else-if="items[active].link.length > 0">Подробнее</a>
    </div>
    <div class="navigation">
        <span :class="{'active': active == i}" v-for="(item, i) in items" :key="i" @click="active = i; timeLine = 0" v-if="items.length > 1" />
    </div>
</div>
<div v-else style="padding-top: 100px;" />
</template>

<script>
export default {
    created() {this.Get()},
    props: {
        speed: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            active: 0,
            timeLine: 0,
            items: []
        }
    },
    methods: {
        async Get() {
            return await this.$axios.$get('/api/slider/').then((res) => {
                    this.items = res.data
                })
                .catch(error => {});
        },
        Swipe(value) {
            if (value == 'R') {
                if (this.items.length - 1 == this.active)
                    this.active = 0
                else
                    this.active++;
                this.timeLine = 0;
            } else if (value == 'L') {
                if (this.active == 0)
                    this.active = this.items.length - 1
                else
                    this.active--;
                this.timeLine = 0
            }
        }
    },
    mounted() {
        // this.$refs.main_slider.disable('swipeup')
        // this.$refs.main_slider.disable('swipedown')
        setInterval(() => {
            this.timeLine++
                if (this.timeLine == this.speed) {
                    if (this.items.length - 1 == this.active)
                        this.active = 0
                    else
                        this.active++;
                    this.timeLine = 0;
                }
        }, 1000)
    },
}
</script>
