package com.wnx.config;

import com.wnx.modules.ums.model.UmsResource;
import com.wnx.modules.ums.service.UmsAdminService;
import com.wnx.modules.ums.service.UmsResourceService;
import com.wnx.security.component.DynamicSecurityService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * mall-security模块相关配置
 * 自定义配置，用于配置如何获取用户信息及动态权限
 * Created by macro on 2019/11/9.
 */
@Configuration
public class CustomerSecurityConfig {


    private final UmsAdminService adminService;

    private final UmsResourceService resourceService;

    public CustomerSecurityConfig(UmsAdminService adminService, UmsResourceService resourceService) {
        this.adminService = adminService;
        this.resourceService = resourceService;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        //获取登录用户信息
        return username -> adminService.loadUserByUsername(username);
    }

    @Bean
    public DynamicSecurityService dynamicSecurityService() {
        return new DynamicSecurityService() {
            @Override
            public Map<String, ConfigAttribute> loadDataSource() {
                Map<String, ConfigAttribute> map = new ConcurrentHashMap<>();
                List<UmsResource> resourceList = resourceService.list();

                for (UmsResource resource : resourceList) {
                    map.put(resource.getUrl(), new org.springframework.security.access.SecurityConfig(resource.getId() + ":" + resource.getName()));
                }

                return map;
            }
        };
    }
}
