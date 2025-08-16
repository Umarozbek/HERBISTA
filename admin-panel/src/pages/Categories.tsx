import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet } from "@/components/ui/sheet"
import { Fetch } from "@/middlewares/Fetch"
import { AddCategory } from "@/modules/AddCategory"

import { CategoryTypes } from "@/types/RootTypes"
import { EllipsisVertical, Trash } from "lucide-react"
import { useEffect, useState } from "react"
const Categories = () => {
  const [categories, setCategories] = useState<CategoryTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchmenus = async () => {
      setLoading(true)
      try {
        const response = await (await Fetch.get("categories")).data
        setCategories(response.data)
        
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
      (await Fetch.delete(`categories/${id}`)).data;
      setCategories(categories.filter((category) => category._id !== id));
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
      <h1 className="text-2xl font-bold text-white">Categories</h1>
      <Sheet>
        <AddCategory />
      </Sheet>
    </div>

    {categories.length === 0 ? (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-medium text-white">No Categories found</p> 
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(({name,image, createdAt,_id}) => (
          <div key={_id} className="bg-white relative flex items-center gap-2 shadow-md rounded-lg p-4">
            <img src={image || "https://i.pinimg.com/1200x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg"} alt="" className="w-40 h-40 rounded-full object-cover object-center" />
           <div>
           <h2 className="text-xl font-bold mb-2">{name}</h2>
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
                    <Trash size={20} /> Delete
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

export default Categories