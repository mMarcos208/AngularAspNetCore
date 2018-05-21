import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ServicoEndereco {
    constructor(private _http: Http) { }

    GetEndereco(Cep: string): Observable<any> {
        return this._http.get(`http://api.postmon.com.br/v1/cep/${Cep}`)
            .map(response => response.json())
    }
}