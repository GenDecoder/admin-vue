<template>
    <div> 
    <in-out-selector :left-list="availablePermissions" :right-list="selectedPermissions"></in-out-selector>    
    </div>
</template>

<script>
    import lifeCycle from '@/mixins/lifeCycle'
    export default {
        mixins: [
            lifeCycle
        ],
        data() {
            return {
                availablePermissions: [],
                selectedPermissions: []
            }
        },
        created() {
            var me = this;
            me.availablePermissions.push({
                id: 1,
                name: "User Management"
            }, {
                id: 2,
                name: "Dealer Management"
            });
            // me.selectedPermissions.push({
            //     id: 2,
            //     name: "Dealer Management"
            // });
        }
    }
</script>