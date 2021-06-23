<template>
    <div :style="{ backgroundImage: `url(${images[data]})`, backgroundPositionY }" />
</template>

<script>
    import images from "../static/*.jpg";

    export default {
        name: "Window",
        props: ["data"],
        data () {
            return {
                images,
                viewHeight: 0,
                height: 0,
                top: 0,
                backgroundPositionY: 0,
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
                const position = ((this.viewHeight + window.scrollY) - this.top) / (this.viewHeight + this.height);
                if (0 < position && position < 1) {
                    this.backgroundPositionY = `${position * 100}%`;
                }
            },
        },
    };
</script>

<style scoped lang="less">
    @import "../less/mixins";

    div {
        height: 50vh;
        background-size: cover;
        background-position-x: center;
        background-position: 50%;

        .reduce-motion({
            background-position-y: 50% !important
        });
    }
</style>
