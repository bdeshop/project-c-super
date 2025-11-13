# Referral System Implementation

## Overview

This document describes the implementation of the referral system for the Khela88 platform. The system allows users to earn commissions by referring new users to the platform.

## Features Implemented

1. **Referral Code Capture**: New users can sign up using a referral code from the URL (`?ref=CODE`) or by entering it manually during registration.
2. **Automatic Transaction Creation**: When a new user signs up with a referral code, a referral transaction is automatically created.
3. **Commission Management**: Referrers earn commissions which are tracked in their account.
4. **Transaction Status Management**: Admins can approve and mark transactions as paid.
5. **Withdrawal System**: Users can withdraw their referral earnings.

## Components

### 1. Frontend Components

#### ReferralTransactions.jsx
Displays a list of referral transactions for the logged-in user.

#### WithdrawReferral.jsx
Allows users to withdraw their referral earnings.

#### ReferralTransactionManager.jsx
Admin interface for managing referral transactions (approve, mark as paid).

### 2. Hooks

#### useReferral.js
Custom hook that provides functions for managing referral data:
- `fetchReferralInfo()`: Get user's referral information
- `fetchReferralTransactions()`: Get user's referral transactions
- `withdrawReferralEarnings(amount)`: Withdraw referral earnings
- `updateTransactionStatus(transactionId, status)`: Admin function to update transaction status

### 3. API Integration

#### api.js
Extended with referral-specific endpoints:
- `getReferralInfo()`: GET /api/referral/info
- `getReferralTransactions()`: GET /api/referral/transactions
- `withdrawReferralEarnings(data)`: POST /api/referral/withdraw
- `updateTransactionStatus(id, data)`: PUT /api/referral/transactions/:id

## Workflow

### 1. User Signup with Referral
1. User visits: `https://khela88.com/signup?ref=A1B2C3`
2. Referral code is automatically captured and pre-filled in the signup form
3. User completes registration
4. Backend creates referral transaction and updates referrer's earnings

### 2. Transaction Management
1. Admin reviews pending transactions in the admin panel
2. Admin can approve transactions (validates the referral)
3. Admin can mark transactions as paid (funds are available for withdrawal)

### 3. User Withdrawal
1. User navigates to the withdrawal section
2. User enters withdrawal amount (must meet minimum requirement)
3. System processes withdrawal request
4. Referral earnings are deducted from user's balance

## Backend Requirements

The backend should implement the following endpoints:

### User Signup
```
POST /api/users/signup
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "password123",
  "phone": "+880123456789",
  "referralCode": "A1B2C3"  // Optional
}
```

When a referral code is provided:
1. Validate the referral code exists
2. Create a referral transaction record
3. Add commission to referrer's earnings
4. Add new user to referrer's referred users list

### Referral Info
```
GET /api/referral/info
Response:
{
  "success": true,
  "data": {
    "referralEarnings": 500,
    "referredUsers": [...],
    "referralCode": "A1B2C3",
    "minWithdrawAmount": 100
  }
}
```

### Referral Transactions
```
GET /api/referral/transactions
Response:
{
  "success": true,
  "data": [
    {
      "_id": "transaction123",
      "referrer": "referrer123",
      "referee": "referee123",
      "amount": 100,
      "status": "pending",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

### Withdraw Referral Earnings
```
POST /api/referral/withdraw
{
  "amount": 500
}
Response:
{
  "success": true,
  "message": "Withdrawal successful"
}
```

### Update Transaction Status (Admin)
```
PUT /api/referral/transactions/:id
{
  "status": "approved"  // or "paid"
}
Response:
{
  "success": true,
  "message": "Transaction status updated",
  "data": { /* updated transaction */ }
}
```

## Future Enhancements

1. **Multi-tier Referral System**: Implement level-based commissions (e.g., 10% for direct referrals, 5% for indirect)
2. **Activity-based Commissions**: Earn commissions from referred users' activities (deposits, game play, etc.)
3. **Referral Leaderboard**: Show top referrers on the platform
4. **Referral Bonuses**: Special bonuses for reaching referral milestones
5. **Integration with Wallet System**: Merge referral earnings with main wallet transactions

## Summary

This implementation provides a complete referral system with:
- Automatic referral detection during signup
- Transaction creation and management
- Admin approval workflow
- User withdrawal functionality
- Reusable components and hooks for easy integration