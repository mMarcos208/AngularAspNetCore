import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { InserirPessoaComponent } from './components/pessoa/inserir-pessoa.component';
import { ListarPessoaComponent } from   './components/pessoa/listar-pessoa.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ServicoPessoa } from './components/pessoa/dao/app.service';
import { ServicoEndereco } from './components/endereco/dao/app.service.endereco';
import { ROUTES } from './app.router';
import { EditarPessoaComponent } from './components/pessoa/editar-pessoa.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        InserirPessoaComponent,
        ListarPessoaComponent,
        EditarPessoaComponent,
        EnderecoComponent,
        InputComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [ServicoPessoa, ServicoEndereco]
})
export class AppModuleShared {
}
