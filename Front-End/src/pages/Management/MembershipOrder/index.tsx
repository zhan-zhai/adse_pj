import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Popconfirm,
  Card,
  Select,
  InputNumber,
  Switch, DatePicker,
  Cascader,
  Timeline,
} from 'antd';
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import {
    getItems,
    addItem,
    deleteItem,
    updateItem,
    formLayout,
    validateMessages,
    getAllMembershipGoods,
    updateOrder,
    payOrder, getOrderBystatus,confirmOrder,
} from '@/utils/utils';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import options from '@/utils/city.js';
import moment from 'moment';
import {json} from "express";
import {toNumber} from "lodash";

const url = urlConfig.ORDER_ALL_URL; // modify
const pay_url = urlConfig.ORDER_PAY_URL;
const cancel_url = urlConfig.ORDER_CANCEL_URL;
const status_url = urlConfig.ORDER_STATUS_URL;
const update_url = urlConfig.ORDER_UPDATE_URL;
const confirm_url = urlConfig.ORDER_CONFIRM_URL;

const CoachTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [membershipGoods, setMembershipGoods] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [modifyModelVisible, setModifyModelVisible] = useState(false);
  const [LogisticModelVisible, setLogisticModelVisible] = useState(false);

  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      size: pageInfo.pageSize,
      page: pageInfo.current - 1,
    }
    const res = await getItems(url, queryParams)
    if (res) {
      setData(res.data);
      setPageInfo({ ...pageInfo, total: res.data.totalElements })
    }
  };

  const getOrderByStatus = async () => {
      const status = searchForm.getFieldsValue().status;
      console.log(status);
      console.log(Number(status));
      var res;
      if(status === ""){
          res = await getItems(url,"");
      }else {
          res = await getOrderBystatus(status_url, Number(status));
      }
      if (res) {
          setData(res.data);
      }
  }

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  function onChange(value){
      // var formValues = editForm.getFieldsValue();
      // formValues.addressProvince = value[0];
      // formValues.addressCity = value[1];
      // formValues.addressDistinct = value[2];
      // console.log(formValues);
      console.log(value);
    }

  // const onAddOk = async () => {
  //   const formValues = addForm.getFieldsValue();
  //   const success = await addItem(url, { ...formValues });
  //   if (success) {
  //     setAddModelVisible(false);
  //     getData();
  //   }
  // };

  // const payOrder = (url, record:any) => {
  //   console.log(record);
  //
  // }

  // const onCancelModal(record: any) => {
  //
  // }

  const onModify = (record: any) => {
    console.log(record);
    //每次弹出来将address选择框置为空
    editForm.setFieldsValue({
      ...record,
      address:[record.addressProvince, record.addressCity, record.addressDistinct]
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    var requestParam;
    if(formValues.address == null){
        requestParam = {
            orderItemId: formValues.orderItemId,
            receiverName: formValues.receiverName,
            phoneNumber: formValues.phoneNumber,
            addressProvince:"",
            addressCity:"",
            addressDistinct:"",
            addressDetail:formValues.addressDetail
        };
    }else {
         requestParam = {
            orderItemId: formValues.orderItemId,
            receiverName: formValues.receiverName,
            phoneNumber: formValues.phoneNumber,
            addressProvince:formValues.address[0],
            addressCity:formValues.address[1],
            addressDistinct:formValues.address[2],
            addressDetail:formValues.addressDetail
        };
    }
    console.log("22222",requestParam);
    const success = await updateOrder(update_url,  {
      ...requestParam,
    });
    if (success) {
      setModifyModelVisible(false);
        getData();
    }
  };

  const Logistic = (record: any) => {
    console.log(record);
    setLogisticModelVisible(true);
  }

  return (
    <PageContainer>
        <Card>
            {/* modify */}
            <Form form={searchForm} id="searchForm" layout="inline">
                <Form.Item name="status">
                    <Select placeholder={"选择查询状态"}>
                        <Option value={""}>全部</Option>
                        <Option value={"0"}>未付款</Option>
                        <Option value={"1"}>待发货</Option>
                        <Option value={"2"}>待收货</Option>
                        <Option value={"3"}>已完成</Option>
                        <Option value={"4"}>已取消</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={getOrderByStatus}>查询</Button>
                </Form.Item>
            </Form>
        </Card>
      {/*<Card>*/}
      {/*  /!* modify *!/*/}
      {/*  <Form form={searchForm} layout="inline">*/}
      {/*    <Form.Item name="orderItemId" label="订单编号">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="userName" label="用户">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="commodityName" label="商品">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="type" label="型号">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="quantity" label="购买数量">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="totalPrice" label="总价">*/}
      {/*      <Input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="status" label="订单状态">*/}
      {/*      <input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="receiverName" label="收货人">*/}
      {/*      <input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="phoneNumber" label="联系电话">*/}
      {/*      <input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="address" label="收货地址">*/}
      {/*      <input />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item>*/}
      {/*      <Button type="primary" onClick={getData}>付款</Button>*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item>*/}
      {/*      <Button onClick={() => searchForm.resetFields()}>取消</Button>*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item>*/}
      {/*      <Button type="primary" onClick={() => setAddModelVisible(true)}>新增</Button>*/}
      {/*    </Form.Item>*/}
      {/*  </Form>*/}
      {/*</Card>*/}
      <br />
      <Card>
        <Table
          columns={[
            {
              title: '订单编号', // modify
              dataIndex: 'orderItemId',
              key: 'orderItemId',
            },
            {
              title: '用户', // modify
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '商品', // modify
              dataIndex: 'commodityName',
              key: 'commodityName',
            },
            {
              title: '型号', // modify
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: '购买数量', // modify
              dataIndex: 'quantity',
              key: 'quantity',
            },
            {
              title: '总价', // modify
              dataIndex: 'totalPrice',
              key: 'totalPrice',
            },
            {
              title: '订单状态', // modify
              dataIndex: 'status',
              key: 'status',
              render:(val:any) => {
                if(val === 0){
                  return "未付款";
                }
                if(val === 1){
                  return "待发货";
                }
                if(val === 2){
                  return "待收货";
                }
                if(val === 3){
                  return "已完成";
                }
                if(val === 4){
                  return "已取消";
                }
                return "";
              }
            },
            {
              title: '收货人', // modify
              dataIndex: 'receiverName',
              key: 'receiverName',
            },
            {
              title: '联系电话', // modify
              dataIndex: 'phoneNumber',
              key: 'phoneNumber',
            },
            {
              title: '收货地址', // modify
              dataIndex: 'addressMerge',
              key: 'addressMerge',
            },
            {
              title: '物流信息', // modify
              dataIndex: 'deliveryInfo',
              key: 'deliveryInfo',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => onModify(record)} disabled={(toNumber(record.status) > 1)}>编辑</Button>
                    <Popconfirm
                      title="确认付款？"
                      okText="确认"
                      cancelText="取消"
                      onConfirm={() => {
                        payOrder(pay_url, record.orderItemId).then(() => getData());
                      }}
                    >
                        <Button type="primary" ghost disabled={(toNumber(record.status) > 0)}>付款</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="确认收货？"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => {
                            confirmOrder(confirm_url, record.orderItemId).then(() => getData());
                        }}
                    >
                        <Button type="primary" ghost disabled={(toNumber(record.status) <= 1)}>收货</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="确认取消订单？"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => {
                          deleteItem(cancel_url, record.orderItemId).then(() => getData());
                        }}
                     >
                        <Button danger>取消</Button>
                     </Popconfirm>
                     <Button onClick={() => Logistic(record)} disabled={(toNumber(record.status) <= 1)}>查看物流</Button>                   
  {/*                    <Link to = "/order/logistic">
                       <Button type="primary" disabled={(toNumber(record.status) <= 1)}>
                         查看物流
                       </Button>
                     </Link> */}
                </Space>
              ),
            },
          ]}
          dataSource={data}
          pagination={pageInfo}
          onChange={(newPageInfo: any) => setPageInfo(newPageInfo)}
          rowKey={record => record.id}
        />
      </Card>
      {/*<Modal*/}
      {/*  title="新增"*/}
      {/*  visible={addModelVisible}*/}
      {/*  okButtonProps={{ htmlType: 'submit', form: 'addForm' }}*/}
      {/*  onCancel={() => setAddModelVisible(false)}*/}
      {/*>*/}
      {/*  <Form*/}
      {/*    name="addForm"*/}
      {/*    form={addForm}*/}
      {/*    {...formLayout}*/}
      {/*    validateMessages={validateMessages}*/}
      {/*    onFinish={onAddOk}*/}
      {/*  >*/}
      {/*    <Form.Item name="userId" label="用户ID" rules={[{ required: true, },]}>*/}
      {/*      <InputNumber />*/}
      {/*    </Form.Item>*/}
      {/*    <Form.Item name="membershipGoodsId" label="订单商品" rules={[{ required: true, },]}>*/}
      {/*      <Select placeholder={"选择会员商品"}>*/}
      {/*        {membershipGoods.map((d: any) => <Option value={d.id}>{d.name}</Option>)}*/}
      {/*      </Select>*/}
      {/*    </Form.Item>*/}
      {/*  </Form>*/}
      {/*</Modal>*/}
      <Modal
        title="编辑"
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={() => {setModifyModelVisible(false)}}
      >
        <Form name="editForm" form={editForm} {...formLayout} onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item name="orderItemId" label="订单编号" >
            <Input disabled/>
          </Form.Item>
          <Form.Item name="userName" label="用户" >
            <Input disabled/>
          </Form.Item>
          <Form.Item name="commodityName" label="商品" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="type" label="型号" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="quantity" label="购买数量" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="totalPrice" label="总价" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="receiverName" label="收货人" >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="联系电话" >
            <Input />
          </Form.Item>
            <Form.Item
                name="addressDetail"
                label="详细地址"
                help="如果修改的话，不用输入省市区"
            >
                <Input />
            </Form.Item>
            {/*<Text>如果修改的话，不用输入省市区</Text>*/}
          <Form.Item name="address" label="基本地址" >
            <Cascader name="addCas" options={options.options} placeholder="可修改省/市/区" onChange={onChange} />
          </Form.Item>
          <Form.Item name="deliveryInfo" label="物流信息" >
            <Input disabled/>
          </Form.Item>
          {/*<Form.Item name="memberShipGoodsType" label="订单会员类型" rules={[{ required: true, },]}>*/}
          {/*  <Select placeholder={"选择订单会员状态"}>*/}
          {/*    <Option value={"MONTH"}>月度会员</Option>*/}
          {/*    <Option value={"QUARTER"}>季度会员</Option>*/}
          {/*    <Option value={"YEAR"}>年度会员</Option>*/}
          {/*  </Select>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name="used" label="是否已经完成会员充值" rules={[{ required: true, },]}>*/}
          {/*  <Switch/>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name="orderString" label="支付宝接口生成信息" rules={[{ required: true, },]}>*/}
          {/*  <TextArea/>*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name={"orderCreateTime"} label="下单时间" rules={[{required: true,},]}>*/}
          {/*  <DatePicker*/}
          {/*    format={"YYYY-MM-DD HH:mm:ss"}*/}
          {/*    showTime={true}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name={"orderPayTime"} label="付款时间">*/}
          {/*  <DatePicker*/}
          {/*    format={"YYYY-MM-DD HH:mm:ss"}*/}
          {/*    showTime={true}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
          {/*<Form.Item name={"orderCanceledTime"} label="取消时间">*/}
          {/*  <DatePicker*/}
          {/*    format={"YYYY-MM-DD HH:mm:ss"}*/}
          {/*    showTime={true}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
        </Form>
      </Modal>

      <Modal
          title="查看物流"
          visible={LogisticModelVisible}
          onOk={() =>{setLogisticModelVisible(false)}} 
          onCancel={() => {setLogisticModelVisible(false)}}>
        <Timeline>
            <Timeline.Item color="gray">商品已下单 2021-12-13 19:21</Timeline.Item>
            <Timeline.Item color="gray">包裹正在收揽 2021-12-14 14:02</Timeline.Item>
            <Timeline.Item color="gray">【上海杨浦B站】揽收成功 2021-12-14 18:15</Timeline.Item>
            <Timeline.Item>【上海转运中心】，正在发往【北京运转中心】2021-12-14 20:38</Timeline.Item>
          </Timeline>
        </Modal>

    </PageContainer>
  );
}
export default CoachTable;
