package com.wnx.common.exception;


import com.wnx.common.api.IErrorCode;

/**
 * 断言处理类，用于抛出各种API异常
 * 让抛出自定义异常写法更加优雅
 */
public class Asserts {
    public static void fail(String message) {
        throw new ApiException(message);
    }

    public static void fail(IErrorCode errorCode) {
        throw new ApiException(errorCode);
    }
}
