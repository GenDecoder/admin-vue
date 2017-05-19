<template>
    <div class="in-out-selector">
        <in-out-box
            :list="leftList"
            v-model="leftSelection"
        ></in-out-box>
        <div class="arrow-container">
            <button class="arrow" :disabled="disabled || !leftSelection.length" @click="moveToRight"> toRight </button>
            <button class="arrow" :disabled="disabled || !rightSelection.length" @click="moveToLeft"> toLeft </button>
        </div>
        <in-out-box
            :list="rightList"
            v-model="rightSelection"
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
        return {
            state: Object.defineProperty({}, "disabled", {
                get: () => this.disabled
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
    data() {
        var me = this;
        return {
            rightList: [],
            rightSelection: [],
            leftList: me.list.slice(0),
            leftSelection: me.value.slice(0)
        }
    },
    created() {// basically is a move from left to right
        var me = this;
        me.moveToRight();
        me.rightSelection = [];
    },
    // watch: {
    //     value() {
    //         // But cleaning selection
    //         // will perform a moveToRight
    //         console.log("Changed");
    //     },
    //     list () {
    //         // But cleaning selection
    //         // will perform a moveToRight
    //         console.log("Changed");
    //     }
    // },   
    methods: {        
        reset() {

        },
        move(config) {
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
            me.$emit("input", me.rightList.map(function getValue(item) {
                return item[me.valueField];
            }, me));
        },
        moveToRight() {
            var me = this;
            me.move({
                toList: me.rightList,
                fromList: me.leftList,
                toSelection: me.rightSelection,
                fromSelection: me.leftSelection
            });
        },
        moveToLeft() {
            var me = this;
            me.move({
                toList: me.leftList,
                fromList: me.rightList,
                toSelection: me.leftSelection,
                fromSelection: me.rightSelection
            });
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
