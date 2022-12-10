import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const formatterUSD = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 3,
  style: 'currency',
  currency: 'USD'
});

const store = reactive({
  purchases: [],

  addPurchase(dish) {
    this.purchases.push(dish);
  },

  removePurchase(id) {
    let index = this.purchases.findIndex(p => p.id === id);
    this.purchases.splice(index, 1);
  }
})

function Dish(props) {
  return {
    dish: props.dish,

    get isInCard() {
      return this.dish.amount > 0;
    },

    get price() {
      return formatterUSD.format(this.dish.price);
    },

    addToCart() {
      if (this.isInCard) return;
      this.dish.amount = 1;
      store.addPurchase(this.dish)
    },
  }
}

function Purchase(props) {
  return {
    purchase: props.purchase,

    get price() {
      return formatterUSD.format(this.purchase.price);
    },

    get total() {
      return formatterUSD.format(this.purchase.price * this.purchase.amount);
    },

    add() {
      this.purchase.amount += 1;
    },

    reduce() {
      this.purchase.amount -= 1;
      if (this.purchase.amount <= 0) store.removePurchase(this.purchase.id);
    }
  }
}

const app = createApp({
  store,
  Dish,
  Purchase,

  dishes: [
    {
      id: 1,
      name: 'French Fries with Ketchup',
      price: 2.23,
      amount: 0,
      imageUrl: './images/plate__french-fries.png'
    },
    {
      id: 2,
      name: 'Salmon and Vegetables',
      price: 5.12,
      amount: 0,
      imageUrl: './images/plate__salmon-vegetables.png'
    },
    {
      id: 3,
      name: 'Spaghetti with Sauce',
      price: 7.82,
      amount: 0,
      imageUrl: './images/plate__spaghetti-meat-sauce.png'
    },
    {
      id: 4,
      name: 'Bacon and Eggs',
      price: 1.23,
      amount: 0,
      imageUrl: './images/plate__bacon-eggs.png'
    },
    {
      id: 5,
      name: 'Chicken salad',
      price: 2.23,
      amount: 0,
      imageUrl: './images/plate__chicken-salad.png'
    },
    {
      id: 6,
      name: 'Fish sticks and Fries',
      price: 3.23,
      amount: 0,
      imageUrl: './images/plate__fish-sticks-fries.png'
    },
    {
      id: 7,
      name: 'Ravioli',
      price: 4.23,
      amount: 0,
      imageUrl: './images/plate__ravioli.png'
    },
    {
      id: 8,
      name: 'Tortellini',
      price: 5.23,
      amount: 0,
      imageUrl: './images/plate__tortellini.png'
    },
  ],

  get _subTotal() {
    return store.purchases.reduce((sum, purchase) => sum + (purchase.amount * purchase.price), 0);
  },
  get subTotal() {
    return formatterUSD.format(this._subTotal);
  },

  get _tax() {
    return this._subTotal * 0.0975;
  },
  get tax() {
    return formatterUSD.format(this._tax);
  },

  get _total() {
    return this._subTotal + this._tax;
  },
  get total() {
    return formatterUSD.format(this._total);
  },

  showSections() {
    const matches = document.querySelectorAll('.shop__section');
    matches.forEach(section => section.classList.remove('shop__section--loading'));
  }
})

app.mount('#app');
