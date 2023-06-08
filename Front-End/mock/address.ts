export default {
    'GET /api/address/getAddress':{
        code: "000",
        data: [
            {
                "id":1,
                "userId":1,
                "receiverName":"angle",
                "phoneNumber":"13382839923",
                "addressDetail":"淞沪路2006号",
                "addressProvince":"上海市",
                "addressCity":"上海",
                "addressDistinct":"杨浦区",
            },
            {
                "id":2,
                "userId":1,
                "receiverName":"angle",
                "phoneNumber":"13382839923",
                "addressDetail":"韶山南路",
                "addressProvince":"湖南省",
                "addressCity":"长沙市",
                "addressDistinct":"天心区",
            },
        ],
        msg: "成功获取列表"
    },
}
