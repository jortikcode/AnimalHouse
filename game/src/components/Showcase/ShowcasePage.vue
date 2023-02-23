<template>
<div class="flex flex-col items-center mt-12 gap-y-12" v-show="!this.loading && this.products.length > 0 && this.services.length > 0">
    <header class="flex flex-col justify-center items-center gap-y-2">
        <h1
        class="font-semibold tracking-tighter text-center text-3xl text-black rounded-full bg-green-400 w-fit mx-auto p-3"
        >
        Vetrina di AnimalHouse
        </h1>
        <a class="underline bg-green-400 p-2" :href="frontofficeUrl"> Clicca qui per andare al portale </a>
    </header>
    <h2
      class="font-semibold tracking-tighter text-center text-2xl text-black rounded-full w-fit mx-auto p-3"
    >
      Prodotti in vendita
    </h2>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-x-4 px-2 gap-y-4">
        <ProductCard v-for="product of products" :key="product._id" v-bind="product" type="product" />
    </div>
    <h3
      class="font-semibold tracking-tighter text-center text-2xl text-black rounded-full w-fit mx-auto p-3"
    >
      Servizi a disposizione
    </h3>
    <div class="grid md:grid-cols-3 grid-cols-1 gap-x-4 px-2 gap-y-4">
        <ProductCard v-for="service of services" :key="service._id" v-bind="service" :name="service.serviceName" type="service" />
    </div>
</div>
<div class="flex flex-col items-center gap-y-2 mt-12" v-show="this.loading">
      <PacmanLoader color="#ff2a99" />
      <small class="font-bold"> Ottenendo servizi e prodotti... </small>
</div>
</template>
<script>
import { getShowcaseProducts, getShowcaseServices } from '../../common/showcase';
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import ProductCard from './ProductCard.vue';

const productsLimit = 3
const servicesLimit = 3

export default{
    name: "ShowcasePage",
    components: {
        PacmanLoader,
        ProductCard
    },
    async mounted() {
        this.products = await getShowcaseProducts(productsLimit)
        this.services = await getShowcaseServices(servicesLimit)
        this.loading = false
    },
    computed: {
        frontofficeUrl() {
            return import.meta.env.VITE_BASE_URL + "/frontoffice"
        }
    },
    data: () => {
        return {
            products: [],
            services: [],
            loading: true
        };
    },
}
</script>
