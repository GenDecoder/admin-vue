<template>
    <button 
        tabindex="-1"
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
            selection: {
                type: Array,
                default: []
            },
            item: {
                type: Object,
                default: {}
            },
            searchValue: {
                type: String,
                default: ""
            }            
        },      
        computed: {
            hidden () {
                var me = this;
                return me.item[me.displayField].toLowerCase().indexOf(me.searchValue.toLowerCase().trim()) === -1;
            },
            selected() {
                var me = this;
                return me.selection.indexOf(me.item[me.valueField]) !== -1;
            }
        },
        watch: {
            hidden (newVal, oldVal) {
                var me = this;
                me.$emit("adjustSize", newVal ? -1 : 1);
            },
            selected (newVal, oldVal) {
                var me = this;
                newVal && me.hidden && me.selectDeselect();
            },
            searchValue (newVal, oldVal) {
                var me = this;
                me.selected && me.selectDeselect();
            }
        },
        methods: {
            selectDeselect () {
                var me = this;
                var value = me.item[me.valueField];
                var index = me.selection.indexOf(value);                
                me.selected = !me.selected;
                index !== -1 ? me.selection.splice(index, 1) : me.selection.push(value);
            }
        }        
    }
</script>
<style lang="scss" rel="stylesheet"> 
    .in-out-card {

        width: 100%;
        height: 30px;
        border: none;
        text-align: left;
        letter-spacing: 1px;
        background-color: white;
        &.selected {
            color: white;
            border-color: #e0c6c6;
            border-bottom: solid 1px;
            background-color: #4d5473;
            // background-color: #ea4646;
            &:focus {
                opacity: 0.8;
            }
        }
        &.disabled {
            cursor: no-drop;
        }
        &:focus {            
            outline-color: #4d5473;          
        }
    }
</style>