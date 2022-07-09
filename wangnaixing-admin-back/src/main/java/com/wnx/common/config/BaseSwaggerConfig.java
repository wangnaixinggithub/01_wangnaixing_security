package com.wnx.common.config;


import com.wnx.common.domain.SwaggerProperties;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;

/**
 * Swagger抽象基础配置
 *
 */
public abstract class BaseSwaggerConfig {

    /**
     * 创建 RestApi接口
     * @return
     */
    @Bean
    public Docket createRestApi() {
        SwaggerProperties swaggerProperties = swaggerProperties();

        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getApiInfo(swaggerProperties))
                .select()
                .apis(RequestHandlerSelectors.basePackage(swaggerProperties.getApiBasePackage()))
                .paths(PathSelectors.any())
                .build();

        if (swaggerProperties.isEnableSecurity()) {
            docket.securitySchemes(getSecuritySchemes())
                    .securityContexts(getSecurityContexts());
        }

        return docket;
    }

    /**
     * 返回 ApiInfo 对象
     * @param swaggerProperties 抽象方法实现的Model
     * @return ApiInfo
     */
    private ApiInfo getApiInfo(SwaggerProperties swaggerProperties) {
        return new ApiInfoBuilder()
                .title(swaggerProperties.getTitle())
                .description(swaggerProperties.getDescription())
                .contact(new Contact(swaggerProperties.getContactName(), swaggerProperties.getContactUrl(), swaggerProperties.getContactEmail()))
                .version(swaggerProperties.getVersion())
                .build();
    }

    /**
     * 获取安全协议
     * @return SecurityScheme 安全协议集合
     */
    private List<SecurityScheme> getSecuritySchemes() {
        //设置请求头信息
        List<SecurityScheme> result = new ArrayList<>();
        ApiKey apiKey = new ApiKey("Authorization", "Authorization", "header");
        result.add(apiKey);
        return result;
    }

    /**
     * 获取安全协议上下文
     * @return  SecurityContext 安全协议上下文集合
     */
    private List<SecurityContext> getSecurityContexts() {
        //设置需要登录认证的路径
        List<SecurityContext> result = new ArrayList<>();
        result.add(getContextByPath("/*/.*"));

        return result;
    }

    /**
     * 通过路径正则表达式 获取安全上下文
     * @param pathRegex 路径正则表达式
     * @return 路径上下文
     */
    private SecurityContext getContextByPath(String pathRegex) {
        return SecurityContext.builder()
                .securityReferences(getSecurityReferences())
                .forPaths(PathSelectors.regex(pathRegex))
                .build();
    }

    /**
     * 获取安全引用对象
     * @return  SecurityReference 安全引用对象
     */
    private List<SecurityReference> getSecurityReferences() {
        List<SecurityReference> result = new ArrayList<>();
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        result.add(new SecurityReference("Authorization", authorizationScopes));
        return result;
    }


    /**
     *自定义Swagger配置,抽象方法，让用户实现，写入Model信息。
     */
    public abstract SwaggerProperties swaggerProperties();
}
