<script>
    const me = {        
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
        onGroupFocused (e) {
            var groupEl = e.target;
            var firstChild = groupEl.querySelector("button"); // button pased to directive as tagEl for children
            // SIEMPRE VERIFICAR EL TAGNAME FOR CILDREN
            firstChild && firstChild.focus();
            this.lastKeyEvent = "focus";
            this.backing = false;
        },
        onKeyDown (e) {    
            console.log("ENTRO A DOWN") 
            var next = me.findNext(e.target, "nextSibling", "offsetLeft");
            if (e.keyCode === 40) {
                !e.shiftKey && next && next.focus();
                if (!e.shiftKey) this.lastKeyEvent = "down";
            }      
            
        },
        
        onUp (e) {
            var next = this.findNext(e.target, "previousSibling", "offsetLeft");
            !e.shiftKey && next && next.focus();   
            if (!e.shiftKey) this.lastKeyEvent = "up";            
        }, 
    };
    export default {
        bind (groupElement) {
            groupElement.tabindex = 0;
            groupElement.addEventListener("focus", me.onGroupFocused);
            groupElement.addEventListener("keydown", me.onKeyDown);
            console.log("UX UI DIRECTIVE ")
        }
    }
</script>