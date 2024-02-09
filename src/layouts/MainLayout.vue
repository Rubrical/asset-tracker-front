<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

<!--        <div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      :width="230"
      class="bg-secondary text-grey-4"
      v-if="true">

      <q-scroll-area style="height: calc(100% - 50px); margin-top: 50px;">
        <LayoutMenu />
      </q-scroll-area>

      <q-toolbar class="bg-primary absolute-top">
        <q-toolbar-title>
        Assent Tracker
        </q-toolbar-title>
      </q-toolbar>

    </q-drawer>

    <q-page-container class="bg-grey-1 animado">
      <router-view v-slot="{ Component }">
        <transition appear
                    leave-active-class="animated slideOutLeft"
                    enter-active-class="animated slideInRight"
                    mode="out-in"
                    duration="350"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LayoutMenu from 'layouts/LayoutMenu.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { LayoutMenu },

  // components: {
  //   EssentialLink
  // },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
