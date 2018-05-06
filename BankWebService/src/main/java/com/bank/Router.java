package com.bank;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Configuration
@Controller
@EnableAutoConfiguration
@ComponentScan
public class Router {
	
	@RequestMapping("/")
	public String index() {
	return "login.html";
	}
	
	@RequestMapping("/gohome.html")
	public String homePage() {
		System.out.println("inside homePage");
	return "transactionPage.html";
	}
	
	@RequestMapping("/goregistration.html")
	public String registrationPage() {
		System.out.println("inside registrationPage");
	return "registrationPage.html";
	}
	
	
	@RequestMapping("/gobankStatementGeneration.html")
	public String bankStatementGeneration() {
		System.out.println("inside bankStatementGeneration");
	return "bankStatementGenerationPage.html";
	}


}
