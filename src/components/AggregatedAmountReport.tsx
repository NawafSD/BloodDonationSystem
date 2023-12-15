import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient.js'; // Adjust the path as necessary
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";

export default function AggregatedAmountReport() {
  const [driveDetails, setDriveDetails] = useState([]);

  useEffect(() => {
    const fetchDriveDetails = async () => {
      try {
        let { data, error } = await supabase
          .rpc('get_drive_bloodtype_amounts'); // This should be the name of your stored procedure

        if (error) {
          throw error;
        }

        // Assuming the stored procedure returns the data in the desired format
        setDriveDetails(data);
      } catch (error) {
        console.error('Error fetching drive details:', error.message);
      }
    };

    fetchDriveDetails();
  }, []);

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className="tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl">
          The aggregated amount available for each blood type
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Collection Drive", "Blood Type", "Total Amount (Liters)"]}
          rows={driveDetails.map(detail => ({
            "Drive Title": detail["Drive Title"],
            "Blood Type": detail["Blood Type"],
            "Total Amount": detail["Total Amount"].toFixed(2) // Ensure the amount is a number with two decimal places
          }))}
        />
      </div>
    </main>
  );
}
