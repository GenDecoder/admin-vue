<template>
    <div class="in-out-box">        
        <input type="checkbox" v-model="checkAll" @change="checkUnCheckAll" :disabled="!list.length">
        <input type="text" placeholder="Search" v-model="searchText">
        <!--add ket events to the list-->
        <!--as well add sort functionality-->
        <div class="list">           
            <in-out-card
                v-for="item of list"
                :item="item"
                v-model="value"
                :key="item[valueField]"
                :searchText="searchText"
                @adjustSize="adjustSize"
            ></in-out-card>          
        </div>        
    </div>
</template>

<script>
    import InOutCard from "./InOutCard"
    export default {
        inject: ["valueField", "displayField"],
        props: {
            value: {
                type: Array,
                default: []
            },
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                size: 0,
                searchText: ""
            }
        },
        methods: {
            clear() {
                // BEST WAY TO CLEAN ARRAY IN VUE (DOES NOT AFFECT THE COMPUTED)
                this.value.splice(0, this.value.length);
            },
            checkUnCheckAll(e) {
                var me = this;
                var i;
                me.clear();
                if (e.target.checked)
                    for (i = 0; i < me.list.length; i += 1) 
                        me.value.push(me.list[i][me.valueField]);
            },
            adjustSize(plus) {
                var me = this;
                me.size += plus;
                console.log(plus)
            }
        },
        components: {
            "in-out-card": InOutCard
        },
        computed: {
            checkAll() {
                return this.size > 0 && this.size === this.value.length;
            }
        },
        // watch: {           
        //     searchText(newVal, oldVal) {
        //         var me = this;
        //         me.clear();
        //         me.list.filter(item => {
        //             console.log(item);
        //             return item[me.displayField].toLowerCase().indexOf(newVal.toLowerCase()) > -1
        //         })
        //     }
        // }        
    }
</script>

<style lang="scss" rel="stylesheet"> 
    .in-out-box {
        width: 100%;
        // border: solid 1px;
        input {
            width: 100%;
        }
        .list {
            // border: solid 1px;           
        }
    }
</style>