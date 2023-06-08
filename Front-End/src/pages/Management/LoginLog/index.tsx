import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, Form, Popconfirm, Card, Select } from 'antd';
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, deleteItem } from '@/utils/utils';

const url = urlConfig.LOGIN_LOG_URL; // modify

const CoachTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [searchForm] = Form.useForm();
  const { Option } = Select;


  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      size: pageInfo.pageSize,
      page: pageInfo.current - 1,
    };
    const res = await getItems(url, queryParams);
    if (res) {
      setData(res.data.content);
      setPageInfo({ ...pageInfo, total: res.data.totalElements });
    }
  };

  useEffect(() => {
    getData();
  }, [pageInfo.current]);


  return (
    <PageContainer>
      <Card>
        {/* modify */}
        <Form form={searchForm} layout='inline'>
          <Form.Item name='userId' label='用户ID'>
            <Input />
          </Form.Item>
          <Form.Item name='deviceType' label='设备类型'>
            <Select placeholder={"选择类型"} allowClear>
              <Option value="mirror">魔镜</Option>
              <Option value="android">安卓</Option>
            </Select>
          </Form.Item>
          <Form.Item name='macId' label='MacId'>
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
      <Card>
        <Table
          columns={[
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: '用户ID', // modify
              dataIndex: 'userId',
              key: 'userId',
            },
            {
              title: '设备类型', // modify
              dataIndex: 'deviceType',
              key: 'deviceType',
            },
            {
              title: 'MAC Id', // modify
              dataIndex: 'macId',
              key: 'macId',
            },
            {
              title: '登录时间', // modify
              dataIndex: 'loginTime',
              key: 'loginTime',
            },
            {
              title: 'Action',
              key: 'action',
              render: (text: any, record: any) => (
                <Space size='middle'>
                  <Popconfirm
                    title='确认删除？'
                    okText='确认'
                    cancelText='取消'
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
    </PageContainer>
  );
};
export default CoachTable;
