<script>
import {loadStripe} from "@stripe/stripe-js";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";

import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";
const {props} = usePage();

export default {
    components: {AuthenticatedLayout},
    data() {
       return {
           stripe: null,
           card:null
       };
    },
    mounted() {
        console.log('Stripe Key:', this.props.stripeKey);
        this.initializeStripe();
    },
    methods: {
        async initializeStripe() {
            this.stripe = await loadStripe(this.props.stripeKey);
            if(!this.stripe){
                console.error('Failed to init stripe');
                return;
            }
            const elements = this.stripe.elements();
            this.card = elements.create('card');
            this.card.mount('#card-element');
        },
        async submitPayment() {
            const {paymentMethod, error} = await this.stripe.createPaymentMethod({
                type: 'card',
                card: this.card,
            });
            if(error) {
                console.log(error.message);
                return;
            }
            this.$inertia.post('/checkout', {
                payment_method: paymentMethod.id,
            });
        },
    },
};
</script>

<template>
    <AuthenticatedLayout>
        <form @submit.prevent="submitPayment">
            <div id="card-element"></div>
            <button type="submit" class="btn-primary">Pay $10.00</button>
        </form>
    </AuthenticatedLayout>
</template>

<style scoped>

</style>
