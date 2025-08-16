import { Separator } from "@/components/ui/separator"
import { Fetch } from "@/middlewares/Fetch"
import {  OrderTypes } from "@/types/RootTypes"
import { useEffect, useState } from "react"

const Orders = () => {
      const [orders, setOrders] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState<string | null>(null)
    
      useEffect(() => {
        const fetchOrders = async () => {
           try {
             setLoading(true)
             const response = (await Fetch.get('/orders')).data
             setOrders(response.data)
           } catch (error) {
             const err = error as Error
             setError(err.message || "Unknown error")
             console.error(error)
           } finally {
             setLoading(false)
           }
        }
        fetchOrders()
    }, [])
    
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
        <h1 className="text-2xl font-bold text-white">Orders</h1>
      </div>

      {orders.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-white">
            No orders found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {orders.map(({items,_id,total,createdAt,user}:OrderTypes) => (
                <div key={_id} className="bg-white text-black rounded-lg p-4 flex flex-col gap-3 relative">
                    <h1 className="text-sm font-bold ">Order #{_id}</h1>
                    <Separator />
                    <p>User: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Total Price: {total}$</p>
                      <Separator />
                    <p>Items: {items.length}</p>
                    <div>
                      {items.map(item => (
                        <div key={item._id} className="text-gray-400">
                          {item.name} - {item.price}$ {item.quantity > 1 && `(${item.quantity})`}
                        </div>
                      ))}
                    </div>
                      <p className="text-muted-foreground text-end">{createdAt.slice(0,10)}</p>
                </div>
            ))}
        </div>
      )}
    </div>
    )
}

export default Orders