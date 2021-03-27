import {Utilisateur} from './utilisateur';

export class Message {
  idamess: string;
  sujet: string;
  message: string;
  ouvert: boolean;
  envoyeur: Utilisateur;
  recepteur: Utilisateur;
  dateenvoie: string;
  isdeleted: boolean;
}
