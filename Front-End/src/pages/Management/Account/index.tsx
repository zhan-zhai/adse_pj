import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, message, Card, InputNumber } from 'antd'
import urlConfig from '@/urlConfig'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import {
  getItems,
  formLayout,
  validateMessages
} from '@/utils/utils'
import { Meta } from 'antd/es/list/Item'
import request from '@/utils/request'


const ImageTable: React.FC = () => { // modify
  const [balance, setBalance] = useState(0)
  const [addModelVisible, setAddModelVisible] = useState(false)

  const [addForm] = Form.useForm()

  const getData = async () => {
    const res = await getItems(urlConfig.ACCOUNT_GET, null)
    if (res) {
      setBalance(res.data)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const onAddOk = async () => {
    const success = await rechargeAccount(addForm.getFieldsValue())
    if (success) {
      setAddModelVisible(false)
      getData()
    }
  }

  const rechargeAccount = async (param: any) => {
    const hide = message.loading('充值中...')
    try {
      const res = await request.put(`${urlConfig.ACCOUNT_RECHARGE}/${param.amount}`, {})
      hide()
      if (res.code && res.code === '000') {
        message.success('充值成功！')
        return res
      }
      if (res.code && res.code !== '000') {
        message.error(`请求错误:${res.msg}`)
        return false
      }
      message.error(`请求错误:${res.message}`)
      return false

    } catch (error) {
      hide()
      message.error(`请求错误:${error}`)
      return false
    }
  }

  return (
    <PageContainer>

      <Card
        hoverable
        style={{ width: 240, marginLeft: 15, marginTop: 15 }}
        actions={[
          <Button
            onClick={() => setAddModelVisible(true)}
            icon={<ShoppingCartOutlined key='shipping_cart' />
            }>充值</Button>
        ]}
      >
        <Meta title={'账户余额'} description={'￥' + balance} />
      </Card>
      <Modal
        title='充值'
        visible={addModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'addForm' }}
        onCancel={() => setAddModelVisible(false)}
      >
        <Form
          name='addForm'
          form={addForm}
          {...formLayout}
          validateMessages={validateMessages}
          onFinish={onAddOk}
        >
          <Form.Item name='amount' label='充值金额' rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  )
}
export default ImageTable
