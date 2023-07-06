import excuteQuery from './db';

export async function newEmailTemplate({ name }: {name: string;}) {
    try {
        const result: any = await excuteQuery({
            query: "INSERT INTO `email_templates`(`name`) VALUES (?)",
            values: [ name ],
        });
        return result;
    } catch (error) {
        return { error };
    }
}