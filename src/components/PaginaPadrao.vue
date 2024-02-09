<template>
  <q-page class="q-pa-md">
    <q-card class="cardExterno bg-grey-3">
      <q-item dense
              class="bg-grey-5 text-black">
        <q-item-section>
          <div class="text-subtitle1">{{titulo}}</div>
        </q-item-section>
        <q-item-section side
                        class="text-black"
                        v-if="$attrs.atualizou">
          <q-btn flat
                 dense
                 icon="mdi-reload"
                 v-on:click="emit('atualizou')">
            <q-tooltip> {{'recarregar'}}</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
      <q-card-section class="cardInterno q-py-sm q-px-none animado">
        <router-view v-slot="{ Component }">
          <transition leave-active-class="animated fadeOut"
                      enter-active-class="animated fadeIn"
                      mode="out-in"
                      duration="300">
            <component :is="Component"/>
          </transition>
        </router-view>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup
        lang="ts">

defineProps({titulo: String});
const emit = defineEmits(['atualizou']);
</script>
