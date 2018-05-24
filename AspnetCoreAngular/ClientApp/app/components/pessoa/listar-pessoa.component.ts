import { Component } from '@angular/core';
import { ServicoPessoa } from './dao/app.service';
import { Pessoa } from './pessoa.model';


@Component({
    selector: 'listar-pessoa',
    templateUrl: './listar-pessoa.html'
})

export class ListarPessoaComponent {

    pessoa: Pessoa[];

    constructor(
        private servico: ServicoPessoa) { }

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
}