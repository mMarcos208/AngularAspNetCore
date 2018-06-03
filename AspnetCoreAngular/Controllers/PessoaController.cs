using AutoMapper;
using Entities.Dto;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Entidades;
using Repository.EnderecoRepository;
using Repository.PessoaRepository;
using System.Text.RegularExpressions;
using Validation;
using ViewModel.Entities;
using System.Collections.Generic;
using System.Linq;

namespace AspnetCoreAngular.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa")]
    public class PessoaController : Controller
    {
        PessoaRepository _repositoryPessoa = new PessoaRepository();
        EnderecoRepository _repositoryEndereco = new EnderecoRepository();

        [HttpPost]
        public ValidationResult InserirPessoa([FromBody]PessoaInserirDto value)
        {
            var cepPattern = @"[^0-9]"; //Tudo que não é número
            value.cep = Regex.Replace(value.cep, cepPattern, string.Empty);

            Pessoa pessoa = Mapper.Map<PessoaInserirDto, Pessoa>(value);
            ValidationResult erros = new PessoaValidation().Validate(pessoa);

            if (erros.Errors.Count == 0)
            {
                int enderecoId, pessoaId;

                Endereco endereco = _repositoryEndereco.Details(int.Parse(pessoa.endereco.cep));

                if (endereco == null)
                    enderecoId = _repositoryEndereco.Create(pessoa.endereco);
                else
                    enderecoId = endereco.id;

                pessoaId = _repositoryPessoa.Create(pessoa);
                _repositoryPessoa.PessoaEndereco(pessoaId, enderecoId);

            }
            return erros;
        }

        [HttpGet]
        public IEnumerable<PessoaListarViewModel> Pessoas()
        {
            IEnumerable<Pessoa> pessoas = _repositoryPessoa.List();

            var viewModel = Mapper.Map<List<Pessoa>, List<PessoaListarViewModel>>(pessoas.ToList());

            return viewModel;
        }

        [HttpGet("{id}", Name = "Get")]
        public Pessoa ListarPessoa(int id)
        {
            return _repositoryPessoa.Details(id);
        }

        [HttpPut("{id}")]
        public void EditarPessoa(int id, [FromBody]PessoaInserirDto value)
        {
            var cepPattern = @"[^0-9]"; //Conjunto negado, tudo que não é número
            value.cep = Regex.Replace(value.cep, cepPattern, string.Empty);

            Pessoa pessoa = Mapper.Map<PessoaInserirDto, Pessoa>(value);
            pessoa.Id = id;
            ValidationResult erros = new PessoaValidation().Validate(pessoa);

            if (erros.Errors.Count == 0)
            {

                _repositoryEndereco.Update(pessoa.endereco);
                _repositoryPessoa.Update(pessoa);
            }
        }

        [HttpDelete("{id}")]
        public IEnumerable<PessoaListarViewModel> DeletarPessoa(int id)
        {
            _repositoryPessoa.Delete(id);

            IEnumerable<Pessoa> pessoas = _repositoryPessoa.List();

            var viewModel = Mapper.Map<List<Pessoa>, List<PessoaListarViewModel>>(pessoas.ToList());

            return viewModel;

        }

    }
}