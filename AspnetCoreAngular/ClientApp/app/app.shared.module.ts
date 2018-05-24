import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { InserirUsuarioComponent } from './components/usuario/inserir-usuario.component';
import { ListarPessoaComponent } from   './components/usuario/listar-usuario.component';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { ServicoUsuario } from './components/usuario/dao/app.service';
import { ServicoEndereco } from './components/endereco/dao/app.service.endereco';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        InserirUsuarioComponent,
        ListarPessoaComponent,
        EnderecoComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'inserir-usuario', component: InserirUsuarioComponent },
            { path: 'listar-usuario', component: ListarPessoaComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [ServicoUsuario, ServicoEndereco]
})
export class AppModuleShared {
}
