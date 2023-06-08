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
  DatePicker,
  Select,
  InputNumber,
  Upload, message,
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
  getDifficultyTypes,
  getAllCoaches, getAllVideos, getAllTags, normFile, uploadFileList2Url, url2UploadFileList, getAllAudios,
} from '@/utils/utils';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';


const url= urlConfig.LIVE_URL; // modify


const LiveTable: React.FC = () =>{ // modify
  const [data, setData] = useState([]);
  const [difficultyTypes, setDifficultyTypes] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchFormStartDate, setSearchFormStartDate] = useState(null);
  const [searchFormEndDate, setSearchFormEndDate] = useState(null);
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

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const getData = async () => {
    const queryParams = {
      ...searchForm.getFieldsValue(),
      startDate: searchFormStartDate,
      endDate: searchFormEndDate,
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
    getAllCoaches().then((res: any)=>{
      setCoaches(res);
    });
    getAllVideos().then((res: any)=>{
      setVideos(res);
    });
    getAllAudios().then((res: any)=>{
      setAudios(res);
    });
    getAllTags().then((res: any)=>{
      setTags(res);
    });
  }, []);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl);
    const bigPicUrl = uploadFileList2Url(formValues.bigPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const tagEntities = formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]);
    if (mainPicUrl && bigPicUrl && smallPicUrl) {
      const success = await addItem(url, {
        ...addForm.getFieldsValue(),
        mainPicUrl,
        bigPicUrl,
        smallPicUrl,
        tags:tagEntities ,
        date: formValues.startTime.format("YYYY-MM-DD"),
        startTime: formValues.startTime.format("YYYY-MM-DD HH:mm"),
        endTime: formValues.endTime.format("YYYY-MM-DD HH:mm"),
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
      mainPicUrl: url2UploadFileList(record.mainPicUrl),
      bigPicUrl: url2UploadFileList(record.bigPicUrl),
      smallPicUrl: url2UploadFileList(record.smallPicUrl),
      tags: record.tags.map((t: any)=>t.name),
      startTime: moment(record.startTime, "YYYY-MM-DD HH:mm"),
      endTime: moment(record.endTime, "YYYY-MM-DD HH:mm"),

    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl);
    const bigPicUrl = uploadFileList2Url(formValues.bigPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const tagEntities = formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]);
    if (mainPicUrl && bigPicUrl && smallPicUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), {
        ...editForm.getFieldsValue(),
        mainPicUrl,
        bigPicUrl,
        smallPicUrl,
        tags:tagEntities ,
        date: formValues.startTime.format("YYYY-MM-DD"),
        startTime: formValues.startTime.format("YYYY-MM-DD HH:mm"),
        endTime: formValues.endTime.format("YYYY-MM-DD HH:mm"),
      });
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
          <Form.Item name = "id" label="ID">
            <Input />
          </Form.Item>
          <Form.Item name="name" label="视频课名称">
            <Input />
          </Form.Item>
          <Form.Item name="type" label="视频类型">
            <Select placeholder="选择类型" allowClear>
              <Option key={"直播课程"} value={"直播课程"}>{"直播课程"}</Option>
              <Option key={"长课程"} value={"长课程"}>{"长课程"}</Option>
            </Select>
          </Form.Item>
          <Form.Item label="开始时间-结束时间">
            <RangePicker
              value={[
                searchFormStartDate ? moment(searchFormStartDate, "YYYY-MM-DD") : null,
                searchFormEndDate ? moment(searchFormEndDate, "YYYY-MM-DD") : null
              ]}
              onChange={(dates, dateStrings: any[]) => {
                setSearchFormStartDate(dateStrings[0]);
                setSearchFormEndDate(dateStrings[1]);
              }}
            />
          </Form.Item>
          <Form.Item name="difficulty" label="难度">
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={getData}>查询</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={()=>{
              searchForm.resetFields();
              setSearchFormStartDate(null);
              setSearchFormEndDate(null);
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
              title: '直播课名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '教练', // modify
              dataIndex: 'coach',
              key: 'coach',
              render: val => val.name,
            },
            {
              title: '日期', // modify
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: '开始时间', // modify
              dataIndex: 'startTime',
              key: 'startTime',
            },
            {
              title: '结束时间', // modify
              dataIndex: 'endTime',
              key: 'endTime',
            },
            {
              title: '难度', // modify
              dataIndex: 'difficulty',
              key: 'difficulty',
            },
            {
              title: '卡路里消耗(千卡)', // modify
              dataIndex: 'calorieConsumption',
              key: 'calorieConsumption',
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
        width={900}
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
          <Form.Item name = "name" label="直播名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="coachId" label="教练名" rules={[{required: true,},]}>
            <Select placeholder="选择教练" allowClear>
              {coaches.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="videoId" label="视频名称" rules={[{required: true,},]}>
            <Select placeholder={"选择视频"}>
              {videos.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`sp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="audioId" label="音频名称">
            <Select placeholder={"选择音频"}>
              {audios.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`yp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              // value={tags.map(tag => (tag.name))}
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name={"introduction"} label="课程介绍" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }}/>
          </Form.Item>
          <Form.Item name={"startTime"} label="课程开始时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"endTime"} label="课程结束时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"suitableFor"} label="适宜人群" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name={"calorieConsumption"} label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="difficulty" label="难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"requiredEquipment"} label="所需器械" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }}/>
          </Form.Item>
          <Form.Item name={"notice"} label="注意事项" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }}/>
          </Form.Item>
          <Form.Item
            name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="直播主图"
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
            name="bigPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="直播大图"
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
            label="直播小图"
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
          <Form.Item label={"目标心率"}>
            <Form.List name="targetHeartRates">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} >
                      <Form.Item
                        {...restField}
                        label = "开始时间"
                        name={[name, 'start']}
                        fieldKey={[fieldKey, 'start']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label = "结束时间"
                        name={[name, 'end']}
                        fieldKey={[fieldKey, 'end']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label="目标心率"
                        name={[name, 'targetHeartRate']}
                        fieldKey={[fieldKey, 'targetHeartRate']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
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
                      添加目标心率
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div style={{"color": "red"}}>注：每行数据代表从xxx秒到结束xxx秒的目标心率应为xxx, 需要保证(1）第一行时间从零开始且两行数据时间首尾相连(2）最后一行的结束时间要大于等于整个课程时间</div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="编辑"
        width={900}
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={()=>setModifyModelVisible(false)}
      >
        <Form name="editForm" form={editForm} {...formLayout}  onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item label="ID" name="id" rules={[{ required: true,},
          ]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name = "name" label="直播名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="coachId" label="教练名" rules={[{required: true,},]}>
            <Select placeholder="选择教练" allowClear>
              {coaches.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="videoId" label="视频名称" rules={[{required: true,},]}>
            <Select placeholder={"选择视频"}>
              {videos.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`sp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="audioId" label="音频名称">
            <Select placeholder={"选择音频"}>
              {audios.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`yp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              // value={tags.map(tag => (tag.name))}
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name={"introduction"} label="课程介绍" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }}/>
          </Form.Item>
          <Form.Item name={"startTime"} label="课程开始时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"endTime"} label="课程结束时间" rules={[{required: true,},]}>
            <DatePicker
              format={"YYYY-MM-DD HH:mm"}
              showTime={true}
            />
          </Form.Item>
          <Form.Item name={"suitableFor"} label="适宜人群" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name={"calorieConsumption"} label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="difficulty" label="难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"requiredEquipment"} label="所需器械" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }}/>
          </Form.Item>
          <Form.Item name={"notice"} label="注意事项" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
          <Form.Item
            name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="直播主图"
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
            name="bigPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="直播大图"
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
            label="直播小图"
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
          <Form.Item label={"目标心率"}>
            <Form.List name="targetHeartRates">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} >
                      <Form.Item
                        {...restField}
                        label = "开始时间"
                        name={[name, 'start']}
                        fieldKey={[fieldKey, 'start']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label = "结束时间"
                        name={[name, 'end']}
                        fieldKey={[fieldKey, 'end']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label="目标心率"
                        name={[name, 'targetHeartRate']}
                        fieldKey={[fieldKey, 'targetHeartRate']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
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
                      添加目标心率
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div style={{"color": "red"}}>注：每行数据代表从xxx秒到结束xxx秒的目标心率应为xxx, 需要保证(1）第一行时间从零开始且两行数据时间首尾相连(2）最后一行的结束时间要大于等于整个课程时间</div>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default LiveTable;
