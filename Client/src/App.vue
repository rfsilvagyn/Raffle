<template>
  <div class="container">

    <div class="row">

      <div class="col" style="margin-top: 20px">
        <h6 v-for="item in prizes" :key="item.id">
          <span class="badge bg-secondary">{{ item.sequence }}º</span> {{ item.name }}
        </h6>
      </div>

      <div class="col" style="margin-top: 10px">
        <img src="./assets/02.jpg" style="width:400px">
      </div>

      <div class="col" style="margin: auto">
        <span class="badge bg-secondary">{{ today }}</span>
      </div>

    </div>

    <hr>

    <div class="row" v-if="result">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">Parabéns</h3>
          <p class="card-text">Sr(a) {{ result.name }}</p>
        </div>
      </div>
    </div>

    <hr>

    <div class="row">
      <button @click="raffle()" type="button" class="btn btn-success">Sortear</button>
    </div>

    <hr>

    <div class="row" v-if="historic">
      <div class="card">
        <div class="card-body">
          <li v-for="item in historic" :key="item.id">
            {{ item.name }}
          </li>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"
const BASE_URL = import.meta.env.VITE_APP_URL

export default {
  data() {
    return {
      result: '',
      historic: [],
      prizes: '',
      today: new Date().toLocaleDateString(),
      prizesLength: '',
      raffled: 0
    }
  },

  created() {
    this.getPrizes()
  },

  methods: {

    raffle() {
      if (this.raffled < this.prizesLength) {
        axios.get(`${BASE_URL}/raffle`, {})
          .then((response) => {
            this.result = response.data
            this.historic.push(response.data)
            this.raffled = this.raffled + 1
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('Obrigado a todos, fim do sorteio!')
      }
    },

    getPrizes() {
      axios.get(`${BASE_URL}/prizes`, {})
        .then((response) => {
          this.prizes = response.data
          this.prizesLength = this.prizes.length
        })
        .catch((error) => {
          console.log(error)
        })
    },

  },
}
</script>

<styles>
</styles>