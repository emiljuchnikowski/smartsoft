import {Rule, SchematicContext, Tree} from "@angular-devkit/schematics";

export function logRule(txt, type: 'info' = 'info'): Rule {
    return (host: Tree, context: SchematicContext) => {
        switch (type) {
            case "info":
                context.logger.log('info', `✅️ ${txt}`);
        }


        return host;
    };
}