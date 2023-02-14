import { instance } from '../../common'
export const tableAPI = {
  getPack: (data: RequestGetParamsPack) =>
    instance.get<ResponseGetPacks>(`cards/pack`, { params: { ...data } }),
  createPack: (data: RequestCreatePack) =>
    instance.post<ResponsePack>('cards/pack', { cardsPack: data }),
  deletePack: (data: string) => instance.delete<ResponsePack>(`cards/pack?id=${data}`),
  updatePack: (data: RequestUpdatePack) =>
    instance.put<RequestDeletePack>('cards/pack', { cardsPack: data }),
  getCards: (data: RequestGetParamsCard) =>
    instance.get<ResponseGetCard>('cards/card', { params: { ...data } }),
  createCard: (data: RequestCreateCard) =>
    instance.post<ResponseCard>('cards/card', { card: data }),
  deleteCard: (data: RequestDeleteCard) => instance.delete<ResponseCard>(`cards/card?id=${data}`),
  updateCard: (data: RequestUpdateCard) => instance.put<ResponseCard>('cards/card', { card: data }),
}

//Response
export type ResponseGetPacks = {
  cardPacks: CardsPack[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type ResponseGetCard = {
  cards: Cards[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
export type ResponsePack = {
  newCardsPack: CardsPack
  token: string
  tokenDeathTime: number
}
export type ResponseCard = {
  newCard: Cards
  token: string
  tokenDeathTime: number
}

//Request params
export type RequestGetParamsPack = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  // чьи колоды не обязательно, или придут все
  block?: boolean
}
export type RequestGetParamsCard = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

//Request pack
export type RequestCreatePack = {
  name?: string
  deckCover?: string
  private?: boolean
}
export type RequestDeletePack = {
  id: string
}
export type RequestUpdatePack = {
  _id: string
  name: string
}

//Request card
export type RequestCreateCard = {
  question?: string // если не отправить будет таким
  answer?: string // если не отправить будет таким
  grade?: number // 0..5, не обязателен
  shots?: number // не обязателен
  answerImg?: string // не обязателен
  questionImg?: string // не обязателен
  questionVideo?: string // не обязателен
  answerVideo?: string // не обязателен
}
export type RequestDeleteCard = {
  id: string
}
export type RequestUpdateCard = {
  _id: string
  question: string
}

// types
export type CardsPack = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export interface Cards {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  questionImg: string
  answerImg: string
  answerVideo: string
  questionVideo: string
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}
