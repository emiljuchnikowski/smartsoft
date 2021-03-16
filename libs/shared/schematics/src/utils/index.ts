import {Rule, SchematicContext, Tree} from "@angular-devkit/schematics";

export * from "./package.service";
export * from "./setup-options";
export * from "./tsconfig.service";

export function logRule(txt, type: 'info' = 'info'): Rule {
    return (host: Tree, context: SchematicContext) => {
        switch (type) {
            case "info":
                context.logger.log('info', `✅️ ${txt}`);
        }

        return host;
    };
}