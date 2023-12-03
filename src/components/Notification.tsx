export default function Notification() {

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center min-h-screen font-roboto">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-8 space-y-8">
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">Notification Center</h1>

        {/* Photo Container */}
        <div className="flex justify-center w-full">
          <img src="src/assets/notification-bell.gif" 
          alt="Notification Center" 
          className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24" />
        </div>
        </div>
    </div>
  );
}
