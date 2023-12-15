import React, { useEffect, useState } from 'react';
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from '../../supabaseClient.js';

export default function PaymentsReport() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*');

      if (error) {
        console.error('Error fetching payments:', error);
        return;
      }

      setPayments(data);
    };

    fetchPayments();
  }, []);

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className="tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl">
          All Payments that have been confirmed as completed
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={[
            "Payment ID",
            "Recipient Name",
            "Amount (USD)",
            "Confirmation Date",
          ]}
          rows={payments.map(payment => ({
            PaymentID: payment.paymentid,
            RecipientName: payment.recipientname,
            Amount: payment.amount,
            ConfirmationDate: payment.confirmationdate
          }))}
        />
      </div>
    </main>
  );
}
