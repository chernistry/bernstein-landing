FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/bernstein.conf

# Main HTML pages
COPY index.html /usr/share/nginx/html/index.html
COPY 404.html /usr/share/nginx/html/404.html
COPY og-image.html /usr/share/nginx/html/og-image.html

# SEO files
COPY robots.txt /usr/share/nginx/html/robots.txt
COPY sitemap.xml /usr/share/nginx/html/sitemap.xml
COPY humans.txt /usr/share/nginx/html/humans.txt
COPY favicon.svg /usr/share/nginx/html/favicon.svg
COPY manifest.json /usr/share/nginx/html/manifest.json
COPY structured-data.json /usr/share/nginx/html/structured-data.json

# AI/LLM discoverability files
COPY llms.txt /usr/share/nginx/html/llms.txt
COPY llms-full.txt /usr/share/nginx/html/llms-full.txt
COPY ai.txt /usr/share/nginx/html/ai.txt

# .well-known directory
COPY .well-known/security.txt /usr/share/nginx/html/.well-known/security.txt
COPY .well-known/ai-plugin.json /usr/share/nginx/html/.well-known/ai-plugin.json

EXPOSE 80
