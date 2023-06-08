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
  Collapse,
} from 'antd';
const { Panel } = Collapse;
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import {
    getItems,
    addItem,
    formLayout,
    validateMessages,
    modifyAddress,
} from '@/utils/utils';
import options from '@/utils/city.js';

const url = urlConfig.ADDRESS_GET_URL; // modify
const url_modify = urlConfig.ADDRESS_MODIFY_URL;
const url_create = urlConfig.ADDRESS_CREAT_URL;

const CoachTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [modifyModelVisible, setModifyModelVisible] = useState(false);

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

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  function onChange(value){
      console.log(value);
    }

    const addAddress = async () => {
      const formValues = addForm.getFieldsValue();
        var requestParam;
        if(formValues.address == null){
            requestParam = {
                receiverName: formValues.receiverName,
                phoneNumber: formValues.phoneNumber,
                addressProvince:"",
                addressCity:"",
                addressDistinct:"",
                addressDetail:formValues.addressDetail
            };
        }else {
            requestParam = {
                receiverName: formValues.receiverName,
                phoneNumber: formValues.phoneNumber,
                addressProvince:formValues.address[0],
                addressCity:formValues.address[1],
                addressDistinct:formValues.address[2],
                addressDetail:formValues.addressDetail
            };
        }
        // console.log("add address",requestParam);
        const res = await addItem(url_create, requestParam)
        if (res) {
            getData();
        }
    };

  // const onAddOk = async () => {
  //   const formValues = addForm.getFieldsValue();
  //   const success = await addItem(url, { ...formValues });
  //   if (success) {
  //     setAddModelVisible(false);
  //     getData();
  //   }
  // };

  const onModify = (record: any) => {
    // console.log("modify",record);
    editForm.setFieldsValue({
      ...record,
        address:[record.addressProvince,record.addressCity,record.addressDistinct]
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    console.log(formValues)
    const requestParam = {
        id: formValues.id,
        userId: formValues.userId,
        orderItemId: formValues.orderItemId,
        receiverName: formValues.receiverName,
        phoneNumber: formValues.phoneNumber,
        addressProvince:formValues.address[0],
        addressCity:formValues.address[1],
        addressDistinct:formValues.address[2],
        addressDetail:formValues.addressDetail
    };
    // console.log("22222",requestParam);
    const success = await modifyAddress(url_modify,  {
      ...requestParam,
    });
    if (success) {
      setModifyModelVisible(false);
    }
  };

  return (
    <PageContainer>
        <Collapse bordered={false}>
            <Panel header="新增地址" key="1" >
                <Form form={addForm} layout="horizontal">
                    <Form.Item name="receiverName" label="收货人" rules={[{ required: true, },]} >
                        <Input />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="手机号" rules={[{ required: true, },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="基本地址" rules={[{ required: true, },]}>
                        <Cascader name="addCas" options={options.options} placeholder="可选择省/市/区" onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        name="addressDetail"
                        label="详细地址"
                        help="不用输入省市区"
                        rules={[{ required: true, },]}
                    >
                        <Input />
                    </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={addAddress}>新增</Button>
                  </Form.Item>
                </Form>
            </Panel>
        </Collapse>
      <br />
      <Card>
        <Table
          columns={[
            {
              title: '地址编号', // modify
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '收货人', // modify
              dataIndex: 'receiverName',
              key: 'receiverName',
            },
            {
              title: '手机号', // modify
              dataIndex: 'phoneNumber',
              key: 'phoneNumber',
            },
            {
              title: '省/自治区', // modify
              dataIndex: 'addressProvince',
              key: 'addressProvince',
            },
          {
              title: '市/州', // modify
              dataIndex: 'addressCity',
              key: 'addressCity',
          },
          {
              title: '区/县', // modify
              dataIndex: 'addressDistinct',
              key: 'addressDistinct',
          },
            {
              title: '详细地址', // modify
              dataIndex: 'addressDetail',
              key: 'addressDetail',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => onModify(record)}>编辑</Button>
                    {/*<Popconfirm*/}
                    {/*    title="确认？"*/}
                    {/*    okText="确认"*/}
                    {/*    cancelText="取消"*/}
                    {/*    onConfirm={() => {*/}
                    {/*      deleteItem(cancel_url, record.orderItemId).then(() => getData());*/}
                    {/*    }}*/}
                    {/* >*/}
                    {/*    <Button danger>删除</Button>*/}
                    {/* </Popconfirm>*/}
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
      <Modal
        title="编辑"
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={() => {setModifyModelVisible(false)}}
      >
        <Form name="editForm" form={editForm} {...formLayout} onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item name="id" label="地址编号" >
            <Input disabled/>
          </Form.Item>
          <Form.Item name="userId" label="用户id" style={{ display: 'none' }}>
            <Input disabled/>
          </Form.Item>
          <Form.Item name="receiverName" label="收货人" >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="手机号" >
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
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CoachTable;
