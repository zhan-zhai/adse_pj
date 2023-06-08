import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, Popconfirm, Card } from 'antd';
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import {getItems, addItem, deleteItem, updateItem, formLayout, validateMessages} from '@/utils/utils';
import TextArea from 'antd/es/input/TextArea';

const url= urlConfig.AI_ARG_URL; // modify

const AiArgTable: React.FC = () =>{ // modify
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

  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      size: pageInfo.pageSize,
      page: pageInfo.current - 1,
    }
    const res = await getItems(url, queryParams)
    if(res){
      setData(res.data.content);
      setPageInfo({...pageInfo, total: res.data.totalElements})
    }
  };

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  const onAddOk = async () => {
    const success = await addItem(url, { ...addForm.getFieldsValue()});
    if(success){
      setAddModelVisible(false);
      getData();
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({...record});
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue()});
    if(success){
      setModifyModelVisible(false);
      getData();
    }
  };

  return (
    <PageContainer>
      <Card>
        {/* modify */}
        <Form form={searchForm} layout="inline">
          <Form.Item name = "id" label="ID">
            <Input />
          </Form.Item>
          <Form.Item name = "name" label="参数名称">
            <Input/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={getData}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={()=>searchForm.resetFields()}>重置</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={()=>setAddModelVisible(true)}>新增</Button>
          </Form.Item>
        </Form>
      </Card>
      <br/>
      <Card>
        <Table
          columns={ [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '参数名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '参数', // modify
              dataIndex: 'args',
              key: 'args',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size="middle">
                  <Button onClick={()=>onModify(record)}>编辑</Button>
                  <Popconfirm
                    title="确认删除？"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => {
                      deleteItem(url, record.id).then(()=>getData());
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
          onChange={(newPageInfo: any)=>setPageInfo(newPageInfo)}
          rowKey={record=>record.id}
        />
      </Card>
      <Modal
        title="新增"
        visible={addModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'addForm' }}
        onCancel={()=>setAddModelVisible(false)}
      >
        <Form
          name ="addForm"
          form ={addForm}
          {...formLayout}
          validateMessages={validateMessages}
          onFinish={onAddOk}
        >
          <Form.Item name = "name" label="参数名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "args"  label="参数" rules={[{required: true,},]}>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 100 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="编辑"
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={()=>setModifyModelVisible(false)}
      >
        <Form name="editForm" form={editForm} {...formLayout}  onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item label="ID" name="id" rules={[{ required: true,},
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="参数名称" rules={[{ required: true,}]}>
            <Input />
          </Form.Item>
          <Form.Item name = "args"  label="参数" rules={[{required: true,},]}>
            <TextArea
              autoSize={{ minRows: 3, maxRows: 100 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default AiArgTable;
