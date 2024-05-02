export type TProduct = {
  id: string;
  title: string;
  price: string;
  description: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
  images: [string, string, string];
};
export type TProductProps = {
  products: TProduct[];
};
export type TProfile = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
};
export type TProfileResponse = TProfile & {
  message: string;
  statusCode: number;
};

export type TCookies = {
  [key: string]: string;
};
