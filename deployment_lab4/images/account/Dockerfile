FROM java:8
COPY wallet-ACCOUNT.jar /app/app.jar


EXPOSE 6785
ENTRYPOINT ["java","-javaagent:/usr/skywalking/skywalking-agent.jar","-jar","/app/app.jar"]
