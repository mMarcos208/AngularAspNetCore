import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Endereco } from '../endereco.model';

@Injectable()
export class ServicoEndereco {
    constructor(private _http: Http) { }

    GetEndereco(Cep: string): Observable<Endereco> {
        return this._http.get(`https://viacep.com.br/ws/${Cep}/json/`)
            .map(response => response.json())
    }
}