<script>
    var findNext = (current, where, comparator) => {
        var me = this;
        var next;
        var size = 10;
        // console.log(me.querySelectorAll("button"))
        while(!next && size --) {
            var next = current[where];
            if (!next || current[comparator] !== next[comparator])
                next = false;
        }
        return next;
    }    
    var onKeyDown = (e) => {
        var me = this;
        var currentEl = e.target;
        var keyMap = { "37": "left", "38": "up", "39": "right", "40": "down" };
        var keyName = keyMap[e.keyCode];
        var oppositeKeyName = { "left": "right", "up": "down", "right": "left", "down": "up" }[keyName];        
        var nextEl = findNext(
            currentEl,
            ["right", "down"].indexOf(keyName) !== -1 ? "nextSibling" : "previousSibling",
            ["up", "down"].indexOf(keyName) !== -1 ? "offsetLeft" : "offsetTop"
        );
        if (keyName)
            if (e.shiftKey) {
                if (me.lastKeyEvent !== "shift+" + keyName)
                    me.backing = me.lastKeyEvent === "shift+" + oppositeKeyName ? !me.backing : false;        
                if (["shift+down", "shift+up"].indexOf(me.lastKeyEvent) === -1)
                    me.base = currentEl;
                baseShift(currentEl, nextEl);
                me.lastKeyEvent = "shift+" + keyName;
            } else {
               nextEl && nextEl.focus();
               me.lastKeyEvent = keyName;
            }
    }
    var baseShift = (current, next) => {
        var me = this;
        var nextSelected = next ? next.className.indexOf("selected") !== -1 : false;
        var currentSelected = current ? current.className.indexOf("selected") !== -1 : false;
        // FORWARD
        if (!me.backing && !currentSelected) { current.click(); }
        else if (!me.backing && currentSelected && nextSelected) { next.focus(); }
        else if (!me.backing && currentSelected && next) { next.focus(); next.click(); }
        // BACKING
        else if (me.backing && currentSelected && current == me.base && !next) { current.click(); }
        else if (me.backing && currentSelected && current == me.base && nextSelected) { next.focus(); me.backing = false; }
        else if (me.backing && currentSelected && current == me.base && !nextSelected && next) { next.focus(); next.click(); me.backing = false; }
        else if (me.backing && currentSelected) { current.click(); next && next.focus(); }
    }
    var onClick = () => {
        this.lastKeyEvent = ""
    }
    export default {
        bind (el, binding) {          
            console.log("INITIAL");
            el.backing = false;
            el.lastKeyEvent = "";

            // var children = el.querySelectorAll(binding.value);
            var firstChild = el.querySelector(binding.value);
            firstChild && firstChild.setAttribute("tabindex", 0);

            // el.addEventListener("focus", onGroupFocused);
            el.addEventListener("keydown", onKeyDown);
            el.addEventListener("click", onClick);
        },
        update (el, binding) {
            console.log("UPDATED")
            // var i = 0;
            // var child;
            // var children = el.querySelectorAll(binding.value);
            var firstChild = el.querySelector(binding.value);
            firstChild && firstChild.setAttribute("tabindex", 0);
            // for (; i < children.length; i += 1) {
            //     child = children[i];
            //     console.log(child);
            //     child.addEventListener("DOMNodeRemoved", function() {
            //         console.log("removed")
            //     })
            // }
        }        
    }
</script>