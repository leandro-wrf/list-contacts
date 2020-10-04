import axios from 'axios';
import { IBGEUFResponse } from '../../@types';

export default async () => {
  const response = 
    await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  
  const ufInitials = response.data.map(uf => uf.sigla);

  return ufInitials;
}
