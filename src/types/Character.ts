export interface Character {
  id: number;
  name: string;
  images: string[];
  debut: {
    manga?: string;
    anime?: string;
    novel?: string;
    movie?: string;
    game?: string;
  };
  personal: {
    clan: string;
    sex: string;
  };
  family: {
    father?: string;
    brother?: string;
    mother?: string;
  };
  jutsu?: string[];
}