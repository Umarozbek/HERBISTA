import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet } from "@/components/ui/sheet"
import { Fetch } from "@/middlewares/Fetch"
import { AddMenu } from "@/modules/AddMenu"
import { MenusTypes } from "@/types/RootTypes"
import { EllipsisVertical, Trash } from "lucide-react"
import { useEffect, useState } from "react"
const Menu = () => {
  const [menus, setMenus] = useState<MenusTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
  }
, [])

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
        <p className="text-lg font-medium text-sky-400">Loading...</p>
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
      <h1 className="text-2xl font-bold">Menus</h1>
      <Sheet>
        <AddMenu />
      </Sheet>
    </div>

    {menus.length === 0 ? (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-medium ">No menus found</p> 
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map(({name,image,category,createdAt,description,price,_id}) => (
          <div key={_id} className="bg-white relative flex items-center gap-2 shadow-md rounded-lg p-4">
            <img src={image || "https://i.pinimg.com/1200x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"} alt="" className="w-40 h-40 rounded-full object-cover object-center" />
           <div>
           <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-muted-foreground mb-2">{description}</p>
           <h2 className="text-muted-foreground mb-2">Price: {price}</h2>
            <p className="text-muted-foreground mb-2">Category: {category}</p>
            <p className="text-muted-foreground mb-2">Created date: {createdAt?.slice(0, 10)}</p>
           </div>
           <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-2 right-2">
                  <EllipsisVertical size={24} className="text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem
                    onClick={() => handleDeleteMenu(_id)}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash size={20} /> Удалить
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Menu