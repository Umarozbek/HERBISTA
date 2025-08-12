import { Separator } from "@/components/ui/separator"
import { Fetch } from "@/middlewares/Fetch"
import {  OrderTypes } from "@/types/RootTypes"
import { useEffect, useState } from "react"

const Orders = () => {
      const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
            const response = (await Fetch.get('/orders')).data
            setOrders(response.data)
        }
        fetchOrders()
    }, [])
    
    return (
        <div className="p-4 h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {orders.length <= 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium text-sky-400">
            Нет ни одного заказа
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {orders.map(({items,_id,total,createdAt,user}:OrderTypes) => (
                <div key={_id} className="bg-[#202020] text-white rounded-lg p-4 flex flex-col gap-3 relative">
                    <h1 className="text-sm font-bold">Order #{_id}</h1>
                    <Separator />
                    <p className="">User: {user.name}</p>
                    <p className="">Total Price: {total}$</p>
                      <Separator />
                    <p className="">Items: {items.length}</p>
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