import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicoUsuario } from './dao/app.service';
import { Pessoa } from './pessoa.model';


@Component({
    selector: 'inserir-usuario',
    templateUrl: './inserir-usuario.component.html'
})

export class InserirUsuarioComponent {
    usuarioForm: FormGroup;
    erros: any;
    cepPattern = /\d\d((\d\d\d)| (\.\d\d\d -)) \d\d\d/

    constructor(
        private servico: ServicoUsuario,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.usuarioForm = this.formBuilder.group({
            nome: this.formBuilder.control('', [Validators.required]),
            sobreNome: this.formBuilder.control('', [Validators.required]),
            emailAdress: this.formBuilder.control('', [Validators.required, Validators.email]),
            tipoPessoa: this.formBuilder.control('', [Validators.required]),
            cep: this.formBuilder.control('', [Validators.pattern(this.cepPattern)]),
            logradouro: '',
            bairro: '',
            cidade: '',
            complemento: ''
        });
    }

    InsereUsuario(pessoa: Pessoa) {
        this.erros = [];
        this.servico.InserirPessoa(pessoa)
            .subscribe(resposta => this.erros = resposta.errors);
    }    
}