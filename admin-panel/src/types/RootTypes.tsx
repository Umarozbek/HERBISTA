
export interface UserTypes {
  createdAt: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface MenusTypes {
  createdAt: string; 
  name: string;
  description: string;
  price: number
  category: string
  image: string,
  __v: number;
  _id: string;
  quantity: number;
  isAvailable: boolean
  isFeatured: boolean
  status: string;
}
export interface CategoryTypes {
  createdAt: string;
  name: string;
  image: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ContactTypes {
  createdAt: string;
  name: string;
  email: string;
  message: string;
  updatedAt: string;
  __v: number;
  _id: string;
}


export interface OrderTypes {
  createdAt: string;
  user: UserTypes;
  items: MenusTypes[];
  total: number;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ReservationTypes {
  createdAt: string;
  updatedAt: string;
  items: MenusTypes[];
  __v: number;
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  date: string;
  time: string;
  numberOfPeople: number;
  status?: string;
  specialRequests?: string;
}
