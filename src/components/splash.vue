<template>
    <div class="splash" :style="css">
        <img src="../static/boat.webp" alt="Photo du bateau" itemprop="image">
    </div>
</template>

<script>
    export default {
        name: "Splash",
        props: ["ready", "scrolled"],
        computed: {
            css () {
                return {
                    "--splash-opacity": this.ready ? ".5" : "0",
                };
            },
        },
    };
</script>

<style lang="less">
    .scrolled .splash:after {
        opacity: 0;
    }
</style>
<style scoped lang="less">
    @import "../less/mixins";
    @import "../less/variables";

    .splash {
        position: relative;
        padding: 0;
        height: 100vh;
        overflow: hidden;
        background-color: @blue;

        img {
            position: absolute;
            left: 50%;
            top: 50%;
            min-width: 100%;
            min-height: 100%;
            transform: translate(-50%, -50%);
            opacity: var(--splash-opacity);
            transition: opacity 1s linear;
        }

        @keyframes jump {
            0% {
                transform: rotate(45deg) translate(0);
            }
            to {
                transform: rotate(45deg) translate(-1em, -1em);
            }
        }

        &:after {
            content: "";
            position: absolute;
            left: 50%;
            bottom: 4em;
            width: 2em;
            height: 2em;
            border: solid #fff;
            border-width: 0 4px 4px 0;
            border-radius: 4px;
            transition: opacity .2s linear;
            animation: jump alternate infinite .5s;

            .reduce-motion({
                animation: none;
                transform: rotate(45deg);
            });
        }
    }
</style>
