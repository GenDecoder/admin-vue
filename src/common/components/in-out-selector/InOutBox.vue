<template>
    <div class="in-out-box">        
        <input type="checkbox" v-model="isCheckAll" @change="checkUnCheckAll" :disabled="state.disabled || !listSize">
        <input type="text" placeholder="Search" v-model="searchValue">
        <!-- ADD A CLICK AND AN STOP PROPAGATION, WHEN THE ITEM WAS JUST MOVED -->
        <!--add ket events to the list-->

        <div class="list" tabindex="0"  @keyup.down="onDown" @keyup.up="onUp" @focus="onListFocused">
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
                position: 0, // 
                searchValue: "",
                listSize: this.list.length
            };
        },
        methods: {
            focusCard (callback) {
                var me = this;
                var element;
                var listEl = this.$el.querySelector(".list");
                var children = listEl.querySelectorAll("button");


                function HELLO(callback) {
                    setTimeout(function() {
                        callback("hello")
                    }, 1000);                    
                }

                function WORLD(callback) {
                    setTimeout(function() {
                        callback("world")
                    }, 1000);
                    
                }

                function onClick (e) {
                    var text = "";
                     function textFn(a) {
                        text = text + " " + a;
                    }

                    HELLO(textFn);
                    WORLD(textFn);
                    // var target = e.target;
                    console.log(text)
                }


                var index = children.length;
                while (!element) { // index --
                    typeof callback === "function" && callback();                    
                    element = children[me.position];
                }
                element && element.focus();
            },
            onDown () {
                var me = this;
                me.focusCard( () => {
                    me.position += 1;
                    if (me.position === me.listSize) me.position = 0;
                } );
            },
            onUp () {
                var me = this;
                me.focusCard( () => {
                    me.position -= 1;
                    if (me.position < 0) me.position = me.listSize - 1;
                } );
            },
            onListFocused () {
                var me = this;
                me.position = 0
                me.focusCard();
            },
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
        // .list {
        //     border: solid 1px;           
        // }
    }
</style>