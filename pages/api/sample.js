function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
    await sleep(2000);
    res.status(200).json({
        message: 'This is a test',
    });
}
