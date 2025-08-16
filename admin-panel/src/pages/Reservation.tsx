import { Separator } from "@/components/ui/separator";
import { Fetch } from "@/middlewares/Fetch";
import { ReservationTypes } from "@/types/RootTypes";
import { useEffect, useState } from "react";

const Reservation = () => {
  const [reservations, setReservations] = useState<ReservationTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await Fetch.get("/reservations");
        setReservations(response.data?.data || []);
      } catch (error) {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Reservations</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-white">Loading...</p>
        </div>
      ) : reservations.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-white">
            No reservations found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reservations.map(({ 
            _id, 
            createdAt, 
            name, 
            date,
            numberOfPeople,
            time,
            email,
            phone,
            specialRequests,
            status 
          }) => (
            <div
              key={_id}
              className="bg-white rounded-lg p-4 flex flex-col gap-3 relative"
            >
              <h1 className="text-sm font-bold">Reservation #{_id}</h1>
              <Separator />
              <p>User: {name || "Unknown"}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <Separator />
              <p>Date: {date.slice(0, 10)}</p>
              <p>Time: {time}</p>
              <Separator />
              <p>Number of People: {numberOfPeople}</p>
              <p>Special Requests: {specialRequests || "None"}</p>
              <Separator />
              <p>Status: <span className="font-semibold capitalize">{status}</span></p>
              <div>
              </div>
              <p className="text-muted-foreground text-end">
          {createdAt?.slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservation;