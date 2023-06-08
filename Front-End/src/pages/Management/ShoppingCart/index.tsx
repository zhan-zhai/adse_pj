import React, { useEffect, useState } from 'react'
import { Button, Form, message, Select, Table } from 'antd'
import urlConfig from '@/urlConfig'
import {
  getItems
} from '@/utils/utils'
import request from '@/utils/request'

const columns = [
  {
    title: 'ID',
    dataIndex: 'cartItemId',
  },
  {
    title: '商品名',
    dataIndex: 'commodityName',
  },
  {
    title: '类别',
    dataIndex: 'type',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
  },
];

const MembershipGoodsTable: React.FC = () => { // modify
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(false)

  const onSelectChange = (selectedRowKeys:any) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const [data, setData] = useState([])
  const [searchForm] = Form.useForm()

  const getData = async () => {
    const res = await getItems(urlConfig.CART_GET, {} )
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
  const onMakeOrder = async () => {
    if(!searchForm.getFieldsValue().addressId){
      message.error("请选择地址后下单！")
      return
    }
    const res = await makeOrder( {cartItemIdList: selectedRowKeys, addressId: searchForm.getFieldsValue().addressId} )
    if (res) {
      getData()
    }
  }

  const makeOrder = async (param: any) => {
    const hide = message.loading('下单中...');
    try {
      const res = await request.post(urlConfig.CART_MAKE_ORDER, {data:param});
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

  useEffect(() => {
    getData()
    setLoading(true)
    getAddresses()
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000);
  }, [])


  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Form form={searchForm} layout="inline">
          <Form.Item name="addressId" label={"地址"} rules={[{ required: true, }]}>
            <Select placeholder={"选择地址"}>
              {addresses.map((d:any) =>
                <Select.Option key={d.id} value={d.id}>{d.addressDetail}</Select.Option>
              )}
            </Select>
          </Form.Item>
        <Button type="primary" onClick={onMakeOrder} disabled={!hasSelected} loading={loading}>
          下单
        </Button>
        </Form>

        <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
      </div>
      <Table rowKey="cartItemId" rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );

}
export default MembershipGoodsTable
