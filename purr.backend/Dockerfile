FROM php:8.2.18-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    autoconf \
    gcc \
    g++ \
    make \
    bash \
    pkg-config \
    git \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install PHP extensions required for Laravel
RUN docker-php-ext-install pdo pdo_mysql mbstring zip

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www/html

# Copy the application
COPY . /var/www/html

# Copy the production environment file
RUN rm -rf /var/www/html/.env && cp /var/www/html/.env.production /var/www/html/.env

# Configure Apache's document root
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Copy Composer binary from official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable zip in php.ini
RUN mv /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini
RUN sed -i 's/;extension=zip/extension=zip/' /usr/local/etc/php/php.ini

# Install dependencies with Composer
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Assign permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8000
EXPOSE 8000