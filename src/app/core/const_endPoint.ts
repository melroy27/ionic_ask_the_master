/*
Auth Endpoints
*/

export enum AuthEndPoints {
    AUTH = '/auth',
    AUTH_VAL_TOKEN = '/auth/validateToken',
    AUTH_FORGOT = '/auth/forgot',
    AUTH_FORGOT_CHECK = '/auth/forgot/checkotp',
    AUTH_FORGOT_RESET = '/auth/forgot/reset',

    QUESTION_CREATE = '/question/create',
    QUESTION_LIST = '/question/list',
    QUESTION_LIST_SINGLE = '/question/details',
    QUESTION_UPDATE = '/question/update',
    QUESTION_RATING = '/question/rating',
    QUESTION_SEARCH = '/question/search',

    ANSWER_CREATE = '/answer/create',
    ANSWER_LIST = '/answer/list',
    ANSWER_LIST_SINGLE = '/answer/details',
    ANSWER_UPDATE = '/answer/update',
    ANSWER_ON_QUESTION = '/answer/onQuestion/list',
    ANSWER_RATING = '/answer/rating',

    CAR_LIST = '/car/list',
    DOMAIN_LIST = '/domain/list',


    UPLOAD_SINGLE = '/upload/image',
    UPLOAD_MULTI = '/upload/images'
}