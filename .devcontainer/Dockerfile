# Use an official Python runtime as a parent image
FROM python:3.7-slim

# Set the working directory in the container to /app
WORKDIR /app

# Add metadata to the image to describe that the container is used for Github Codespaces
LABEL name="GitHub Codespaces with Datadog" \
      vendor="GitHub" \
      version="1.0" \
      release="1" \
      summary="GitHub Codespaces with Datadog" \
      description="This is a custom container used for GitHub Codespaces."

# Set environment variables
ENV DD_API_KEY=${DD_API_KEY}

# Install any needed packages specified in requirements.txt
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements

# Install Datadog agent
RUN DD_SITE=datadoghq.eu DD_HOSTNAME=github-codespace DD_API_KEY=${DD_API_KEY} bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"