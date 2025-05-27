// src/features/payments/PaymentPage.jsx
import React from 'react';
import { Typography, Paper, Button, Chip, Divider, List, ListItem, ListItemText } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment'; // Main icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const mockPaymentData = {
    membershipTier: "Premium Annual",
    status: "Active", // Active, Expired, Due Soon
    expiryDate: "2024-12-31",
    lastPayment: {
        date: "2023-12-15",
        amount: "150,000 XAF", // Example currency
        method: "Mobile Money"
    },
    history: [
        { id: 'p1', date: "2023-12-15", amount: "150,000 XAF", description: "Annual Premium Renewal", status: "Paid" },
        { id: 'p2', date: "2022-12-15", amount: "140,000 XAF", description: "Annual Premium", status: "Paid" },
    ]
};


const PaymentPage = () => {
  const paymentInfo = mockPaymentData; // Use mock data

  return (
    <Paper className="p-4 sm:p-6 rounded-xl shadow-lg bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <Typography variant="h4" component="h1" className="font-bold text-fittrack-gray-900 mb-2 sm:mb-0">
          Membership & Payments
        </Typography>
        <Button variant="contained" startIcon={<AccountBalanceWalletIcon />} className="bg-fittrack-blue hover:bg-fittrack-blue-dark text-white normal-case" onClick={() => alert("Renew/Make Payment TBD")}>
          Make Payment
        </Button>
      </div>

      {paymentInfo ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Paper variant="outlined" className="p-4 rounded-lg bg-fittrack-gray-50">
                <Typography variant="overline" className="text-fittrack-gray-600">Membership Tier</Typography>
                <Typography variant="h6" className="font-medium text-fittrack-blue">{paymentInfo.membershipTier}</Typography>
            </Paper>
            <Paper variant="outlined" className="p-4 rounded-lg bg-fittrack-gray-50">
                <Typography variant="overline" className="text-fittrack-gray-600">Status</Typography>
                <div className="flex items-center">
                    <Chip
                        icon={paymentInfo.status === "Active" ? <CheckCircleIcon /> : <ErrorOutlineIcon />}
                        label={paymentInfo.status}
                        color={paymentInfo.status === "Active" ? "success" : "error"}
                        size="small"
                        className={paymentInfo.status === "Active" ? "bg-fittrack-success/20 text-fittrack-success" : "bg-fittrack-error/20 text-fittrack-error"}
                    />
                    {paymentInfo.status === "Active" && (
                        <Typography variant="body2" className="ml-2 text-fittrack-gray-600">
                            Expires: {new Date(paymentInfo.expiryDate).toLocaleDateString()}
                        </Typography>
                    )}
                </div>
            </Paper>
          </div>

          <Divider className="my-6" />

          <Typography variant="h5" className="font-semibold text-fittrack-gray-800 mb-3">Payment History</Typography>
          {paymentInfo.history.length > 0 ? (
            <List className="divide-y divide-fittrack-gray-200">
              {paymentInfo.history.map(item => (
                <ListItem key={item.id} className="py-3 px-0">
                  <ListItemText
                    primary={<span className="font-medium text-fittrack-gray-800">{item.description}</span>}
                    secondary={`Date: ${new Date(item.date).toLocaleDateString()} - Method: ${paymentInfo.lastPayment.method} `}
                  />
                  <Typography variant="body1" className="font-semibold text-fittrack-gray-900">{item.amount}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography className="text-fittrack-gray-500">No payment history found.</Typography>
          )}
        </>
      ) : (
         <div className="mt-6 p-6 border-2 border-dashed border-fittrack-gray-300 rounded-lg text-center min-h-[200px] flex flex-col justify-center items-center">
            <PaymentIcon className="text-5xl text-fittrack-gray-400 mb-3" />
            <Typography className="text-fittrack-gray-500 text-lg mb-1">
                Payment information not available.
            </Typography>
        </div>
      )}
    </Paper>
  );
};

export default PaymentPage;