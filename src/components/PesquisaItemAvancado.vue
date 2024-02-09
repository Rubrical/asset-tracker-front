<template>
  <div class="row caixa items-center q-px-sm q-py-xs">
    <div class="col-sm col-xs-12 q-pa-xs">
      <slot></slot>
    </div>
    <div class="col-sm-auto col-xs q-pa-sm"
         v-if="acaoPrincipal">
      <q-btn class="bg-grey-3 text-accent full-width"
             flat
             :icon="acaoPrincipal.icon"
             no-caps
             :disable="acaoPrincipal.disable"
             @click="acaoPrincipal.click()">
        {{acaoPrincipal.label}}
      </q-btn>
    </div>
    <div class="col-sm-auto q-pa-xs"
         v-if="acoesSecundarias">
      <q-btn-dropdown class="bg-grey-3"
                      text-color="accent"
                      flat
                      dense
                      rounded
                      dropdown-icon="las la-ellipsis-h">
        <q-list v-close-popup
                class="text-accent">
          <template v-for="(acao, index) in acoesSecundarias"
                    :key="index">
            <q-item clickable
                    dense
                    @click="acao.click()"
                    :disable="acao.disable"
                    class="q-ma-xs"
                    style="border-radius: 4px">
              <q-item-section v-if="acao.icon"
                              side>
                <q-icon color="accent"
                        :name="acao.icon"/>
              </q-item-section>
              <q-item-section>{{acao.label}}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>

<script setup
        lang="ts">
import {PropType} from 'vue';
import {ActionButton} from 'src/model/ActionButton';

defineProps({
  acaoPrincipal: {type: Object as PropType<ActionButton>},
  acoesSecundarias: {type: Array as PropType<ActionButton[]>},
});
</script>
