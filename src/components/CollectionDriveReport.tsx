import React, { useEffect, useState } from 'react';
import TableWithStripedRows from "./UI/TableWithStripedRowsProps";
import { supabase } from '../../supabaseClient.js'; // Adjust this path as needed

export default function CollectionDriveReport() {
  const [collectionDrives, setCollectionDrives] = useState([]);

  useEffect(() => {
    const fetchCollectionDrives = async () => {
      let { data, error } = await supabase
        .from('blooddrives')
        .select('title, totaldonations');

      if (error) {
        console.error('Error fetching collection drives:', error);
      } else {
        setCollectionDrives(data.map(drive => ({
          type: drive.title,
          bloodAmount: drive.totaldonations.toString()
        })));
      }
    };

    fetchCollectionDrives();
  }, []);

  return (
    <main className="bg-[#f7f7f7] min-h-screen w-full flex flex-col items-center justify-center">
      <div className="mb-24">
        <h1 className=" tracking-tight text-center font-roboto text-[#121212] mb-8 text-4xl font-extrabold leading-tight lg:text-5xl">
          Total blood collected during each drive
        </h1>
      </div>
      <div className="w-2/3">
        <TableWithStripedRows
          headers={["Collection Drive", "Total Blood (Liters)"]}
          rows={collectionDrives}
        />
      </div>
    </main>
  );
}
