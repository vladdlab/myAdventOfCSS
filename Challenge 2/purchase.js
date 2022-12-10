export default {
  props: ['purchase'],
  emits: ['purchase:remove'],

  data() {
    return {
      formatterUSD: new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 3,
        style: 'currency',
        currency: 'USD'
      }),
    }
  },

  methods: {
    add() {
      this.purchase.amount += 1;
    },

    reduce() {
      this.purchase.amount -= 1;
      if (this.purchase.amount <= 0) this.$emit('purchase:remove', this.purchase.id);
    }
  },

  computed: {
    total() {
      return this.formatterUSD.format(this.purchase.price * this.purchase.amount);
    }
  },

  template: `
  <li class="purchase">
  <div class="purchase__image-wrapper">
    <img class="purchase__image" :src="purchase.imageUrl" width="64" height="64" :alt="purchase.name">
    <div class="purchase__amount">{{ purchase.amount }}</div>
  </div>
  <div class="purchase__info">
    <h3 class="purchase__name">{{ purchase.name }}</h3>
    <p class="purchase__price">\${{ purchase.price }}</p>
  </div>
  <div class="purchase__controls controls">
    <button class="controls__btn controls__btn--down" @click="reduce"></button>
    <p class="controls__value">{{ purchase.amount }}</p>
    <button class="controls__btn controls__btn--up" @click="add"></button>
  </div>
  <div class="purchase__total">{{ total }}</div>
</li>`
}
