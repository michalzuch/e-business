FROM ubuntu:22.04

ENV TZ="Europe/Warsaw"

RUN apt update && apt install -y software-properties-common tzdata wget unzip
RUN add-apt-repository -y ppa:deadsnakes/ppa && apt update

RUN apt install -y \
    python3.8

RUN apt install -y \ 
    openjdk-8-jdk \
    kotlin

RUN wget "https://services.gradle.org/distributions/gradle-8.6-bin.zip" -P /tmp \
    && unzip -d /opt/gradle /tmp/gradle-8.6-bin.zip \
    && rm /tmp/gradle-8.6-bin.zip

ENV PATH="${PATH}:/opt/gradle/gradle-8.6/bin"

RUN mkdir /helloWorld
WORKDIR /helloWorld
RUN echo "dependencies { implementation "org.xerial:sqlite-jdbc:3.45.2.0" }" >> build.gradle
