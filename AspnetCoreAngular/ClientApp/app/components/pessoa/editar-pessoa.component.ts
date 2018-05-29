import { Component } from '@angular/core';
import { ServicoPessoa } from './dao/app.service';
import { Pessoa } from './pessoa.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';


@Component({
    selector: 'editar-pessoa',
    templateUrl: './editar-pessoa.html'
})

export class EditarPessoaComponent {
    usuarioForm: FormGroup
    pessoa: Pessoa;

    constructor(
        private servico: ServicoPessoa,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.servico.DetalharPessoa(this.route.snapshot.params['id'])
            .subscribe(resposta => this.pessoa = resposta);

        this.usuarioForm = this.formBuilder.group({
            nome: this.formBuilder.control('', [Validators.required]),
            sobreNome: this.formBuilder.control('', [Validators.required]),
            emailAdress: this.formBuilder.control('', [Validators.required, Validators.email]),
            tipoPessoa: this.formBuilder.control('', [Validators.required]),
            cep: this.formBuilder.control(''),
            logradouro: '',
            bairro: '',
            cidade: '',
            complemento: ''
        });

    }
    EditarPessoa(pessoa: Pessoa) {
        this.servico.EditarPessoa(pessoa)
            .subscribe(resposta => this.pessoa = resposta);
    }
}