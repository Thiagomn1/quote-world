type Creator = {
  image: string;
  username: string;
  email: string;
  _id: string;
};

export type Quote = {
  _id?: string;
  quote: string;
  tags: string;
  creator?: Creator;
};
