import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';
import { Endereco } from './endereco.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoEndereco } from './dao/app.service.endereco';

@Component({
    selector: 'endereco',
    templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

    @Input() enderecoGroup: FormGroup;

    @Input() endereco: Endereco

    constructor(
        private servico: ServicoEndereco,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
    }

    GetEndereco(Cep: string) {
        this.servico.GetEndereco(Cep)
            .subscribe(resposta => {
                this.enderecoGroup.patchValue({
                    bairro: resposta.bairro,
                    logradouro: resposta.logradouro,
                    localidade: resposta.localidade
                });
            });
    }
}
