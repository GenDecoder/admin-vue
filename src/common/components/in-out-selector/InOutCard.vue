<template>
    <div class="in-out-card" :class="{selected: selected, disabled: dom.disabled}" @click="select">
        <span> {{ item[displayField] }} </span>
    </div>
</template>

<script>
    export default {
        inject: [
            "dom",
            "valueField",
            "displayField"
        ],
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
                var me = this;
                var value = me.item[me.valueField];
                if (me.dom.disabled)
                    return false;
                me.selected = !me.selected;
                if (me.value.hasOwnProperty(value))
                    delete me.value[value]
                else
                    me.value[value] = value;                    
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