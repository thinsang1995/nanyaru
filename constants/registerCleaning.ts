import { RulesProps } from '../typing/utils'

type RegisterFieldKeys =
  | 'cleanName'
  | 'cleanFurigana'
  | 'cleanPostCode'
  | 'cleanExperience'
  | 'cleanPhoneNumber'
  | 'cleanNumOfAirCon'
  | 'cleanNumOfAirConOut'
  | 'cleanOtherRequest'
  | 'cleanOtherMenu'
  | 'dayOne'
  | 'startTimeOne'
  | 'endTimeOne'
  | 'dayTwo'
  | 'startTimeTwo'
  | 'endTimeTwo'
  | 'dayThree'
  | 'startTimeThree'
  | 'endTimeThree'
  | 'cleanAddress'
  | 'cleanBike'
  | 'cleanOtherWarning'

type RegisterFields = Record<RegisterFieldKeys, string>

export const usingItems = [
  { label: '初めて', value: '初めて' },
  { label: '2回目以降', value: '2回目以降' },
]

export const airConItems = [
  { label: '0台', value: '0台' },
  { label: '1台', value: '1台' },
]

export const airConOutItems = [
  { label: '0台', value: '0台' },
  { label: '1台', value: '1台' },
]

export const otherMenuItems = [
  { label: 'キッチン', value: 'キッチン' },
  { label: 'レンジフード', value: 'レンジフード' },
  { label: 'ガスコンロ', value: 'ガスコンロ' },
  { label: 'バスルーム', value: 'バスルーム' },
  { label: 'バスルームのエプロン内部', value: 'バスルームのエプロン内部' },
  { label: 'トイレ', value: 'トイレ' },
  { label: '洗面台', value: '洗面台' },
  { label: 'バスルーム鏡の鱗落とし(オプション)', value: 'バスルーム鏡の鱗落とし(オプション)' },
]

export const experienceItems = [
  { label: '未経験', value: 'NoExp' },
  { label: '1年未満', value: 'Exp1Year' },
  { label: '1~3年未満', value: 'ExpLess3Years' },
  { label: '3年以上', value: 'ExpMore3Years' },
]

const timeItems = [
  { label: '指定なし', value: '指定なし' },
  { label: '11時', value: '11時' },
  { label: '12時', value: '12時' },
  { label: '13時', value: '13時' },
  { label: '14時', value: '14時' },
  { label: '15時', value: '15時' },
  { label: '16時', value: '16時' },
  { label: '17時', value: '17時' },
  { label: '18時', value: '18時' },
  { label: '19時', value: '19時' },
  { label: '20時', value: '20時' },
]

export const bikeItems = [
  { label: '有り', value: '0台' },
  { label: '無し', value: '1台' },
  { label: '確認中', value: '1台' },
]

export const chidrenEducateItems = [
  { label: '有り', value: '0台' },
  { label: '無し', value: '1台' },
]

type IFieldValue = {
  items: { label: string; value: string }[]
  type: 'radio' | 'select' | 'input' | 'multiselect' | 'date' | 'textarea'
  inputType?: 'text' | 'tel'
  question: string[]
  suffix?: string[]
  rules: RulesProps
  placeholder?: string
}

const registerCleaning: Record<RegisterFieldKeys, IFieldValue> = {
  cleanName: {
    items: [],
    type: 'input',
    inputType: 'text',
    question: ['お名前'],
    placeholder: '例：田中 太郎',
    rules: {
      required: {
        value: true,
        message: '名前を入力してください。',
      },
      maxLength: {
        value: 30,
        message: 'フルネームが長すぎて登録ができません。',
      },
    },
  },
  cleanFurigana: {
    items: [],
    type: 'input',
    inputType: 'text',
    question: ['フリガナ'],
    placeholder: '例：クリーニング タロウ',
    rules: {
      required: {
        value: true,
        message: '名前を入力してください。',
      },
      maxLength: {
        value: 30,
        message: 'フルネームが長すぎて登録ができません。',
      },
    },
  },
  cleanPhoneNumber: {
    items: [],
    type: 'input',
    inputType: 'tel',
    question: ['電話番号(※お急ぎの場合や返信不通時のみに使用します)'],
    placeholder: '例：09012345678',
    rules: {
      required: {
        value: true,
        message: '電話番号を入力してください。',
      },
      pattern: {
        value: /(\d{2,3})\-?(\d{3,4})\-?(\d{4})/,
        message: '有効な電話番号を入力してください。',
      },
      maxLength: {
        value: 11,
        message: '有効な電話番号を入力してください。',
      },
      minLength: {
        value: 11,
        message: '有効な電話番号を入力してください。',
      },
    },
  },
  cleanPostCode: {
    items: [],
    type: 'input',
    inputType: 'tel',
    question: ['郵便番号を教えてください。'],
    placeholder: '例：1110001',
    rules: {
      required: {
        value: true,
        message: '郵便番号を入力してください。',
      },
      pattern: {
        value: /(\d{3})(\d{4})/,
        message: '有効な郵便番号を入力してください。',
      },
      maxLength: {
        value: 8,
        message: '有効な郵便番号を入力してください。',
      },
    },
  },
  cleanExperience: {
    items: usingItems,
    type: 'radio',
    question: ['ご利用は初めてですか?'],
    rules: {
      required: {
        value: true,
        message: '一つを選択してください。',
      },
    },
  },
  cleanNumOfAirCon: {
    items: airConItems,
    type: 'select',
    question: ['エアコンクリーニング(お掃除機能なし)'],
    rules: {
      required: {
        value: true,
        message: '一つを選択してください。',
      },
    },
  },
  cleanNumOfAirConOut: {
    items: airConOutItems,
    type: 'select',
    question: ['エアコン室外機 ※床据え置きタイプのみご対応となります。'],
    rules: {
      required: {
        value: true,
        message: '一つを選択してください。',
      },
    },
  },
  cleanOtherRequest: {
    items: [],
    type: 'input',
    inputType: 'text',
    question: ['エアコンクリーニングをご希望の方はもしわかれば型番をご記入ください。'],
    placeholder: '例：田中 太郎',
    rules: {},
  },
  cleanOtherMenu: {
    items: otherMenuItems,
    type: 'multiselect',
    question: ['【水回りメニュー】※オプションのみのご注文は出来ません。'],
    rules: {
      required: {
        value: true,
        message: '一つを選択してください。',
      },
    },
  },
  dayOne: {
    items: [],
    type: 'date',
    question: ['第1希望の日付を選択してください。'],
    rules: {
      required: {
        value: true,
        message: '希望日付を選択してください。',
      },
    },
  },
  startTimeOne: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  endTimeOne: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  dayTwo: {
    items: [],
    type: 'date',
    question: ['第2希望の日付を選択してください。'],
    rules: {},
  },
  startTimeTwo: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  endTimeTwo: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  dayThree: {
    items: [],
    type: 'date',
    question: ['第3希望の日付を選択してください。'],
    rules: {},
  },
  startTimeThree: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  endTimeThree: {
    items: timeItems,
    type: 'select',
    question: [''],
    rules: {},
  },
  cleanAddress: {
    items: [],
    type: 'input',
    inputType: 'text',
    question: ['住所を教えてください。'],
    placeholder: '例)〇〇区〇〇番地(マンション名)',
    rules: {},
  },
  cleanBike: {
    items: bikeItems,
    type: 'radio',
    question: [
      '当日は三輪バイクでお伺いさせていただきます。敷地内に駐輪スペースはございますか?(路上駐車はお断りさせていただいています。)',
    ],
    rules: {
      required: {
        value: true,
        message: '一つを選択してください。',
      },
    },
  },
  cleanOtherWarning: {
    items: [],
    type: 'textarea',
    question: [
      '【※ご注文の前にご確認ください※】◎当日は水場やお湯などをお借りさせていただきます。 お客様の大切なお品物を守れるよう、清掃箇所には極力物がないようお願いいたします。O清掃に塩素系漂白剤は使用しない為浴室のゴム部分などに長年根付いたカビ染み込み・長年放置していた頑固な汚れ等は除去が難しい場合もあります。 台風や大雪など天候状況によっては前日や当日判断で日程を再調整いただく場合があります。 お支払いは当日現金のお支払いでお願いしております。 聞きたいこと、洗剤の使い心地などお伝えしたい事、ご自由にお書きください!',
    ],
    rules: {},
  },
}

export type { RegisterFields, RegisterFieldKeys }

export default registerCleaning
