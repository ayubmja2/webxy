<script setup>
import { loadStripe } from "@stripe/stripe-js";
import { usePage } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";

const stripe = ref(null);
const elements = ref(null);
const { props } = usePage();
let clientSecret = props.clientSecret;

onMounted(async () => {
    stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

    if (!stripe.value) {
        console.error('Stripe failed to initialize.');
        return;
    }

    const appearance = {
        theme: 'flat',
        variables: {colorPrimaryText: '#262626'}
    };

    elements.value = stripe.value.elements({clientSecret, appearance});

    const paymentElement = elements.value.create("payment");
    paymentElement.mount('#payment-element');
});

async function submitPayment() {
    const {paymentIntent, error} = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
            return_url: window.location.origin + "/payment-success", // Redirect URL after successful payment
        },
    });

    if (error) {
        // Handle error, for example, by displaying it to the user
        console.error("Payment failed:", error.message);
        alert("Payment failed: " + error.message);
    }else {
        await axios.post('/process-checkout', {
            payment_intent_id: paymentIntent.id,
        })
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <form id="payment-form" @submit.prevent="submitPayment">
                <div id="payment-element"></div>
                <button id="submit" type="submit"
                        class="btn-primary w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md">
                    Pay $20.00
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
