using AutoMapper;
using Entities.Dto;
using Entidades;
using ViewModel.Entities;

namespace Parser
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            Mapper.Initialize(x =>
            {
                x.CreateMap<PessoaInserirDto, Pessoa>()
                .ForMember(d => d.emailAdress, o => o.MapFrom(s => s.emailAdress))
                .ForPath(d => d.endereco.bairro, o => o.MapFrom(s => s.bairro))
                .ForPath(d => d.endereco.cep, o => o.MapFrom(s => s.cep))
                .ForPath(d => d.endereco.cidade, o => o.MapFrom(s => s.localidade))
                .ForPath(d => d.endereco.logradouro, o => o.MapFrom(s => s.logradouro))
                .ForPath(d => d.endereco.complemento, o => o.MapFrom(s => s.complemento))
                .ForMember(d => d.nome, o => o.MapFrom(s => s.nome))
                .ForMember(d => d.sobreNome, o => o.MapFrom(s => s.sobreNome))
                .ForMember(d => d.tipoPessoa, o => o.MapFrom(s => s.tipoPessoa));

                x.CreateMap<Pessoa, PessoaListarViewModel>()
                .ForMember(d => d.email, o => o.MapFrom(s => s.emailAdress))
                .ForMember(d => d.id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.nomeCompleto, o => o.MapFrom(s => s.nome + " " + s.sobreNome))
                .ForMember(d => d.tipoPessoa, o => o.MapFrom(s => s.tipoPessoa == "1" ? "Pessoa Física" : "Pessoa Jurídica"));

            });

        }
    }
}
