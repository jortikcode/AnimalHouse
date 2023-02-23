<template>
    <div class="flex flex-col justify-between max-w-[300px] bg-pink-400 border-2 border-pink-400 rounded-lg overflow-hidden py-6 shadow-xl">
      <img class="p-3 overflow-hidden rounded-lg" :src="this.imgUrl" />
      <div class="p-4 bg-white">
        <p class="text-black font-bold text-2xl">{{ name }}</p>
        <p class="mt-2 text-black truncate">
          {{ description }}
        </p>
        <div class="flex item-center justify-between mt-3">
          <h1 class="text-black font-bold text-xl">€{{ price.toFixed(2) }}</h1>
          <a
            :href="this.productLink"
            class="px-3 py-2 bg-green-400 text-black text-xs font-bold uppercase rounded"
          >
            Dettagli
            </a>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: ["name", "imgName", "description", "_id", "price", "type"],
  name: "ProductCard",
  computed: {
    imgUrl(){
        return import.meta.env.VITE_BASE_MEDIA_URL + "/" + this.imgName
    },
    productLink(){
        if (this.type === "product")
          return import.meta.env.VITE_BASE_URL + "/frontoffice/marketplace/" + this._id
        else
          return import.meta.env.VITE_BASE_URL + "/frontoffice/services/" + this._id
    }
  }
};
</script>
