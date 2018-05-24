import { Component, ContentChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { ServicoPessoa } from './dao/app.service';
import { Pessoa } from './pessoa.model';


@Component({
    selector: 'inserir-pessoa',
    templateUrl: './inserir-pessoa.html'
})

export class InserirPessoaComponent {
    usuarioForm: FormGroup;
    erros: any;
    cepPattern = /\d\d((\d\d\d)| (\.\d\d\d -)) \d\d\d/
    input: any;

    constructor(
        private servico: ServicoPessoa,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.usuarioForm = this.formBuilder.group({
            nome: this.formBuilder.control('', [Validators.required]),
            sobreNome: this.formBuilder.control('', [Validators.required]),
            emailAdress: this.formBuilder.control('', [Validators.required, Validators.email]),
            tipoPessoa: this.formBuilder.control('1', [Validators.required]),
            cep: this.formBuilder.control('', [Validators.pattern(this.cepPattern)]),
            logradouro: '',
            bairro: '',
            cidade: '',
            complemento: ''
        });
    }

    InsereUsuario(pessoa: Pessoa) {
        this.servico.InserirPessoa(pessoa)
            .subscribe(resposta => this.erros = resposta.errors);
        console.log(this.erros);
    }

}