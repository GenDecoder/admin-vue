<template>
    <div class="in-out-card" :class="{selected: selected}" @click="select">
        <span> {{ item.name }} </span>
    </div>
</template>

<script>
    export default {
        props: {
             value: {
                type: Object,
                default: {}
            },
            item: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                selected: false
            }
        },
        methods: {
            select() {
                var id = this.item.id;
                this.selected = !this.selected;
                if (this.value.hasOwnProperty(id))
                    delete this.value[id]
                else
                    this.value[id] = id;                    
                this.$emit("input", this.value);
            }
        }        
    }
</script>

<style lang="scss" rel="stylesheet"> 
    .in-out-card {
        border: solid;
        cursor: pointer;
        background: orange;
        &.selected {
            color: white;
            background-color: black;
        }
    }
</style>