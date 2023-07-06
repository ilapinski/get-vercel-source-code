import excuteQuery from './db';

export async function updateEmailTemplate({ id, templateJSON }: {id: string; templateJSON: string;}) {
    try {
        const result: any = await excuteQuery({
            query: "UPDATE `email_templates` SET `template` = ? WHERE `id` = ?",
            values: [ templateJSON, id ],
        });
        return result;
    } catch (error) {
        return { error };
    }
}