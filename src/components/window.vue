<template>
    <div>
        <img :data-src="images[data]" :style="{ transform }" alt="" class="lazy">
    </div>
</template>

<script>
    import images from "../static/*.webp";

    export default {
        name: "Window",
        props: ["data"],
        data () {
            return {
                images,
                viewHeight: 0,
                height: 0,
                top: 0,
                transform: "",
                classes: "lazy",
            };
        },
        mounted () {
            this.viewHeight = window.innerHeight;
            this.top = this.$el.offsetTop;
            this.height = this.$el.getBoundingClientRect().height;
            window.addEventListener("scroll", this.scroll, {
                passive: true,
            });
        },
        methods: {
            scroll () {
                const position = (((this.viewHeight + window.scrollY) - this.top) / (this.viewHeight + this.height));
                if (0 < position && position < 1) {
                    this.transform = `translate3d(0, calc(${position * this.height}px - ${position * 100}%), 0)`;
                }
            },
        },
    };
</script>

<style scoped lang="less">
    @import "../less/mixins";

    div {
        height: 50vh;
        overflow: hidden;

        img {
            position: relative;
            width: 100%;

            .reduce-motion({
                transform: translate(0, -50%) !important;
            });
        }
    }
</style>
