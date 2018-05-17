namespace Entidades
{
  public class Pessoa
  {
    public int Id { get; set; }
    public string tipoPessoa { get; set; }
    public string nome { get; set; }
    public string sobreNome { get; set; }
    public string emailAdress { get; set; }
    public Endereco endereco { get; set; }
  }
}
