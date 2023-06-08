import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Form, Card, Radio, InputNumber, Upload, message, Select } from 'antd'
import urlConfig from '@/urlConfig'
import { PageContainer } from '@ant-design/pro-layout'
import {
  getItems,
  formLayout,
  validateMessages,
} from '@/utils/utils'
import styles from './index.less'
import {
  ShoppingCartOutlined,
  WalletOutlined
} from '@ant-design/icons'
import request from '@/utils/request'

const { Meta } = Card

const url = urlConfig.COMMODITY_ALL_URL // modify
const MembershipGoodsTable: React.FC = () => { // modify
  const [data, setData] = useState([])
  const [addresses, setAddresses] = useState([])
  const [addShoppingCartModelVisible, setAddShoppingCartModelVisible] = useState(false)
  const [modifyModelVisible, setModifyModelVisible] = useState(false);

  const [currentGoodsTypes, setCurrentGoodsTypes] = useState([])

  const [searchForm] = Form.useForm()
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm();


  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
    }
    const res = await getItems(url, queryParams)
    if (res) {
      setData(res.data)
    }
  }

  const getAddresses = async () => {
    const res = await getItems(urlConfig.ADDRESS_GET_URL, {})
    if (res) {
      console.log(res)
      setAddresses(res.data)
    }
  }

  useEffect(() => {
    getData(),
    getAddresses();
  }, [])

  const onAdd = async (item) => {
    addForm.setFieldsValue({
      id: item.id,
      name: item.name,
      introduction: item.introduction,
      type: item.commodityTypes[0].id,
      quantity: 1
    })
    console.log(item.commodityTypes)
    setCurrentGoodsTypes(item.commodityTypes)
    setAddShoppingCartModelVisible(true)
  }

  const onAddOk = async () => {
    const success = await addToShoppingCart({
      typeId:addForm.getFieldsValue().type,
      quantity:addForm.getFieldsValue().quantity
    });
    if (success) {
      setAddShoppingCartModelVisible(false);
    }
  }

  const addToShoppingCart = async ( param: any) => {
    const hide = message.loading('添加到购物车...');
    try {
      const res = await request.post(urlConfig.ADD_TO_SHOPPING_CART, {data:param});
      hide();
      if(res.code && res.code === '000'){
        message.success('添加到购物车成功！');
        return res;
      }
      if(res.code && res.code !== '000'){
        message.error(`请求错误:${  res.msg}`);
        return false;
      }
      message.error(`请求错误:${  res.message}`);
      return false;

    } catch (error) {
      hide();
      message.error(`请求错误:${  error}`);
      return false;
    }
  }

  const onBuy = async (item: any) => {
    editForm.setFieldsValue({
      id: item.id,
      name: item.name,
      introduction: item.introduction,
      type: item.commodityTypes[0].id,
      quantity: 1
    })
    console.log(item.commodityTypes)
    setCurrentGoodsTypes(item.commodityTypes)
    setModifyModelVisible(true)
  }

  const onModifyOk = async () => {
    const success = await createOrderFromCommodityDetail({
      typeId:editForm.getFieldsValue().type,
      quantity:editForm.getFieldsValue().quantity,
      addressId:editForm.getFieldsValue().addressId,
    });
    if (success) {
      setModifyModelVisible(false);
    }
  };

  const createOrderFromCommodityDetail = async (param: any) => {
    const hide = message.loading('下单中...');
    try {
      const res = await request.post(urlConfig.ORDER_FROM_COMMODITY, {data:param});
      hide();
      if(res.code && res.code === '000'){
        message.success('下单成功！');
        return res;
      }
      if(res.code && res.code !== '000'){
        message.error(`请求错误:${  res.msg}`);
        return false;
      }
      message.error(`请求错误:${  res.message}`);
      return false;

    } catch (error) {
      hide();
      message.error(`请求错误:${  error}`);
      return false;
    }
  }

  return (
    <PageContainer>
      <div>
        <Card>
          {/* modify */}
          <Form form={searchForm} layout='inline'>
            <Form.Item name='name' label='检索商品名称'>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={getData}>查询</Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => searchForm.resetFields()}>重置</Button>
            </Form.Item>
          </Form>
        </Card>
        <br />

        <div className={styles.card}>
          {data.map((item, index) => {
            return <Card
              key={item.id}
              hoverable
              style={{ width: 240, marginLeft: 15, marginTop: 15 }}
              cover={<img alt='example' src={urlConfig.FILE_DOWNLOAD_URL + item.commodityTypes[0].image} />}
              actions={[
                <Button
                  onClick={() => {
                    onAdd(item)
                  }}
                  icon={<ShoppingCartOutlined key='shipping_cart' />
                  }>加入购物车</Button>,
                <Button
                  onClick={() => {
                    onBuy(item)
                  }}
                  icon={<WalletOutlined key='buy' label={'购买'} />}>下单</Button>
              ]}
            >
              <Meta title={item.name} description={item.introduction} />
            </Card>
          })
          }
        </div>

        <Modal
          title="加入购入车"
          visible={addShoppingCartModelVisible}
          okButtonProps={{ htmlType: 'submit', form: 'addForm' }}
          onCancel={() => {setAddShoppingCartModelVisible(false)}}
        >
          <Form
            name="addForm"
            form={addForm}
            {...formLayout}
            onFinish={onAddOk}
            validateMessages={validateMessages}
          >
            <Form.Item name="id" label="商品id" style={{display:'none'}} >
              <Input disabled/>
            </Form.Item>
            <Form.Item name="name" label="商品名称" >
              <Input disabled/>
            </Form.Item>
            <Form.Item name="introduction" label="商品简介" >
              <Input disabled />
            </Form.Item>
            <Form.Item name="type" label={"商品分类"} rules={[{ required: true, }]}>
              <Radio.Group >
              {currentGoodsTypes.map(d =>
                  <Radio.Button key={d.id} value={d.id}>{d.type}</Radio.Button>
              )}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="quantity" label="数量" rules={[{ required: true, }]}>
              <InputNumber />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="下单"
          visible={modifyModelVisible}
          okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
          onCancel={() => setModifyModelVisible(false)}
        >
          <Form name="editForm" form={editForm} {...formLayout} onFinish={onModifyOk} validateMessages={validateMessages}>
            <Form.Item name="id" label="商品id" style={{display:'none'}} >
              <Input disabled/>
            </Form.Item>
            <Form.Item name="name" label="商品名称" >
              <Input disabled/>
            </Form.Item>
            <Form.Item name="introduction" label="商品简介" >
              <Input disabled />
            </Form.Item>
            <Form.Item name="type" label={"商品分类"} rules={[{ required: true, }]}>
              <Radio.Group >
                {currentGoodsTypes.map(d =>
                  <Radio.Button key={d.id} value={d.id}>{d.type}</Radio.Button>
                )}
              </Radio.Group>
            </Form.Item>
            <Form.Item name="addressId" label={"地址"} rules={[{ required: true, }]}>
              <Select >
                {addresses.map(d =>
                  <Select.Option key={d.id} value={d.id}>{d.addressDetail}</Select.Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item name="quantity" label="数量" rules={[{ required: true, }]}>
              <InputNumber />
            </Form.Item>
          </Form>

        </Modal>
      </div>
    </PageContainer>
  )

}
export default MembershipGoodsTable
