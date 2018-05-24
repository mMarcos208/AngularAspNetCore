import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CounterComponent } from "./components/counter/counter.component";
import { FetchDataComponent } from "./components/fetchdata/fetchdata.component";
import { InserirPessoaComponent } from "./components/pessoa/inserir-pessoa.component";
import { ListarPessoaComponent } from "./components/pessoa/listar-pessoa.component";
import { EditarPessoaComponent } from "./components/pessoa/editar-pessoa.component";


export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: 'inserir-pessoa', component: InserirPessoaComponent },
    { path: 'listar-pessoa', component: ListarPessoaComponent },
    { path: 'editar-pessoa/:id', component: EditarPessoaComponent },
    { path: '**', redirectTo: 'home' }
];