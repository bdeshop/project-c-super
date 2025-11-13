# Balance API Integration Summary

## ✅ Completed Integrations

### 1. MainWallet Component (`src/components/MainProfile/MainWallet.jsx`)

**Status:** ✅ INTEGRATED

**What was added:**

- Fetches real balance from `/api/users/balance` on component mount
- Shows actual balance, total deposits, and total withdrawals
- Refresh button fetches latest balance from API
- Displays balance breakdown when eye icon is clicked

**Features:**

- Real-time balance display: `৳{balance}`
- Total Deposit: Shows lifetime deposits
- Total Withdraw: Shows lifetime withdrawals
- Auto-refresh on mount
- Manual refresh with reload button

---

## 📋 Recommended Future Integrations

### 2. Deposit Page (`src/Pages/Deposit.jsx`)

**Status:** ⏳ PENDING

**Recommended Integration:**

```javascript
// After successful deposit transaction approval
const handleDepositApproval = async (transactionId, userId, amount) => {
  try {
    // 1. Approve the transaction in your transaction system
    await api.put(`/api/transactions/${transactionId}`, { status: "Approved" });

    // 2. Update user balance (Admin only)
    const response = await api.put(
      `/api/users/balance/${userId}`,
      {
        amount: amount,
        type: "deposit",
        description: `Deposit via transaction ${transactionId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    if (response.data.success) {
      console.log("✅ Balance updated:", response.data.data.balance);
      // Refresh balance display
    }
  } catch (error) {
    console.error("❌ Error updating balance:", error);
  }
};
```

**Where to use:**

- Admin panel when approving deposit transactions
- Automatically credit user balance after payment confirmation

---

### 3. Withdraw Page (Create if not exists)

**Status:** ⏳ PENDING

**Recommended Integration:**

```javascript
// When user requests withdrawal
const handleWithdrawRequest = async (amount) => {
  try {
    // 1. Check if user has sufficient balance
    const balanceResponse = await api.get("/api/users/balance", {
      headers: { Authorization: `Bearer ${userToken}` },
    });

    if (balanceResponse.data.data.balance < amount) {
      alert("Insufficient balance");
      return;
    }

    // 2. Create withdrawal transaction
    await api.post("/api/transactions", {
      amount: amount,
      transaction_type: "Withdraw",
      status: "Pending",
    });

    alert("Withdrawal request submitted");
  } catch (error) {
    console.error("Error:", error);
  }
};

// Admin approves withdrawal
const handleWithdrawApproval = async (transactionId, userId, amount) => {
  try {
    // 1. Deduct from user balance
    const response = await api.put(
      `/api/users/balance/${userId}`,
      {
        amount: amount,
        type: "withdraw",
        description: `Withdrawal via transaction ${transactionId}`,
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` },
      }
    );

    if (response.data.success) {
      // 2. Update transaction status
      await api.put(`/api/transactions/${transactionId}`, {
        status: "Approved",
      });

      console.log("✅ Withdrawal processed");
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
```

---

### 4. TopHeader Component (`src/components/Header/TopHeader.jsx`)

**Status:** ⏳ PENDING (Optional)

**Recommended Integration:**

```javascript
// Show balance in top header for quick access
const [balance, setBalance] = useState(null);

useEffect(() => {
  const fetchBalance = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const response = await axios.get(
      "http://localhost:8000/api/users/balance",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.data.success) {
      setBalance(response.data.data.balance);
    }
  };

  fetchBalance();

  // Refresh every 30 seconds
  const interval = setInterval(fetchBalance, 30000);
  return () => clearInterval(interval);
}, []);

// Display in header
<div className="balance-display">৳{balance?.toFixed(2) || "0.00"}</div>;
```

---

### 5. Transaction History Page

**Status:** ⏳ PENDING

**Recommended Integration:**

- Show balance changes alongside transaction history
- Display running balance after each transaction
- Link transactions to balance updates

---

## 🔄 Auto-Refresh Strategy

### Recommended Approach:

1. **On Mount:** Fetch balance when component loads
2. **After Transaction:** Refresh balance after deposit/withdraw
3. **Periodic Refresh:** Auto-refresh every 30-60 seconds
4. **Manual Refresh:** User can click reload button

### Implementation Example:

```javascript
// Auto-refresh balance every 30 seconds
useEffect(() => {
  const fetchBalance = async () => {
    // Fetch logic here
  };

  fetchBalance(); // Initial fetch

  const interval = setInterval(fetchBalance, 30000);

  return () => clearInterval(interval);
}, []);
```

---

## 🔐 Security Notes

✅ **User Balance Endpoint** (`GET /api/users/balance`)

- Users can only view their own balance
- Requires authentication (Bearer token)
- Safe to call from frontend

⚠️ **Admin Balance Update** (`PUT /api/users/balance/:id`)

- **ADMIN ONLY** - Never call from user-facing pages
- Only use in admin panel/dashboard
- Requires admin authentication

---

## 📊 Balance Display Best Practices

### 1. Show Balance Breakdown

```
Main Balance: ৳5,000
├─ Total Deposited: ৳10,000
└─ Total Withdrawn: ৳5,000
```

### 2. Real-time Updates

- Fetch on mount
- Refresh after transactions
- Auto-refresh periodically

### 3. Loading States

```javascript
{
  loading ? "..." : `৳${balance.toFixed(2)}`;
}
```

### 4. Error Handling

```javascript
try {
  // Fetch balance
} catch (error) {
  console.error("Error fetching balance:", error);
  // Show fallback or error message
}
```

---

## 🎯 Next Steps

1. ✅ **MainWallet** - DONE
2. ⏳ **Deposit Flow** - Integrate balance update after deposit approval
3. ⏳ **Withdraw Flow** - Create withdraw page with balance check
4. ⏳ **TopHeader** - Add balance display (optional)
5. ⏳ **Admin Panel** - Add balance management interface

---

## 📝 Notes

- The balance API is separate from the transaction API
- Transactions track history, balance tracks current state
- Always validate balance before withdrawals
- Only admins can modify balances
- Users can only view their own balance

---

## 🔗 API Endpoints Reference

| Endpoint                 | Method | Access | Purpose             |
| ------------------------ | ------ | ------ | ------------------- |
| `/api/users/balance`     | GET    | User   | Get own balance     |
| `/api/users/balance/:id` | PUT    | Admin  | Update user balance |

---

**Last Updated:** Now  
**Status:** MainWallet integrated, other components pending
