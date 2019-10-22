import Taro from '@tarojs/taro'
import * as api from '../service/black'

export default {
  namespace: 'black_detail',
  state: {
    blackIndex: 0,
    rate: '',
    actionShow: false,
    rateList:[]
  },
  effects: {
    * submit ({ payload }, { call, put }) {
      const response = yield call(api.updateRateApi, { ...payload })
      if (response.errMsg === 'collection.add:ok') {
        Taro.atMessage({ message: '提交成功', type: 'success' })
        yield put({ type: 'saveAction', payload: { actionShow: false } })
        yield put({ type: 'saveRate', payload: { rate: '' } })
        yield put({ type: 'getRateList', payload: { _id: payload.father } })
      }
    },
    * getRateList ({ payload }, { call, put }) {
      const response = yield call(api.getRateListApi, { ...payload })
      if (response.errMsg === 'collection.get:ok') {
        yield put({ type: 'saveState', payload: { rateList: response.data } })
      }
    },
  },
  reducers: {
    saveFetch (state, { payload }) {
      return { ...state, ...payload }
    },
    saveRate (state, { payload }) {
      return { ...state, ...payload }
    },
    saveState (state, { payload }) {
      return { ...state, ...payload }
    },
    saveAction (state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
