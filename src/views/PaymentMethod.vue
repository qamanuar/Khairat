<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
    <h2 class="text-lg font-bold mb-4">4. Butiran Sumbangan</h2>

    <!-- Payment Methods -->
    <div class="space-y-4">
      <!-- Online Banking -->
      <label
        class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
      >
        <input
          type="radio"
          value="online"
          v-model="selectedMethod"
          class="mt-1"
        />
        <div>
          <div class="flex items-center gap-2">
            <img src="https://www.onlinepaymentplatform.com/logo.png" alt="" class="h-6">
            <span class="font-semibold">Online Banking (Malaysia)</span>
          </div>
          <p class="text-sm text-gray-600 mt-1">
            Caj perkhidmatan peniaga akan dikenakan sebanyak <strong>RM 1.50</strong> untuk setiap transaksi yang berjaya.
          </p>
        </div>
      </label>

      <!-- Show bank selection if 'online' selected -->
      <div v-if="selectedMethod === 'online'" class="ml-8 mt-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Pilih bank</label>
        <select
          v-model="selectedBank"
          class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Pilih bank...</option>
          <option v-for="bank in banks" :key="bank" :value="bank">
            {{ bank }}
          </option>
        </select>
      </div>

      <!-- Debit/Credit Card -->
      <label
        class="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
      >
        <input
          type="radio"
          value="card"
          v-model="selectedMethod"
          class="mt-1"
        />
        <div>
          <div class="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Credit_card_font_awesome.svg" alt="" class="h-5">
            <span class="font-semibold">Debit Card / Credit Card (International)</span>
          </div>
          <p class="text-sm text-gray-600 mt-1">
            Caj perkhidmatan akan dikenakan sebanyak <strong>3.00% (RM 0.30)</strong> untuk setiap transaksi yang berjaya.
          </p>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('')
const selectedBank = ref('')

const banks = [
  'Alliance Bank',
  'Affin Bank',
  'AmBank',
  'CIMB Clicks',
  'Bank Islam',
  'Bank Rakyat',
  'Bank Muamalat',
  'BSN',
  'Hong Leong Bank',
  'HSBC Bank',
  'Kuwait Finance House',
  'Maybank2u',
  'OCBC Bank',
  'Public Bank',
  'RHB Now',
  'Standard Chartered',
  'UOB Bank',
]
</script>
