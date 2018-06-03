import { Component} from '@angular/core';
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
    cepPattern = /(\d{8}|\d{3}-\d{5})/

    constructor(
        private servico: ServicoPessoa,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.usuarioForm = this.formBuilder.group({
            nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
            sobreNome: this.formBuilder.control('', [Validators.required]),
            emailAdress: this.formBuilder.control('', [Validators.required, Validators.email]),
            tipoPessoa: this.formBuilder.control('1', [Validators.required]),
            cep: this.formBuilder.control('', [Validators.pattern(this.cepPattern),Validators.minLength(8), Validators.maxLength(9)]),
            logradouro: this.formBuilder.control('', [Validators.required]),
            bairro: this.formBuilder.control('', [Validators.required]),
            localidade: this.formBuilder.control('', [Validators.required]),
            complemento: ''
        });
    }

    InsereUsuario(pessoa: Pessoa) {
        this.servico.InserirPessoa(pessoa)
            .subscribe(resposta => this.erros = resposta.errors);
    }

}