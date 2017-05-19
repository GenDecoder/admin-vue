<template>
    <button 
        class="in-out-card"
        v-if="!hidden"
        @click="selectDeselect"
        :disabled="state.disabled"
        :class="{selected: selected, disabled: state.disabled}"
    > {{ item[displayField] }} </button>
</template>

<script>
    export default {
        inject: [
            "state",
            "valueField",
            "displayField"
        ],
        model: {
            prop: "selection",
            event: "update:selection"
        },
        props: {
            selection: {
                type: Array,
                default: []
            },
            item: {
                type: Object,
                default: {}
            },
            searchText: {
                type: String,
                default: ""
            }
        },      
        computed: {
            hidden() {
                var me = this;
                var isHidden = me.item[me.displayField].toLowerCase().indexOf(me.searchText.trim()) === -1
                // isHidden && 
                // me.state.disabled = isHidden;
                me.$emit("adjustSize", isHidden ? -1 : 1);
                console.log(isHidden);
                return isHidden;
            },
            selected() {
                var me = this;
                return me.selection.indexOf(me.item[me.valueField]) !== -1;
            }
        },
        // watch: {
        //     selected(newVal, oldVal) {

        //     }
        // },
        methods: {
            selectDeselect() {
                var me = this;
                var value = me.item[me.valueField];
                var index = me.selection.indexOf(value);                
                me.selected = !me.selected;
                index !== -1 ? me.selection.splice(index, 1) : me.selection.push(value);
                me.$emit("update:selection", me.selection);
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