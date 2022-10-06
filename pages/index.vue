<template>
  <v-container class="mt-10">
    <v-row>
      <v-col cols="1" />
      <v-col v-for="hand in hands" :key="hand.index" cols="2">
        <v-row>
          <v-col cols="12">
            <v-img :src="cardName(hand)" />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="hand.suit"
              :items="suitItems(hand)"
              return-object
              hide-details
              outlined
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="hand.number"
              :items="numberItems(hand)"
              hide-details
              outlined
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" />
      <v-col cols="12" class="text-center">
        <h1>{{ judge }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const SUIT = {
  HEART: { text: 'heart', value: 0 },
  DIAMOND: { text: 'diamond', value: 1 },
  SPADE: { text: 'spade', value: 2 },
  CLUB: { text: 'club', value: 3 }
}

const HAND = {
  NO_PAIR: { name: '役なし', rank: 9, pattern: '' },
  ONE_PAIR: { name: 'ワンペア', rank: 8, pattern: '11234' },
  TWO_PAIR: { name: 'ツーペア', rank: 7, pattern: '11223' },
  THREE_CARD: { name: 'スリーカード', rank: 6, pattern: '11123' },
  FOUR_CARD: { name: 'フォーカード', rank: 2, pattern: '11112' },
  FULL_HOUSE: { name: 'フルハウス', rank: 3, pattern: '11122' },
  FLUSH: { name: 'フラッシュ', rank: 4, pattern: '' },
  STRAIGHT: { name: 'ストレート', rank: 5, pattern: '' },
  STRAIGHT_FLUSH: { name: 'ストレートフラッシュ', rank: 1, pattern: '' }
}

export default {
  name: 'IndexPage',
  data () {
    return {
      // 手札
      hands: [
        { index: 0, suit: SUIT.HEART, number: 1 },
        { index: 1, suit: SUIT.DIAMOND, number: 3 },
        { index: 2, suit: SUIT.SPADE, number: 5 },
        { index: 3, suit: SUIT.CLUB, number: 7 },
        { index: 4, suit: SUIT.CLUB, number: 9 }
      ],
      suitList: [SUIT.HEART, SUIT.DIAMOND, SUIT.SPADE, SUIT.CLUB],
      numberList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
  },
  computed: {
    // 選択可能なスートのリスト
    suitItems () {
      return (selectedHand) => {
        const usedSuitList = []
        this.hands.forEach((hand) => {
          if (
            hand.index !== selectedHand.index &&
            hand.number === selectedHand.number
          ) {
            usedSuitList.push(hand.suit)
          }
        })
        return this.suitList.filter((suit) => {
          return !usedSuitList.includes(suit)
        })
      }
    },
    // 選択可能な数字のリスト
    numberItems () {
      return (selectedHand) => {
        const usedNumberList = []
        this.hands.forEach((hand) => {
          if (
            hand.index !== selectedHand.index &&
            hand.suit === selectedHand.suit
          ) {
            usedNumberList.push(hand.number)
          }
        })
        return this.numberList.filter((number) => {
          return !usedNumberList.includes(number)
        })
      }
    },
    // 役判定
    judge () {
      // パターン判定できる役を取得
      const pattern = this.getPattern()
      const patternHand = this.getPatternHand(pattern)
      const isFlush = this.isFlush()
      const isStraight = this.isStraight()
      // ストレートフラッシュ
      if (isFlush && isStraight) {
        return HAND.STRAIGHT_FLUSH.name
      }
      // フラッシュ
      if (patternHand.rank > HAND.FLUSH.rank && isFlush) {
        return HAND.FLUSH.name
      }
      // ストレート
      if (patternHand.rank > HAND.STRAIGHT.rank && isStraight) {
        return HAND.STRAIGHT.name
      }
      return patternHand.name
    },
    cardName () {
      return (selectedHand) => {
        return (
          '/assets/img/card_' +
          selectedHand.suit.text +
          '_' +
          selectedHand.number +
          '.png'
        )
      }
    }
  },
  created () {},
  methods: {
    // フラッシュ判定
    isFlush () {
      const firstSuit = this.hands[0].suit
      return (
        this.hands.filter(hand => hand.suit === firstSuit).length ===
        this.hands.length
      )
    },
    // ストレート判定
    isStraight () {
      let isStraight = true
      const hasKing = this.hands.filter(hand => hand.number === 13).length > 0
      const handsNumberList = this.hands
        .map((hand) => {
          if (hasKing && hand.number === 1) {
            return 14
          } else {
            return hand.number
          }
        })
        .sort((a, b) => a - b)
      let beforeNumber = null
      handsNumberList.forEach((number) => {
        if (beforeNumber && number !== beforeNumber + 1) {
          isStraight = false
        } else {
          beforeNumber = number
        }
      })
      return isStraight
    },
    // パターン取得
    getPattern () {
      const numberList = this.hands
        .map(hand => hand.number)
        .sort((a, b) => {
          const aLength = this.hands.filter(hand => hand.number === a).length
          const bLength = this.hands.filter(hand => hand.number === b).length
          return bLength === aLength ? b - a : bLength - aLength
        })
      let value = 1
      let beforeNumber = null
      let pattern = ''
      numberList.forEach((number) => {
        if (!beforeNumber || number === beforeNumber) {
          pattern += String(value)
        } else {
          pattern += String(++value)
        }
        beforeNumber = number
      })
      return pattern
    },
    // パターンから判定できる役を取得
    getPatternHand (pattern) {
      let result = HAND.NO_PAIR
      Object.keys(HAND).forEach((hand) => {
        if (pattern === HAND[hand].pattern) {
          result = HAND[hand]
        }
      })
      return result
    }
  }
}
</script>
