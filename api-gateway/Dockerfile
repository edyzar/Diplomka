FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} api-gateway.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "/api-gateway.jar"]