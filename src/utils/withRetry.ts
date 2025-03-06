export async function withRetry(promiseFn: any, label: string = '', attempts: number = 3) {
    let lastError = null;
    for (let i = 0; i < attempts; i++) {
        try {
            const result = await promiseFn();
            return result;
        } catch (err) {
            console.log(label, err);
            lastError = err;
        }
    }
    throw lastError;
}
