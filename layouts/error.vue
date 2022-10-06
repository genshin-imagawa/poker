<template>
  <v-app dark>
    <v-container class="mt-10">
      <v-row>
        <v-col cols="12">
          <span>システムエラーが発生しました。</span>
        </v-col>
        <v-col cols="12">
          <span>お手数ですがページを再読み込みしてください。</span>
        </v-col>
        <v-col cols="12" class="py-0">
          <span class="text-overline">
            ステータスコード：{{ error.statusCode }}
          </span>
        </v-col>
        <v-col cols="12" class="py-0">
          <span class="text-overline">
            エラーメッセージ：{{ error.message }}
          </span>
        </v-col>
        <v-col cols="12">
          <v-btn color="primary" @click.stop="reload()">
            <v-icon left>
              mdi-reload
            </v-icon>
            <span>再読み込み</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title: 'システムエラー'
    }
  },
  methods: {
    reload () {
      location.reload()
    }
  }
}
</script>
