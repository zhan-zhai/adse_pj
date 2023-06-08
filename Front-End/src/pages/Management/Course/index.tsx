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
  Upload, message,
} from 'antd';
import urlConfig from '@/urlConfig';
import { PageContainer } from '@ant-design/pro-layout';
import {
  getItems,
  addItem,
  deleteItem,
  updateItem,
  validateMessages,
  getDifficultyTypes,
  getAllTags,
  normFile,
  uploadFileList2Url,
  url2UploadFileList,
  getSexes,
  getAllMovements,
  getAllAudios,
} from '@/utils/utils';
import { MinusCircleOutlined, PlusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';


const url= urlConfig.COURSE_URL; // modify


const CourseTable: React.FC = () =>{ // modify
  const [data, setData] = useState([]);
  const [difficultyTypes, setDifficultyTypes] = useState([]);
  const [sexes, setSexes] = useState([]);
  const [audios, setAudios] = useState([]);
  const [tags, setTags] = useState([]);
  const [movements, setMovements] = useState([{  // 初值为了消除类型报错
    id: "",
    video: {
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

  const { Option } = Select;

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
    getSexes().then((res: any)=>{
      setSexes(res);
    });
    getAllTags().then((res: any)=>{
      setTags(res);
    });
    getAllAudios().then((res: any)=>{
      setAudios(res);
    });
    getAllTags().then((res: any)=>{
      setTags(res);
    });
    getAllMovements().then((res: any)=>{
      setMovements(res);
    });
  }, []);

  const onAddOk = async () => {
    const formValues = addForm.getFieldsValue();
    console.log(formValues)
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const tagEntities = formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]);
    if (mainPicUrl && smallPicUrl) {
      const success = await addItem(url, {
        ...addForm.getFieldsValue(),
        mainPicUrl,
        smallPicUrl,
        tags:tagEntities,
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
      smallPicUrl: url2UploadFileList(record.smallPicUrl),
      tags: record.tags.map((t: any)=>t.name),
    });
    setModifyModelVisible(true);
  }

  const onModifyOk = async () => {
    const formValues = editForm.getFieldsValue();
    const mainPicUrl = uploadFileList2Url(formValues.mainPicUrl);
    const smallPicUrl = uploadFileList2Url(formValues.smallPicUrl);
    const tagEntities = formValues.tags.map((t: any)=>(tags.filter((tag: any)=>tag.name===t))[0]);
    if (mainPicUrl && smallPicUrl) {
      const success = await updateItem(url, editForm.getFieldValue("id"), {
        ...editForm.getFieldsValue(),
        mainPicUrl,
        smallPicUrl,
        tags:tagEntities,
      });
      if (success) {
        setModifyModelVisible(false);
        getData();
      }
    } else {
      message.error("存在文件未上传成功！");
    }
  };

  const formLayout= {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  }

  // 重新计算每个动作时长， 整个课程的时长、卡路里消耗
  const addFormReCount = () => {
    const formValues = addForm.getFieldsValue();
    const currentMovements = formValues.movements;
    const currentMovementsWithDuration = currentMovements;
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<currentMovements.length;i+=1){
      if(currentMovements[i]){
        // 计算单个动作时长
        if(currentMovements[i].movementId && currentMovements[i].videoTimes){
          const movementDuration = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].video.duration;
          const duration = movementDuration * currentMovements[i].videoTimes + (currentMovements[i].restTime ?currentMovements[i].restTime: 0);
          currentMovementsWithDuration[i].duration = + duration.toFixed(2)
          totalDuration += duration;
        }
        // 计算单个动作卡路里消耗
        if(currentMovements[i].movementId && currentMovements[i].userTimes){
          const movementCalorieConsumption = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].calorieConsumption;
          totalCalorieConsumption += movementCalorieConsumption * currentMovements[i].userTimes;
        }
      }
    }
    addForm.setFieldsValue(
      {
        calorieConsumption: totalCalorieConsumption,
        duration: totalDuration,
        movements: currentMovementsWithDuration,
      }
    )

  }
  // 重新计算每个动作时长， 整个课程的时长、卡路里消耗
  const editFormReCount = () => {
    const formValues = editForm.getFieldsValue();
    const currentMovements = formValues.movements;
    const currentMovementsWithDuration = currentMovements;
    console.log(currentMovements)
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<currentMovements.length;i+=1){
      if(currentMovements[i]){
        // 计算单个动作时长
        if(currentMovements[i].movementId && currentMovements[i].videoTimes){
          const movementDuration = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].video.duration;
          const duration = movementDuration * currentMovements[i].videoTimes + (currentMovements[i].restTime ?currentMovements[i].restTime: 0);
          currentMovementsWithDuration[i].duration = + duration.toFixed(2)
          totalDuration += duration;
        }
        // 计算单个动作卡路里消耗
        if(currentMovements[i].movementId && currentMovements[i].userTimes){
          const movementCalorieConsumption = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].calorieConsumption;
          totalCalorieConsumption += movementCalorieConsumption * currentMovements[i].userTimes;
        }
      }
    }
    editForm.setFieldsValue(
      {
        calorieConsumption: totalCalorieConsumption,
        duration: totalDuration,
        movements: currentMovementsWithDuration,
      }
    )

  }

  // 添加和删除的时候不能对movements列表进行修改，否则会出现奇怪情况，所以不能用addFormReCount重新计算
  const addFormReCountAfterAddRemove = () => {
    const formValues = addForm.getFieldsValue();
    const currentMovements = formValues.movements;
    console.log(currentMovements)
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<currentMovements.length;i++){
      // 计算单个动作时长
      if(currentMovements[i] && currentMovements[i].movementId && currentMovements[i].videoTimes){
        const movementDuration = movements.filter(m=>m.id===currentMovements[i].movementId)[0].video.duration;
        totalDuration += movementDuration * currentMovements[i].videoTimes + (currentMovements[i].restTime?currentMovements[i].restTime: 0);
      }
      // 计算单个动作卡路里消耗
      if(currentMovements[i] && currentMovements[i].movementId && currentMovements[i].userTimes){
        const movementCalorieConsumption = movements.filter(m=>m.id===currentMovements[i].movementId)[0].calorieConsumption;
        totalCalorieConsumption += movementCalorieConsumption * currentMovements[i].userTimes;
      }
    }
    addForm.setFieldsValue(
      {
        calorieConsumption: totalCalorieConsumption,
        duration: totalDuration,
      }
    )
  }
  // 添加和删除的时候不能对movements列表进行修改，否则会出现奇怪情况，所以不能用editFormReCount重新计算
  const editFormReCountAfterAddRemove = () => {
    const formValues = editForm.getFieldsValue();
    const currentMovements = formValues.movements;
    let totalCalorieConsumption = 0;
    let totalDuration = 0;
    for (let i=0;i<currentMovements.length;i+=1){
      // 计算单个动作时长
      if(currentMovements[i] && currentMovements[i].movementId && currentMovements[i].videoTimes){
        const movementDuration = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].video.duration;
        totalDuration += movementDuration * currentMovements[i].videoTimes + (currentMovements[i].restTime?currentMovements[i].restTime: 0);
      }
      // 计算单个动作卡路里消耗
      if(currentMovements[i] && currentMovements[i].movementId && currentMovements[i].userTimes){
        const movementCalorieConsumption = movements.filter((m: any)=>m.id===currentMovements[i].movementId)[0].calorieConsumption;
        totalCalorieConsumption += movementCalorieConsumption * currentMovements[i].userTimes;
      }
    }
    editForm.setFieldsValue(
      {
        calorieConsumption: totalCalorieConsumption,
        duration: totalDuration,
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
          <Form.Item name="name" label="视频课名称">
            <Input />
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
              title: '课程名称', // modify
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '难度', // modify
              dataIndex: 'difficulty',
              key: 'difficulty',
            },
            {
              title: '时长', // modify
              dataIndex: 'duration',
              key: 'duration',
              render: val => val > 60 ?`${Math.floor(val / 60)  }分钟${  Math.round(val%60)}秒`:`${  Math.round(val%60)}秒`,
            },
            {
              title: '卡路里消耗(千卡)', // modify
              dataIndex: 'calorieConsumption',
              key: 'calorieConsumption',
              render: val => val.toFixed(2)
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
        width={1200}
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
          <Form.Item name = "name" label="课程名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name="difficulty" label="难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="sex" label="适合性别" rules={[{required: true,},]}>
            <Select placeholder="选择性别" allowClear>
              {sexes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"duration"} label="时长" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name={"calorieConsumption"} label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item label="音频" name={'audioId'}  rules={[{ required: true, },]}>
            <Select placeholder="选择音频">
              {audios.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`yp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="课程主图"
            rules={[{ required: true,}]}
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
            label="课程小图"
            rules={[{ required: true,}]}
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
          <Form.Item label={"动作组"}>
            <Form.List name="movements">
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
                        label={`动作${  name + 1}`}
                        name={[name, 'movementId']}
                        fieldKey={[fieldKey, 'movementId']}
                        rules={[{ required: true, },]}
                      >
                        <Select placeholder="选择动作" onChange={addFormReCount}>
                          {movements.map((d: any) => <Option key={d.id} value={d.id}>{`dz${d.id}：${d.name}`}</Option>)}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label = "教练次数"
                        name={[name, 'coachTimes']}
                        fieldKey={[fieldKey, 'coachTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label = "用户次数"
                        {...restField}
                        name={[name, 'userTimes']}
                        fieldKey={[fieldKey, 'userTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={addFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label = "视频循环次数"
                        {...restField}
                        name={[name, 'videoTimes']}
                        fieldKey={[fieldKey, 'videoTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={addFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label="本动作时长"
                        name={[name, 'duration']}
                        fieldKey={[fieldKey, 'duration']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber disabled/>
                      </Form.Item>
                      <Form.Item
                        label="目标心率"
                        name={[name, 'targetHeartRate']}
                        fieldKey={[fieldKey, 'targetHeartRate']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label="休息时长(s)"
                        name={[name, 'restTime']}
                        fieldKey={[fieldKey, 'restTime']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={addFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label="休息提示语"
                        name={[name, 'restInstruction']}
                        fieldKey={[fieldKey, 'restInstruction']}
                      >
                        <Input />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => {
                        remove(name);
                        addFormReCountAfterAddRemove();
                      }} />
                      <PlusCircleOutlined onClick={() => {
                        add(undefined, name + 1); // todo fix
                      }} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => {
                      add();
                      addFormReCountAfterAddRemove();
                    }} block icon={<PlusOutlined />}>
                      添加动作
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="编辑"
        width={1200}
        visible={modifyModelVisible}
        okButtonProps={{ htmlType: 'submit', form: 'editForm' }}
        onCancel={()=>setModifyModelVisible(false)}
      >
        <Form name="editForm" form={editForm} {...formLayout}  onFinish={onModifyOk} validateMessages={validateMessages}>
          <Form.Item label="ID" name="id" rules={[{ required: true,},]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name = "name" label="课程名称" rules={[{required: true,},]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="标签" >
            <Select
              mode="multiple"
              showArrow
              options={tags.map((tag: any) => ({ value: tag.name }))}
            />
          </Form.Item>
          <Form.Item name="difficulty" label="难度" rules={[{required: true,},]}>
            <Select placeholder="选择难度" allowClear>
              {difficultyTypes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="sex" label="适合性别" rules={[{required: true,},]}>
            <Select placeholder="选择性别" allowClear>
              {sexes.map(d => <Option key={d} value={d}>{d}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name={"duration"} label="时长" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item name={"calorieConsumption"} label="卡路里消耗(千卡)" rules={[{required: true,},]}>
            <InputNumber disabled />
          </Form.Item>
          <Form.Item label="音频" name={'audioId'}  rules={[{ required: true, },]}>
            <Select placeholder="选择音频">
              {audios.map((d: any) => <Option key={d.id} value={Number(d.id)}>{`yp${d.id  }：${ d.name}`}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="mainPicUrl"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="课程主图"
            rules={[{ required: true,}]}
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
            label="课程小图"
            rules={[{ required: true,}]}
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
          <Form.Item label={"动作组"}>
            <Form.List name="movements">
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
                        label={`动作${  name + 1}`}
                        name={[name, 'movementId']}
                        fieldKey={[fieldKey, 'movementId']}
                        rules={[{ required: true, },]}
                      >
                        <Select placeholder="选择动作" onChange={editFormReCount}>
                          {movements.map((d: any) => <Option key={d.id} value={d.id}>{`dz${d.id}：${d.name}`}</Option>)}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        label = "教练次数"
                        name={[name, 'coachTimes']}
                        fieldKey={[fieldKey, 'coachTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber />
                      </Form.Item>
                      <Form.Item
                        label = "用户次数"
                        {...restField}
                        name={[name, 'userTimes']}
                        fieldKey={[fieldKey, 'userTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={editFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label = "视频循环次数"
                        {...restField}
                        name={[name, 'videoTimes']}
                        fieldKey={[fieldKey, 'videoTimes']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={editFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label="本动作时长"
                        name={[name, 'duration']}
                        fieldKey={[fieldKey, 'duration']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber disabled/>
                      </Form.Item>
                      <Form.Item
                        label="目标心率"
                        name={[name, 'targetHeartRate']}
                        fieldKey={[fieldKey, 'targetHeartRate']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber/>
                      </Form.Item>
                      <Form.Item
                        label="休息时长(s)"
                        name={[name, 'restTime']}
                        fieldKey={[fieldKey, 'restTime']}
                        rules={[{ required: true}]}
                      >
                        <InputNumber onChange={editFormReCount} />
                      </Form.Item>
                      <Form.Item
                        label="休息提示语"
                        name={[name, 'restInstruction']}
                        fieldKey={[fieldKey, 'restInstruction']}
                      >
                        <Input />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => {
                        remove(name);
                        editFormReCountAfterAddRemove();
                      }} />
                      <PlusCircleOutlined onClick={() => {
                        add(undefined, name + 1); // todo fix
                      }} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => {
                      add();
                      editFormReCountAfterAddRemove();
                    }} block icon={<PlusOutlined />}>
                      添加动作
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
export default CourseTable;
