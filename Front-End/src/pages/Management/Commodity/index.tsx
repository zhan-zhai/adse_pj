import React, { useEffect, useState } from 'react';
import {Table, Button, Space, Input, Modal, Form, Popconfirm, Card, Upload, InputNumber} from 'antd';
import urlConfig from '@/urlConfig';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { getItems, addItem, deleteItem, updateItem, url2UploadFileList, uploadFileList2Url, normFile, formLayout, validateMessages } from '@/utils/utils';

const url = urlConfig.COMMODITY_URL; // modify

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
            console.log(res.data.content)
            setPageInfo({ ...pageInfo, total: res.data.totalElements })
        }
    };

    useEffect(() => {
        getData();
    }, [pageInfo.current]);

    const onAddOk = async () => {
        const formValues = addForm.getFieldsValue();
        const goodsTypes = formValues.commodityTypes
        for (let i = 0; i < goodsTypes.length; i++) {
            goodsTypes[i].image = uploadFileList2Url(goodsTypes[i].image)
        }
        const success = await addItem(url, { ...addForm.getFieldsValue() , commodityTypes: goodsTypes});
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
                {/* modify */}
                <Form form={searchForm} layout="inline">
                    <Form.Item name="id" label="ID">
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="商品名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="introduction" label="商品介绍">
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
                            title: '商品名称', // modify
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '商品介绍', // modify
                            dataIndex: 'introduction',
                            key: 'introduction',
                        },
                        {
                            title: '商品类别', // modify
                            dataIndex: 'commodityTypes',
                            key: 'commodityTypes',
                            render: (val) => {
                                return val.length>0? val.map(a=>a.type).join(",") : null;
                            }
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
                                    }>编辑</Button>
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
                width={800}
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
                    <Form.Item name="name" label="商品名称" rules={[{ required: true, },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="introduction" label="商品介绍" rules={[{ required: true, },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"商品分类"}>
                        <Form.List name="commodityTypes">
                            {(fields, { add, remove }) => (
                              <>
                                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} >
                                        <Form.Item
                                          name={[name, 'id']}
                                          fieldKey={[fieldKey, 'id']}
                                          style={{ display: 'none' }}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品类型"
                                          name={[name, 'type']}
                                          fieldKey={[fieldKey, 'type']}
                                          rules={[{ required: true}]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品数量"
                                          name={[name, 'amount']}
                                          fieldKey={[fieldKey, 'amount']}
                                          rules={[{ required: true}]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品价格"
                                          name={[name, 'price']}
                                          fieldKey={[fieldKey, 'price']}
                                          rules={[{ required: true}]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        {/*<Form.Item*/}
                                        {/*  label = "商品图片"*/}
                                        {/*  name={[name, 'image']}*/}
                                        {/*  fieldKey={[fieldKey, 'image']}*/}
                                        {/*  rules={[{ required: true}]}*/}
                                        {/*>*/}
                                        {/*    <Input />*/}
                                        {/*</Form.Item>*/}
                                        <Form.Item
                                            name={[name, 'image']}
                                            fieldKey={[fieldKey, 'image']}
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            label="商品图片"
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
                                                <Button icon={<UploadOutlined />}>选择商品类型图片</Button>
                                            </Upload>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => {
                                            remove(name);
                                        }} />
                                        <PlusCircleOutlined onClick={() => {
                                            add(undefined, name + 1); // todo fix
                                        }} />
                                    </Space>
                                  ))}
                                  <Form.Item>
                                      <Button type="dashed" onClick={() => {
                                          add();
                                      }} block icon={<PlusOutlined />}>
                                          添加类型
                                      </Button>
                                  </Form.Item>
                              </>
                            )}
                        </Form.List>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="image"*/}
                    {/*    valuePropName="fileList"*/}
                    {/*    getValueFromEvent={normFile}*/}
                    {/*    label="商品图片"*/}
                    {/*    rules={[*/}
                    {/*        {*/}
                    {/*            required: true,*/}
                    {/*        }*/}
                    {/*    ]}*/}
                    {/*>*/}
                    {/*    <Upload*/}
                    {/*        name="file"*/}
                    {/*        listType="picture"*/}
                    {/*        action={urlConfig.IMAGE_UPLOAD_URL}*/}
                    {/*        showUploadList={{ showRemoveIcon: false }}*/}
                    {/*        maxCount={1}*/}
                    {/*    >*/}
                    {/*        <Button icon={<UploadOutlined />}>选择商品图片</Button>*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
            <Modal
                title="编辑"
                width={1200}
                visible={modifyModelVisible}
                okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
                onCancel={() => setModifyModelVisible(false)}
            >
                <Form name="editForm" form={editForm} {...formLayout} onFinish={onModifyOk} validateMessages={validateMessages}>
                    <Form.Item label="ID" name="id" rules={[{ required: true, },
                    ]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="name" label="商品名称" rules={[{ required: true, }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="sellerId" label="商家ID" rules={[{ required: true, },]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="商品介绍" name="introduction" rules={[{ required: true, }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"商品分类"}>
                        <Form.List name="commodityTypes">
                            {(fields, { add, remove }) => (
                              <>
                                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} >
                                        <Form.Item
                                          name={[name, 'id']}
                                          fieldKey={[fieldKey, 'id']}
                                          style={{ display: 'none' }}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品类型"
                                          name={[name, 'type']}
                                          fieldKey={[fieldKey, 'type']}
                                          rules={[{ required: true}]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品数量"
                                          name={[name, 'amount']}
                                          fieldKey={[fieldKey, 'amount']}
                                          rules={[{ required: true}]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                          label = "商品价格"
                                          name={[name, 'price']}
                                          fieldKey={[fieldKey, 'price']}
                                          rules={[{ required: true}]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        {/*<Form.Item*/}
                                        {/*  label = "商品图片"*/}
                                        {/*  name={[name, 'image']}*/}
                                        {/*  fieldKey={[fieldKey, 'image']}*/}
                                        {/*  rules={[{ required: true}]}*/}
                                        {/*>*/}
                                        {/*    <Input />*/}
                                        {/*</Form.Item>*/}
                                        <Form.Item
                                            name={[name, 'image']}
                                            fieldKey={[fieldKey, 'image']}
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            label="商品图片"
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
                                                <Button icon={<UploadOutlined />}>选择商品类型图片</Button>
                                            </Upload>
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => {
                                            remove(name);
                                        }} />
                                        <PlusCircleOutlined onClick={() => {
                                            add(undefined, name + 1); // todo fix
                                        }} />
                                    </Space>
                                  ))}
                                  <Form.Item>
                                      <Button type="dashed" onClick={() => {
                                          add();
                                      }} block icon={<PlusOutlined />}>
                                          添加类型
                                      </Button>
                                  </Form.Item>
                              </>
                            )}
                        </Form.List>
                    </Form.Item>
                    {/*<Form.Item name="amount" label="商品数量" rules={[{ required: true, },]}>*/}
                    {/*    <InputNumber />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item label="商品图片" name="image" rules={[{ required: true, }]}>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item*/}
                    {/*    label="商品图片" name="image"*/}
                    {/*    valuePropName="fileList"*/}
                    {/*    getValueFromEvent={normFile}*/}
                    {/*    rules={[{ required: true, }]}*/}
                    {/*>*/}
                    {/*    <Upload*/}
                    {/*        name="file"*/}
                    {/*        listType="picture"*/}
                    {/*        action={urlConfig.IMAGE_UPLOAD_URL}*/}
                    {/*        showUploadList={{ showRemoveIcon: false }}*/}
                    {/*        maxCount={1}*/}
                    {/*    >*/}
                    {/*        <Button icon={<UploadOutlined />}>修改</Button>*/}
                    {/*    </Upload>*/}
                    {/*</Form.Item>*/}
                </Form>
            </Modal>
        </PageContainer>
    );
}
export default CoachTable;
