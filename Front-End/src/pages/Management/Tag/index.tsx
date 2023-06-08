import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, Popconfirm, Card, Upload, Switch, InputNumber } from 'antd';
import urlConfig from '@/urlConfig';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {getItems, addItem, deleteItem, updateItem, url2UploadFileList, uploadFileList2Url, normFile, formLayout, validateMessages} from '@/utils/utils';

const url= urlConfig.TAG_URL; // modify

const TagTable: React.FC = () =>{ // modify
  const [data, setData] = useState([]);
  const [addFormCheckMainPicUrl, setAddFormCheckMainPicUrl] = useState(false);
  const [editFormCheckMainPicUrl, setEditFormCheckMainPicUrl] = useState(false);
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
    const formValues = addForm.getFieldsValue();
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl); // modify
    const success = await addItem(url, { ...addForm.getFieldsValue(), mainPicUrl});
    if(success){
      setAddModelVisible(false);
      getData();
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    setEditFormCheckMainPicUrl(record.shownOnHomepage)
    editForm.setFieldsValue({...record, mainPicUrl: url2UploadFileList(record.mainPicUrl)});
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    console.log(formValues.mainPicUrl)
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl);
    const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue(), mainPicUrl});
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
          <Form.Item name = "name" label="标签名称">
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
              title: '标签名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '是否首页展示', // modify
              dataIndex: 'shownOnHomepage',
              key: 'shownOnHomepage',
              render: val => (val ? '是' : '否'),
            },
            {
              title: '首页展示顺序', // modify
              dataIndex: 'homePageOrder',
              key: 'homePageOrder',
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
          <Form.Item name = "name" label="标签名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "shownOnHomepage" valuePropName="checked" label="是否在主页展示" rules={[{required: true,},]}>
            <Switch checked={addFormCheckMainPicUrl} onChange={(e)=>setAddFormCheckMainPicUrl(e)}/>
          </Form.Item>
          <Form.Item name = "homePageOrder" label="主页展示顺序" >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="标签主图"
            rules={[
              {
                required: addFormCheckMainPicUrl,
              }
            ]}
          >
            <Upload
              name="file"
              listType="picture"
              action={urlConfig.IMAGE_UPLOAD_URL}
              showUploadList={{ showRemoveIcon: false }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>选择头像文件</Button>
            </Upload>
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
          <Form.Item name="name" label="标签名称" rules={[{ required: true,}]}>
            <Input />
          </Form.Item>
          <Form.Item name="shownOnHomepage" valuePropName="checked" label="是否在主页展示" rules={[{required: true,},]}>
            <Switch checked={editFormCheckMainPicUrl} onChange={(e)=>setEditFormCheckMainPicUrl(e)}/>
          </Form.Item>
          <Form.Item name = "homePageOrder" label="主页展示顺序" >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="标签主图" name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: editFormCheckMainPicUrl,}]}
          >
            <Upload
              name="file"
              listType="picture"
              action={urlConfig.IMAGE_UPLOAD_URL}
              showUploadList={{ showRemoveIcon: false }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>修改</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default TagTable;
