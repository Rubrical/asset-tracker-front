<template>
  <div class="q-pa-none"
       v-if="show">
    <q-expansion-item v-model="aberto"
                      v-if="menu && menu.length > 0"
                      class="text-grey-5"
                      :icon="icone"
                      dense
                      :label="titulo"
                      :header-class="cabecalho">
      <MenuLink v-for="subMenu in menu"
                :key="subMenu.titulo"
                v-bind="subMenu"
                nivel/>
    </q-expansion-item>
    <q-item v-else
            dense
            clickable
            v-ripple
            :disable="disable"
            tag="a"
            :to="link">
      <q-item-section v-if="icone"
                      avatar
                      :class="nivel && subNivel">
        <q-icon :name="icone"/>
      </q-item-section>
      
      <q-item-section>
        <q-item-label lines="1">{{titulo}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script setup
        lang="ts">
import {computed, PropType, ref} from 'vue';
import {MenuItem} from 'components/models';


defineProps({
  titulo: {type: String},
  link: {type: String, default: '#'},
  icone: {type: String, default: ''},
  nivel: {type: Boolean},
  menu: {
    type: (Array as PropType<MenuItem[]>),
    default: () => [] as MenuItem[],
  },
  show: {type: Boolean},
  disable: {type: Boolean},
});

const subNivel = ref('q-pl-md');
const aberto = ref(false);

const cabecalho = computed(() => { return aberto.value ? 'text-primary' : '';});

</script>
