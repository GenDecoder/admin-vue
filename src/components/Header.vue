<template>
    <div>
        <span> {{ description }}</span>
        <input v-model="dealer" placeholder="Dealer">
        <input v-model="company" placeholder="Company">
        <button @click="logOut"> Log Out </button>
    </div>
</template>

<script>
    export default {        
        data() {
            return {
                dealer: "PORKY",
                company: "ACHUMANI"
            }
        },
        methods: {
            logOut() {
                console.log("Call Service");
                this.description = "EXODO"
            }
        },
        computed: {
            description () {
                return this.dealer + " " + this.company
            }
        }
    }
</script>