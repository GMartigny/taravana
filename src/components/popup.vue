<template>
    <transition name="slide">
        <dialog @click.stop="">
            <div class="body">
                <h4>{{ $t(data.title) }}</h4>
                <div v-html="$t(data.content)" />
                <ul v-if="data.list">
                    <li v-for="index in data.length">
                        {{ $t(`${data.list}[${index - 1}]`) }}
                    </li>
                </ul>
            </div>
            <button class="close" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </button>
        </dialog>
    </transition>
</template>

<script>
    export default {
        name: "Popup",
        props: ["data"],
        methods: {
            close () {
                this.$emit("close");
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../less/mixins";
    @import "../less/variables";

    dialog {
        display: block;
        position: fixed;
        top: 50%;
        .paper(8);
        padding: 2em 1em;
        z-index: 100;
        border: none;
        transform: translateY(-50%);
        cursor: auto;

        &.slide-enter-active, &.slide-leave-active {
            transition: transform .3s ease;
        }
        &.slide-enter-from, &.slide-leave-to {
            transform: translateY(50vh);
        }

        .close {
            position: fixed;
            right: 0;
            top: 0;
            background-color: @complementary;
            color: @white;
            border: none;
            padding: .5em 1em;
            cursor: pointer;
            border-radius: 0 4px 0 0;
        }

        .body {
            max-height: 80vh;
            overflow: auto;

            h4 {
                color: @black;
                padding-top: 0;
                margin-bottom: .5em;
                font-size: 33px;
            }

            ul {
                list-style: initial;
                padding-inline-start: 3em;
                padding-top: 1em;
            }
        }
    }
</style>
<style lang="less">
    body.modal-open {
        overflow: hidden;

        &:after {
            content: "";
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background-color: #000;
            opacity: 0.6;
            z-index: 99;
        }
    }
</style>
