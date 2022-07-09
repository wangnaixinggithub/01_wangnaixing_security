package com.wnx.mall.tiny.generator;

import cn.hutool.core.util.StrUtil;
import cn.hutool.setting.dialect.Props;
import com.baomidou.mybatisplus.core.exceptions.MybatisPlusException;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.LikeTable;
import com.baomidou.mybatisplus.generator.config.querys.MySqlQuery;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.VelocityTemplateEngine;

import java.util.Collections;
import java.util.Scanner;


public class MyBatisPlusGenerator {

    public static void main(String[] args) {
        String projectPath = System.getProperty("user.dir");

        //1.获取用户输入的模块名
        String moduleName = getUserInput("模块名");
        //2.获取用户输入的表名
        String[] tableNames = getUserInput("表名，多个英文逗号分割").split(",");

        //3.根据数据源配置，创建自动生成器。
        AutoGenerator autoGenerator = new AutoGenerator(initDataSourceConfig());

        //4.进行个性化的配置
        autoGenerator.global(initGlobalConfig(projectPath));
        autoGenerator.packageInfo(initPackageConfig(projectPath,moduleName));
        autoGenerator.injection(initInjectionConfig(projectPath, moduleName));
        autoGenerator.template(initTemplateConfig());
        autoGenerator.strategy(initStrategyConfig(tableNames));

        //5.执行基于Velocity的自动生成
        autoGenerator.execute(new VelocityTemplateEngine());
    }


    /**
     * 初始化全局配置
     * @param projectPath 工程路径
     * @return 返回 GlobalConfig 全局配置
     */
    private static GlobalConfig initGlobalConfig(String projectPath) {
        return new GlobalConfig.Builder()
                .outputDir(projectPath + "/src/main/java")
                .author("WangNaiXing")
                .disableOpenDir()
                .enableSwagger()
                .fileOverride()
                .dateType(DateType.ONLY_DATE)
                .build();
    }


    /**
     *  初始化包配置
     * @param projectPath 工程路径
     * @param moduleName 模块名称
     * @return 返回 PackageConfig   包配置
     */
    private static PackageConfig initPackageConfig(String projectPath,String moduleName) {
        Props props = new Props("generator.properties");

        return new PackageConfig.Builder()
                .moduleName(moduleName)
                .parent(props.getStr("package.base"))
                .entity("model")
                .pathInfo(Collections.singletonMap(OutputFile.mapperXml, projectPath + "/src/main/resources/mapper/" + moduleName))
                .build();
    }

    /**
     *  初始化模板配置
     * @return 返回 TemplateConfig 模板配置
     */
    private static TemplateConfig initTemplateConfig() {
        return new TemplateConfig.Builder().build();
    }

    /**
     * 初始化策略配置
     * @param tableNames 表名
     * @return 返回策略 StrategyConfig 配置
     */
    private static StrategyConfig initStrategyConfig(String[] tableNames) {
        StrategyConfig.Builder builder = new StrategyConfig.Builder();
        builder.entityBuilder()
                .naming(NamingStrategy.underline_to_camel)
                .columnNaming(NamingStrategy.underline_to_camel)
                .enableLombok()
                .formatFileName("%s")
                .mapperBuilder()
                .enableBaseResultMap()
                .formatMapperFileName("%sMapper")
                .formatXmlFileName("%sMapper")
                .serviceBuilder()
                .formatServiceFileName("%sService")
                .formatServiceImplFileName("%sServiceImpl")
                .controllerBuilder()
                .enableRestStyle()
                .formatFileName("%sController");

        //当表名中带*号时可以启用通配符模式
        if (tableNames.length == 1 && tableNames[0].contains("*")) {
            String[] likeStr = tableNames[0].split("_");
            String likePrefix = likeStr[0] + "_";
            builder.likeTable(new LikeTable(likePrefix));
        } else {
            builder.addInclude(tableNames);
        }

        return builder.build();
    }

    /**
     * 初始化自定义配置
     * @param projectPath 工程路径
     * @param moduleName 模块名称
     * @return 返回 InjectionConfig 注入配置
     */
    private static InjectionConfig initInjectionConfig(String projectPath, String moduleName) {
        // 自定义配置
        return new InjectionConfig.Builder().build();
    }


    /**
     *  初始化数据源配置
     * @return 返回 DataSourceConfig 数据源配置对象
     */
    private static DataSourceConfig initDataSourceConfig() {
        //1.读取generator.properties
        Props props = new Props("generator.properties");

        //2.解析出url,username,password
        String url = props.getStr("dataSource.url");
        String username = props.getStr("dataSource.username");
        String password = props.getStr("dataSource.password");

        //3.构造DataSourceConfig 并返回。
        return new DataSourceConfig
                .Builder(url,username,password)
                .dbQuery(new MySqlQuery())
                .build();
    }



    /**
     *  读取控制台用户的输入
     * @param tip 提供用户的输入内容项
     * @return 用户的输入
     */
    private static String getUserInput(String tip) {
        Scanner scanner = new Scanner(System.in);
        System.out.println(("请输入" + tip + "："));
        if (scanner.hasNext()) {
            String next = scanner.next();
            if (StrUtil.isNotEmpty(next)) {
                return next;
            }
        }
        throw new MybatisPlusException("请输入正确的" + tip + "！");
    }

}