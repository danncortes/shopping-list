var schema = {
    "type": "object",
    "properties": {
        "products": {
            "type": "array",
            "minItems": 3,
            "maxItems": 10,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "unique": true,
                        "minimum": 1
                    },
                    "name": {
                        "type": "string",
                        "faker": "commerce.productName"
                    },
                    "price": {
                        "type": "number",
                        "faker": "commerce.price"
                    },
                    "store": {
                        "type": "string",
                        "faker": "company.companyName"
                    }
                },
                "required": ["id", "name", "price", "store"]
            }
        },
        "lists": {
            "type": "array",
            "minItems": 2,
            "maxItems": 4,
            "items": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "unique": true,
                        "minimum": 1
                    },
                    "nProducts": {
                        "type": "number",
                        "minimum": 1,
                        "maximum": 10
                    },
                    "nItems": {
                        "type": "number",
                        "minimum": 1,
                        "maximum": 50
                    },
                    "cost": {
                        "type": "number",
                        "faker": "finance.amount"
                    },
                    "date": {
                        "type": "string",
                        "faker": "date.recent"
                    },
                    "purchased": {
                        "type": "boolean"
                    },
                    "products": {
                        "type": "text",
                        "faker": "lorem.paragraph"
                    }
                },
                "required": ["id", "nProducts", "nItems", "cost", "date", "purchased", "products"]
            }
        }
    },
    "required": ["products", "lists"]
};

module.exports = schema;