import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../endereco.model';

@Injectable()
export class ServicoEndereco {
    constructor(private _http: HttpClient) { }

    GetEndereco(Cep: string): Observable<Endereco> {
        return this._http.get<Endereco>(`https://viacep.com.br/ws/${Cep}/json/`);
    }
}