export interface Destination {
  destination: string;
  image: string;
  latitude: number;
  longitud: number;
  cateogry: string;
  firstPlan: string;
  descriptionFirstPlan: string;
  owner: string;
  id: string;
}

export type Destinations = Destination[];
