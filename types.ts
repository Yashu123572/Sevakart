
export interface Service {
  id: string;
  name: string;
  icon: any;
  description: string;
  price: number;
  mechanicGets: number;
  profit: number;
  color: string;
  border: string;
  iconColor: string;
}

export interface Offer {
  id: string;
  title: string;
  discount: string;
  imageUrl: string;
  code: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface BookingDetails {
  fullName: string;
  whatsappNumber: string;
  address: string;
  timeSlot: string;
}
