<template>
    <div> 
    <in-out-selector
        v-model="selectedPermissionIds"
        :disabled="disabled"
        :list="permissions"
        value-field="id"
        display-field="name"
    ></in-out-selector>   

    <h1>{{ selectedPermissionIds }}</h1>

    <input type="checkbox" v-model="disabled">

    </div>
</template>
<script>
    import lifeCycle from '@/mixins/lifeCycle'
    export default {
        mixins: [
            lifeCycle
        ],
        data () {
            return {
                disabled: false,
                permissions: [],
                selectedPermissionIds: []
            }
        },
        created () {
            var me = this;
            me.permissions.push({
                id: 1,
                name: "User Management"
            }, {
                id: 2,
                name: "Dealer Management"
            }, {
                id: 3,
                name: "ZZZZ"
            }, {
                id: 4,
                name: "01023"
            });
            me.selectedPermissionIds.push(1);
            me.selectedPermissionIds.push(2);
            setTimeout(function() {
                me.permissions.push({
                    id: 3,
                    name: "DELAYED"
                });
            }, 1000);
        }
    }
</script>