const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    );

const TCG_API_KEY = process.env.TCG_API_KEY;
if (!TCG_API_KEY)
    throw new Error(
        "Please define the TCG_API_KEY environment variable inside .env"
    );

export default {
    MONGODB_URI
};
