import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Fetch } from "@/middlewares/Fetch"
import { OrderTypes } from "@/types/RootTypes"
import { Ban, Check, Text, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Orders = () => {
  const [orders, setOrders] = useState<OrderTypes[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeOrder, setActiveOrder] = useState<string | null>(null) // ✅ faqat tanlangan order

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

  const handleChangeStatus = async (orderId: string, status: string) => {

    try {
      setLoading(true)
      await Fetch.put(`/orders/${orderId}/status`, { status })
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      )
      toast.success("Order status updated successfully")
      setActiveOrder(null)
    } catch (error) {
      const err = error as Error
      setError(err.message || "Unknown error")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

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
          {orders.map(({ items, _id, total, createdAt, user, status }: OrderTypes) => (
            <div
              key={_id}
              className="bg-white text-black rounded-lg p-4 flex flex-col gap-3 relative"
            >
              <h1 className="text-sm font-bold">Order #{_id}</h1>
              <Separator />
              <p>User: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Total Price: {total}$</p>
              <p >Status: {" "}
                <span className={`capitalize font-semibold ${status === 'delivering' ? 'text-blue-500' : status === 'completed' ? 'text-green-500' : status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                 {status}
                </span>
                 </p>
              <Separator />
              <p>Items: {items.length}</p>
              <div>
                {items.map((item) => (
                  <div key={item._id} className="text-gray-400">
                    {item.name} - {item.price}$ {item.quantity > 1 && `(${item.quantity})`}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-end">{createdAt.slice(0, 10)}</p>

              <Button
                onClick={() =>
                  setActiveOrder(activeOrder === _id ? null : _id)
                }
              >
                <Text />
                Status
              </Button>

              {activeOrder === _id && (
                <div className="mt-2 flex items-center gap-1 flex-wrap">
                  <Button className="bg-blue-500 w-full text-white hover:bg-blue-600"
                    onClick={() => handleChangeStatus(_id, 'delivering')}
                  >
                    <Truck /> Delivering
                  </Button>
                  <Button className="bg-green-500 w-full text-white hover:bg-green-600"
                    onClick={() => handleChangeStatus(_id, 'completed')}
                  >
                    <Check /> Completed
                  </Button>
                  <Button className="bg-red-500 w-full text-white hover:bg-red-600"
                    onClick={() => handleChangeStatus(_id, 'cancelled')}
                  >
                    <Ban /> Cancelled
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
