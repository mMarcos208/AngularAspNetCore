import { Component, Input, OnInit, ContentChild, AfterContentInit } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
    selector: 'input-container',
    templateUrl: './input.html'
})

export class InputComponent implements OnInit, AfterContentInit {
    

    input: any;
    @Input() label: string;
    @Input() errorMensage: string;

    @ContentChild(FormControlName) model: FormControlName;

    constructor() { }

    //Vai ser chamado quando o conteudo de  @ContentChild for definido!
    ngAfterContentInit(): void {
        this.input = this.model;
        if (this.input === undefined)
            throw new Error("Esse component está indiponivel");
    }

    ngOnInit() {
    }

    hasSucess(): boolean {
        return this.input.valid && (this.input.dirty || this.input.touched);
    }

    hasErro(): boolean {
        return !this.input.valid && (this.input.dirty || this.input.touched);
    }
}