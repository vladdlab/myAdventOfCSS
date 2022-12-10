export default {
  props: ['dish'],
  emits: ['purchase:add'],

  methods: {
    addToCart() {
      if (this.isInCard) return;
      this.dish.amount = 1;
      this.$emit('purchase:add', this.dish);
    },

    reduce() {
      this.purchase.amount -= 1;
      if (this.purchase.amount <= 0) this.$emit('purchase:remove', this.purchase.id);
    }
  },

  computed: {
    isInCard() {
      return this.dish.amount > 0;
    }
  },

  template: `
  <li class="dish">
    <img class="dish__image" :src="dish.imageUrl" width="150" height="146" :alt="dish.name">
    <div class="dish__info">
      <h3 class="dish__name">{{ dish.name }}</h3>
      <p class="dish__price">\${{ dish.price }}</p>
      <button class="dish__btn cart-btn" :class="{ 'cart-btn--active': isInCard }" @click="addToCart">
        <span class="cart-btn__add-to-cart">Add to Cart</span>
        <span class="cart-btn__in-cart">In Cart</span>
      </button>
    </div>
  </li>`
}
