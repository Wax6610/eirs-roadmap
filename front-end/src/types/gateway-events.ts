enum GatewayEvents {
  SUCCESS_MESSAGE = "sucess-message",
  ERROR_MESSAGE = "error-message",

  USER_LIST_UPDATED = "user-list-updated",
  AUTH_SUCCESS = "auth-success",

  USER_ASK_TEMPLATES = "user-ask-templates",
  SERVER_SEND_TEMPLATES = "server-send-templates",

  USER_ASK_SAVE_TEMPLATE = "user-ask-save-template",
  SERVER_SEND_TEMPLATE_AFTER_SAVE = "server-send-template-after-save",
  SAVE_TEMPLATE_SUCCESS = "save-template-success",
  SAVE_TEMPLATE_ERROR = "save-template-error",

  USER_ASK_TEMPLATE_CODES = "user-ask-template-codes",
  SERVER_SEND_TEMPLATE_CODES = "server-send-template-codes",

  USER_ASK_IMPORT = "user-ask-import",
  IMPORT_SUCCESS = "import-success",
  IMPORT_ERROR = "import-error",

  USER_ASK_MAIN_VIEW = "user-ask-main-view-data",
  LOAD_MAIN_VIEW_SUCCESS = "load-main-view-success",
  LOAD_MAIN_VIEW_ERROR = "load-main-view-error",
  MAIN_VIEW_UPDATED = "main-view-updated",

  USER_SEND_REFRESH_REQUEST = "user-send-refresh-request",
  REFRESH_REQUEST_SUCCESS = "refresh-request-success",
  REFRESH_REQUEST_ERROR = "refresh-request-error",

  USER_ASK_PF_INFO = "user-ask-pf-info",
  USER_SEND_PF_INFO = "user-send-pf-info",
  SERVER_SEND_PF_INFO = "server-send-pf-info",

  USER_ASK_PF_LIST = "user-ask-pf-list",
  SERVER_SEND_PF_LIST = "server-send-pf-list",

  USER_SEND_PF_REQUEST = "user-send-pf-request",
  PF_REQUEST_SUCCESS = "pf-request-success",
  PF_REQUEST_FAILDED = "pf-request-failed",

  GET_SM_REQUEST = "sm-reuqest",
  GET_SM_REQUEST_SUCCESS = "sm-request-success",
  GET_SM_REUQEST_FAILED = "sm-request-fail",

  UPDATE_NEW_SERIAL = "update-new-serial",

  GET_EXCEL_TEMPLATE = "get-excel-template",
  GET_EXCEL_TEMPLATE_SUCCESS = "get-excel-template-success",
  GET_EXCEL_TEMPLATE_FAILED = "get-excel-template-failed",

  GET_REGEXP = "get-regexp",
  GET_REGEXP_SUCCESS = "get-regexp-success",
  GET_REGEXP_FAILED = "get-regexp-failed",

  SAVE_REGEXP = "save-regexp",
  SAVE_REGEXP_SUCCESS = "save-regexp-success",
  SAVE_REGEXP_FAILED = "save-regexp-failed",

  DELETE_REGEXP = "delete-regexp",
  DELETE_REGEXP_SUCCESS = "delete-regexp-success",
  DELETE_REGEXP_FAILED = "delete-regexp-failed",

  SAVE_ROADMAP = "roadmap-save",
  SAVE_ROADMAP_SUCCESS = "roadmap-save-success",
  SAVE_ROADMAP_FAILED = "roadmap-save-failed",

  // Ключевые слова
  GET_KEYWORDS = "get-keywords",
  GET_KEYWORDS_SUCCESS = "get-keywords-success",
  GET_KEYWORDS_FAIELD = "get-keywords-failed",

  SAVE_KEYWORDS = "save-keywords",
  SAVE_KEYWORDS_SUCCESS = "save-keywords-success",
  SAVE_KEYWORDS_FAIELD = "save-keywords-failed",

  DELETE_KEYWORDS = "delete-keywords",
  DELETE_KEYWORDS_SUCCESS = "delete-keywords-success",
  DELETE_KEYWORDS_FAIELD = "delete-keywords-failed",

  UPDATE_KEYWORDS = "update-keywords",

  GET_FILTER_DATA = "get-filter-data",
  GET_FILTER_SUCCESS = "get-filter-data-success",
  GET_FILTER_FAILED = "get-filter-data-failed",

  SAVE_MAIN = "save-main",
  SAVE_MAIN_SUCCESS = "save-main-success",
  SAVE_MAIN_FAILED = "save-main-failed",

  IMPORT_VIP = "import-vip",
  IMPORT_VIP_SUCCESS = "import-vip-success",
  IMPORT_VIP_FAILED = "import-vip-failed",

  LOAD_VIP = 'load-vip',
  LOAD_VIP_SUCCESS = 'load-vip-success',
  LOAD_VIP_FAILED = 'load-vip-failed',

  VIP_REQUEST = 'vip-request',
  VIP_REQUEST_SUCCESS = 'vip-request-success',
  VIP_REQUEST_FAILED = 'vip-request-failed',

  UPDATE_VIP = 'update-vip',
  UPDATE_VIP_SUCCESS = 'update-vip-success',
  UPDATE_VIP_FAILED = 'update-vip-failed',

  SYNC_DATE_LOADED = 'sync-date-loaded'

}

export default GatewayEvents;
