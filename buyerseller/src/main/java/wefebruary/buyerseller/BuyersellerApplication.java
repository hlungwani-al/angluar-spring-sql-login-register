package wefebruary.buyerseller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BuyersellerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BuyersellerApplication.class, args);
		System.out.println("Loading...");
		System.out.println("Loading failed! Retrying...");
		System.out.println("Loading failed! Retrying...");
		System.out.println("+++++++++working+++++++++");
	}

}
