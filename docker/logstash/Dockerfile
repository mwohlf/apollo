
ARG ELK_VERSION

FROM docker.elastic.co/logstash/logstash-oss:${ELK_VERSION}

# pipeline is mounted in docker-compose
RUN rm -f /usr/share/logstash/pipeline/logstash.conf

# replacing with custom config mount in docker-compose
RUN rm -f /usr/share/logstash/config/logstash.yml

CMD /usr/share/logstash/bin/logstash --setup
