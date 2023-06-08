const baseUrl = ""
// const baseUrl = ""
// const baseUrl = "http://1.116.157.194:8090"
const urlConfig = {
  // management urls

  LOGIN_URL: baseUrl + "/api/account/login",
  REGISTER_URL: baseUrl + "/api/account/register",
  LOGOUT_URL: baseUrl + "/api/account/logout",

  SYS_USER_URL: baseUrl + "/api/accountManagement/sys_users",
  USER_URL: baseUrl + "/api/accountManagement/users",

  COMMODITY_URL : baseUrl + "/api/commodityManagement/commodities",
  COMMODITY_ALL_URL : baseUrl + "/api/commodityManagement/commodities_all",

  ADD_TO_SHOPPING_CART: baseUrl + "/api/cart/addCart",
  ORDER_FROM_COMMODITY: baseUrl + "/api/order/createOrderFromCommodityDetail",
  CART_GET: baseUrl + "/api/cart/getCart",
  CART_MAKE_ORDER: baseUrl + "/api/order/createOrderFromCart",

  ACCOUNT_RECHARGE: baseUrl + "/api/wallet/recharge",
  ACCOUNT_GET: baseUrl + "/api/wallet/getWallet",

  ORDER_ALL_URL : baseUrl + "/api/order/allOrders",
  ORDER_CANCEL_URL: baseUrl + "/api/order/cancelOrder",
  ORDER_PAY_URL: baseUrl + "/api/order/pay",
  ORDER_STATUS_URL: baseUrl + "/api/order/getOrderByStatus",
  ORDER_UPDATE_URL: baseUrl + "/api/order/modifyOrder",
  ORDER_CONFIRM_URL: baseUrl + "/api/order/confirmation",
  ORDER_DELIVER_URL: baseUrl + "/api/order/delivery",

  DELIVER_COMPANY_GET_URL: baseUrl+ "/api/delivery/company",

  ADDRESS_GET_URL: baseUrl + "/api/address/getAddress",
  ADDRESS_CREAT_URL: baseUrl + "/api/address/createAddress",
  ADDRESS_MODIFY_URL: baseUrl + "/api/address/modifyAddress",

  // WEB_SOCKETS_URL: "ws://127.0.0.1:6785/websocket",
  WEB_SOCKETS_URL: "/websocket",
  NOTIFICATION_ACK_URL: baseUrl + "/api/notification/orderInfo",

  SUBJECT_URL: baseUrl + "/api/management/subjects",
  TAG_URL: baseUrl + "/api/management/tags",
  MOVEMENT_URL: baseUrl + "/api/management/movements",
  COACH_URL: baseUrl + "/api/management/coaches",
  LIVE_URL: baseUrl + "/api/management/lives",
  IMAGE_URL: baseUrl + "/api/management/images",
  VIDEO_URL: baseUrl + "/api/management/videos",
  COURSE_URL: baseUrl + "/api/management/courses",
  SPECIALIZED_COURSE_URL: baseUrl + "/api/management/specialized_courses",
  BODY_PART_URL: baseUrl + "/api/management/body_parts",
  AUDIO_URL: baseUrl + "/api/management/audios",
  AI_ARG_URL: baseUrl + "/api/management/ai_recognition_args",
  APK_VERSION: baseUrl + "/api/management/apk_versions",
  LOGIN_LOG_URL: baseUrl + "/api/management/login_logs",

  COURSE_RECORD_URL: baseUrl + "/api/management/course_records",

  MEMBERSHIP_GOODS_URL: baseUrl + "/api/management/membership_goods",
  MEMBERSHIP_ORDER_URL: baseUrl + "/api/management/membership_orders",

  FILE_DOWNLOAD_URL: baseUrl + "/api/common/files/download?relativePath=",
  IMAGE_UPLOAD_URL: baseUrl + "/api/common/files/upload",
  AUDIO_UPLOAD_URL: baseUrl + "/api/oss/upload?type=audio",
  VIDEO_UPLOAD_URL: baseUrl + "/api/oss/upload?type=video",
  APK_UPLOAD_URL: baseUrl + "/api/oss/upload?type=apk",

  VIDEO_TYPE: baseUrl + "/api/constant/video_type",
  DIFFICULTY_TYPE: baseUrl + "/api/constant/difficulty",
  AUDIO_TYPE: baseUrl + "/api/constant/audio_type",
  SUITABLE_SEX_TYPE: baseUrl + "/api/constant/suitable_sex",
  SPECIALIZED_COURSE_TYPE: baseUrl + "/api/constant/specialized_course_types",

  CHANGE_PASSWORD_URL: baseUrl + "/api/management/sys_users/change_password",
}

export default urlConfig;
