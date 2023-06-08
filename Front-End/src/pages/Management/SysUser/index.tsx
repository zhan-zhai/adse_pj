import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, Popconfirm, Card, Select, message } from 'antd';
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, addItem, deleteItem, updateItem, formLayout, validateMessages } from '@/utils/utils';
import request from '@/utils/request';

const url = urlConfig.SYS_USER_URL; // modify

const CoachTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [modifyModelVisible, setModifyModelVisible] = useState(false);
  const [modifyPasswordModelVisible, setModifyPasswordModelVisible] = useState(false);

  const [searchForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editPasswordForm] = Form.useForm();

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
    const success = await addItem(url, { ...addForm.getFieldsValue() });
    if (success) {
      setAddModelVisible(false);
      getData();
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({ ...record});
    setModifyModelVisible(true);
  }

  const onModifyPassword = (record: any) => {
    console.log(record);
    editPasswordForm.setFieldsValue({ id: record.id, newPassword: undefined});
    setModifyPasswordModelVisible(true);
  }

  const onModifyOk = async () => {
    const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue() });
    if (success) {
      setModifyModelVisible(false);
      getData();
    }
  };

  const onModifyPasswordOk = async () => {
    const hide = message.loading('修改密码...');
    try {
      const res = await request.put(`${urlConfig.CHANGE_PASSWORD_URL}`, {data:editPasswordForm.getFieldsValue()});
      hide();
      if(res.code && res.code === '000'){
        setModifyPasswordModelVisible(false);
        message.success('修改密码成功！');
      }
      if(res.code && res.code !== '000'){
        message.error(`请求错误:${  res.msg}`);
      }
    } catch (error) {
      hide();
      message.error(`请求错误:${  error}`);
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
          <Form.Item name="username" label="账号">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select placeholder="选择角色" allowClear>
              <Option value={"ROLE_ADMIN"}>超级管理员</Option>
              <Option value={"ROLE_SYS_USER"}>系统管理员</Option>
            </Select>
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
              title: '账号', // modify
              dataIndex: 'username',
              key: 'username',
            },
            {
              title: '角色', // modify
              dataIndex: 'role',
              key: 'role',
              render: (val: any) => {
                if(val === "ROLE_ADMIN"){
                  return "超级管理员"
                }
                if(val === "ROLE_SYS_USER"){
                  return "系统管理员"
                }
                return ""
              }
            },
            {
              title: '创建时间',
              dataIndex: 'createAt',
              key: 'createAt',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                  <Button onClick={() => onModify(record)}>编辑</Button>
                  <Button onClick={() => onModifyPassword(record)}>修改密码</Button>
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
          <Form.Item name="username" label="账号" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, },]}>
            <Select placeholder="选择角色" allowClear>
              <Option value={"ROLE_ADMIN"}>超级管理员</Option>
              <Option value={"ROLE_SYS_USER"}>系统管理员</Option>
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
          <Form.Item label="ID" name="id" rules={[{ required: true, },
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="username" label="账号" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, },]}>
            <Select placeholder="选择角色" allowClear>
              <Option value={"ROLE_ADMIN"}>超级管理员</Option>
              <Option value={"ROLE_SYS_USER"}>系统管理员</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="修改密码"
        visible={modifyPasswordModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editPasswordForm' }}
        onCancel={() => setModifyPasswordModelVisible(false)}
      >
        <Form name="editPasswordForm" form={editPasswordForm} {...formLayout} onFinish={onModifyPasswordOk} validateMessages={validateMessages}>
          <Form.Item label="ID" name="id" style={{display: "none"}} rules={[{ required: true, },
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CoachTable;
