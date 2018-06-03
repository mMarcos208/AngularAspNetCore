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
    cepPattern = /(\d{8}|\d{3}-\d{5})/

    constructor(
        private servico: ServicoPessoa,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.servico.DetalharPessoa(this.route.snapshot.params['id'])
            .subscribe(resposta => {
                this.usuarioForm.patchValue({
                    nome: resposta.nome,
                    sobreNome: resposta.sobreNome,
                    tipoPessoa: resposta.tipoPessoa,
                    emailAdress: resposta.emailAdress,
                    cep: resposta.endereco.cep,
                    logradouro: resposta.endereco.logradouro,
                    bairro: resposta.endereco.bairro,
                    localidade: resposta.endereco.localidade,
                    complemento: resposta.endereco.complemento
                })
            });

        this.usuarioForm = this.formBuilder.group({
            id: '',
            nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
            sobreNome: this.formBuilder.control('', [Validators.required]),
            emailAdress: this.formBuilder.control('', [Validators.required, Validators.email]),
            tipoPessoa: this.formBuilder.control('', [Validators.required]),
            cep: this.formBuilder.control('', [Validators.pattern(this.cepPattern), Validators.minLength(8), Validators.maxLength(9)]),
            logradouro: this.formBuilder.control('', [Validators.required]),
            bairro: this.formBuilder.control('', [Validators.required]),
            localidade: this.formBuilder.control('', [Validators.required]),
            complemento: ''
        });

    }
    EditarPessoa(pessoa: Pessoa) {
        this.servico.EditarPessoa(this.route.snapshot.params['id'], pessoa)
            .subscribe(resposta => this.pessoa = resposta);

        this.usuarioForm.reset();
        //Adicionar redirecionar para o listar!
    }
}