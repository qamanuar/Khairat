<template>
  <section class="py-10 px-4 bg-gradient-to-br from-emerald-50 to-emerald-100 min-h-screen">
    <div class="max-w-5xl mx-auto space-y-8">
      <!-- Top Bar -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-extrabold text-emerald-700">
          Sistem Khairat Kematian
        </h1>
      </div>

      <!-- User Info -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-emerald-700 mb-4">Maklumat Pengguna</h2>
        <p><strong>Nama:</strong> {{ user.name || '-' }}</p>
        <p><strong>No. IC:</strong> {{ user.ic_number || '-' }}</p>
        <p><strong>Email:</strong> {{ user.email || '-' }}</p>
      </div>

      <!-- Outstanding Balance -->
      <div class="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-bold text-emerald-700">Baki Tertunggak</h2>
          <p class="text-2xl font-extrabold text-emerald-600">
            RM {{ outstanding.toFixed(2) }}
          </p>
        </div>
        <router-link
          to="/payment"
          class="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Buat Bayaran
        </router-link>
      </div>

      <!-- Transaction History -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-emerald-700 mb-4">Sejarah Transaksi</h2>

        <div v-if="transactions.length === 0" class="text-gray-500">
          Tiada transaksi setakat ini.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-emerald-100 text-emerald-700">
              <tr>
                <th class="px-4 py-2 text-left">Tarikh</th>
                <th class="px-4 py-2 text-left">Jumlah</th>
                <th class="px-4 py-2 text-left">Kaedah</th>
                <th class="px-4 py-2 text-left">Status</th>
                <th class="px-4 py-2 text-left">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="t in transactions"
                :key="t.id"
                class="hover:bg-gray-50 border-b"
              >
                <td class="px-4 py-2">{{ formatDate(t.created_at) }}</td>
                <td class="px-4 py-2">RM {{ t.amount.toFixed(2) }}</td>
                <td class="px-4 py-2">{{ t.method }}</td>
                <td class="px-4 py-2">{{ t.status }}</td>
                <td class="px-4 py-2">
                  <button
                    @click="printReceipt(t)"
                    class="text-emerald-600 hover:text-emerald-800 underline"
                  >
                    Cetak Resit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../client/supabase'

const router = useRouter()

// 🧍 User & Data States
const user = ref({})
const outstanding = ref(0)
const transactions = ref([])

// 🧠 Load user data on mount
onMounted(async () => {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) {
    router.push('/login')
    return
  }

  const authUser = session.session.user

  // 1️⃣ Fetch user info from `users` table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authUser.id)
    .single()

  if (userError || !userData) {
    console.error('User not found in users table:', userError)
    return
  }

  user.value = userData

  // 2️⃣ Fetch outstanding balance from `accounts`
  const { data: accountData } = await supabase
    .from('accounts')
    .select('outstanding_bal')
    .eq('ic_number', userData.ic_number)
    .single()

  outstanding.value = accountData?.outstanding_bal ?? 0

  // 3️⃣ Fetch transactions from `transactions`
  const { data: transData } = await supabase
    .from('transactions')
    .select('*')
    .eq('ic_number', userData.ic_number)
    .order('created_at', { ascending: false })

  transactions.value = transData || []
})

// 🧾 Format date for table
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('ms-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 🖨 Print Receipt
function printReceipt(transaction) {
  const printWindow = window.open('', '_blank')
  const html =
    '<html>' +
    '<head>' +
    '<title>Resit Pembayaran</title>' +
    '<style>' +
    'body { font-family: sans-serif; padding: 20px; }' +
    'h1 { color: #047857; text-align: center; }' +
    'hr { margin: 20px 0; }' +
    'table { width: 100%; margin-top: 10px; }' +
    'td { padding: 4px 0; }' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<h1>Resit Pembayaran</h1>' +
    '<p><strong>Nama:</strong> ' + user.value.name + '</p>' +
    '<p><strong>No. IC:</strong> ' + user.value.ic_number + '</p>' +
    '<hr>' +
    '<table>' +
    '<tr><td><strong>Tarikh</strong></td><td>' + formatDate(transaction.created_at) + '</td></tr>' +
    '<tr><td><strong>Jumlah</strong></td><td>RM ' + transaction.amount.toFixed(2) + '</td></tr>' +
    '<tr><td><strong>Kaedah</strong></td><td>' + transaction.method + '</td></tr>' +
    '<tr><td><strong>Status</strong></td><td>' + transaction.status + '</td></tr>' +
    '</table>' +
    '<hr>' +
    '<p style="text-align:center">Terima kasih atas pembayaran anda.</p>' +
    '<script>window.print();<\/script>' +
    '</body>' +
    '</html>'

  printWindow.document.write(html)
  printWindow.document.close()
}

// 🚪 Logout
async function logout() {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>
