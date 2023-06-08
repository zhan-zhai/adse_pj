import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Modal, Form, message, Popconfirm, Card, Upload } from 'antd';
import urlConfig from '@/urlConfig';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, addItem, deleteItem, updateItem, url2UploadFileList, uploadFileList2Url, normFile, formLayout, validateMessages } from '@/utils/utils';

const url = urlConfig.COACH_URL; // modify

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
    const iconUrl = uploadFileList2Url(formValues.iconUrl);
    if (iconUrl) {
      const success = await addItem(url, { ...addForm.getFieldsValue(), iconUrl });
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
    editForm.setFieldsValue({ ...record, iconUrl: url2UploadFileList(record.iconUrl) });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const iconUrl = uploadFileList2Url(formValues.iconUrl);
    if (iconUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue(), iconUrl });
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
          <Form.Item name="name" label="教练名称">
            <Input />
          </Form.Item>
          <Form.Item name="briefIntroduction" label="简介">
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
              title: '教练编号', // modify
              dataIndex: 'coachId',
              key: 'coachId',
            },
            {
              title: '教练名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '简介', // modify
              dataIndex: 'briefIntroduction',
              key: 'briefIntroduction',
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
          <Form.Item name="name" label="教练名称" rules={[{ required: true, },]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="iconUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="教练头像"
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
              <Button icon={<UploadOutlined />}>选择头像文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="briefIntroduction" label="简介" rules={[{ required: true, },]}>
            <Input />
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
          <Form.Item name="name" label="教练名称" rules={[{ required: true, }]}>
            <Input />
          </Form.Item>
          <Form.Item label="教练编号" name="coachId" rules={[{ required: true, }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="头像" name="iconUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, }]}
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
          <Form.Item label="简介" name="briefIntroduction" rules={[{ required: true, }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CoachTable;
