import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { API_Pessoa } from '../../../API_ACESS';
import { Pessoa } from '../pessoa.model';

@Injectable()
export class ServicoUsuario {
    constructor(private _http: Http) { }

    InserirPessoa(pessoa: Pessoa): Observable<any> {
        const heards = new Headers();
        heards.append('Content-Type', 'application/json');

        return this._http.post(`${API_Pessoa}/Pessoa`, pessoa, new RequestOptions({ headers: heards }))
            .map(response => response.json());
    }

    EditarPessoa(pessoa: Pessoa): Observable<any> {
        const heards = new Headers();
        heards.append('Content-Type', 'application/json');

        return this._http.put(`${API_Pessoa}/Pessoa`, pessoa, new RequestOptions({ headers: heards }))
            .map(response => response.json());
    }

    ListarPessoa(): Observable<Pessoa[]> {
        const heards = new Headers();
        heards.append('Content-Type', 'application/json');

        return this._http.get(`${API_Pessoa}/Pessoa`, new RequestOptions({ headers: heards }))
            .map(response => response.json());
    }

    DetalharPessoa(Id: string): Observable<Pessoa> {
        const heards = new Headers();
        heards.append('Content-Type', 'application/json');
        return this._http.get(`${API_Pessoa}/Pessoa/${Id}`, new RequestOptions({ headers: heards }))
            .map(response => response.json());
    }

    DeletarPessoa(Id: string): Observable<any> {
        return this._http.delete(`${API_Pessoa}/Pessoa/${Id}`)
            .map(response => response.json())
    }

    GetEndereco(Cep: string): Observable<any> {
        return this._http.get(`http://api.postmon.com.br/v1/cep/${Cep}`)
            .map(response => response.json())
    }
}