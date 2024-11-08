package org.example.voice_ui;

import org.example.voice_ui.config.security.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
public class VoiceUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(VoiceUiApplication.class, args);
	}

}
