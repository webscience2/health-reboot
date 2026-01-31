# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email [your-email] immediately.

## Best Practices

This project handles sensitive health data. All contributors must:

1. **Never commit sensitive data** to version control
2. **Use environment variables** for all credentials and API keys
3. **Encrypt data at rest** when storing personal health information
4. **Use HTTPS** for all API communications
5. **Follow HIPAA/GDPR guidelines** where applicable
6. **Regularly rotate API keys** and credentials
7. **Limit data retention** to necessary timeframes only

## Data Privacy

- All personal health data must be anonymized before sharing
- Data should be stored locally with appropriate encryption
- Cloud services must be HIPAA-compliant if used for health data
- Users must have full control over their data (export, deletion)

## Dependencies

- Regularly update dependencies to patch security vulnerabilities
- Use `npm audit` or equivalent to check for known issues
- Pin dependency versions in production
