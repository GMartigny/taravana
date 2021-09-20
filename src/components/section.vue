<template>
    <section v-bind="prop">
        <h2 :itemprop="data.offer ? 'name' : undefined">
            <span class="anchor" :id="data.slug"></span>
            {{ $t(data.title) }}
        </h2>
        <p v-if="typeof data.content === 'string'" v-html="$t(data.content)" />
        <Grid v-else-if="Array.isArray(data.content)" :tiles="data.content" :offer="data.offer" />
        <component v-if="data.component" :is="data.component" />
    </section>
</template>

<script>
    import Grid from "./grid.vue";
    import Contact from "./contact.vue";

    export default {
        name: "section",
        props: ["data"],
        components: {
            Grid,
            Contact,
        },
        computed: {
            prop () {
                return this.data.offer ? {
                    itemprop: "hasOfferCatalog",
                    itemscope: true,
                    itemtype: "https://schema.org/OfferCatalog",
                } : {};
            },
        }
    };
</script>

<style scoped lang="less">
    @import "../less/mixins";
    @import "../less/variables";

    section + section {
        box-shadow: 0 4px 4px fade(#000, 30%);
    }

    section {
        background-image: @gradient;
        position: relative;
        padding: 20px;
        box-shadow: 0 4px 4px fade(#000, 30%), 0 -4px 4px fade(#000, 30%);

        h2 {
            font-size: 40px;
            color: @white;

            .anchor {
                position: absolute;
                top: -84px;
            }
        }

        p {
            padding: 2em 1em;
            .paper(2);
        }
    }
</style>
