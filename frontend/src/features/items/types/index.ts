export type Item = {
  _id: string;
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  image: string;
  sizes: number[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};
