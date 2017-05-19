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
                :key="item[valueField]"
                v-model="value"
            ></in-out-card>          
        </div>        
    </div>
</template>

<script>
    import InOutCard from "./InOutCard"
    export default {
        inject: ["valueField"],
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
                me.clear();
                if (e.target.checked)
                    for (var i = 0; i < me.list.length; i += 1) {
                        var item = me.list[i];
                        me.value.push(item[me.valueField]);
                    }     
            }
        },
        components: {
            "in-out-card": InOutCard
        },
        computed: {
            checkAll() {
                return this.list.length > 0 && this.list.length === this.value.length;
            }
        },
        watch: {           
            searchText(newVal, oldVal) {
                this.clear();
            }
        }        
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