using Dapper;
using Entidades;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Repository.PessoaRepository
{
    public class PessoaRepository : IRepository<Pessoa>
    {
        private string strConexao = "Server=.\\sqlexpress; Database=angularCore; Trusted_Connection=True; MultipleActiveResultSets=true";

        public PessoaRepository()
        {

        }

        public int Create(Pessoa pessoa)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"INSERT
                        INTO Pessoa(Nome, Sobrenome, Email, IdTipoPessoa)
                      OUTPUT INSERTED.[Id]
                      VALUES
                             (@nome, @sobrenome, @email, @idTipoPessoa)";

                return conexao.Query<int>(QUERY, new
                {
                    nome = pessoa.nome,
                    sobrenome = pessoa.sobreNome,
                    email = pessoa.emailAdress,
                    idTipoPessoa = pessoa.tipoPessoa
                }).Single();

            }
        }

        public void Delete(int id)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"DELETE
                        FROM PessoaEndereco
                       WHERE IdPessoa = @id;

                      DELETE
                        FROM Pessoa
                       WHERE Id = @id;";

                conexao.Execute(QUERY, new
                {
                    id = id
                });

            }
        }

        public IEnumerable<Pessoa> List()
        {
            var QUERY = @"SELECT P.Id, P.Nome, P.SobreNome, P.Email as EmailAdress, P.IdTipoPessoa,
                           E.Bairro, E.Cep, E.Cidade, E.Complemento, E.Id, E.Rua as Logradouro
                      FROM Pessoa P
                INNER JOIN PessoaEndereco PE on P.Id = PE.IdPessoa
                INNER JOIN Endereco E on PE.IdEndereco = E.Id ";

            using (var conexao = new SqlConnection(strConexao))
            {
                return conexao.Query<Pessoa, Endereco, Pessoa>(QUERY,
                (Pessoa, Endereco) =>
                {
                    Pessoa.endereco = Endereco;
                    return Pessoa;
                },
                splitOn: "Bairro"
                );
            }
        }

        public void Update(Pessoa Pessoa)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"UPDATE
                             Pessoa
                         SET Nome = @nome, Sobrenome = @sobrenome, Email = @email
                       WHERE Id = @id";
                conexao.Execute(QUERY, new
                {
                    nome = Pessoa.nome,
                    sobrenome = Pessoa.sobreNome,
                    email = Pessoa.emailAdress,
                    id = Pessoa.Id
                });

            }
        }

        public Pessoa Details(int id)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"SELECT P.Id, P.Nome, P.SobreNome, P.Email as EmailAdress, P.IdTipoPessoa TipoPessoa,
                                     E.Bairro, E.Cep, E.Cidade as Localidade, E.Complemento, E.Id, E.Rua as Logradouro
                                FROM Pessoa P
                          INNER JOIN PessoaEndereco PE on P.Id = PE.IdPessoa
                          INNER JOIN Endereco E on PE.IdEndereco = E.Id
                               WHERE P.Id = @id";

                return conexao.Query<Pessoa, Endereco, Pessoa>(QUERY,
                (Pessoa, Endereco) =>
                {
                    Pessoa.endereco = Endereco;
                    return Pessoa;
                },
                new
                {
                    id = id
                },
                splitOn: "Bairro"
                ).Single();
            }
        }

        public void PessoaEndereco(int pessoaId, int enderecoId)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"INSERT
                        INTO PessoaEndereco(IdEndereco, IdPessoa)
                      VALUES
                             (@enderecoId, @pessoaId)";

                conexao.Execute(QUERY, new
                {
                    enderecoId = enderecoId,
                    pessoaId = pessoaId
                });
            }
        }
    }
}
