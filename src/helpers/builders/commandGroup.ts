import { Client, Message } from "discord.js";

type Metadata = {
    name: string;
    suffix: string;
    description: string;
};

type Context = {
    client: Client;
    message: Message;
};

type Middleware = (context: Context, next?: Middleware) => Middleware | void;

export class CommandGroup {
    middleware: Middleware[] = [];
    commands = [];
    constructor() {
        this.middleware = [];
    }

    use(fn: Middleware) {
        this.middleware.push(fn);
    }

    executeMiddleware(
        middlewares: Middleware[],
        data: Context,
        next: Middleware
    ) {
        const composition = middlewares.reduceRight(
            (next, fn) => (dat) => {
                fn(dat, next);
            },
            next
        );
        composition(data, next);
    }
    run(data: Context) {
        this.executeMiddleware(this.middleware, data, (data: Context) => {
            console.log(data);
        });
    }
}
