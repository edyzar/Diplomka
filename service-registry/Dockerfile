FROM openjdk:17.0.2-jdk-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} service-registry.jar
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "/service-registry.jar"]