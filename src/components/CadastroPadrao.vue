<template>
  <q-form ref="formPrincipal"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
          greedy>
    <q-scroll-area class="formInterno q-px-sm">
      <div class="row no-padding">
        <slot></slot>
      </div>
    </q-scroll-area>
    <q-separator/>
    <q-card-actions align="right"
                    class="q-pa-sm">
      <q-btn dense
             icon="las la-save"
             class="bg-accent text-white"
             @click="salvar()">{{'salvar'}}
      </q-btn>
      <q-btn dense
             icon="las la-undo"
             class="bg-accent text-white"
             @click="cancelar()">{{'cancelar'}}
      </q-btn>
    </q-card-actions>
    <q-inner-loading :showing="carregando">
      <q-spinner-gears size="50px"
                       class="absolut-center"
                       color="accent"/>
    </q-inner-loading>
  </q-form>
</template>

<script setup
        lang="ts">
import {ref} from 'vue';
import {QForm, useQuasar} from 'quasar';

defineProps(['carregando', 'readonly']);
const emit = defineEmits(['salvar', 'cancelar']);

const formPrincipal = ref((null as QForm));
const $q = useQuasar();

function salvar() {
  formPrincipal.value.validate().then((success: boolean) => {
    if (success) {
      emit('salvar');
    } else {
      $q.notify({
        type: 'warning',
        message: 'Validação Campos',
      });
    }
  });
}

function cancelar() { emit('cancelar');}
</script>
