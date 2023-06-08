import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

async function getFakeCaptcha(req: Request, res: Response) {
    await waitTime(2000);
    return res.json('captcha-xxx');
}

export default {
    'GET /api/order/allOrders':{
        code: "000",
        data: [
            {
                "orderId":1,
                "orderItemId":1,
                "userName":"kobe",
                "commodityName":"apple",
                "type":"s",
                "quantity":22,
                "totalPrice":300,
                "receiverName":"angle",
                "phoneNumber":"xxx",
                "addressMerge": "上海市上海杨浦区淞沪路2006号",
                "addressDetail":"淞沪路2006号",
                "addressProvince":"上海市",
                "addressCity":"上海",
                "addressDistinct":"杨浦区",
                "status":0
            },
            {
                "orderId":2,
                "orderItemId":2,
                "userName":"kobe",
                "commodityName":"apple",
                "type":"s",
                "quantity":22,
                "totalPrice":300,
                "receiverName":"angle",
                "phoneNumber":"xxx",
                "addressMerge": "湖南省长沙市天心区韶山南路",
                "addressDetail":"韶山南路",
                "addressProvince":"湖南省",
                "addressCity":"长沙市",
                "addressDistinct":"天心区",
                "status":1
            },
            {
                "orderId":3,
                "orderItemId":4,
                "userName":"kobe",
                "commodityName":"apple",
                "type":"s",
                "quantity":22,
                "totalPrice":300,
                "receiverName":"angle",
                "phoneNumber":"xxx",
                "addressMerge": "北京市北京海淀区",
                "addressDetail":"南路",
                "addressProvince":"北京市",
                "addressCity":"北京市",
                "addressDistinct":"海淀区",
                "status":2
            },
            ],
        msg: "成功获取列表"
    },
    'GET /api/order/getOrderByStatus/1':{
        code: "000",
        data: [
            {
                "orderId":3,
                "orderItemId":4231231,
                "userName":"kobe",
                "commodityName":"apple",
                "type":"s",
                "quantity":22,
                "totalPrice":300,
                "receiverName":"angle",
                "phoneNumber":"xxx",
                "addressMerge": "上海市上海杨浦区淞沪路2006号",
                "addressDetail":"淞沪路2006号",
                "addressProvince":"上海市",
                "addressCity":"上海",
                "addressDistinct":"杨浦区",
                "status":1
            },
            {
                "orderId":44,
                "orderItemId":124123,
                "userName":"kobe",
                "commodityName":"apple",
                "type":"s",
                "quantity":22,
                "totalPrice":300,
                "receiverName":"angle",
                "phoneNumber":"xxx",
                "addressMerge": "上海市上海杨浦区淞沪路2006号",
                "addressDetail":"淞沪路2006号",
                "addressProvince":"上海市",
                "addressCity":"上海",
                "addressDistinct":"杨浦区",
                "status":1
            },
        ],
        msg: "成功获取列表"
    },
}