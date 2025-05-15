



import translator from 'open-google-translator';


export async function translateDescriptionToEnglish(text: string): Promise<string> {
    try {
        
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return await translator(text, { to: 'en' });
    } catch (error) {
        console.error("Translation error:", error);
        // Fallback to the original text if translation fails.
        return text;
    }
}