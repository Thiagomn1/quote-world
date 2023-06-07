type Creator = {
  image: string;
  username: string;
  email: string;
};

export type Quote = {
  _id?: string;
  quote: string;
  tag: string;
  creator?: Creator;
};
