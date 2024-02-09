<template>
  <PesquisaPadrao @load="onLoad"
                  @pesquisou="listar($event)"
                  @limpou="limpar"
                  :filtro="filtro.name"
                  :statusPesquisa="statusPesquisa"
                  :paginacao="paginacao"
                  :carregando="carregando"
                  pathNovo="/company/nova">
    <template v-slot:listagem>
      <pesquisa-item v-for="(company, index) in itens"
                     :key="company.id"
                     :id="index"
                     :item="company"/>
    </template>
  </PesquisaPadrao>
</template>

<script setup
        lang="ts">
import PesquisaPadrao from 'components/PesquisaPadrao.vue';
import PesquisaItem from './CompanyPesquisaItem.vue';
import {Paginacao} from 'src/model/Paginacao';
import {computed, ref} from 'vue';
import { useCompanyStore } from 'stores/company';
import { Company, CompanyFiltro } from 'src/model/company/Company';

const store = useCompanyStore();
const filtro = ref(new CompanyFiltro());
const efetuouPesquisa = ref(store.registros.length > 0);
const carregando = ref(false);

function onLoad(index: number, done: any) {
  if (paginacao.value.ultima) {
    done(true);
  } else {
    if (efetuouPesquisa.value) {
      store.carregar().then(() => {
        done();
      }).finally(null);
    } else {
      done();
    }
  }
}

function listar(texto: string) {
  carregando.value = true;
  filtro.value.name = texto;
  store.pesquisar(filtro.value)
      .then(() => {
        efetuouPesquisa.value = true;
        carregando.value = false;
      })
      .catch(() => {
        carregando.value = false;
      });
}

function limpar() {
  store.limpar().then(() => {
    filtro.value = new CompanyFiltro();
    efetuouPesquisa.value = false;
  }).finally(null);
}

const itens = computed(() => {
  return (store.registros as Company[]);
});
const paginacao = computed(() => {
  return (store.paginacao as Paginacao);
});
const statusPesquisa = computed(() => {
      if (itens.value) {
        if (itens.value.length > 0) {
          return 1;
        } else {
          if (efetuouPesquisa.value) {
            return 2;
          } else {
            return 0;
          }
        }
      } else {
        if (efetuouPesquisa.value) {
          return 2;
        } else {
          return 0;
        }
      }
    },
);
</script>
