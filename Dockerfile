# code taken from from: hayd/alpine-deno:latest (alpine.dockerfile on https://github.com/hayd/deno-docker)

FROM frolvlad/alpine-glibc:alpine-3.11_glibc-2.31

ENV DENO_VERSION=1.0.0-rc1

RUN apk add --virtual .download --no-cache curl \
 && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
         --output deno.zip \
 && unzip deno.zip \
 && rm deno.zip \
 && chmod 777 deno \
 && mv deno /bin/deno \
 && apk del .download

RUN addgroup -g 1993 -S deno \
 && adduser -u 1993 -S deno -G deno \
 && mkdir /deno-dir/ \
 && chown deno:deno /deno-dir/

ENV DENO_DIR /deno-dir/

ENTRYPOINT ["deno"]

# TODO: use FROM or switch to multi stage
# FROM hayd/alpine-deno:latest

EXPOSE 8080

WORKDIR /app

USER deno

RUN deno --version

ADD deps.ts ./
RUN deno cache deps.ts

ADD . ./
RUN deno cache main.js

CMD ["run", "--allow-net", "main.js"]

# alternative:
# RUN deno bundle ./main.js  ./bundle/app.js
# RUN deno run --allow-net bundle/app.js
