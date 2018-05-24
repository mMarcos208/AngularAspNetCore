using Dapper;
using Entidades;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Repository.EnderecoRepository
{
    public class EnderecoRepository : IRepository<Endereco>
    {
        private string strConexao = "Server=.\\sqlexpress; Database=angularCore; Trusted_Connection=True; MultipleActiveResultSets=true";

        public EnderecoRepository()
        {

        }

        public int Create(Endereco endereco)
        {
            using (var conexao = new SqlConnection(strConexao))
            {
                var QUERY = @"INSERT
                        INTO Endereco(Cep, Rua, Bairro, Cidade, Complemento)
                      OUTPUT INSERTED.[Id]
                      VALUES
                             (@cep, @logradouro, @bairro, @cidade, @complemento)";

                return conexao.Query<int>(QUERY, new
                {
                    cep = endereco.cep,
                    logradouro = endereco.logradouro,
                    bairro = endereco.bairro,
                    cidade = endereco.cidade,
                    complemento = endereco.complemento
                }).Single();
            }
        }

        public void Delete(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Endereco> List()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Endereco t)
        {
            throw new System.NotImplementedException();
        }

        public Endereco Details(int cep)
        {
            var QUERY = @"SELECT Id, Cep, Rua as logradouro, Bairro, Cidade, Complemento
                      FROM Endereco
                     WHERE Cep = @cep";

            using (var conexao = new SqlConnection(strConexao))
            {
                return conexao.QuerySingle<Endereco>(QUERY, new { @cep = cep });
            }
        }
    }
}
