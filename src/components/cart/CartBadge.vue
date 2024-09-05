<script setup>
const props = defineProps({
  totalAmount: {
    type: Number,
    default: 0,
    required: true
  },
  cartCounterColor: {
    type: String,
    default: '#FFEB3B',
    required: false
  },
  cartIconColor: {
    type: String,
    default: '#00005F',
    required: false
  }
})

defineEmits(['onClick'])
</script>

<template>
  <div class="cart-badge-container">
    <v-badge
      :content="props.totalAmount"
      class="ma-auto cursor-pointer"
      :color="props.cartCounterColor"
      @click="$emit('onClick')"
    >
      <v-icon
        :color="props.cartIconColor"
        icon="mdi-cart"
        size="x-large"
      ></v-icon>
    </v-badge>
  </div>
</template>

<style scoped>
.cart-badge-container {
  display: flex;
  width: 7rem;
}
</style>