FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} book-service.jar
EXPOSE 8084
ENTRYPOINT ["java", "-jar", "/book-service.jar"]