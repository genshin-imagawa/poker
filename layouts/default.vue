<template>
  <v-app>
    <!-- ヘッダー -->
    <v-system-bar class="pa-0 z-2" height="50" app>
      <v-sheet elevation="2" color="header" width="100%" height="100%" dark>
        <v-container class="px-5 py-0" fluid>
          <v-row no-gutters>
            <!-- ヘッダー左側 -->
            <v-col>
              <!-- システム名 -->
              <h1>Poker</h1>
            </v-col>
            <!-- ヘッダー右側 -->
            <v-col class="text-right">
              <!-- モード -->
              <v-fab-transition>
                <v-btn
                  color="modeBtnColor"
                  class="mt-2"
                  fab
                  x-small
                  @click.stop="changeMode"
                >
                  <v-icon class="ma-0" size="30" :color="mode.color">
                    {{ mode.icon }}
                  </v-icon>
                </v-btn>
              </v-fab-transition>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-system-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer absolute app color="footer" light>
      <v-container class="text-center fluid">
        <span class="ml-5">
          COPYRIGHT &copy; {{ new Date().getFullYear() }}
          IMAGAWA ALL RIGHTS RESERVED.
        </span>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      darkMode: false
    }
  },
  computed: {
    mode () {
      return this.darkMode
        ? { color: 'orange', icon: 'mdi-white-balance-sunny' }
        : { color: 'yellow', icon: 'mdi-weather-night' }
    }
  },
  methods: {
    changeMode () {
      this.darkMode = !this.darkMode
      this.$store.commit('common/setDarkMode', this.darkMode)
      this.$vuetify.theme.dark = this.darkMode
    }
  }
}
</script>
