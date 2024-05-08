# Use the official PyTorch base image
FROM pytorch/pytorch

# Install the necessary dependencies to run Jupyter
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y

# Install jupyter_server to run a Jupyter server
RUN pip install notebook

# Set the working directory
WORKDIR /workspace

# Expose port 8888 to access the Jupyter server from the browser
EXPOSE 8888

# Run the Jupyter server when the container starts
# --allow-root: allows running Jupyter as root (required in Docker)
# --ip=0.0.0.0: makes the server accessible from outside the container
# --no-browser: prevents Jupyter from trying to open a browser automatically
# --NotebookApp.token='': disables the need for a token to access (consider the security implications)
CMD ["jupyter", "notebook", "--allow-root", "--ip=0.0.0.0", "--no-browser", "--NotebookApp.token=''"]
