FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} shop-service.jar
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "/shop-service.jar"]