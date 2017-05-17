<template>
    <div class="in-out-selector">
        <in-out-box
            :list="leftList"
            v-model="leftSelection"
        ></in-out-box>
        <div class="arrow-container">
            <div class="arrow" @click="moveToRight"> > </div>
            <div class="arrow" @click="moveToLeft"> < </div>
        </div>
        <in-out-box
            :list="rightList"
            v-model="rightSelection"
        ></in-out-box>
    </div>
</template>

<script>

// instead of passing the selection as a model, pass it as a :
    import InOutBox from "./in-out-selector/InOutBox"
    export default {
        name: "in-out-selector",
        components: {
            "in-out-box": InOutBox
        },
        provide() {
            return {
                dom: Object.defineProperty({}, "disabled", { // change name, dom is not nice
                    get: () => this.disabled
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
            return {
                leftList: [], // equal to list
                rightList: [],
                leftSelection: {},
                rightSelection: {} // equal to value
            }
        },
        created() {// basically is a move from left to right
            var me = this;
            var item;
            for(var i = 0; i < this.list.length; i += 1) {
                item = this.list[i];
                this.value.indexOf(item[this.valueField]) === -1
                    ? this.leftList.push(item)
                    : this.rightList.push(item);
            }
        },
        watch: {
            value() {
                // But cleaning selection
                // will perform a moveToRight
                console.log("Changed");
            },
            list () {
                // But cleaning selection
                // will perform a moveToRight
                console.log("Changed");
            }
        },
        computed: {},
        methods: {
            moveToRight() {
                var me = this;
                this.$emit("input");
            },
            moveToLeft() {
                var me = this;
                this.$emit("input");
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
