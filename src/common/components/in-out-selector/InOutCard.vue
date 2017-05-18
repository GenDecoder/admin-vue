<template>
    <div class="in-out-card" :class="{selected: selected, disabled: state.disabled}" @click="select">
        <span> {{ item[displayField] }} </span>
    </div>
</template>

<script>
    export default {
        inject: [
            "state",
            "valueField",
            "displayField"
        ],
        props: {
             value: {
                type: Array,
                default: []
            },
            item: {
                type: Object,
                default: {}
            }
        },
        // data() {
        //     return {
        //         selected: false
        //     }
        // },
        computed: {
            selected() {
                var me = this;
                return me.value.indexOf(me.item[me.valueField]) !== -1;
            }
        },
        methods: {
            select() {
                var me = this;
                var value = me.item[me.valueField];
                var index = me.value.indexOf(value);

                if (me.state.disabled)
                    return false;

                me.selected = !me.selected;
                if (index !== -1)
                    me.value.splice(index, 1);
                else
                    me.value.push(value);
                me.$emit("input", me.value);
            }
        }        
    }
</script>

<style lang="scss" rel="stylesheet"> 
    .in-out-card {
        cursor: pointer;        
        min-height: 30px;
        border: solid 1px;
        line-height: 30px;
        &.selected {
            color: white;
            border-color: black;
            background-color: #2364a5;
        }
        &.disabled {
            cursor: default;
            background-color: lightgray;
        }
    }
</style>