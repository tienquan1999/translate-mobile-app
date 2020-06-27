const LANGUAGE = [
  {
    label: "Tiếng Việt",
    value: "vi"
  },
  {
    label: "Tiếng Anh",
    value: "en"
  },
  {
    label: "Tiếng Nhật",
    value: "ja"
  },
  {
    label: "Tiếng Hàn ",
    value: "ko"
  }
]
const TYPE_LANGUAGE = {
  FROM: 'from',
  TO: 'to'
}
const ACTION_LANGUAGE = {
  SWITCH: 'switch',
  CHANGE: 'change'
}
const TYPE_NOTICE_LANGUAGE = [
  {
    label: "Nhấn giữ để phát âm từ cần tra Tiếng Việt",
    value: "vi"
  },
  {
    label: "Keep pressing to pronounce the word to look up",
    value: "en"
  },
  {
    label: "押し続けると単語を発音して検索します",
    value: "ja"
  },
  {
    label: "단어를 찾아 발음하려면 계속 누르십시오. ",
    value: "ko"
  }
]
export {
  TYPE_LANGUAGE,
  ACTION_LANGUAGE,
  LANGUAGE,
  TYPE_NOTICE_LANGUAGE
}