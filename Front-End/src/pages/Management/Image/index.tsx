import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, message, Popconfirm, Card, Upload } from 'antd';
import urlConfig from '@/urlConfig';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, addItem, deleteItem, updateItem, url2UploadFileList, uploadFileList2Url, normFile, formLayout, validateMessages } from '@/utils/utils';

const url = urlConfig.IMAGE_URL; // modify

const ImageTable: React.FC = () => { // modify
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
    if (res) {
      setData(res.data.content);
      setPageInfo({ ...pageInfo, total: res.data.totalElements })
    }
  };

  useEffect(() => {
    getData();
  }, [pageInfo.current]);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    const imageUrl = uploadFileList2Url(formValues.imageUrl);
    if (imageUrl) {
      const success = await addItem(url, { ...addForm.getFieldsValue(), imageUrl });
      if (success) {
        setAddModelVisible(false);
        getData();
      }
    } else {
      message.error("存在文件未上传成功！");
    }
  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({ ...record, imageUrl: url2UploadFileList(record.imageUrl) });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const imageUrl = uploadFileList2Url(formValues.imageUrl);
    if (imageUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue(), imageUrl });
      if (success) {
        setModifyModelVisible(false);
        getData();
      }
    } else {
      message.error("存在文件未上传成功！");
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
          <Form.Item name="name" label="图片名称">
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
              title: '图片名称', // modify
              dataIndex: 'name',
              key: 'name',
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
          <Form.Item name="name" label="图片名称" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="图片"
            rules={[
              {
                required: true,
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
              <Button icon={<UploadOutlined />}>选择图片文件</Button>
            </Upload>
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
          <Form.Item name="name" label="图片名称" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="imageUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="图片"
            rules={[
              {
                required: true,
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
              <Button icon={<UploadOutlined />}>选择图片文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default ImageTable;
