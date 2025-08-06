
export interface AdminTypes {
  createdAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
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
  isAvailable: boolean
  isFeatured: boolean
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


export interface CarouselTypes {
  createdAt: string;
  title: string;
  description: string;
  images: string[];
  link: string;
  updatedAt: string;
  __v: number;
  _id: string;
}


