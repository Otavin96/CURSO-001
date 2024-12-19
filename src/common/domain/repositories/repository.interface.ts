// TIPO de dados de entrada para pesquisar itens no banco.
export type SearchInput = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: string | null
  filter?: string | null
}

// TIPO de dados de saida para pesquisar itens no banco.
export type SearchOutput<Model> = {
  items: Model[]//----> um array para armazenar os registro do banco
  per_page: number// ----> quantidade de registro por pagina
  total: number// ---> total de registros cadastrados
  current_page: number// ---> pagina atual
  sort: string | null//----> qual campo sera ordenado
  sort_dir: string | null//-----> qual tipo de Ordenação DECRESCENTE | CRESCENTE
  filter: string | null//------> o que será filtrado
}

//Interface comum a qualquer modelo de dados que precise criar, inserir, procurar dado pelo ID,
//atualizar dados, deletar dados e fazer uma pesquisa dos dados cadastrados no banco
export interface RepositoryInterface<Model, CreateProps> {
  create(props: CreateProps): Model
  insert(model: Model): Promise<Model>
  findById(id: string): Promise<Model>
  update(model: Model): Promise<Model>
  delete(id: string): Promise<void>
  search(props: SearchInput): Promise<SearchOutput<Model>>
}
