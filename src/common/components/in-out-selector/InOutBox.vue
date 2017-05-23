<template>
    <div class="in-out-box">        
        <input type="checkbox" v-model="isCheckAll" @change="checkUnCheckAll" :disabled="state.disabled || !listSize">
        <input type="text" placeholder="Search" v-model="searchValue">
        <!-- ADD A CLICK AND AN STOP PROPAGATION, WHEN THE ITEM WAS JUST MOVED -->
        <!--add ket events to the list-->

        <div 
            class="list"
            v-ux-ui="'button'"
        >
            <in-out-card
                v-for="item of list"
                :item="item"
                :selection="selection"
                :key="item[valueField]"
                :searchValue="searchValue"
                @adjustSize="plus => { listSize += plus }"
            ></in-out-card>          
        </div>   
    </div>
</template>
<script>
    import InOutCard from "./InOutCard"
    export default {
        inject: ["state", "valueField", "displayField"],       
        props: {
            selection: {
                type: Array,
                default: []
            },
            list: {
                type: Array,
                default: []
            }
        },
        data () {
            var me = this;
            return {
                searchValue: "",
                listSize: this.list.length
            };
        },
        methods: {
            cleanSelection () {
                var me = this;
                // BEST WAY TO CLEAN ARRAY IN VUE (DOES NOT AFFECT THE COMPUTED)
                me.selection.splice(0, me.selection.length);
            },
            checkUnCheckAll (e) {
                var me = this;
                var index = me.list.length;
                me.cleanSelection();
                if (e.target.checked)
                    while (index --)
                        me.selection.push(me.list[index][me.valueField]);
            }          
        },
        components: {
            "in-out-card": InOutCard
        },
        computed: {          
            isCheckAll () {
                var me = this;                
                return !!me.listSize && me.listSize === me.selection.length;
            }
        },      
        watch: {
            list (newVal, oldVal) {
                var me = this;
                me.searchValue = "";                
                me.listSize = newVal.length;
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
            height: 30px;
            outline: none;
            padding: 0 5px;
            letter-spacing: 2px;
            &:focus {
                border-color: red;
            }
        }
        .list {
            height: 200px;
            max-height: 200px;
            border: solid 1px;
            overflow-y: auto;           
        }
    }
</style>