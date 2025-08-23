import { Sheet } from "@/components/ui/sheet"
import { Fetch } from "@/middlewares/Fetch"
import { AddPromo } from "@/modules/AddPromoCode"

import { PromoTypes } from "@/types/RootTypes"
import { useEffect, useState } from "react"

const PromoCode = () => {
  const [promos, setPromos] = useState<PromoTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchmenus = async () => {
      setLoading(true)
      try {
        const response = await (await Fetch.get("promo")).data
        setPromos(response)
        
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
      <h1 className="text-2xl font-bold text-white">Generated Promo Codes</h1>
      <Sheet>
     
        <AddPromo />
      </Sheet>
    </div>

    {promos.length === 0 ? (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg font-medium text-white">No Promos found</p> 
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map(({discouunt,promo,used,user, createdAt,_id}) => (
          <div key={_id} className="bg-white relative flex items-center gap-2 shadow-md rounded-lg p-4">
           <div>
           <h2 className="text-xl font-bold mb-2">{promo}</h2>
            <h2 className="text-xl font-bold mb-2">{discouunt}</h2>
            <h2 className="text-xl font-bold mb-2">{used ? "Used" : "Not Used"}</h2>
            <h2 className="text-xl font-bold mb-2">{user}</h2>

            <p className="text-muted-foreground mb-2">Created date: {createdAt?.slice(0, 10)}</p>
           </div>
           
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default PromoCode