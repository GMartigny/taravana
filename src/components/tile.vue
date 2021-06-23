<template>
    <div class="tile" :class="{hasPopup: data.open}" @click="openPopup" v-bind="prop">
        <header>
            <h3 v-if="data.title" :itemprop="offer ? 'name' : undefined">{{ $t(data.title) }}</h3>
            <img :src="images[data.image]" alt="">
        </header>
        <div class="body" v-if="data.content">
            <div v-html="$t(data.content)" :itemprop="offer ? 'description' : undefined" />
            <aside>
                <span :itemprop="offer ? 'price' : undefined">{{ data.aside }}</span>
                <span v-if="offer" itemprop="priceCurrency">€</span>
            </aside>
        </div>
        <Popup v-if="data.open" v-show="popupOpened" :data="data.open" @close="closePopup" />
    </div>
</template>

<script>
    import Popup from "./popup.vue";
    import images from "../static/*.jpg";

    export default {
        name: "Tile",
        props: ["data", "offer"],
        components: {
            Popup,
        },
        data () {
            return {
                images,
                popupOpened: false,
            };
        },
        computed: {
            prop () {
                return this.offer ? {
                    itemprop: "itemListElement",
                    itemscope: true,
                    itemtype: "https://schema.org/Offer",
                } : {};
            },
        },
        mounted () {
            this.$bus.on("click-body", () => this.closePopup());
        },
        methods: {
            openPopup () {
                if (this.data.open) {
                    this.popupOpened = true;
                    this.$bus.fire("open-popup");
                }
            },
            closePopup () {
                this.popupOpened = false;
                this.$bus.fire("close-popup");
            }
        }
    };
</script>

<style scoped lang="less">
    @import "../less/variables";
    @import "../less/mixins";

    .tile {
        flex: 0 0 calc((100% / 3) - 2em);
        margin: 0 1em 1em;
        .paper(2);

        &.hasPopup {
            cursor: pointer;
        }

        @media (max-width: 1023px) {
            width: calc(100% - 2em);
        }

        &:hover header img {
            transform: translateY(-50%) scale(1.1);
        }

        header {
            position: relative;
            border-radius: inherit;
            height: 12em;
            overflow: hidden;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: @black;

            @media (max-width: 767px) {
                height: 9em;
            }

            img {
                position: absolute;
                top: 50%;
                width: 100%;
                transform: translateY(-50%);
                z-index: -1;
                transition: transform .2s ease;
            }

            h3 {
                color: @white;
                font-size: 40px;

                & ~ img {
                    opacity: 0.7;
                }
            }
        }

        .body {
            padding: 2em 1em;

            aside {
                float: right;
                font-style: italic;
            }
        }
    }
</style>
