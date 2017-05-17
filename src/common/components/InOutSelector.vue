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
    import InOutBox from "./in-out-selector/InOutBox"
    export default {
        name: "in-out-selector",
        components: {
            "in-out-box": InOutBox
        },
        props: {
            // mixin for repeated properties in the 3 components
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
            },
            list: {
                type: Array,
                default: []
            },
            selection: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                leftList: [], // equal list
                rightList: [],

                leftSelection: {},
                rightSelection: {}// equal selection
            }
        },        
        created() {// basically is a move from left to right 
            var me = this;          
            var item;
            for(var i = 0; i < this.list.length; i += 1) {
                item = this.list[i];
                this.selection.indexOf(item[this.valueField]) === -1
                    ? this.leftList.push(item)
                    : this.rightList.push(item);
            }
        },
        computed: {

        },
        methods: {           
            moveToRight() {
                var me = this;
                
            },
            moveToLeft() {
                var me = this;
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