import React, { useEffect, useState } from 'react'
import { useQuery, View, Button, showToast, showModal, Textarea } from 'remax/wechat'
import { SpecialTip } from '@/components'
import { getRateListApi, submitRateApi } from '@/service/black'

export interface DetailTypes {
  _id: string;
  name: string;
  info: string;
  time: string;
  checked: boolean;
}

export interface RateListTypes {
  _id: string;
  content: string;
}

export interface SubmitResTypes {
  result: {
    errMsg: 'collection.add:ok' | '';
    errCode: number
  };
  errMsg: 'collection.add:ok' | '';
}

interface ResTypes {
  errMsg: 'collection.get:ok';
  result: {
    list: Array<DetailTypes>;
    total: number;
  };
  data: Array<RateListTypes>;
}

export default () => {
  const [detail, setDetail] = useState<DetailTypes>({
    _id: '',
    name: '',
    info: '',
    time: '',
    checked: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [rateList, setRateList] = useState<Array<RateListTypes>>([])
  const [rateVal, setRateVal] = useState<string>('')
  const fetchRate = (detail: DetailTypes) => {
    setLoading(true)
    getRateListApi({ _id: detail._id })
      .then((res: ResTypes) => {
        setLoading(false)
        if (res.errMsg === 'collection.get:ok') {
          setRateList(res.data)
        }
      })
  }
  
  const submit = () => {
    if (!rateVal.length) {
      showToast({ icon: 'none', title: '请输入内容' })
    } else {
      showModal({
        title: '提示',
        content: '是否确认提交？'
      }).then((r) => {
        if (r.confirm) {
          setSubmitLoading(true)
          submitRateApi({ father: detail._id, content: rateVal, checked: true, name: detail.name })
            .then((res: SubmitResTypes) => {
              setSubmitLoading(false)
              if (res.result.errMsg === 'collection.add:ok') {
                setRateVal('')
                showToast({ icon: 'success', title: '提交成功' })
                fetchRate(detail)
              } else if (res.result.errCode === 87014) {
                showToast({ icon: 'none', title: '内容含有违法违规内容' })
              } else {
                showToast({ icon: 'none', title: '系统异常' })
              }
            })
        }
      })
    }
  }
  
  const query = useQuery()
  useEffect(() => {
    const detail = JSON.parse(query.detail)
    setDetail(detail)
    fetchRate(detail)
  }, [])
  return (
    <View>
      <view className="page__hd">
        <view className="page__title">{detail.name}</view>
        <view className="page__desc">{detail.time}</view>
      </view>
      <view className="page__bd">
        <view className="weui-article">
          <view className="weui-article__section">
            <view className="weui-article__section">
              <view className="weui-article__p">{detail.info}</view>
            </view>
            <view className="weui-article__h2">网友点评</view>
            <view className="weui-article__section">
              {rateList.length !== 0 ? rateList.map((item: RateListTypes) =>
                  <View key={item._id} className="weui-article__p">{item.content}</View>) :
                <view className="weui-loadmore weui-loadmore_line">
                  <view className="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
                </view>}
              {loading && <view className="weui-loadmore">
                <view className="weui-loading"/>
                <view className="weui-loadmore__tips">正在加载</view>
              </view>}
            </view>
          </view>
        </view>
      </view>
      <View className="weui-form">
        <View className="weui-cells__group weui-cells__group_form">
          <View className="weui-cells weui-cells_form">
            <View className="weui-cell">
              <View className="weui-cell__bd">
                <Textarea className="weui-textarea" value={rateVal} placeholder='我要点评...'
                          onInput={e => setRateVal(e.detail.value)}/>
              </View>
            </View>
          </View>
        </View>
        <View className="weui-form__opr-area">
          <Button type="primary" loading={submitLoading} onClick={() => submit()}>提交</Button>
        </View>
        <SpecialTip/>
      </View>
    </View>
  )
}