using FluentValidation;
using Entidades;

namespace Validation
{
    public class PessoaValidation : AbstractValidator<Pessoa>
    {
        public PessoaValidation()
        {
            RuleFor(x => x.tipoPessoa)
            .NotEmpty()
            .WithMessage("Tipo pessoa é obrigátorio");

            RuleFor(x => x.emailAdress)
              .EmailAddress()
              .WithMessage("Email inválido");

            RuleFor(x => x.nome)
              .NotEmpty()
              .WithMessage("Nome é obrigátorio")
              .MaximumLength(80)
              .WithMessage("Nome deve ter no máximo 80 caracteres");

            RuleFor(x => x.sobreNome)
              .NotEmpty()
              .WithMessage("Sobre nome é obrigátorio")
              .MaximumLength(80)
              .WithMessage("Sobre nome deve ter no máximo 80 caracteres");

            RuleFor(x => x.endereco)
              .NotNull()
              .WithMessage("Endereco é obrigátorio");

            RuleFor(x => x.endereco.bairro)
              .NotEmpty()
              .WithMessage("Bairro é obrigátorio")
              .MaximumLength(200)
              .WithMessage("Bairro deve ter no máximo 200 caracteres");

            RuleFor(x => x.endereco.cep)
             .NotEmpty()
             .WithMessage("Cep é obrigátorio")
             .MaximumLength(8)
             .WithMessage("Cep deve ter no máximo 8 caracteres");

            RuleFor(x => x.endereco.logradouro)
            .NotEmpty()
            .WithMessage("Logradouro é obrigátorio")
            .MaximumLength(500)
            .WithMessage("Logradouro deve ter no máximo 8 caracteres");

            RuleFor(x => x.endereco.localidade)
            .NotEmpty()
            .WithMessage("Cidade é obrigátorio")
            .MaximumLength(200)
            .WithMessage("Cidade deve ter no máximo 200 caracteres");

        }
    }
}
