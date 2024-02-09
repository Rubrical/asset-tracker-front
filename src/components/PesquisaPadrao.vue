<template>
  <div class="q-px-sm">
    <div class="row no-padding">
      <div class="col-md-8 col-sm-7 col-xs-12 q-pa-xs"
           :class="[pathNovo ? 'col-md-8 col-sm-7 ': 'col-md-10 col-sm-9 ']">
        <q-input dense
                 standout="bg-primary text-white"
                 clearable
                 v-on:keyup.enter="pesquisou"
                 clear-icon="las la-times"
                 type="text"
                 v-model="padrao"
                 :label="'Dados de Pesquisa'">
          <template v-slot:append
                    v-if="pesquisaAvancadaHabilitada">
            <q-icon name="las la-cog"
                    class="cursor-pointer"
                    color="accent"
                    @click="exibir = !exibir">
              <q-tooltip>{{ 'pesquisaAvancada' }}</q-tooltip>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-xs-12 q-pa-none row"
           :class="[pathNovo ? 'col-md-4 col-sm-5 ': 'col-md-2 col-sm-3 ']">
        <div class="col q-pa-xs">
          <q-btn class="bg-accent text-white full-width full-height"
                 icon="las la-search"
                 flat
                 dense
                 @click="pesquisou">
            <q-tooltip>{{ 'pesquisar' }}</q-tooltip>
          </q-btn>
        </div>
        <div class="col q-pa-xs">
          <q-btn class="bg-accent text-white full-width full-height"
                 icon="las la-eraser"
                 flat
                 dense
                 @click="limpou">
            <q-tooltip>{{ 'limpar' }}</q-tooltip>
          </q-btn>
        </div>
        <div class="col q-pa-xs"
             v-if="pathNovo">
          <q-btn class="bg-accent text-white full-width full-height"
                 icon="las la-plus"
                 flat
                 dense
                 :to="pathNovo">
            <q-tooltip>{{ 'incluir' }}</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
    <div class="q-pa-xs bks-lista"
         v-if="statusPesquisa === 2">
      <pesquisa-padrao-vazia />
    </div>
    <div class="q-pa-xs"
         v-else>
      <q-list class="scroll bks-lista"
              id="scrollTarget">
        <q-scroll-observer @scroll="onScroll" />
        <slot name="listagem"></slot>
        <q-infinite-scroll v-if="paginacao['totalRegistros'] > 0 && !paginacao['ultima']"
                           @load="load"
                           :offset="150"
                           scroll-target="#scrollTarget">
          <template v-slot:loading>
            <div class="text-center q-pa-none">
              <q-spinner-dots color="accent"
                              size="30px" />
            </div>
          </template>
        </q-infinite-scroll>
        <q-inner-loading :showing="carregando">
          <q-spinner-gears size="50px"
                           class="absolut-center"
                           color="accent" />
        </q-inner-loading>
      </q-list>
    </div>
    <div class="q-pa-xs"
         v-if="statusPesquisa === 1">
      <q-bar class="bg-grey-1 caixa text-accent">
        <div class="bks-rodape gt-sm">
          <slot name="legenda"></slot>
        </div>
        <q-space />
        <div class="bks-rodape">
          {{ ('registrosCarregados', {
          carregados: paginacao['registrosCarregados'],
          total: paginacao['totalRegistros']
        }) }}
        </div>
      </q-bar>
    </div>
    <q-dialog v-model="exibir">
      <q-card style="width: 75vw; max-width: 85vw; max-height: 85vh;">
        <q-item dense
                class="bg-grey-5 text-black">
          <q-item-section>
            <div class="text-subtitle1">{{ 'pesquisaAvancada' }}</div>
          </q-item-section>
          <q-item-section side
                          class="text-black">
            <q-btn dense
                   flat
                   icon="close"
                   v-close-popup>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-card-section class="q-pa-sm">
          <q-form class="row">
            <slot name="pesquisaAvancada"></slot>
          </q-form>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn icon="las la-search"
                 class="bg-accent text-white"
                 :label="'pesquisar'"
                 flat
                 dense
                 @click="pesquisou"
                 v-close-popup />
          <q-btn icon="las la-eraser"
                 class="bg-accent text-white"
                 :label="'limpar'"
                 dense
                 flat
                 @click="limpou" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup
        lang="ts">
import PesquisaPadraoVazia from './PesquisaPadraoVazia.vue';
import { onMounted, PropType, ref, useSlots } from 'vue';
import { Paginacao } from 'src/model/Paginacao';
import { useScrollStore } from 'src/model/scroll';

const props = defineProps({
  filtro: String,
  pathNovo: String,
  statusPesquisa: Number,
  paginacao: { type: Object as PropType<Paginacao> },
  carregando: Boolean
});

const emit = defineEmits(['limpou', 'pesquisou', 'load', 'cancelarItem']);
const slots = useSlots();
const exibir = ref(false);
const padrao = ref(props.filtro);
const pesquisaAvancadaHabilitada = ref(false);
const scroll = useScrollStore();

function pesquisou() {
  emit('pesquisou', padrao.value);
}

function load(index: number, done: boolean) {
  emit('load', index, done);
}

function limpou() {
  padrao.value = '';
  emit('limpou');
}

onMounted(() => {
  if (slots.pesquisaAvancada) {
    pesquisaAvancadaHabilitada.value = true;
  }

  if (scroll.scrollTop > 0) {
    const scrollTarget = document.getElementById('scrollTarget');
    if (scrollTarget) {
      scrollTarget.scrollTop = scroll.scrollTop;
    }
  }
});

function onScroll(info: any) {
  scroll.scrollTop = info.position.top;
}
</script>

<style scoped
       lang="scss">
.bks-lista {
  height: calc(100vh - 246px);
}

@media (max-width: 599px) {
  .bks-lista {
    height: calc(100vh - 287px);
  }
}

.bks-rodape {
  font-size: small;
}

@media (max-width: 599px) {
  .bks-rodape {
    font-size: 0.72rem;
  }
}
</style>
