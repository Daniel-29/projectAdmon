FROM maven:3.9.2-amazoncorretto-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package

#FROM tomcat:9.0.76-jdk17-corretto
#FROM tomcat:9.0.76-jre17
#FROM tomcat:9.0.76-jre17-temurin
#FROM tomcat:9.0.76-jre17-temurin-jammy
FROM tomcat:9.0.76-jre17-temurin-focal

COPY --from=build /app/target/*.war /usr/local/tomcat/webapps/

EXPOSE 8080
CMD ["catalina.sh", "run"]
