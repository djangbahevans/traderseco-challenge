export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  items: {
    id: string;
    name: string;
    manufacturer: string;
    description: string;
    price: number;
    quantity: number;
    sizes: string[];
  }[];
};

export type APIError = {
  errors: {
    message: string;
    field?: string;
  }[];
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = User
