import { useEffect, useState } from "react";
import { RootState } from "../store/RootStore";
import { useDispatch, useSelector } from "react-redux";
import { Fetch } from "../middlewares/Fetch";
import { UserTypes } from "../types/RootTypes";
import {
  setUsers,
  setUsersError,
  setUsersPending,
} from "../toolkit/AdminsSlicer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Trash } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { AddAdmin } from "@/modules/AddAdmin";
import { Button } from "@/components/ui/button";

export default function Users() {
  const { isPending, data, error } = useSelector(
    (state: RootState) => state.admins
  );
  const dispatch = useDispatch();
const [toggle, setToggle] = useState(false)
 

  useEffect(() => {
    async function getData() {
      try {
        dispatch(setUsersPending());
        const response = (await Fetch.get("users")).data;
        console.log(response);
        if (response) {
          dispatch(setUsers(response.data));
        } else {
          dispatch(setUsersError(response.message));
        }
     } catch (error) {
        const err = error as Error;
        dispatch(setUsersError(err.message || "Unknown error"));
        console.error(error);
      }
    }
    getData();
  }, [dispatch]);

   const admins = data.filter (item => item.role === "admin");
   const users = data.filter (item => item.role !== "admin");
   console.log(users);
  console.log(admins);
  const handleDeleteUsers = async (id: string) => {
    try {
      (await Fetch.delete(`users/${id}`)).data;
      dispatch(setUsers(data.filter((users) => users._id !== id)));
      window.location.href = "/users";
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="h-16 w-16 border-[6px] border-dotted border-sky-600 animate-spin rounded-full"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">All {toggle ? "admins" : "users"}</h1>
        <Sheet>
          <AddAdmin />
        </Sheet>
      </div>
    <div >
      <Button variant="default" className="bg-sky-600" onClick={() => setToggle(!toggle)}>
        {toggle ? "Hide Admins" : "Show Admins"} </Button>
    </div>

      {data.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-sky-400">
            No any user
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4
        "> 
         {toggle ? ( admins?.map((admin: UserTypes) => (
            <div
              key={admin._id}
              className="bg-[#202020] rounded-lg p-4 flex flex-col gap-3 relative"
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-zinc-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleDeleteUsers(admin._id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <h2 className="text-lg font-semibold truncate text-white">
                {admin.name} 
              </h2>
              <p className="text-gray-300 text-sm">
                Email: {admin.email}
              </p>
              <p className="text-gray-300 text-sm">
                Joined: {admin.createdAt.slice(0, 10)}
              </p>
            </div>
          ))): 
          ( users?.map((users: UserTypes) => (
            <div
              key={users._id}
              className="bg-[#202020] rounded-lg p-4 flex flex-col gap-3 relative"
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-zinc-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleDeleteUsers(users._id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <h2 className="text-lg font-semibold truncate text-white">
                {users.name} 
              </h2>
              <p className="text-gray-300 text-sm">
                Email: {users.email}
              </p>
              <p className="text-gray-300 text-sm">
                Joined: {users.createdAt.slice(0, 10)}
              </p>
            </div>
          )))}
        </div>
      )}
    </div>
  );
}
