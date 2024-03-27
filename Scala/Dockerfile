FROM ubuntu:22.04

ENV TZ="Europe/Warsaw"

RUN apt-get update && \
    apt-get -y install software-properties-common curl unzip zip

RUN curl -s "https://get.sdkman.io" | bash

RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install java 11.0.21-amzn"
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install sbt 1.9.9"
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install scala 2.13.13"

ENV PATH=$PATH:/root/.sdkman/candidates/java/11.0.21-amzn/bin/
ENV PATH=$PATH:/root/.sdkman/candidates/sbt/1.9.9/bin
ENV PATH=$PATH:/root/.sdkman/candidates/scala/2.13.13/bin

RUN mkdir /e-business
WORKDIR /e-business
COPY . .
EXPOSE 9000

CMD ["sbt", "run"]