FROM ubuntu

ENV TZ='Europe/Warsaw'

RUN apt update && apt install -y software-properties-common tzdata
RUN add-apt-repository -y ppa:deadsnakes/ppa && apt update

RUN apt install -y \
    python3.8
