<template>
    <div> 
    <in-out-selector
        :list="permissions"
        :selection="selectedPermissionIds"
        value-field="id"
        display-field="name"
        :disabled="true"
    ></in-out-selector>    
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
                permissions: [],
                selectedPermissionIds: []
            }
        },
        created() {
            var me = this;
            me.permissions.push({
                id: 1,
                name: "User Management"
            }, {
                id: 2,
                name: "Dealer Management"
            });
            me.selectedPermissionIds.push(1);
            me.selectedPermissionIds.push(2);
            setTimeout(function() {
                me.permissions.push({
                    id: 3,
                    name: "DELAYED"
                });
            }, 0);
        }
    }
</script>