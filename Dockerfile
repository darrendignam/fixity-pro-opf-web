FROM openpreserve/fixitypro-web:latest AS build
USER root
RUN apk add --no-cache openjdk11
WORKDIR /tmp/app_build
RUN cp /opt/fixitypro/fixitypro-web.war ./fixitypro-web.war
# Copy the WAR file from the image's filesystem to the build context
RUN mkdir war_extracted
RUN cd war_extracted && jar xf ../fixitypro-web.war
COPY volumes/fixity-web-war/ /tmp/app_build/war_extracted/
WORKDIR /tmp/app_build/war_extracted
# Repackage WAR with original manifest and store files without compression for Spring Boot compatibility
RUN jar cv0fm /tmp/new-fixitypro-web.war META-INF/MANIFEST.MF .

FROM openpreserve/fixitypro-web:latest AS out
COPY --from=build /tmp/new-fixitypro-web.war /opt/fixitypro/fixitypro-web.war

