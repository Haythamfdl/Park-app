import {Probleme} from './probleme';
import {Utilisateur} from './utilisateur';

export class Solution {
  idsol: string;
  titre: string;
  solution: string;
  datesoumission: string;
  probleme: Probleme;
  user: Utilisateur;
  isdeleted: boolean;
}
