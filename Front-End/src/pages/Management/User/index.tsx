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
  Divider,
  DatePicker,
  InputNumber, Upload, Switch,
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
  normFile,
  url2UploadFileList, uploadFileList2Url,
} from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const url = urlConfig.USER_URL; // modify

const CoachTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [modifyModelVisible, setModifyModelVisible] = useState(false);

  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const { Option } = Select;

  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      size: pageInfo.pageSize,
      page: pageInfo.current - 1,
    }
    const res = await getItems(url, queryParams)
    if (res) {
      setData(res.data.content);
      setPageInfo({ ...pageInfo, total: res.data.totalElements })
    }
  };

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  const onAddOk = async () => {
    const record = addForm.getFieldsValue();
    const success = await addItem(url, {
      ...record,
      iconUrl: uploadFileList2Url(record.iconUrl),
      registerTime: record.registerTime? moment(record.registerTime, "YYYY-MM-DD HH:mm:ss"): null,
      membershipExpirationDate: record.membershipExpirationDate? moment(record.membershipExpirationDate, "YYYY-MM-DD"): null,
      birthday: record.birthday? record.birthday.format("YYYY-MM") : null,
    });
    if (success) {
      setAddModelVisible(false);
      getData();
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({
      ...record,
      iconUrl: url2UploadFileList(record.iconUrl),
      registerTime: record.registerTime? moment(record.registerTime, "YYYY-MM-DD HH:mm:ss"): null,
      basicInfoUpdateTime: record.basicInfoUpdateTime? moment(record.basicInfoUpdateTime, "YYYY-MM-DD HH:mm:ss"): null,
      membershipExpirationDate: record.membershipExpirationDate? moment(record.membershipExpirationDate, "YYYY-MM-DD"): null,
      birthday: record.birthday? moment(record.birthday, "YYYY-MM"): null,
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const iconUrl = uploadFileList2Url(formValues.iconUrl);
    const success = await updateItem(url, editForm.getFieldValue("id"), {
      ...editForm.getFieldsValue(),
      iconUrl,
      registerTime: formValues.registerTime? formValues.registerTime.format("YYYY-MM-DD HH:mm:ss"): null,
      basicInfoUpdateTime: formValues.basicInfoUpdateTime? formValues.basicInfoUpdateTime.format("YYYY-MM-DD HH:mm:ss"): null,
      membershipExpirationDate: formValues.membershipExpirationDate? formValues.membershipExpirationDate.format("YYYY-MM-DD"): null,
      birthday: formValues.birthday? formValues.birthday.format("YYYY-MM") : null,
    });
    if (success) {
      setModifyModelVisible(false);
      getData();
    }
  };

  return (
    <PageContainer>
      <Card>
        {/* modify */}
        <Form form={searchForm} layout="inline">
          <Form.Item name="id" label="ID">
            <Input />
          </Form.Item>
          <Form.Item name="username" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="用户类型">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={getData}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => searchForm.resetFields()}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setAddModelVisible(true)}>新增</Button>
          </Form.Item>
        </Form>
      </Card>
      <br />
      <Card>
        <Table
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '用户名', // modify
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '用户类型', // modify
              dataIndex: 'authorities',
              key: 'authorities',
              render:(value => {
                if(value[0].authority === 'ROLE_ADMIN'){
                  return "管理员"
                } else if (value[0].authority === 'ROLE_SELLER'){
                  return  "卖家"
                } else {
                  return "买家"
                }
              })
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                  <Button onClick={() => onModify(record)}>编辑</Button>
                  <Popconfirm
                    title="确认删除？"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => {
                      deleteItem(url, record.id).then(() => getData());
                    }}
                  >
                    <Button danger>删除</Button>
                  </Popconfirm>
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
        title="新增"
        visible={addModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'addForm' }}
        onCancel={() => setAddModelVisible(false)}
      >
        <Form
          name="addForm"
          form={addForm}
          {...formLayout}
          validateMessages={validateMessages}
          onFinish={onAddOk}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true, },]}>
            <Input placeholder={"请输入用户名"}/>
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, },]}>
            <Input placeholder={"请输入密码"}/>
          </Form.Item>
          <Form.Item name="type" label="用户类型" rules={[{ required: true, },]}>
            <Select placeholder="请选择用户类型" allowClear>
              <Option value={"seller"}>卖家</Option>
              <Option value={"buyer"}>买家</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑"
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={() => setModifyModelVisible(false)}
      >
        <Form name="editForm" form={editForm} {...formLayout} onFinish={onModifyOk} validateMessages={validateMessages}>
          <Divider>账号信息</Divider>
          <Form.Item label="ID" name="id" rules={[{ required: true, },
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="username" label="账号" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="用户类型" rules={[{ required: true, },]}>
            <Select placeholder="请选择用户类型" allowClear>
              <Option value={"seller"}>卖家</Option>
              <Option value={"buyer"}>买家</Option>
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CoachTable;
