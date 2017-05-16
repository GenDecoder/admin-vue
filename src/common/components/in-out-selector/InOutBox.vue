<template>
    <div class="in-out-box">        
        <input type="checkbox" v-model="checkAll">
        <input type="text" placeholder="Search" v-model="searchText">
        <!--add ket events to the list-->
        <!--as well add sort functionality-->
        <div class="list">           
            <in-out-card v-for="item of list" :key="item.id" :item="item" v-model="value"></in-out-card>          
        </div>        
    </div>
</template>

<script>
    import InOutCard from "./InOutCard"
    export default {
        props: {
            value: {
                type: Object,
                default: {}
            },
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                searchText: "",
                checkAll: false
            }
        },
        components: {
            "in-out-card": InOutCard
        },
        // methods: {
        //     selected(item) {                
        //         item.selected = !item.selected
        //         this.$emit("input", "mario")
        //     }
        // },
        watch: {
            checkAll(newVal, oldVal) {
                
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" rel="stylesheet"> 
    .in-out-box {
        width: 100%;
        border: solid 1px;
        input {
            width: 100%;
        }
        .list {
            border: solid 1px;           
        }
    }
</style>