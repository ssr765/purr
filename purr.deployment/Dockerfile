FROM httpd:2.4

# Configure Apache log directory
ENV APACHE_LOG_DIR /var/log/httpd
RUN mkdir -p /var/log/httpd && \
    chown -R www-data:www-data /var/log/httpd

# Set working directory
WORKDIR /data

# Copy custom Apache configuration
COPY ./config/httpd.conf /data/httpd.conf

# Enable necessary modules for proxy and validate configuration
RUN sed -i \
    -e 's/#LoadModule proxy_module modules\/mod_proxy.so/LoadModule proxy_module modules\/mod_proxy.so/' \
    -e 's/#LoadModule proxy_http_module modules\/mod_proxy_http.so/LoadModule proxy_http_module modules\/mod_proxy_http.so/' \
    -e 's/#LoadModule proxy_fcgi_module modules\/mod_proxy_fcgi.so/LoadModule proxy_fcgi_module modules\/mod_proxy_fcgi.so/' \
    -e 's/#LoadModule mpm_event_module modules\/mod_mpm_event.so/LoadModule mpm_event_module modules\/mod_mpm_event.so/' \
    /usr/local/apache2/conf/httpd.conf && \
    cat /data/httpd.conf >> /usr/local/apache2/conf/httpd.conf && \
    httpd -t

# Expose port 80
EXPOSE 80