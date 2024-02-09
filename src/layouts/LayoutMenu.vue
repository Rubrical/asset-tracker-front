<template>
  <q-list class='q-mt-md'>
    <MenuLink v-for='link in menuLinks'
              :key='link.titulo'
              v-bind='link'/>
  </q-list>
</template>

<script setup
        lang='ts'>
import MenuLink from 'components/MenuLink.vue';
import {computed} from 'vue';

const menuLinks = computed(() => {
  return [
    {
      titulo: 'Painel',
      icone: 'las la-table',
      link: '/',
      show: true,
    },
    {
      titulo: 'Companias',
      icone: 'las la-user-friends',
      link: '/company',
      show: true,
    }
  ];
});
</script>
