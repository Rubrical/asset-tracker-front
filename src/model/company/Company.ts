export class Company {
  id: number;
  name: string;
  type: string;
  cnpj: string;
  invoices: string;
  assets: Asset[];
  liabilities: Liability[];

  constructor(
    id?: number,
    name?: string,
    cnpj?: string,
    invoices?: string,
    assets?: Asset[],
    liabilities?: Liability[]
  ) {
    this.id = id;
    this.name = name;
    this.cnpj = cnpj;
    this.invoices = invoices;
    this.assets = assets || new Array<Asset>();
    this.liabilities = liabilities || new Array<Liability>();
  }
}
export class CompanyFiltro {
  id: string;
  name: string;

  constructor(filtro?: CompanyFiltro) {
    if (filtro) {
      this.id = filtro.id;
      this.name = filtro.name;
    }
  }
}

export class Asset {
  id: number;
  name: string;
  value: number;

  constructor(
    id?: number,
    name?: string,
    value?: number
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}

export class Liability {
  id: number;
  name: string;
  value: number;

  constructor(
    id?: number,
    name?: string,
    value?: number
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}
