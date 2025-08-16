import {
  PanelLeftOpen,
  PanelLeftClose,
  LogOut,
  MessageCircle,
  SquareMenu,
  Users,
  CopyPlus,
  ListOrdered,
  ClipboardList,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const items = [
    {
      title: "Menus",
      url: "/",
      icon: SquareMenu,
    },
     {
      title: "Categories",
      url: "/categories",
      icon: CopyPlus,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ListOrdered,
    },
     {
      title: "Reservation",
      url: "/reservation",
      icon: ClipboardList,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside
      style={{ transition: "all ease-in-out .3s" }}
      className={`bg-[#bfa14a] text-white h-screen p-4 ${
        isSidebarOpen ? "w-[300px]" : "w-[60px]"
      }`}
    >
      <ul
        className={`flex flex-col gap-5 ${
          !isSidebarOpen ? "items-center" : ""
        }`}
      >
        {isSidebarOpen ? (
          <PanelLeftClose
            onClick={() =>
              setIsSidebarOpen((prevData) => (prevData ? false : true))
            }
          />
        ) : (
          <PanelLeftOpen
            onClick={() =>
              setIsSidebarOpen((prevData) => (prevData ? false : true))
            }
          />
        )}
        {items.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className={`flex items-center gap-2 font-semibold ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              {<item.icon size={18} />}
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>
                {item.title}
              </span>
            </Link>
          </li>
        ))}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <li
              className={`absolute bottom-5 cursor-pointer flex items-center gap-2 ${
                !isSidebarOpen ? "justify-center" : ""
              }`}
            >
              <LogOut size={18} />
              <span className={`${isSidebarOpen ? "" : "hidden"}`}>Log out</span>
            </li>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#202020] border-none">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                After logging out, your data will be lost
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Apply
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ul>
    </aside>
  );
}
