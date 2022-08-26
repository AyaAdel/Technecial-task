export type Client = {
  id: number;
  name: string;
  buildings: Building[];
};

export type Building = {
  id: string;
  name: string;
  country: string;
  position: number[];
};
