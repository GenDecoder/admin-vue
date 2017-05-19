<template>
    <div 
        class="in-out-selector"
        @keydown.left.stop="moveToLeft"
        @keydown.right.stop="moveToRight"
    >
        <in-out-box
            :list="leftList"
            :selection="leftSelection"
        ></in-out-box>
        <div class="arrow-container">
            <button class="arrow" :disabled="disabled || !leftSelection.length" @click="moveToRight"> TO RIGHT </button>
            <button class="arrow" :disabled="disabled || !rightSelection.length" @click="moveToLeft"> TO LEFT </button>
        </div>        
        <in-out-box
            :list="rightList"
            :selection="rightSelection"
        ></in-out-box>
    </div>
</template>
<script>
/**
*   Consider this component as a field,
*   so the key is to update the "value" via "$emit"
 */
import InOutBox from "./in-out-selector/InOutBox"
export default {
    name: "in-out-selector",
    components: {
        "in-out-box": InOutBox
    },
    provide() {
        var me = this;
        return {
            state: Object.defineProperty({}, "disabled", {
                get: () => me.disabled
                // set(value) {
                //     console.log(value);
                // }
            }),
            valueField: this.valueField,
            displayField: this.displayField
        }
    },
    props: {
        value: {
            type: Array,
            default: []
        },
        list: {
            type: Array,
            default: []
        },
        disabled: {
            type: Boolean,
            default: false
        },
        valueField: {
            type: String,
            required: true
        },
        displayField: {
            type: String,
            required: true
        }
    },
    data () {
        var me = this;
        return {
            rightList: [],
            rightSelection: [],
            leftList: me.list.slice(0),
            leftSelection: me.value.slice(0)
        }
    },
    created () {
        var me = this;        
        me.moveToRight();
        me.rightSelection = [];
        me.sortBy(me.leftList, me.displayField);
    },  
    methods: {        
        move (config) {
            var me = this;
            var toList = config.toList;
            var fromList = config.fromList;
            var toSelection = config.toSelection;
            var fromSelection = config.fromSelection;
            var index = fromList.length;
            while (index --) { // all vue specific solutions methods in mixins
                var item = fromList[index];
                var id = item[me.valueField];
                var selIndex = fromSelection.indexOf(id);
                if (selIndex !== -1) {
                    toList.push(item);
                    toSelection.push(id);
                    fromList.splice(index, 1);
                    fromSelection.splice(selIndex, 1);
                }
            }
            me.sortBy(toList, me.displayField);            
            me.$emit("input", me.rightList.map(item => item[me.valueField]));
            // set focus after move
            // all buttons (cards) should not be accessed via tab
            // each list is a field (group) (SELECT THE FIRST)
        },
        moveToRight () {
            var me = this;
            me.move({
                toList: me.rightList,
                fromList: me.leftList,
                toSelection: me.rightSelection,
                fromSelection: me.leftSelection
            });
        },
        moveToLeft () {
            var me = this;
            me.move({
                toList: me.leftList,
                fromList: me.rightList,
                toSelection: me.leftSelection,
                fromSelection: me.rightSelection
            });
        },
        sortBy (list, prop, dir) {
            dir = dir || "",
            dir = dir.toLowerCase();
            dir = dir === "desc" ? -1 : 1;            
            list.sort( (a, b) => (a[prop] > b[prop]) ? 1 * dir : ((b[prop] > a[prop]) ? -1 * dir : 0));
        }
    }
}
</script>
<style lang="scss" rel="stylesheet">
    .in-out-selector {
        width: 700px;
        display: flex;
        .arrow-container {
            width: 100px;
            .arrow {                
                cursor: pointer;
            }
        }
    }
</style>