import { Request, Response } from 'express'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000)
  return res.json('captcha-xxx')
}

export default {
  'GET /api/management/commodities_all': {
    code: '000',
    data: [
      {
        'id': 1,
        'name': 'good1',
        'introduction': 'good1 des',
        'sellerId': null,
        'commodityTypes': [
          {
            'id': 1,
            'type': 'string',
            'image': 'string',
            'amount': 44,
            'price': 22
          }
        ]
      },
      {
        'id': 2,
        'name': '苹果2',
        'introduction': 'apple',
        'sellerId': null,
        'commodityTypes': [
          {
            'id': 2,
            'type': 'string',
            'image': 'string',
            'amount': 2,
            'price': 33
          }
        ]
      }
    ],
    msg: '成功获取列表'
  },
  'GET /api/management/commodities?size=10&page=0': {
    code: '000',
    data: [
      {
        'id': 1,
        'name': 'good1',
        'introduction': 'good1 des',
        'image': 'string',
        'amount': 22
      },
      {
        'id': 2,
        'name': 'good2',
        'introduction': 'good2 des',
        'image': 'string',
        'amount': 22
      }
    ],
    msg: '成功获取列表'
  },
  'GET /api/management/commodities': {
    code: '000',
    data: {
      content:
        [
          {
            'id': 1,
            'name': 'good1',
            'introduction': 'good1 des',
            'image': 'string',
            'amount': 22,
            'commodityTypes': [
              {
                'id': 1,
                'type': '白色',
                'image': null,
                'amount': 10,
                'price': 100
              },
              {
                'id': 1,
                'type': '黑色',
                'image': null,
                'amount': 11,
                'price': 110
              }
            ]
          },
          {
            'id': 2,
            'name': 'good2',
            'introduction': 'good2 des',
            'image': 'string',
            'amount': 22,
            'commodityTypes': [
              {
                'id': 1,
                'type': '白色',
                'image': null,
                'amount': 10,
                'price': 100
              },
              {
                'id': 1,
                'type': '黑色',
                'image': null,
                'amount': 11,
                'price': 110
              }
            ]
          }
        ]
    },
    msg: '成功获取列表'
  }
}
