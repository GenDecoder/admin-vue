<template>
    <div class="in-out-selector">        
        <in-out-box :list="leftList" v-model="leftSelection"></in-out-box>
        <div class="arrow-container">
            <div class="arrow" @click="move('right')"> > </div>
            <div class="arrow" @click="move('left')"> < </div>
        </div>
        <in-out-box :list="rightList" v-model="rightSelection"></in-out-box>
    </div>
</template>

<script>
    import InOutBox from "./in-out-selector/InOutBox"
    export default {
        name: "in-out-selector",
        data() {
            return {                
                leftSelection: {},
                rightSelection: {},
            }
        },
        components: {
            "in-out-box": InOutBox
        },        
        props: {            
            leftList: {
                type: Array,
                default: []
            },
            rightList: {
                type: Array,
                default: []
            }
        },
        beforeCreate() {
            // Here I should conver array in object form
            // based on some configuration
            // Only then pass to child components
        },
        methods: {
            move (to) {
                // this.leftList.reverse()
                // this.leftList.splice(0, 1)
                console.log("Move to " + to);                
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