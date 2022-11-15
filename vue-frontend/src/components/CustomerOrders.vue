<script lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import axios from "axios";

interface IOrders {
  Order_name: string;
  Product: string;
  Company_name: string;
  Name: string;
  Created_at: string;
  Total_amount: number;
  Delivered_amount: number;
}

export default {
  components: { Datepicker },
  data() {
    const date = ref(new Date());

    const orders = [] as IOrders[];
    const keyword = "";

    return {
      date,
      orders,
      keyword,
    };
  },
  methods: {
    async fetchOrders() {
      await fetch(import.meta.env.VITE_BASE_URL + "/orders").then((res) =>
        res.json().then((res) => (this.orders = res.orders))
      );
      const response = await axios({
        url: `${import.meta.env.VITE_BASE_URL}/orders`,
        method: "get",
        params: {
          keyword: this.keyword,
          // startDate,
          // endDate,
          // offset: (currentPage - 1) * 5,
        },
      });
      this.orders = response.data.orders;
    },
  },

  async updated() {
    await this.fetchOrders();
  },
};
</script>

<template>
  <v-row>
    <v-col cols="1">
      <img
        src="https://uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png"
        alt="search"
        width="30"
        height="30"
      />
    </v-col>
    <v-col cols="11">
      <h2>Search</h2>
    </v-col>
  </v-row>
  <v-text-field variant="outlined" v-model="keyword" />
  <h6 class="text-h6">Created Date</h6>
  <v-row>
    <v-col :cols="3">
      <Datepicker
        v-model="date"
        :month-change-on-scroll="false"
        :range="true"
        :enable-time-picker="false"
        :no-today="true"
      />
    </v-col>
  </v-row>
  <v-table :height="450">
    <thead>
      <tr>
        <th class="text-left">Order name</th>
        <th class="text-left">Customer Company</th>
        <th class="text-left">Customer name</th>
        <th class="text-left">Order date</th>
        <th class="text-left">Delivered Amount</th>
        <th class="text-left">Total Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" v-bind:key="order.Total_amount">
        <td>
          <v-row>
            <v-col :cols="12">
              {{ order.Order_name }}
            </v-col>
            <v-col>
              {{ order.Product }}
            </v-col>
          </v-row>
        </td>
        <td>{{ order.Company_name }}</td>
        <td>{{ order.Name }}</td>
        <td>{{ order.Created_at }}</td>
        <td>${{ order.Delivered_amount }}</td>
        <td>${{ order.Total_amount }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
