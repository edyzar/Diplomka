FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} user-service.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/user-service.jar"]