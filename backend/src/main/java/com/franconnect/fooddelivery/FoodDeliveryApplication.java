package com.franconnect.fooddelivery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for the Food Delivery Application.
 * 
 * @SpringBootApplication enables:
 * 1. @Configuration: Tags the class as a source of bean definitions.
 * 2. @EnableAutoConfiguration: Tells Spring Boot to configure beans based on classpath (e.g. MySQL, JPA, Tomcat).
 * 3. @ComponentScan: Scans for @RestController, @Service, and @Repository in com.franconnect.fooddelivery package.
 */
@SpringBootApplication
public class FoodDeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(FoodDeliveryApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  Food Delivery Backend Started Successfully!    ");
        System.out.println("  Server Port : 8080                             ");
        System.out.println("=================================================");
    }
}
