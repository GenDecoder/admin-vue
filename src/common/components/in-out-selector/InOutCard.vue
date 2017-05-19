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
        props: {
             value: { // selection
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
                me.$emit("adjustSize", isHidden ? -1 : 1);
                console.log(isHidden);
                return isHidden;
            },
            selected() {
                var me = this;
                return me.value.indexOf(me.item[me.valueField]) !== -1;
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
                var index = me.value.indexOf(value);                
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