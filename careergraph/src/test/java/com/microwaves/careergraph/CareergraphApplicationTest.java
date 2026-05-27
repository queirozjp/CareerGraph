package com.microwaves.careergraph;

import com.microwaves.careergraph.controller.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CareergraphApplicationTest {

	@Autowired
	private ApplicationContext applicationContext;

	@Autowired
	private UserController userController;

	@Test
	void contextLoads() {
		assertTrue(true, "The application context should load successfully");
	}

	@Test
	void applicationContextIsNotNull() {
		assertNotNull(applicationContext, "The application context should not be null");
	}

	@Test
	void userControllerIsLoaded() {
		assertNotNull(userController, "UserController should have been auto-wired by Spring");
	}
}
