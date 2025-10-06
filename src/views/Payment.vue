<template>
  <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
    <h1 class="text-3xl font-bold text-emerald-600 text-center">💵 Payment Page</h1>
    <p class="mt-4 text-gray-700 text-center">
      Please fill in your details to make a contribution or settle payments.
    </p>

    <form class="mt-6 space-y-4">
      <div>
        <label class="block text-left font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label class="block text-left font-medium text-gray-700">Amount (RM)</label>
        <input 
          type="number" 
          class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          placeholder="Enter amount"
        />
      </div>

      <button 
        type="submit"
        class="w-full mt-4 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition duration-200"
      >
        Submit Payment
      </button>
    </form>
  </div>
</template>
