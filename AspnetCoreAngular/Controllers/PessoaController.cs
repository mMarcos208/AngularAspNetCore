using AutoMapper;
using Entities.Dto;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Entidades;
using Repository.EnderecoRepository;
using Repository.PessoaRepository;
using System.Text.RegularExpressions;
using Validation;

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
                {
                    enderecoId = _repositoryEndereco.Create(pessoa.endereco);
                }
                else
                {
                    enderecoId = endereco.id;
                }

                pessoaId = _repositoryPessoa.Create(pessoa);
                _repositoryPessoa.PessoaEndereco(pessoaId, enderecoId);

            }
            return erros;
        }
    }
}