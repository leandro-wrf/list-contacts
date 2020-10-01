export interface Contact {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  uf: string;
  city: string;
}

export interface IBGEUFResponse {
  sigla: string;
}

export interface IBGECityResponse {
  nome: string;
}
