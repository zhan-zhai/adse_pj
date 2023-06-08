import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  InputNumber,
  Modal,
  Form,
  Popconfirm,
  Card,
  Switch,
  Select, Upload, message,
} from 'antd';
import urlConfig from '@/urlConfig';
import { MinusOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
  formLayout,
  validateMessages,
  getDifficultyTypes,
  getAllAiArgs,
  getAllVideos,
  getAllBodyParts, normFile, url2UploadFileList, uploadFileList2Url,
} from '@/utils/utils';
import TextArea from 'antd/es/input/TextArea';

const url= urlConfig.MOVEMENT_URL; // modify

const MovementTable: React.FC = () =>{ // modify

  const[addModelTips, setAddModelTips] = useState(["常规提示1", "常规提示2", "常规提示3"]);
  const[editModelTips, setEditModelTips] = useState(["",""]);
  const [data, setData] = useState([]);
  const [difficultyTypes, setDifficultyTypes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [aiArgs, setAiArgs] = useState([]);
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

  const {Option} = Select;

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
    getAllAiArgs().then((res: any)=>{
      setAiArgs(res);
    })
    getAllVideos().then((res: any)=>{
      setVideos(res);
    })
    getAllBodyParts().then((res: any)=>{
      setBodyParts(res);
    })
  }, []);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const gifUrl = uploadFileList2Url(formValues.gifUrl);
    if (gifUrl && smallPicUrl) {
      const success = await addItem(url, {
        ...addForm.getFieldsValue(),
        tips: addModelTips,
        smallPicUrl,
        gifUrl,
      });
      if(success){
        setAddModelVisible(false);
        getData();
      }
    }else{
      message.error("存在文件未上传成功！");
    }

  };

  const onModify = (record: any) => {
    console.log(record);
    editForm.setFieldsValue({
      ...record,
      smallPicUrl: url2UploadFileList(record.smallPicUrl),
      gifUrl: url2UploadFileList(record.gifUrl),
    });
    setEditModelTips(record.tips);
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const gifUrl = uploadFileList2Url(formValues.gifUrl);

    if (gifUrl && smallPicUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), {
        ...editForm.getFieldsValue(),
        tips: editModelTips,
        smallPicUrl,
        gifUrl,
      });
      if(success){
        setModifyModelVisible(false);
        getData();
      }
    }else{
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
          <Form.Item name = "name" label="动作名称">
            <Input/>
          </Form.Item>
          <Form.Item name="bodyPartId" label="身体部位">
            <Select placeholder="选择部位" allowClear>
              {bodyParts.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="aiRecognition" label="是否AI识别">
            <Select placeholder={"选择"} allowClear>
              <Option value={"true"}>是</Option>
              <Option value={"false"}>否</Option>
            </Select>
          </Form.Item>
          <Form.Item name="difficulty" label="动作难度">
            <Select placeholder="选择难度" >
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
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
              title: '动作名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'AI识别', // modify
              dataIndex: 'aiRecognition',
              key: 'aiRecognition',
              render: val => (val ? '是' : '否'),
            },
            {
              title: '动作难度', // modify
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
          <Form.Item name = "name" label="动作名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="aiRecognition" valuePropName={"checked"} label="是否AI识别" rules={[{required: true,},]}>
            <Switch></Switch>
          </Form.Item>
          <Form.Item name="aiRecognitionArgId" label="AI识别参数" >
            <Select placeholder={"选择参数"} allowClear>
              {aiArgs.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="smallPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="动作小图"
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
            name="gifUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="动作gif动图"
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
           <Form.Item name="videoId" label="视频名称" rules={[{required: true,},]}>
            <Select placeholder={"选择视频"}>
              {videos.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`sp${d.id  }：${ d.name}`}</Option>)}
            </Select>
           </Form.Item>
           <Form.Item name="bodyPartId" label="身体部位" rules={[{required: true,},]}>
            <Select placeholder={"选择身体部位"}>
              {bodyParts.map((d: any) => <Option key={d.id} value={Number(d.id)}>{d.name}</Option>)}
            </Select>
           </Form.Item>
           <Form.Item name="calorieConsumption" label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber />
           </Form.Item>
           <Form.Item name="difficulty" label="动作难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" >
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
           </Form.Item>
          <Form.Item label="常规提示" required>
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setAddModelTips(addModelTips.concat("常规提示"))
                }}
              />
            <div>
              {
                addModelTips.map((tip,index)=><Space key={index}>
                  <Input
                    key={index}
                    value={tip}
                    onChange={(e) => {
                      setAddModelTips(addModelTips.map((o,i)=>i===index?e.target.value:o))
                    }}
                  />
                  <Button
                  icon={<MinusOutlined />}
                  onClick={() => {
                    setAddModelTips(addModelTips.filter((o,i)=>i!==index))
                  }}
                >
                </Button>
                </Space >)
              }
            </div>
          </Form.Item>
          <Form.Item name={"steps"} label="动作步骤" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
          <Form.Item name={"breathing"} label="动作呼吸" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
          <Form.Item name={"commonMistakes"} label="动作常见错误" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
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
          <Form.Item name = "name" label="动作名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="aiRecognition" valuePropName={"checked"} label="是否AI识别" rules={[{required: true,},]}>
            <Switch></Switch>
          </Form.Item>
          <Form.Item name="aiRecognitionArgId" label="AI识别参数" >
            <Select placeholder={"选择参数"} allowClear>
              {aiArgs.map((d: any) => <Option value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="smallPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="动作小图"
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
            name="gifUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="动作gif动图"
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
          <Form.Item name="videoId" label="视频名称" rules={[{required: true,},]}>
            <Select placeholder={"选择视频"}>
              {videos.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`sp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="bodyPartId" label="身体部位" rules={[{required: true,},]}>
            <Select placeholder={"选择身体部位"}>
              {bodyParts.map((d: any) => <Option value={Number(d.id)}>{d.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="calorieConsumption" label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="difficulty" label="动作难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" >
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="常规提示" required>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setEditModelTips(editModelTips.concat("常规提示"))
              }}
            />
            <div>
              {
                editModelTips.map((tip,index)=><Space key={index}>
                  <Input
                    key={index}
                    value={tip}
                    onChange={(e) => {
                      setEditModelTips(editModelTips.map((o,i)=>i===index?e.target.value:o))
                    }}
                  />
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => {
                      setEditModelTips(editModelTips.filter((o,i)=>i!==index))
                    }}
                  >
                  </Button>
                </Space >)
              }
            </div>
          </Form.Item>
          <Form.Item name={"steps"} label="动作步骤" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
          <Form.Item name={"breathing"} label="动作呼吸" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
          <Form.Item name={"commonMistakes"} label="动作常见错误" rules={[{required: true,},]}>
            <TextArea autoSize={{ minRows: 2, maxRows: 10 }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default MovementTable;
