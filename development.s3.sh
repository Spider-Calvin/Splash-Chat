cp .env.dev .env
npx vite build 
aws s3 cp dist/ s3://dev-wacom-client --recursive;
# aws cloudfront create-invalidation --distribution-id EOWMD5XN8PCX5 --paths "/*"