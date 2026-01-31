# Configuration

Store configuration files here.

## Guidelines

- Use `.env` for secrets (never commit to git)
- Use `.json` files for non-sensitive config
- Provide `.example` files for reference
- Document all configuration options

## Example

```json
{
  "garmin": {
    "apiUrl": "https://api.garmin.com",
    "syncInterval": "1h"
  }
}
```
