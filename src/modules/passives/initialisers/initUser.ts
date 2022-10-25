import { prisma } from "../../../";
import { humanMatcher } from "../../matchers/humanMatcher";
import { Context } from "../../types/types";

export const initUser = async (context: Context) => {
    if (!(await humanMatcher(context))) return;
    const user = await prisma.users.findUnique({
        where: {
            user_id: context.message.author.id
        }
    });
    if (user) {
        if (user.user_tag !== context.message.author.tag) {
            prisma.users.update({
                where: {
                    user_id: context.message.author.id
                },
                data: {
                    user_tag: context.message.author.tag
                }
            });
        }
        return;
    }
    await prisma.users.create({
        data: {
            user_id: context.message.author.id,
            user_tag: context.message.author.tag
        }
    });
};
