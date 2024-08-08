
export const constants ={
    DEVICE_TYPE: {
    "WEB": "WEB",
    "ANDROID": "ANDROID",
    "IOS": "IOS"
},
DEFAULT_LANGUAGE:'en',
IMAGE_PATH:'https://devapi.gatoes.com/getImages',
ROLE: {
    SERVICE_PROVIDER: 'SERVICEPROVIDER',
    USER: "USER",
    MERCHANT: "MERCHANT",
    DRIVER: "DRIVER",
    GUEST: "GUEST",
    VENDOR: "VENDOR"
},
EMAIL_TYPE: {
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    RIDER_REPORT: 'RIDER_REPORT',
    MERCHANT_REPORT: 'MERCHANT_REPORT',
    FOR_REGISTRATION: 'FOR_REGISTRATION',
    CONFORM_ORDER: 'CONFORM_ORDER',
    MERCHANT_REGISTATION: 'MERCHANT_REGISTATION',
    POST_CONTACT_FORM: 'POST_CONTACT_FORM',
    DELIVERED_ORDER: 'DELIVERED_ORDER'

},
MESSAGE: {
    INVALID_DATE:"Invalid Date",
    ORDER_STATUS:"Invalid Order Status",
    INVALID_USER_ROLE:"Invalid user role, only service provider is allowed",
    ORDER_CANCEL_BY_ADMIN: 'Order cancel by admin',
    HELP_REQUEST: '{} has requested for callback',
    SERVICE_NOT_AVAILABLE: 'We’re currently figuring out how to get here. Try another location may be?',
    USER_REG_MESSAGE: 'Your OTP (One Time Password) to register with Gatoes is {}',
    SOMETHING_WENT_WRONG: "Something went wrong",
    UNASSIGN_ORDER: 'An order with order id {} has been gone unassigned',
    ITEM_ADDED_FOR_VERIFICATION: '{} has added an item, please verify the item.',
    ITEM_EDIT_FOR_VERIFICATION: '{} has edited an item, please verify the item.',
    EMAIL_PASSWORD_NOT_MATCH: "Invalid email or password",
    PHONE_PASSWORD_NOT_MATCH: "Invalid phone number or pin",
    INVALID_CREDENTIAL: "Invalid credential, Please enter valid phone number and password",
    USER_DEACTIVATED: "Your account deactivated successfully",
    USER_ALREADY_DEACTIVATED: "Your account already deactivated",
    USER_NOT_EXIST: "User does not exist",
    bad_token: "Login session expired. Please login again.",
    SHOP_NOT_FOUND: "Shop not found",
    INVALID_CATEGORIES: "Invalid categories",
    INVALID_ITEM: "Invalid item",
    DRIVER_BLOCKED: 'Sorry, your account has been suspended by admin',
    DEACTIVATED: 'Your account has been deactivated. For assistance, please reach out to Gatoes.',
    PERMANENT_DELETED: "The account has been deleted",
    ALREADY_ACTIVE: "The account is already active",
    DESIGNATION_ADDED: "Designation added",
    INVALID_PERMISSION: "Invalid Permission",
    INVALID_VERIFICATION: "Invalid verification code",
    NOT_HAVE_PERMISSION: "Not have permission",
    STAFF_ADDED: "Staff added",
    USER_ALLREADY_EXIST: "User already exist",
    AVAILABILITY_MARKED: "Availability marked",
    SHOP_CREATED: "Shop created",
    ADD_ITEM: "Add item",
    INVALID_POLYGON: "Invalid polygon",
    NO_DELIVERY_IN_THIS_REGION: 'No delivery in this region',
    NO_VALID_REGION: "No valid region",
    EMAIL_EXIST: "Provided email is already registered with us",
    NOT_VERIFIED: "Not verified",
    INVALID_MESSAGE: "Invalid message",
    NOT_IN_SAME_REGION: "Our services are not available in this region",
    ZONE_NOT_ACTIVATE: "Please add delivery region(s) before activating zone",
    NOT_OPEN: "Shop Not open",
    PASSWORD: 'Invalid password',
    INVALID_EMAIL: 'Invalid email',
    INVALID_HEADERS: 'Invalid headers',
    INVALID_STATUS: 'Invalid status',
    INVALID_PAYLOAD: 'Invalid request',
    NOT_PERMITED: 'Not permitted',
    ITEM_NAME: 'Invalid item name',
    INVALID_ADDONS: 'Invalid addons',
    REGION_EXIST: 'Region exists',
    USER_DELETED: 'User deleted',
    NOT_A_SCHEDULE_ORDER: 'Not a schedule order',
    ITEM_NOT_AVAILABLE: 'Item not available',
    NOT_READY: 'Not ready',
    NOT_ALLOW_TO_GO_OFFLINE: 'Not allow to go offline',
    NOT_ALLOW_TO_LOGOUT: 'Not allow to logout',
    NOT_A_VALID_ORDER: 'Not a valid order',
    MINIMUM_ORDER: 'Minimum order',
    INVALID_ORDER_STATUS: 'Order Already Updated',
    ORDER_CANCELED: 'This order has been cancelled by user.',
    INVALID_RULE: 'Invalid rule',
    NOT_VERIFIED: 'Not verified',
    INVALID_OTP: 'Invalid otp',
    PROMO_CODE_EXIST: 'Promo code exist',
    BLOCK_BY_ADMIN: 'You have been Block By Admin',
    NO_RESTAURANT_SELECTED: 'No Restaurant Selected',
    NO_USER_FOUND: 'No user found',
    CAN_NOT_ORDER: 'Cannot order at this time',
    INVALID_COUPON: 'Invalid coupon',
    INVALID_IMAGE_TYPE: 'Invalid image type',
    DRIVER_ALREADY_ASSIGN: 'Rider already assign',
    INVALID_DRIVER: 'Invalid rider',
    NO_DRIVER: 'No rider for current order',
    INVALID_TRIP: 'Invalid order',
    INVALID_ORDER: 'Invalid order',
    DRIVER_HELP: 'A help request from Rider {} ',
    OUT_OF_STOCK_MESSAGE: '{} has marked order as out of stock',
    EMAIL_SEND_SUCCESSFULLY: 'Email has been sent successfully',
    INVALID_CSV: 'Invalid CSV',
    PHONE_NUMBER_EXIST: 'Phone number exist',
    EMAIL_EXIST: 'Email already exists',
    INVALID_PASSWORD: 'Current password is wrong',
    INVALID_RECOMMENDED_ITEM: 'Invalid recommended item',
    COUPON_ABOVE: 'This promo is aplicable above {}',
    DRIVER_IS_ON_OTHER_TRIP: 'Driver already have a pickup',
    INVALID_STATUS: 'Invalid status',
    ORDER_IS_CANCEL: 'Order has been canceled',
    ORDER_ALLREADY_ACCEPTED: 'Order already accepted',
    ORDER_NOT_PLACED: 'ORDER_NOT_PLACED',
    INVALID_REFERRAL: 'Invalid referral code',
    INVALID_AMOUNT: 'Invalid amount',
    DRIVER_MESSAGE: "Deposit {} to Gatoes for order {}",
    NOT_AVAILABLE: "Service is not available",
    MAX_CASH_ORDER: "Cash on delivery not available on orders above {}",
    INVALID_TIME: 'You cannot select past time',
    INVALID_FILE: 'Invalid file',
    ENABLE_CASH: 'Cash orders are not available for schedule',
    MANAGER_NOT_FOUND_MESSAGE: "Admin will contact you soon",
    HAVE_PENDING_ORDER: "Merchant {} have pending order.",
    PLEASE_SELECT_PERMISSION: "please select any one permission",
    SMS_SENT_SUCCESSFULLY: "Sms Send Successfully",
    NOT_ALLOW_TO_DELIVER_ORDER: "Not Allow To Deliver Order",
    MAX_DISCOUNT_LESS_THAN: "Max discount should be less than subtotal",
    SHOP_ADDRESS_INVALID: "Provided address in not in the delivery region",
    MERCHANT_GONE_ONLINE: 'Merchant {} gone online',
    MERCHANT_GONE_OFFLINE: 'Merchant {} gone offline',
    PAYOUT_REQUEST_ALREADY_IN_QUEUE: 'Payout request already active for the account',
    PAYOUT_REQUEST_LIMIT_REACHED: 'Payout request limit reached',
    INVALID_PAYOUT_REQUEST:'Invalid payout request',
    INVALID_TRANSACTIONID:"Invalid or reserved transaction id",
    RESTRICTED_ACCESS:"Restricted access",
    ORDER_NOT_EXIST: "Order not exist",
    QR_CODE_ERROR: "QR code not generated, Please try again",
    MERCHANT_NOT_FOUND:"Merchant not found",
    MERCHANT_PLAN_EXISTS: "Merchant already have same plan, Please assign other plan",
    MERCHANT_PLAN_LIMIT_REACHED: "Merchant plan pay out request limit exceed for this plan, please assign other subscription plan",
    MERCHANT_FETCHED_SUCCESSFULLY: "Merchant fetched successfully",
    MERCHANT_PLAN_PERMISSION: "You are not authorize to change plan",
    INVALID_MERCHANT_LIST: "Invalid merchant list",
    INVALID_ZONE_LIST: "Invalid zone list",
    PLAN_CREATED_SUCCESSFULLY: "Plan created successfully",
    PLAN_NOT_FOUND:"Subscription plan not found",
    PLAN_FETCHED_SUCCESSFULLY: "Plan fetched succesfully",
    PLAN_ALREADY_EXISTS: "Plan already exists",
    PLAN_DELETED_SUCCESSFULLY: "Plan deleted successfully",
    PLAN_UPDATED_SUCCESSFULLY: "Plan updated successfully",
    OUT_OF_VISIBILTY: "Restaurant is not able to deliver here",
    SUBSCRIPTION_FETECHED_SUCCESSFULLY: "Subscription fetched successfully",
    SUBSCRIPTION_ASSIGNED: "Subscription Assigned successfully",
    SUBSCRIPTION_UPDATED_SUCCESSFULLY: "Subscription updated successfully",
    SUBSCRIPTION_NOT_FOUND: "Subscription not found",
    SUBSCRIPTION_REMOVED: "Subscription removed successfully",
    SUBSCRIPTION_OUT_OF_MERCHANT: "Subscription not belong to merchant, please assign other plan",
    SUBSCRIPTION_OUT_OF_ZONE: "Subscription not belong to merchant zone, please assign other plan",
    INVALID_ZONE: "Zone not exist",
    TAX_ADDED_SUCCESSFULLY: "Tax added successfully",
    TAX_UPDATED_SUCCESSFULLY: "Tax updated successfully",
    TAX_DELETED_SUCCESSFULLY: 'Tax deleted successfully',
    TAX_ALREADY_EXISTS: "Tax already exist",
    TAX_FETCHED_SUCCESSFULLY: "Tax fetched successfully",
    TAX_NOT_FOUND: "Tax not found",
    CATEGORY_ADDED_SUCCESSFULLY: "Category added successfully",
    CATEGORY_ALREADY_EXISTS: "Category already exist",
    CATEGORY_NOT_FOUND: "Category not found",
    CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully",
    ALL_COST_BEARER_INFORMATION_REQUIRED:"All cost bearer information required"
},
DISCOUNT_TYPE: {
    FIXED_DISCOUNT_ON_SUBTOTAL: 0,
    PERCENTAGE_DISCOUNT_ON_SUBTOTAL: 1,
    FIXED_DISCOUNT_ON_SHIPPING: 2,
    PERCENTAGE_DISCOUNT_ON_SHIPPING: 3
},
DISCOUNT_TYPE_FROM_MICROSERVICES: {
    FIXED_DISCOUNT_ON_SUBTOTAL: 0,
    FIXED_DISCOUNT_ON_SHIPPING: 1,
    PERCENTAGE_DISCOUNT_ON_SUBTOTAL: 2,
    PERCENTAGE_DISCOUNT_ON_SHIPPING: 3
},
DATES_FOR_CATEGORY: {
    "MONDAY": 1,
    "TUESDAY": 2,
    "WEDNESDAY": 3,
    "THURSDAY": 4,
    "FRIDAY": 5,
    "SATURDAY": 6,
    "SUNDAY": 7,
    "MONDAY-FRIDAY": 8,
    "SATURDAY-SUNDAY": 9,
    "EVERYDAY": 10,
},
ORDER_TYPE: {
    FOOD: 1,
    GROCERY: 2
},
WHO_BEAR_COST: {
    MERCHANT: 1,
    ADMIN: 0,
    NO_ONE: 2
},
ORDER_STATUS: {
    PENDING: -1,
    PLACED: 0,
    CONFORMED: 1,
    MARK_READY: 2,
    ON_THE_WAY: 3,
    DELIVERED: 4,
    CANCEL_BY_USER: 5,
    CANCEL_BY_SHOP: 6,
    CANCEL_BY_ADMIN: 7,
    OUT_OF_STOCK: 8,
    SCHEDULE_ORDER: 9,
    REORDERES: 10,
    FAILED: 11
},
LIMIT: 20,
}