import React, { useEffect, useState } from 'react';
import {Table, Button, Space, Input, Modal, Form, Popconfirm, Card, Upload, InputNumber} from 'antd';
import urlConfig from '@/urlConfig';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, addItem, deleteItem, updateItem, url2UploadFileList, uploadFileList2Url, normFile, formLayout, validateMessages } from '@/utils/utils';

const url = urlConfig.DELIVER_COMPANY_GET_URL; // modify

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
            setData(res.data);
            console.log(res.data)
            setPageInfo({ ...pageInfo, total: res.data.totalElements })
        }
    };

    useEffect(() => {
        getData();
    }, [pageInfo.current]);

    const onAddOk = async () => {
        const formValues = addForm.getFieldsValue();
        const success = await addItem(url, formValues);
        if (success) {
            setAddModelVisible(false);
            getData();
        }
    };

    const onModify = (record: any) => {
        console.log("hello")
        console.log(record);
        const goodsTypes = record.commodityTypes
        for (let i = 0; i < goodsTypes.length; i++) {
            console.log("before" + goodsTypes[i].image)
            goodsTypes[i].image = url2UploadFileList(goodsTypes[i].image)
            console.log("after" + goodsTypes[i].image)
        }
        console.log(goodsTypes)
        editForm.setFieldsValue({ ...record, commodityTypes: goodsTypes });
        setModifyModelVisible(true);
    }

    const onModifyOk = async () => {
        const formValues = editForm.getFieldsValue();
        const goodsTypes = formValues.commodityTypes
        for (let i = 0; i < goodsTypes.length; i++) {
            goodsTypes[i].image = uploadFileList2Url(goodsTypes[i].image)
        }
        const success = await updateItem(url, editForm.getFieldValue("id"), { ...editForm.getFieldsValue(), commodityTypes: goodsTypes});
        if (success) {
            setModifyModelVisible(false);
            getData();
        }
    };

    return (
        <PageContainer>
            <Card>
                <Button type="primary" onClick={() => setAddModelVisible(true)}>新增</Button>
            </Card>
            <br />
            <Card>
                <Table
                    columns={[
                        {
                            title: '快递公司', // modify
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '介绍', // modify
                            dataIndex: 'intro',
                            key: 'intro',
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (text: any, record: any) => (
                                <Space size="middle">
                                    <Button onClick={() => {
                                        console.log(record)
                                        onModify(record);
                                    }
                                    } disabled={true}>编辑</Button>
                                    <Popconfirm
                                        title="确认删除？"
                                        okText="确认"
                                        cancelText="取消"
                                        onConfirm={() => {
                                            deleteItem(url, record.id).then(() => getData());
                                        }}
                                    >
                                        <Button danger disabled={true}>删除</Button>
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
                width={400}
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
                    <Form.Item name="name" label="快递公司" rules={[{ required: true, },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="intro" label="快递介绍" >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </PageContainer>
    );
}
export default CoachTable;
