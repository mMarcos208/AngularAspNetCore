import { Component, ContentChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
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
    input: any;
    control: FormControlName;

    constructor(
        private servico: ServicoUsuario,
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

    ngAfterContentInit() {
        this.input = this.control;
    }

    InsereUsuario(pessoa: Pessoa) {
        this.servico.InserirPessoa(pessoa)
            .subscribe(resposta => this.erros = resposta.errors);
        console.log(this.erros);
    }
  //  hasSucess(input: any): boolean {
  //      return !this.usuarioForm.get(input).valid && this.usuarioForm.get(input).touched;// input.valid && (this.input.dirty || this.input.touched);
  //  }

  //  hasErro(): boolean {
  //  return !this.input.valid && (this.input.dirty || this.input.touched);
  //}

}