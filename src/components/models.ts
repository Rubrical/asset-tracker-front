export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface MenuItem {
  titulo: string;
  icone: string;
  link: string;
  show: boolean;
  disable: boolean;
  menu: MenuItem[];
}
