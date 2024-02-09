import { defineStore } from 'pinia';
import { Paginacao } from 'src/model/Paginacao';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { cloneDeep } from 'lodash';
import axios from 'axios';
import { Notify } from 'quasar';
import { Company, CompanyFiltro } from 'src/model/company/Company';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    registros: new Array<Company>(),
    paginacao: new Paginacao(0, 0, 0, 0, false),
    selecionada: new Company(),
    filtro: new CompanyFiltro(),
    parametros: ''
  }),

  getters: {
    companies(state) {
      if (state.selecionada) {
        return cloneDeep(state.selecionada);
      } else {
        return new Company();
      }
    }
  },

  actions: {
    salvar(companies: Company) {
      return new Promise<void>((resolve, reject) => {
        axios
          .post('/api/companies', companies)
          .then(data => {
            this.SAVE_COMPANY(data.data as Company);
            Notify.create({
              type: 'positive',
              position: 'top',
              caption: 'salvoComSucesso'
            });
            resolve();
          })
          .catch(erro => {
            Notify.create({
              type: 'negative',
              position: 'top',
              message: 'erroAoSalvar',
              caption: erro.message as string
            });
            reject();
          });
      });
    },
    excluir(company: Company): Promise<void> {

          return new Promise<void>((resolve, reject) => {
            axios
              .delete(`/api/companies/${company.id}`)
              .then(() => {
                const indexToRemove = this.registros.findIndex(item => item.id === company.id);
                if (indexToRemove !== -1) {
                  this.registros.splice(indexToRemove, 1);
                }
                Notify.create({
                  type: 'positive',
                  position: 'top',
                  caption: 'excluidoComSucesso'
                });
              })
              .catch(function(erro) {
                Notify.create({
                  type: 'negative',
                  position: 'top',
                  message: 'erroNaExclusao',
                  caption: erro.mensagem as string
                });
                reject();
              });
          });
    },
    pesquisar(filtro: CompanyFiltro) {
      this.SET_FILTRO(filtro);
      const params = this.parametros;

      return new Promise<void>((resolve, reject) => {
        axios
          .get('/api/companies', { params })
          .then(data => {
            this.SET_TIPOS_CUSTO(data.data as Company[]);
            resolve();
          })
          .catch(function(erro) {
            Notify.create({
              type: 'negative',
              position: 'top',
              message: 'erroNaPesquisa',
              caption: erro.message as string
            });
            reject();
          });
      });
    },
    pesquisarId(id: string) {
      return new Promise<void>((resolve, reject) => {
        axios
          .get(`/api/companies/${id}`)
          .then(data => {
            this.SET_COMPANY(data.data as Company);
            resolve();
          })
          .catch(erro => {
            Notify.create({
              type: 'negative',
              position: 'top',
              message: 'erroNaPesquisa',
              caption: erro.message as string
            });
            reject();
          });
      });
    },
    carregar() {
      const params = {
        search: this.parametros,
        page: this.paginacao.paginaAtual + 1,
        sort: 'textoSort,asc'
      };

      return new Promise<void>((resolve, reject) => {
        axios
          .get('/api/companies', { params })
          .then(data => {
            this.ADD_TIPOS_CUSTO(data.data);
            resolve();
          })
          .catch(erro => {
            Notify.create({
              type: 'negative',
              position: 'top',
              message: 'erroCarregar',
              caption: erro.mensagem as string
            });
            reject();
          });
      });
    },
    limpar() {
      return new Promise<void>(resolve => {
        this.CLEAR_TIPOS_CUSTO();
        resolve();
      });
    },
    SET_FILTRO(payload: CompanyFiltro) {
      this.filtro = payload;
    },
    SAVE_COMPANY(payload: Company) {
      if (this.registros) {
        const posicao = this.registros.findIndex((item) => item.id === payload.id);
        if (posicao >= 0) {
          this.registros[posicao] = payload;
        } else {
          this.registros.push(payload);
        }
      } else {
        this.registros = new Array<Company>();
        this.registros.push(payload);
      }
    },
    SET_COMPANY(payload: Company) {
      this.selecionada = payload;
    },
    SET_TIPOS_CUSTO(payload: any) {
      this.paginacao.paginaAtual = payload.number as number;
      this.paginacao.totalPaginas = payload.totalPages as number;
      this.paginacao.registrosCarregados = payload.numberOfElements as number;
      this.paginacao.totalRegistros = payload.totalElements as number;
      this.paginacao.ultima = payload.last as boolean;
      this.registros = payload.content as Company[];
    },
    ADD_TIPOS_CUSTO(payload: any) {
      this.paginacao.paginaAtual = payload.number as number;
      this.paginacao.registrosCarregados += payload.numberOfElements as number;
      this.paginacao.ultima = payload.last as boolean;
      this.registros = [...this.registros, ...payload.content as Company[]];
    },
    CLEAR_TIPOS_CUSTO() {
      this.$reset();
    }
  }
});
