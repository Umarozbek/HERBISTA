import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet } from "@/components/ui/sheet"
import { Fetch } from "@/middlewares/Fetch"
import { AddFood } from "@/modules/AddFood"
import { EditFood } from "@/modules/EditFood"
import { MenusTypes } from "@/types/RootTypes"
import { EllipsisVertical, Trash, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

const Menu = () => {
  const [menus, setMenus] = useState<MenusTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false)
  const [selectedMenu, setSelectedMenu] = useState<MenusTypes | null>(null)
  
  useEffect(() => {
    const fetchmenus = async () => {
      setLoading(true)
      try {
        const response = await (await Fetch.get("menu")).data
        setMenus(response.data)
      } catch (error) {
        const err = error as Error;
        setError(err.message || "Unknown error");
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchmenus()
  }, [])

  const handleEditMenu = (menu: MenusTypes) => {
    setSelectedMenu(menu)
    setEditMenuOpen(true)
  }

  const handleDeleteMenu = async (id: string) => {
    try {
      (await Fetch.delete(`menu/${id}`)).data;
      setMenus(menus.filter((menu) => menu._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold text-white">Menus</h1>
        <Sheet>
          <AddFood />
        </Sheet>
      </div>

      {menus.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-medium text-white">No menus found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map(({ name, image, category, createdAt, description, price, _id,status }) => (
            <div key={_id} className="bg-white relative flex items-center gap-2 shadow-md rounded-lg p-4">
              <img src={image || "https://i.pinimg.com/1200x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"} alt="" className="w-20 h-20 md:w-40 md:h-40 rounded-full object-cover object-center" />
              <div>
                <h2 className="text-xl font-bold mb-2">{name}</h2>
                <p className="text-muted-foreground mb-2">{description}</p>
                <h2 className="text-muted-foreground mb-2">Price: {price}</h2>
                <p className="text-muted-foreground mb-2">Category: {category}</p>
                <p className="text-muted-foreground mb-2">Date: {createdAt?.slice(0, 10)}</p>
                <p className="text-muted-foreground mb-2">Status: <span className={`font-semibold capitalize ${status === 'active' ? 'text-green-500' : status === 'paused' ? 'text-yellow-500' : 'text-red-500'}`}>{status}</span></p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleEditMenu({ name, image, category, createdAt, description, price, _id,status } as MenusTypes)}
                    className="flex items-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <Pencil size={20} /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteMenu(_id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

   {editMenuOpen && selectedMenu && (
  <EditFood
    menu={selectedMenu!}
    open={editMenuOpen}
    onOpenChange={setEditMenuOpen} 
    onUpdated={(updatedMenu) => {
      setMenus((prev) =>
        prev.map((m) => (m._id === updatedMenu._id ? updatedMenu : m))
      );
    }}
  />
)}


    </div>
  )
}

export default Menu