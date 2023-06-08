export default {
  'POST /api/cart/addCart': {
    code: '000',
    data: null,
    msg: 'success'
  },

  'POST /api/cart/deleteCart': {
    code: '000',
    data: null,
    msg: 'success'
  },
// cartItemId:xxx,
//      commodityName:xxx,
//      type:xxx,
//      quantity:xxx
  'GET /api/cart/getCart': {
    'code': '000',
    'data': [{ 'cartItemId': 1, 'type': '黑', 'commodityName': 'iPhone12', 'quantity': 1 }, {
      'cartItemId': 6,
      'type': '黑',
      'commodityName': 'iPhone12',
      'quantity': 1
    }, { 'cartItemId': 4, 'type': '黑', 'commodityName': 'iPhone12', 'quantity': 1 }, {
      'cartItemId': 8,
      'type': '黑',
      'commodityName': 'iPhone12',
      'quantity': 1
    }, { 'cartItemId': 10, 'type': '黑', 'commodityName': 'iPhone12', 'quantity': 1 }, {
      'cartItemId': 5,
      'type': '黑',
      'commodityName': 'iPhone12',
      'quantity': 1
    }, { 'cartItemId': 9, 'type': '黑', 'commodityName': 'iPhone12', 'quantity': 1 }, {
      'cartItemId': 2,
      'type': '黑',
      'commodityName': 'iPhone12',
      'quantity': 1
    }, { 'cartItemId': 7, 'type': '黑', 'commodityName': 'iPhone12', 'quantity': 1 }, {
      'cartItemId': 3,
      'type': '黑',
      'commodityName': 'iPhone12',
      'quantity': 1
    }],
    'msg': 'success'
  },

  'POST /api/order/createOrderFromCart': {
    code: '000',
    data: {},
    msg: 'success'
  },

  'POST /api/order/createOrderFromCommodityDetail': {
    code: '000',
    data: null,
    msg: 'success'
  }

}
