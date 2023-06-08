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
  Upload, message, Switch, InputNumber,
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
  getAllTags,
  normFile,
  uploadFileList2Url,
  url2UploadFileList,
  getAllCourses,
  getAllLives,
  getDifficultyTypes,
} from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';


const url= urlConfig.SUBJECT_URL; // modify


const SubjectTable: React.FC = () =>{ // modify
  const [data, setData] = useState([]);
  const [difficultyTypes, setDifficultyTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const [courses, setCourses] = useState([{ // 初值为了消除类型报错
    duration: 0,
    calorieConsumption: 0,

  }]);
  const [lives, setLives] = useState([{ // 初值为了消除类型报错
    video:{
      duration: 0
    },
    calorieConsumption: 0,
  }]);
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

  const { Option, OptGroup } = Select;

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

  useEffect(() => {
    getDifficultyTypes().then((res: any)=>{
      setDifficultyTypes(res);
    });
    getAllCourses().then((res: any)=>{
      setCourses(res);
    });
    getAllLives().then((res: any)=>{
      setLives(res);
    });
    getAllTags().then((res: any)=>{
      setTags(res);
    });
  }, []);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    console.log(formValues);
    const bigPicUrl = uploadFileList2Url(formValues.bigPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    if (bigPicUrl && smallPicUrl) {
      const success = await addItem(url, {
        ...addForm.getFieldsValue(),
        bigPicUrl,
        smallPicUrl,
        tags: formValues.tags ? formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]): [] ,
        courses: formValues.courses.map((c: any)=>({
          "courseType": c.startsWith("长")?"live": "course",
          "courseId": c.startsWith("组合")? c.split("：")[1]: null,
          "liveId": c.startsWith("长")? c.split("：")[1]: null,
        })),
      });
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
    editForm.setFieldsValue({
      ...record,
      bigPicUrl: url2UploadFileList(record.bigPicUrl),
      smallPicUrl: url2UploadFileList(record.smallPicUrl),
      tags: record.tags.map((t: any)=>t.name),
      courses: record.courses.map((t: any) => (t.courseType==="live"? `长：${  t.liveId}`:`组合：${ t.courseId}`))
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const bigPicUrl = uploadFileList2Url(formValues.bigPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    if (bigPicUrl && smallPicUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), {
        ...editForm.getFieldsValue(),
        bigPicUrl,
        smallPicUrl,
        tags: formValues.tags ? formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]): [] ,
        courses: formValues.courses.map((c: any)=>({
          "courseType": c.startsWith("长")?"live": "course",
          "courseId": c.startsWith("组合")? c.split("：")[1]: null,
          "liveId": c.startsWith("长")? c.split("：")[1]: null,
        })),
      });
      if (success) {
        setModifyModelVisible(false);
        getData();
      }
    } else {
      message.error("存在文件未上传成功！");
    }
  };

  const addFormReCount = () => {
    const formValues = addForm.getFieldsValue();
    const formCourses = formValues.courses;
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<formCourses.length;i+=1){
      if(formCourses[i].startsWith("长")){
        totalDuration += lives.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].video.duration;
        totalCalorieConsumption += lives.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].calorieConsumption;
      } else if(formCourses[i].startsWith("组合")){
        totalDuration += courses.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].duration;
        totalCalorieConsumption += courses.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].calorieConsumption;
      }
    }
    addForm.setFieldsValue(
      {
        totalCalorieConsumption,
        totalDuration,
      }
    )
  }

  const editFormReCount = () => {
    const formValues = editForm.getFieldsValue();
    const formCourses = formValues.courses;
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<formCourses.length;i+=1){
      if(formCourses[i].startsWith("长")){
        totalDuration += lives.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].video.duration;
        totalCalorieConsumption += lives.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].calorieConsumption;
      } else if(formCourses[i].startsWith("组合")){
        totalDuration += courses.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].duration;
        totalCalorieConsumption += courses.filter((c: any)=>c.id === Number(formCourses[i].split("：")[1]))[0].calorieConsumption;
      }
    }
    editForm.setFieldsValue(
      {
        totalCalorieConsumption,
        totalDuration,
      }
    )
  }

  return (
    <PageContainer>
      <Card>
        {/* modify */}
        <Form form={searchForm} layout="inline">
          <Form.Item name = "id" label="ID">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="专题名称">
            <Input />
          </Form.Item>
          <Form.Item name="difficulty" label="难度">
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name = "homePageType" label="主页展示类别">
            <Select allowClear placeholder={"选择"}>
              <Option value={"减脂"}>减脂</Option>
              <Option value={"塑形"}>塑形</Option>
              <Option value={"增肌"}>增肌</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={getData}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={()=>{
              searchForm.resetFields();
            }}>重置</Button>
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
              title: '专题名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '副标题名称', // modify
              dataIndex: 'subtitle',
              key: 'subtitle',
            },
            {
              title: '难度', // modify
              dataIndex: 'difficulty',
              key: 'difficulty',
            },
            {
              title: '是否首页展示', // modify
              dataIndex: 'shownOnHomepage',
              key: 'shownOnHomepage',
              render: val => (val ? '是' : '否'),
            },
            {
              title: '首页展示类别', // modify
              dataIndex: 'homePageType',
              key: 'homePageType',
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
          <Form.Item name = "name" label="专题名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "subtitle" label="副标题" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "shownOnHomepage" valuePropName="checked" label="是否在主页展示" initialValue={false} rules={[{required: true,},]}>
            <Switch />
          </Form.Item>
          <Form.Item name = "homePageType" label="主页展示类别" >
            <Select allowClear placeholder={"选择"}>
              <Option value={"减脂"}>减脂</Option>
              <Option value={"塑形"}>塑形</Option>
              <Option value={"增肌"}>增肌</Option>
            </Select>
          </Form.Item>
          <Form.Item name = "homePageOrder" label="主页展示顺序" >
            <InputNumber />
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              // value={tags.map(tag => (tag.name))}
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name="difficulty" label="难度">
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"totalDuration"} label="总时长" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name={"totalCalorieConsumption"} label="总卡路里消耗" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name="courses" label="课程列表" >
            <Select mode="multiple" showArrow onChange={addFormReCount}>
              <OptGroup label="组合课程">
                {courses.map((d: any) => <Option key={`组合：${d.id}`} value={`组合：${d.id}`}>{`组合：${d.name}`}</Option>)}
              </OptGroup>
              <OptGroup label="长课程">
                {lives.map((d: any) => <Option key={`长：${d.id}`} value={`长：${d.id}`}>{`长：${d.name}`}</Option>)}
              </OptGroup>
            </Select>
          </Form.Item>
          <Form.Item
            name="bigPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="专题大图"
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
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="smallPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="专题小图"
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
              <Button icon={<UploadOutlined />}>选择文件</Button>
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
          <Form.Item name = "name" label="专题名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "subtitle" label="副标题" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name = "shownOnHomepage" valuePropName="checked" label="是否在主页展示" rules={[{required: true,},]}>
            <Switch />
          </Form.Item>
          <Form.Item name = "homePageType" label="主页展示类别" >
            <Select allowClear placeholder={"选择"}>
              <Option value={"减脂"}>减脂</Option>
              <Option value={"塑形"}>塑形</Option>
              <Option value={"增肌"}>增肌</Option>
            </Select>
          </Form.Item>
          <Form.Item name = "homePageOrder" label="主页展示顺序" >
            <InputNumber />
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              // value={tags.map(tag => (tag.name))}
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name="difficulty" label="难度">
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"totalDuration"} label="总时长" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name={"totalCalorieConsumption"} label="总卡路里消耗" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name="courses" label="课程列表" >
            <Select mode="multiple" showArrow onChange={editFormReCount}>
              <OptGroup label="组合课程">
                {courses.map((d: any) => <Option key={`组合：${d.id}`} value={`组合：${d.id}`}>{`组合：${d.name}`}</Option>)}
              </OptGroup>
              <OptGroup label="长课程">
                {lives.map((d: any) => <Option key={`长：${d.id}`} value={`长：${d.id}`}>{`长：${d.name}`}</Option>)}
              </OptGroup>
            </Select>
          </Form.Item>
          <Form.Item
            name="bigPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="专题大图"
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
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="smallPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="专题小图"
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
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default SubjectTable;
