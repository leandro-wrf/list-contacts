import { Contact } from '../../../@types';

export interface Props {
  visible: boolean;
  close(): void;
  data: Contact;
  loadingData: number;
}
