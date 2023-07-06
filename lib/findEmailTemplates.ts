import excuteQuery from './db';

export async function findEmailTemplate({ id }: {id: string;}) {
    try {
        const result: any = await excuteQuery({
            query: "SELECT * FROM `email_templates` WHERE `id` = ?",
            values: [ id ],
        });
        return result;
    } catch (error) {
        return { error };
    }
}