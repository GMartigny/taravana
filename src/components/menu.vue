<template>
    <header id="menu">
        <div>
            <img src="../static/logo.png" alt="logo" itemprop="logo" id="logo" width="80" height="50">
            <h1 itemprop="name">{{ title }}</h1>
        </div>
        <nav>
            <a :href="`tel:${phone}`" id="phone">
                <span class="number">{{ phone }}</span>
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/></svg>
            </a>
            <input type="checkbox" id="menuSwitch" v-model="open">
            <label for="menuSwitch">
                <span></span><span></span><span></span>
            </label>
            <ul id="nav">
                <li v-for="({ title, slug }, index) of items" :key="index">
                    <a :href="`#${slug}`" @click="close">{{ $t(title) }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
        name: "Menu",
        props: ["title", "phone", "items"],
        data () {
            return {
                open: false,
            };
        },
        methods: {
            close () {
                this.open = false;
            },
        },
    };
</script>

<style scoped lang="less">
    @import "../less/mixins";
    @import "../less/variables";

    #menu {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background-image: @gradient;
        z-index: 10;
        transform: translate3d(0, -100%, 0);
        transition: transform .5s ease, box-shadow .5s ease;
        padding: 8px 2vw;
        color: @white;

        .reduce-motion({
            transition: none;
        });

        #logo, h1 {
            vertical-align: middle;
        }

        h1 {
            --scale: 5;
            display: inline-block;
            position: relative;
            padding: 0 .2em;
            font-size: 2.8vw;
            transition: clip-path 1s ease .5s, transform .5s ease;
            clip-path: polygon(0 0, var(--splash-clip) 0%, var(--splash-clip) 200%, 0% 200%);
            z-index: 1;
            transform: translate3d(calc(50vw - .2em - 80px - 2vw - 50%), 50vh, 0) scale3d(var(--scale), var(--scale), 1);

            @media (max-width: 768px) {
                font-size: 7vw;
                --scale: 2;
            }

            .reduce-motion({
                transition: none;
            });
        }

        #phone {
            color: @white;
            vertical-align: middle;
            margin-right: .75em;

            .icon {
                display: none;
                margin: 0;
            }

            @media (max-width: 768px) {
                .number {
                    display: none;
                }
                .icon {
                    display: block;
                }
            }
        }

        nav {
            #menuSwitch {
                display: none;

                &:checked {
                    & ~ label span {
                        &:first-child {
                            transform: rotate(-45deg);
                        }
                        &:nth-child(2) {
                            opacity: 0;
                        }
                        &:last-child {
                            transform: rotate(45deg);
                        }
                    }
                }
            }

            label {
                position: relative;
                display: inline-block;
                width: 2em;
                height: 2em;
                cursor: pointer;
                vertical-align: middle;

                span {
                    position: absolute;
                    display: block;
                    width: 100%;
                    height: 4px;
                    border-radius: 2px;
                    background-color: @white;
                    transition: all .2s ease;
                    transform-origin: calc(100% - $height / 2) 50%;

                    &:first-child {
                        top: $height;
                    }
                    &:nth-child(2) {
                        top: calc(50% - $height / 2);
                    }
                    &:last-child {
                        bottom: $height;
                    }
                }
            }

            ul {
                position: absolute;
                .paper(10);
                padding: 2em 1em;
                top: 100%;
                right: 0;
                background-color: @white;
                transform: translateX(100%);
                transition: transform .2s ease;

                .reduce-motion({
                    transition: none;
                });

                a {
                    width: 100%;
                }
            }
        }
    }
</style>
<style lang="less">
    @import "../less/mixins";
    .scrolled {
        #menu {
            transform: none;
            .elevation(6);

            h1 {
                transform: none;
            }

            #menuSwitch:checked {
                & ~ ul {
                    transform: translateX(4px);
                }
            }
        }
    }
</style>
