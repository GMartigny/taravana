<template>
    <div :class="{ready, scrolled}" itemscope itemtype="https://schema.org/LocalBusiness">
        <Menu :title="data.title" :phone="data.phone" :items="items" />
        <main>
            <Splash :ready="ready" :scrolled="scrolled" />

            <component
                v-for="(section, index) in data.sections" :key="index"
                :is="typeof section === 'object' ? 'Section' : 'Window'"
                :data="section"
            />
        </main>

        <div itemprop="url" class="meta">www.taravana.fr</div>
        <div itemprop="priceRange" class="meta">€€</div>
    </div>
</template>

<script>
    import Menu from "./components/menu.vue";
    import Window from "./components/window.vue";
    import Section from "./components/section";
    import Splash from "./components/splash";
    import data from "./lang/data.json";

    export default {
        name: "main",
        components: {
            Splash,
            Section,
            Window,
            Menu,
        },
        data () {
            return {
                data,
                ready: false,
                scrolled: false,
            };
        },
        computed: {
            items () {
                return this.data.sections.filter(item => typeof item === "object");
            }
        },
        mounted () {
            requestAnimationFrame(() => this.ready = true);

            this.items.forEach((item) => {
                item.slug = this.$t(item.title).toLowerCase().replace(/[ ']/g, "_").normalize("NFD").replace(/\W/g, "").replaceAll("_", "-")
            });

            window.addEventListener("scroll", this.scroll, {
                passive: true,
            });

            document.body.addEventListener("click", ({ target }) => {
                if (target === document.body) {
                    this.$bus.fire("click-body");
                }
            });

            this.$bus.on("open-popup", () => this.shadow(true));
            this.$bus.on("close-popup", () => this.shadow(false));
        },
        methods: {
            scroll () {
                this.scrolled = window.scrollY > 50;
            },
            shadow (is) {
                document.body.classList.toggle("popup", is);
            }
        }
    };
</script>

<style scoped lang="less">
    div {
        font-family: sans-serif;

        .meta {
            display: none;
        }
    }
</style>
<style lang="less">
    body.popup {
        overflow: hidden;
        cursor: pointer;

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
