FROM continuumio/miniconda:latest

COPY ./backend/requirements.yml /backend/requirements.yml

RUN conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/backendProject/bin:$PATH

RUN echo "source activate backendProject" >~/.bashrc

RUN mkdir -p /scripts

COPY ./scripts /scripts

RUN chmod +x /scripts/*

COPY ./backend /backend

WORKDIR /backend