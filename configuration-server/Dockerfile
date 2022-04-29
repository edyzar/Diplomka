FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} configuration-server.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/configuration-server.jar"]