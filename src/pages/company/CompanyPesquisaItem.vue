<template>
    <PesquisaItemAvancado :acao-principal="principal"
                          :acoes-secundarias="secundarias">
    <q-item-section>
      <q-item-label> {{itemLocal.id}} - {{itemLocal.name}}</q-item-label>
    </q-item-section>
  </PesquisaItemAvancado>
</template>

<script setup
        lang='ts'>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { cloneDeep } from 'lodash';
import PesquisaItemAvancado from 'components/PesquisaItemAvancado.vue';
import { Company } from 'src/model/company/Company';
import { ActionButton } from 'src/model/ActionButton';
import { useCompanyStore } from 'stores/company';

const props = defineProps(['item', 'id']);
const router = useRouter();
const store = useCompanyStore();
const principal = new ActionButton('alterar', 'las la-edit', editar);
const secundarias = [
    new ActionButton('excluir', 'las la-trash', excluir)
]

function excluir() {
  store.excluir(itemLocal.value).finally(null);
}

const itemLocal = computed(() => cloneDeep(props.item) as Company);

function editar() {
  router.push('company/'.concat(itemLocal.value.id.toString())).finally(null);
}
</script>
