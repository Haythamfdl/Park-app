import {Permission} from './permission';

export class Utilisateur {
  iduser: string;
  nom: string;
  email: string;
  tel: string;
  pass: string;
  datemodifpass: string;
  permissions: Permission[];
  isdeleted: boolean;
}
