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
  DatePicker,
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
  getAllCourses, getAllLives,
} from '@/utils/utils';
import moment from 'moment';

const url = urlConfig.COURSE_RECORD_URL; // modify

const CourseRecordTable: React.FC = () => { // modify
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lives, setLives] = useState([]);
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

  useEffect(() => {
    getAllCourses().then((res: any)=>{
      setCourses(res);
    });
    getAllLives().then((res: any)=>{
      setLives(res);
    });
  }, []);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    const success = await addItem(url, {
      ...formValues,
      startTime: formValues.startTime? formValues.startTime.format("YYYY-MM-DD HH:mm:ss"): null,
      endTime: formValues.endTime? formValues.endTime.format("YYYY-MM-DD HH:mm:ss"): null,
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
      startTime: record.startTime? moment(record.startTime, "YYYY-MM-DD HH:mm:ss"): null,
      endTime: record.endTime? moment(record.endTime, "YYYY-MM-DD HH:mm:ss"): null,
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const success = await updateItem(url, editForm.getFieldValue("id"), {
      ...formValues,
      startTime: formValues.startTime? formValues.startTime.format("YYYY-MM-DD HH:mm:ss"): null,
      endTime: formValues.endTime? formValues.endTime.format("YYYY-MM-DD HH:mm:ss"): null,
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
          <Form.Item name="userId" label="用户ID">
            <Input />
          </Form.Item>
          <Form.Item name="courseId" label="组合课程">
            <Select placeholder="选择课程" allowClear>
              {courses.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="liveId" label="长课程">
            <Select placeholder="选择长课程" allowClear>
              {lives.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
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
              title: '用户ID', // modify
              dataIndex: 'userId',
              key: 'userId',
            },
            {
              title: '课程类型', // modify
              dataIndex: 'courseType',
              key: 'courseType',
              render: (val: any) => (val==="course"? "组合课程": "长课程")
            },
            {
              title: '组合课程名称', // modify
              dataIndex: 'course',
              key: 'course',
              render: (val: any) => (val? val.name: "")
            },
            {
              title: '长课程名称', // modify
              dataIndex: 'live',
              key: 'live',
              render: (val: any) => (val? val.name: "")
            },
            {
              title: '训练时间', // modify
              key: 'trainTime',
              render: (text: any, record: any) => {
                return `${record.startTime  } - ${  record.endTime}`
              }
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
          <Form.Item name="userId" label="用户ID" rules={[{ required: true, },]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="courseType" label="课程类型" rules={[{ required: true, },]}>
            <Select placeholder="选择课程类型" allowClear>
              <Option value={"course"}>组合课程</Option>
              <Option value={"live"}>长课程</Option>
            </Select>
          </Form.Item>
          <Form.Item name="courseId" label="组合课程">
            <Select placeholder="选择课程" allowClear>
              {courses.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="liveId" label="长课程">
            <Select placeholder="选择长课程" allowClear>
              {lives.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"startTime"} label="健身开始时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm:ss"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"endTime"} label="健身结束时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm:ss"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"courseCompleteMovements"} label={"组合课程完成动作"}>
            <Input/>
          </Form.Item>
          <div style={{"color": "red"}}>注：组合课程完成动作序列号,组合课程必填,格式例："1,3,4,5,10"</div>
          <Form.Item name="calorieConsumption" label="消耗卡路里">
            <InputNumber />
          </Form.Item>
          <Form.Item name="score" label="分数">
            <InputNumber />
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
          <Form.Item name="userId" label="用户ID" rules={[{ required: true, },]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="courseType" label="课程类型" rules={[{ required: true, },]}>
            <Select placeholder="选择课程类型" allowClear>
              <Option value={"course"}>组合课程</Option>
              <Option value={"live"}>长课程</Option>
            </Select>
          </Form.Item>
          <Form.Item name="courseId" label="组合课程">
            <Select placeholder="选择课程" allowClear>
              {courses.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="liveId" label="长课程">
            <Select placeholder="选择长课程" allowClear>
              {lives.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"startTime"} label="健身开始时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm:ss"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"endTime"} label="健身结束时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm:ss"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"courseCompleteMovements"} label={"组合课程完成动作"}>
            <Input/>
          </Form.Item>
          <div style={{"color": "red"}}>注：组合课程完成动作序列号,组合课程必填,格式例："1,3,4,5,10"</div>
          <Form.Item name="calorieConsumption" label="消耗卡路里">
            <InputNumber />
          </Form.Item>
          <Form.Item name="score" label="分数">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CourseRecordTable;
