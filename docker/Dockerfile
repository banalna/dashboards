FROM alpine:3.15 AS builder

ENV HUGO_VERSION='v0.92.0'
ENV HUGO_PORT=8080

# Install Dependencies
RUN apk update && apk upgrade 
RUN apk add --no-cache git npm go g++

# Configure Golang
ENV GOROOT /usr/lib/go
ENV GOPATH /go
ENV PATH /go/bin:$PATH
ENV CGO_ENABLED=1

# Install Hugo
RUN git clone https://github.com/gohugoio/hugo.git
WORKDIR /hugo

RUN git checkout tags/$HUGO_VERSION
RUN go install --tags extended

# Copy sources
RUN mkdir src
WORKDIR /src
COPY . .

# Install Node dependencies
RUN npm install

# Install Hugo Theme
RUN cd themes && git clone --recurse-submodules --depth 1 https://github.com/google/docsy.git

# Run server
EXPOSE $HUGO_PORT
ENTRYPOINT hugo server --port=$HUGO_PORT  --theme=docsy