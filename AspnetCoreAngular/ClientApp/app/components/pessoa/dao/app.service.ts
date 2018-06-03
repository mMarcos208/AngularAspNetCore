import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_Pessoa } from '../../../API_ACESS';
import { Pessoa } from '../pessoa.model';

@Injectable()
export class ServicoPessoa {
    constructor(private _http: HttpClient) { }

    InserirPessoa(pessoa: Pessoa): Observable<any> {
        return this._http.post<any>(`${API_Pessoa}/Pessoa`, pessoa);
    }

    EditarPessoa(Id: number, pessoa: Pessoa): Observable<any> {
        return this._http.put<any>(`${API_Pessoa}/Pessoa/${Id}`, pessoa);
    }

    ListarPessoa(): Observable<Pessoa[]> {
        return this._http.get<Pessoa[]>(`${API_Pessoa}/Pessoa`);
    }

    DetalharPessoa(Id: string): Observable<Pessoa> {
        return this._http.get<Pessoa>(`${API_Pessoa}/Pessoa/${Id}`);
    }

    DeletarPessoa(Id: string): Observable<Pessoa[]> {
        return this._http.delete<Pessoa[]>(`${API_Pessoa}/Pessoa/${Id}`);
    }
}