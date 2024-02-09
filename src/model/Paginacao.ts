export class Paginacao {
  paginaAtual: number
  totalPaginas: number
  registrosCarregados: number
  totalRegistros: number
  ultima: boolean

  constructor(
    paginaAtual?: number,
    totalPaginas?: number,
    registrosCarregados?: number,
    totalRegistros?: number,
    ultima?: boolean
  ) {
    this.paginaAtual = paginaAtual
    this.totalPaginas = totalPaginas
    this.registrosCarregados = registrosCarregados
    this.totalRegistros = totalRegistros
    this.ultima = ultima || true
  }
}
