<template>
  <CadastroPadrao @salvar="salvar"
                  @cancelar="cancelar"
                  :carregando="loading">
    <div class="row col-12 no-padding">
      <div class="col-12 col-md-12 q-pa-xs">
        <q-input :label="'Nome'"
                 dense
                 standout="bg-primary text-white"
                 v-model="cadastro.name"
                 />
      </div>

      <div class='col-12 col-md-6 q-pa-xs'>
        <q-input bottom-slots
                 :label="'Cnpj'"
                 dense
                 mask="##.###.###/####-##"
                 standout='bg-primary text-white'
                 unmasked-value
                 v-model='cadastro.cnpj'/>
      </div>

      <div class='col-12 col-md-6 q-pa-xs'>
        <q-input bottom-slots
                 :label="'Type'"
                 dense
                 standout='bg-primary text-white'
                 unmasked-value
                 v-model='cadastro.type'/>
      </div>

    </div>
  </CadastroPadrao>
</template>

<script setup
        lang="ts">
import {onBeforeMount, ref} from 'vue';
import CadastroPadrao from 'components/CadastroPadrao.vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import { useCompanyStore } from 'stores/company';
import { Company } from 'src/model/company/Company';

const store = useCompanyStore();
const router = useRouter();
const route = useRoute();
const parametro = ref('');
const loading = ref(true);
const {selecionada: cadastro} = storeToRefs(store);

function salvar() {
  loading.value = true;
  store.salvar(cadastro.value)
      .then(() => {
        loading.value = false;
        router.back();
      })
      .catch(() => {
        loading.value = false;
      });
}

function editar(id: string) {
  loading.value = true;
  store.pesquisarId(id)
      .then(() => {
        cadastro.value = store.companies;
      })
      .finally(() => {
        loading.value = false;
      });
}

function iniciar() {
  if (parametro.value === 'nova') {
    cadastro.value = new Company();
    loading.value = false;
  } else {
    editar(parametro.value);
  }
}

function cancelar() {
  router.back();
}

onBeforeMount(() => {
  parametro.value = route.params.id.toString();
  iniciar();
});
</script>
