<template>
    <div class="grid">
        <Tile v-for="(tile, index) of tiles" :key="index"
              :data="tile" :offer="offer"
        />
    </div>
</template>

<script>
    import Tile from "./tile.vue";

    export default {
        name: "Grid",
        components: {
            Tile,
        },
        props: ["tiles", "offer"],
    };
</script>

<style scoped lang="less">
    .grid {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;

        @media (max-width: 1023px) {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
