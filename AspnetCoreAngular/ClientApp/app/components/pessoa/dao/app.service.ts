import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { API_Pessoa } from '../../../API_ACESS';
import { Pessoa } from '../pessoa.model';

@Injectable()
export class ServicoPessoa {
    constructor(private _http: Http) { }

    InserirPessoa(pessoa: Pessoa): Observable<any> {
        return this._http.post(`${API_Pessoa}/Pessoa`, pessoa)
            .map(resposta => resposta.json());
    }

    EditarPessoa(pessoa: Pessoa): Observable<any> {
        return this._http.put(`${API_Pessoa}/Pessoa`, pessoa)
            .map(resposta => resposta.json());
    }

    ListarPessoa(): Observable<Pessoa[]> {
        return this._http.get(`${API_Pessoa}/Pessoa`)
            .map(resposta => resposta.json());
    }

    DetalharPessoa(Id: string): Observable<Pessoa> {
        return this._http.get(`${API_Pessoa}/Pessoa/${Id}`)
            .map(resposta => resposta.json());
    }

    DeletarPessoa(Id: string): Observable<Pessoa[]> {
        return this._http.delete(`${API_Pessoa}/Pessoa/${Id}`)
            .map(resposta => resposta.json())
    }

    GetEndereco(Cep: string): Observable<any> {
        return this._http.get(`http://api.postmon.com.br/v1/cep/${Cep}`)
            .map(resposta => resposta.json())
    }
}