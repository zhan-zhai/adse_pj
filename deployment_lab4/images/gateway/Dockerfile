FROM java:8
COPY gateway-GATEWAY.jar /app/app.jar


EXPOSE 6786
ENTRYPOINT ["java","-javaagent:/usr/skywalking/skywalking-agent.jar","-jar","/app/app.jar"]
