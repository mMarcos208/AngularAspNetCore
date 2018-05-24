import { Component } from '@angular/core';
import { ServicoUsuario } from './dao/app.service';
import { Pessoa } from './pessoa.model';


@Component({
    selector: 'listar-usuario',
    templateUrl: './listar-usuario.html'
})

export class ListarPessoaComponent {

    pessoa: Pessoa[];

    constructor(
        private servico: ServicoUsuario) { }

    ngOnInit() {
        this.ListarUsuario();
    }
    ListarUsuario() {
        this.servico.ListarPessoa()
            .subscribe(resposta => this.pessoa = resposta)
    }

    DeletarPessoa(Id: string) {
        this.servico.DeletarPessoa(Id)
            .subscribe(resposta => this.pessoa = resposta);
    }

    EditarPessoa(Id: string) {
        this.servico.DetalharPessoa(Id)
            .subscribe(resposta => console.log(response));
    }
}