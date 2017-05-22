<template>
    <div class="in-out-box">        
        <input type="checkbox" v-model="isCheckAll" @change="checkUnCheckAll" :disabled="state.disabled || !listSize">
        <input type="text" placeholder="Search" v-model="searchValue">
        <!-- ADD A CLICK AND AN STOP PROPAGATION, WHEN THE ITEM WAS JUST MOVED -->
        <!--add ket events to the list-->

        <div 
            class="list"
            v-ux-ui
            @keydown.up="onUp"
            @keydown.down="onDown"

            
            @keydown.shift.down="onSDD"
            @keydown.shift.up="onSUD"

            @click="lastKeyEvent = ''"

            @focus="onListFocused"

            :tabindex="listSize ? 0 : -1"
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
                listSize: this.list.length,

                lastKeyEvent: "",
                backing: false,
                base: null
            };
        },
        methods: {
            findNext (current, where, comparator) {
                var next;
                var size = 10;
                while(!next && size --) {
                    var next = current[where];
                    if (!next || current[comparator] !== next[comparator])
                        next = false;
                }
                return next;
            },           
            onDown (e) {
                var next = this.findNext(e.target, "nextSibling", "offsetLeft");
                !e.shiftKey && next && next.focus();
                if (!e.shiftKey) this.lastKeyEvent = "down";
            },
            onUp (e) {
                var next = this.findNext(e.target, "previousSibling", "offsetLeft");
                !e.shiftKey && next && next.focus();   
                if (!e.shiftKey) this.lastKeyEvent = "up";            
            },          
            onSDD (e) {
                var me = this;          
                var current = e.target;
                var currentSelected = current.className.indexOf("selected") !== -1;
                var next = this.findNext(current, "nextSibling", "offsetLeft");   
                if (me.lastKeyEvent != "ctrl+down") {
                    if (me.lastKeyEvent === "ctrl+up") {
                        console.log("CHANGE DIR DETECTED");
                        me.backing = !me.backing;
                    } else 
                        me.backing = false;
                }
                if (["ctrl+down", "ctrl+up"].indexOf(me.lastKeyEvent) == -1) {
                    console.log("NEW BASE");
                    me.base = current;
                }
                me.baseShift(current, currentSelected, next);
                me.lastKeyEvent = "ctrl+down";     
            },
            onSUD (e) {
                var me = this;
                var current = e.target;
                var currentSelected = current.className.indexOf("selected") !== -1;
                var next = this.findNext(current, "previousSibling", "offsetLeft");
                if (me.lastKeyEvent != "ctrl+up") {
                    if (me.lastKeyEvent === "ctrl+down") {
                        console.log("CHANGE DIR DETECTED");
                        me.backing = !me.backing;
                    } else 
                        me.backing = false;
                }
                if (["ctrl+down", "ctrl+up"].indexOf(me.lastKeyEvent) == -1) {
                    console.log("NEW BASE");
                    me.base = current;
                }
                me.baseShift(current, currentSelected, next);
                me.lastKeyEvent = "ctrl+up";                
            },
            baseShift(current, currentSelected, next) {
                var me = this;
                var nextSelected = next ? next.className.indexOf("selected") !== -1 : false;
                // FORWARD
                if (!me.backing && !currentSelected) { current.click(); return; }
                if (!me.backing && currentSelected && nextSelected) { next && next.focus(); return; }
                if (!me.backing && currentSelected) { next && next.focus(); next && next.click(); return; }
                // BACKING
                if (me.backing && currentSelected && current == me.base && nextSelected) { next.focus(); me.backing = false; return; }
                if (me.backing && currentSelected && current == me.base && !next) { current.click(); /*me.backing = false;*/ return; }
                if (me.backing && currentSelected && current == me.base) { next && next.focus(); next && next.click(); me.backing = false; return; }
                if (me.backing && currentSelected) { current.click(); next && next.focus(); return; }
            },

            onListFocused (e) {
                var me = this;
                var el = e.target;
                var firstChild = el.querySelector("button"); // button pased to directive as tagEl for children
                // SIEMPRE VERIFICAR EL TAGNAME FOR CILDREN
                firstChild && firstChild.focus();                

                me.lastKeyEvent = "focus";
                me.backing = false;
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
        .list {
            height: 200px;
            max-height: 200px;
            border: solid 1px;
            overflow-y: auto;           
        }
    }
</style>