import { Endereco } from "../endereco/endereco.model";

export interface Pessoa {
    tipoPessoa: string
    nome: string
    sobreNome: string
    emailAdress: string
    endereco: Endereco
}
