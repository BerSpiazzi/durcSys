package br.com.durcsys.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        SecurityScheme securityScheme = new SecurityScheme()
                .type(Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(In.HEADER)
                .name("Authorization");

        return new OpenAPI()
                .info(new Info()
                        .title("DURC SYS API")
                        .version("1.0.0")
                        .contact(new Contact().name("Bernardo Spiazzi").email("ber.spiazzidv8@gmail.com")
                                .url("https://www.linkedin.com/in/bernardo-bortot-spiazzi-9a7114183/"))
                        .description("API para gerenciamento de usuários")
                        .license(new License().name("Apache 2.0").url("https://springdoc.org"))
                        .termsOfService("https://swagger.io/terms/"))
                .addSecurityItem(new SecurityRequirement().addList("jwt"))
                .components(new io.swagger.v3.oas.models.Components().addSecuritySchemes("jwt", securityScheme));
    }

}