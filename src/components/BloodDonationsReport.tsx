import React, { useState, useEffect } from 'react';
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from '../../supabaseClient.js'; // Adjust the path as needed

export default function BloodDonationsReport() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      // Perform a join operation between 'donations' and 'users' tables
      let { data, error } = await supabase
        .from('donations')
        .select(`
          donation_id,
          userid,
          from,
          date
        `) // Assuming 'users' is the name of the table containing user names
         
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching donations:', error);
        return;
      }

      // Transform data to match table format
      const transformedData = data.map(item => ({
        DonationID: item.donation_id,
        ID: item.userid,
        Name: item.from, 
        ReceivedDate: item.date
      })); 

      setDonations(transformedData);
    };

    fetchDonations();
  }, []);

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl ">
          All blood donations received in the last month
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Donation ID", "Recipient ID", "Donator", "Received Date"]}
          rows={donations}
        />
      </div>
    </main>
  );
}
